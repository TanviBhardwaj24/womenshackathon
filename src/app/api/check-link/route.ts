import { NextRequest, NextResponse } from "next/server";
import { analyzeTelegramPost, analyzeLink, isTelegramUrl } from "@/lib/blocksteer";
import { fetchTelegramPost } from "@/lib/telegram";

interface CheckLinkRequest {
  url: string;
  extractUrls?: boolean;
}

interface LinkAnalysisResult {
  url: string;
  isRisky: boolean;
  riskScore: number;
  riskLevel: "low" | "medium" | "high" | "critical";
  summary: string;
  recommendations: string[];
}

interface CheckLinkResponse {
  originalUrl: string;
  isTelegram: boolean;
  telegramData?: {
    channelName: string;
    postId: string;
    text: string;
    extractedUrls: string[];
  };
  analysis: LinkAnalysisResult;
  extractedUrlAnalyses?: LinkAnalysisResult[];
  timestamp: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: CheckLinkRequest = await req.json();
    const { url, extractUrls = true } = body;

    if (!url) {
      return NextResponse.json(
        { error: "URL is required" },
        { status: 400 }
      );
    }

    const isTelegram = isTelegramUrl(url);
    let telegramData;
    let extractedUrlAnalyses: LinkAnalysisResult[] = [];

    if (isTelegram) {
      telegramData = await fetchTelegramPost(url);
      
      const mainAnalysis = await analyzeTelegramPost(url);

      if (extractUrls && telegramData.urls.length > 0) {
        const urlAnalyses = await Promise.all(
          telegramData.urls.slice(0, 5).map(async (extractedUrl) => {
            try {
              const analysis = await analyzeLink(extractedUrl);
              return {
                url: extractedUrl,
                isRisky: analysis.isRisky,
                riskScore: analysis.riskScore,
                riskLevel: analysis.riskLevel,
                summary: analysis.summary,
                recommendations: analysis.recommendations,
              };
            } catch (error) {
              console.error(`Error analyzing ${extractedUrl}:`, error);
              return {
                url: extractedUrl,
                isRisky: false,
                riskScore: 0,
                riskLevel: "low" as const,
                summary: "Unable to analyze this URL",
                recommendations: [],
              };
            }
          })
        );
        extractedUrlAnalyses = urlAnalyses;
      }

      const response: CheckLinkResponse = {
        originalUrl: url,
        isTelegram: true,
        telegramData: {
          channelName: telegramData.channelName,
          postId: telegramData.postId,
          text: telegramData.text,
          extractedUrls: telegramData.urls,
        },
        analysis: {
          url,
          isRisky: mainAnalysis.isRisky,
          riskScore: mainAnalysis.riskScore,
          riskLevel: mainAnalysis.riskLevel,
          summary: mainAnalysis.summary,
          recommendations: mainAnalysis.recommendations,
        },
        extractedUrlAnalyses,
        timestamp: new Date().toISOString(),
      };

      return NextResponse.json(response);
    } else {
      const analysis = await analyzeLink(url);

      const response: CheckLinkResponse = {
        originalUrl: url,
        isTelegram: false,
        analysis: {
          url,
          isRisky: analysis.isRisky,
          riskScore: analysis.riskScore,
          riskLevel: analysis.riskLevel,
          summary: analysis.summary,
          recommendations: analysis.recommendations,
        },
        timestamp: new Date().toISOString(),
      };

      return NextResponse.json(response);
    }
  } catch (error) {
    console.error("Error checking link:", error);
    return NextResponse.json(
      { error: "Failed to analyze link", details: String(error) },
      { status: 500 }
    );
  }
}
