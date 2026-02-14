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

export function extractTelegramUrls(text: string): string[] {
  const regex = /https?:\/\/(t\.me|telegram\.me)\/[^\s]+/gi;
  return text.match(regex) || [];
}
