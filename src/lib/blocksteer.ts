interface BlockSteerAuthResponse {
  access_token: string;
  token_type: string;
}

interface BlockSteerChatResponse {
  response: string;
  risk_score: number | null;
  recommendations: string[];
  follow_up_questions: string[];
  intent: string;
  entities_analyzed: string[];
  confidence: number;
  metadata: Record<string, unknown>;
  timestamp: string;
}

interface RiskAnalysis {
  isRisky: boolean;
  riskScore: number;
  riskLevel: "low" | "medium" | "high" | "critical";
  summary: string;
  recommendations: string[];
  details: string;
}

class BlockSteerClient {
  private apiUrl: string;
  private username: string;
  private password: string;
  private accessToken: string | null = null;
  private tokenExpiry: number = 0;

  constructor() {
    this.apiUrl = process.env.BLOCKSTEER_API_URL || "https://blocksteer.com/api/v1";
    this.username = process.env.BLOCKSTEER_USERNAME || "";
    this.password = process.env.BLOCKSTEER_PASSWORD || "";
  }

  private async authenticate(): Promise<string> {
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    const response = await fetch(`${this.apiUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        username: this.username,
        password: this.password,
      }),
    });

    if (!response.ok) {
      throw new Error(`BlockSteer authentication failed: ${response.status}`);
    }

    const data: BlockSteerAuthResponse = await response.json();
    this.accessToken = data.access_token;
    this.tokenExpiry = Date.now() + 25 * 60 * 1000;

    return this.accessToken;
  }

  async analyzeLink(url: string): Promise<RiskAnalysis> {
    const token = await this.authenticate();

    const response = await fetch(`${this.apiUrl}/agent/chat`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `Please analyze this link for potential scams or security risks: ${url}`,
      }),
    });

    if (!response.ok) {
      throw new Error(`BlockSteer analysis failed: ${response.status}`);
    }

    const data: BlockSteerChatResponse = await response.json();
    return this.parseRiskAnalysis(data);
  }

  async analyzeWalletAddress(address: string): Promise<RiskAnalysis> {
    const token = await this.authenticate();

    const response = await fetch(`${this.apiUrl}/agent/chat`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `Please analyze this cryptocurrency wallet address for potential scams, fraud, or association with known malicious activity: ${address}`,
      }),
    });

    if (!response.ok) {
      throw new Error(`BlockSteer analysis failed: ${response.status}`);
    }

    const data: BlockSteerChatResponse = await response.json();
    return this.parseRiskAnalysis(data);
  }

  async analyzeTelegramPost(telegramUrl: string): Promise<RiskAnalysis> {
    const token = await this.authenticate();

    const response = await fetch(`${this.apiUrl}/agent/chat`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: `Please analyze this Telegram post for potential investment scams, fraud, or security risks: ${telegramUrl}`,
      }),
    });

    if (!response.ok) {
      throw new Error(`BlockSteer analysis failed: ${response.status}`);
    }

    const data: BlockSteerChatResponse = await response.json();
    return this.parseRiskAnalysis(data);
  }

  private parseRiskAnalysis(data: BlockSteerChatResponse): RiskAnalysis {
    const riskScore = data.risk_score ?? 0;
    
    let riskLevel: RiskAnalysis["riskLevel"];
    if (riskScore >= 80) {
      riskLevel = "critical";
    } else if (riskScore >= 60) {
      riskLevel = "high";
    } else if (riskScore >= 40) {
      riskLevel = "medium";
    } else {
      riskLevel = "low";
    }

    return {
      isRisky: riskScore >= 50,
      riskScore,
      riskLevel,
      summary: this.extractSummary(data.response),
      recommendations: data.recommendations,
      details: data.response,
    };
  }

  private extractSummary(response: string): string {
    const lines = response.split("\n").filter(line => line.trim());
    if (lines.length > 0) {
      const firstLine = lines[0].replace(/^[#*\-]+\s*/, "").trim();
      return firstLine.length > 200 ? firstLine.substring(0, 200) + "..." : firstLine;
    }
    return "Analysis complete";
  }
}

export const blocksteerClient = new BlockSteerClient();

export async function analyzeLink(url: string): Promise<RiskAnalysis> {
  return blocksteerClient.analyzeLink(url);
}

export async function analyzeTelegramPost(telegramUrl: string): Promise<RiskAnalysis> {
  return blocksteerClient.analyzeTelegramPost(telegramUrl);
}

export function isTelegramUrl(url: string): boolean {
  return /^https?:\/\/(t\.me|telegram\.me)\//i.test(url);
}

export async function analyzeWalletAddress(address: string): Promise<RiskAnalysis> {
  return blocksteerClient.analyzeWalletAddress(address);
}

export function extractTelegramUrls(text: string): string[] {
  const regex = /https?:\/\/(t\.me|telegram\.me)\/[^\s]+/gi;
  return text.match(regex) || [];
}

/**
 * Extract crypto wallet addresses from text.
 * Supports: Ethereum (0x...), Bitcoin (1..., 3..., bc1...), Solana (base58 32-44 chars)
 */
export function extractWalletAddresses(text: string): { address: string; type: string }[] {
  const wallets: { address: string; type: string }[] = [];

  // Ethereum addresses: 0x followed by 40 hex chars
  const ethRegex = /\b(0x[a-fA-F0-9]{40})\b/g;
  let match;
  while ((match = ethRegex.exec(text)) !== null) {
    wallets.push({ address: match[1], type: "Ethereum" });
  }

  // Bitcoin Legacy (1...) and P2SH (3...): base58, 25-34 chars
  const btcLegacyRegex = /\b([13][a-km-zA-HJ-NP-Z1-9]{24,33})\b/g;
  while ((match = btcLegacyRegex.exec(text)) !== null) {
    // Filter out common false positives (words/numbers that happen to match)
    if (match[1].length >= 26) {
      wallets.push({ address: match[1], type: "Bitcoin" });
    }
  }

  // Bitcoin Bech32 (bc1...): lowercase, 39-62 chars
  const btcBech32Regex = /\b(bc1[a-z0-9]{38,61})\b/g;
  while ((match = btcBech32Regex.exec(text)) !== null) {
    wallets.push({ address: match[1], type: "Bitcoin" });
  }

  return wallets;
}
