import { NextRequest, NextResponse } from "next/server";
import { analyzeWalletAddress, extractWalletAddresses } from "@/lib/blocksteer";
import { extractWalletAddressesViaBem } from "@/lib/bem";

interface WalletAnalysisResult {
  address: string;
  chain: string;
  isRisky: boolean;
  riskScore: number;
  riskLevel: "low" | "medium" | "high" | "critical";
  summary: string;
  recommendations: string[];
}

interface CheckWalletResponse {
  originalText: string;
  bemAnalysis: {
    has_suspicious_context: boolean;
    message_summary: string;
    extractedWallets: { address: string; chain: string; context: string }[];
  };
  walletAnalyses: WalletAnalysisResult[];
  timestamp: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text, address } = body as { text?: string; address?: string };

    if (!text && !address) {
      return NextResponse.json(
        { error: "Either 'text' (message to scan) or 'address' (wallet address) is required" },
        { status: 400 }
      );
    }

    // If a direct address is provided, just analyze it
    if (address && !text) {
      const analysis = await analyzeWalletAddress(address);
      return NextResponse.json({
        originalText: address,
        bemAnalysis: {
          has_suspicious_context: false,
          message_summary: "Direct address lookup",
          extractedWallets: [{ address, chain: "Unknown", context: "" }],
        },
        walletAnalyses: [
          {
            address,
            chain: "Unknown",
            isRisky: analysis.isRisky,
            riskScore: analysis.riskScore,
            riskLevel: analysis.riskLevel,
            summary: analysis.summary,
            recommendations: analysis.recommendations,
          },
        ],
        timestamp: new Date().toISOString(),
      });
    }

    const messageText = text || address || "";

    // Step 1: Use BEM to extract wallet addresses and analyze context
    const bemResult = await extractWalletAddressesViaBem(messageText);

    // Step 2: Also use local regex as backup
    const localWallets = extractWalletAddresses(messageText);

    // Merge: prefer BEM results, add any local-only finds
    const allAddresses = new Map<string, { address: string; chain: string; context: string }>();
    for (const w of bemResult.wallets) {
      allAddresses.set(w.address, w);
    }
    for (const w of localWallets) {
      if (!allAddresses.has(w.address)) {
        allAddresses.set(w.address, { address: w.address, chain: w.type, context: "" });
      }
    }

    // Step 3: Analyze each address through BlockSteer
    const walletAnalyses: WalletAnalysisResult[] = await Promise.all(
      Array.from(allAddresses.values())
        .slice(0, 5)
        .map(async (wallet) => {
          try {
            const analysis = await analyzeWalletAddress(wallet.address);
            return {
              address: wallet.address,
              chain: wallet.chain,
              isRisky: analysis.isRisky,
              riskScore: analysis.riskScore,
              riskLevel: analysis.riskLevel,
              summary: analysis.summary,
              recommendations: analysis.recommendations,
            };
          } catch (error) {
            console.error(`Error analyzing wallet ${wallet.address}:`, error);
            return {
              address: wallet.address,
              chain: wallet.chain,
              isRisky: false,
              riskScore: 0,
              riskLevel: "low" as const,
              summary: "Unable to analyze this address",
              recommendations: ["Exercise caution with unknown addresses"],
            };
          }
        })
    );

    const response: CheckWalletResponse = {
      originalText: messageText,
      bemAnalysis: {
        has_suspicious_context: bemResult.has_suspicious_context,
        message_summary: bemResult.message_summary,
        extractedWallets: bemResult.wallets,
      },
      walletAnalyses,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error checking wallet:", error);
    return NextResponse.json(
      { error: "Failed to analyze wallet address", details: String(error) },
      { status: 500 }
    );
  }
}
