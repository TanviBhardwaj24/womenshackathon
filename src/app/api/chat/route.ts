import { NextRequest } from "next/server";
import { buildSystemPrompt } from "@/lib/system-prompt";
import { UserProfile } from "@/types/profile";
import { extractTelegramUrls, analyzeTelegramPost, analyzeLink, analyzeWalletAddress, extractWalletAddresses } from "@/lib/blocksteer";
import { extractWalletAddressesViaBem } from "@/lib/bem";

export async function POST(req: NextRequest) {
  const { messages, userProfile } = (await req.json()) as {
    messages: { role: string; content: string }[];
    userProfile: UserProfile;
  };

  const lastMessage = messages[messages.length - 1]?.content || "";
  const telegramUrls = extractTelegramUrls(lastMessage);

  if (telegramUrls.length > 0) {
    return handleTelegramLinkCheck(telegramUrls, userProfile);
  }

  // Check for crypto wallet addresses using BEM extraction + BlockSteer analysis
  const walletAddresses = extractWalletAddresses(lastMessage);
  if (walletAddresses.length > 0) {
    return handleWalletAddressCheck(lastMessage, walletAddresses, userProfile);
  }

  const apiKey = process.env.MINIMAX_API_KEY;
  if (!apiKey || apiKey === "your_minimax_api_key_here") {
    return mockStreamResponse(lastMessage, userProfile);
  }

  const systemPrompt = buildSystemPrompt(userProfile);

  const response = await fetch("https://api.minimaxi.chat/v1/text/chatcompletion_v2", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "MiniMax-Text-01",
      messages: [{ role: "system", content: systemPrompt }, ...messages],
      stream: true,
      temperature: 0.7,
      max_tokens: 1024,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error("MiniMax API error:", error);
    return mockStreamResponse(lastMessage, userProfile);
  }

  const stream = new ReadableStream({
    async start(controller) {
      const reader = response.body?.getReader();
      if (!reader) {
        controller.close();
        return;
      }
      const encoder = new TextEncoder();
      const decoder = new TextDecoder();
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          controller.enqueue(encoder.encode(decoder.decode(value, { stream: true })));
        }
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

async function handleTelegramLinkCheck(urls: string[], profile: UserProfile) {
  const name = profile.personalInfo.name || "sis";
  const firstName = name.split(" ")[0];

  let responseText = `Hey ${firstName}! I noticed you shared a Telegram link. Let me check it for potential scams...\n\n`;

  try {
    for (const url of urls.slice(0, 3)) {
      const analysis = await analyzeTelegramPost(url);
      
      const riskEmoji = analysis.riskLevel === "critical" ? "🚨" :
                        analysis.riskLevel === "high" ? "⚠️" :
                        analysis.riskLevel === "medium" ? "⚡" : "✅";

      responseText += `**${riskEmoji} Link: ${url}**\n`;
      responseText += `Risk Level: ${analysis.riskLevel.toUpperCase()} (Score: ${analysis.riskScore}/100)\n\n`;
      
      if (analysis.isRisky) {
        responseText += `**Warning:** ${analysis.summary}\n\n`;
        if (analysis.recommendations.length > 0) {
          responseText += "**My advice:**\n";
          analysis.recommendations.slice(0, 3).forEach((rec, i) => {
            responseText += `${i + 1}. ${rec}\n`;
          });
          responseText += "\n";
        }
      } else {
        responseText += `This link appears to be relatively safe, but always stay cautious with investment-related content!\n\n`;
      }
    }

    responseText += `---\n\n*Remember ${firstName}, if something sounds too good to be true, it usually is. Never share your private keys or seed phrases, and always verify investment opportunities through official channels. I'm here to help keep you safe!*`;

  } catch (error) {
    console.error("BlockSteer analysis error:", error);
    responseText += `I wasn't able to fully analyze this link right now, but here are some general safety tips:\n\n`;
    responseText += `1. **Never share your private keys or seed phrases** — no legitimate service will ask for these\n`;
    responseText += `2. **Be wary of guaranteed returns** — legitimate investments always carry risk\n`;
    responseText += `3. **Verify through official channels** — check the official website or social media\n`;
    responseText += `4. **Take your time** — scammers create urgency to prevent you from thinking clearly\n\n`;
    responseText += `*Stay safe out there, sis!*`;
  }

  return streamResponse(responseText);
}

async function handleWalletAddressCheck(
  originalMessage: string,
  walletAddresses: { address: string; type: string }[],
  profile: UserProfile
) {
  const name = profile.personalInfo.name || "sis";
  const firstName = name.split(" ")[0];

  let responseText = `Hey ${firstName}! 🔍 I detected crypto wallet address(es) in your message. Let me run a safety check...\n\n`;

  try {
    // Use BEM to extract and analyze the context of the wallet addresses
    const bemAnalysis = await extractWalletAddressesViaBem(originalMessage);
    console.log("BEM wallet extraction result:", JSON.stringify(bemAnalysis, null, 2));

    if (bemAnalysis.has_suspicious_context) {
      responseText += `⚠️ **Suspicious Context Detected:** ${bemAnalysis.message_summary}\n\n`;
      responseText += `The message you shared has red flags — it appears to be asking you to send cryptocurrency, which is a common scam tactic.\n\n`;
    }

    // Analyze each wallet address through BlockSteer
    for (const wallet of walletAddresses.slice(0, 3)) {
      try {
        const analysis = await analyzeWalletAddress(wallet.address);

        const riskEmoji =
          analysis.riskLevel === "critical" ? "🚨" :
          analysis.riskLevel === "high" ? "⚠️" :
          analysis.riskLevel === "medium" ? "⚡" : "✅";

        responseText += `**${riskEmoji} ${wallet.type} Address:** \`${wallet.address}\`\n`;
        responseText += `**Risk Level:** ${analysis.riskLevel.toUpperCase()} (Score: ${analysis.riskScore}/100)\n\n`;

        if (analysis.isRisky) {
          responseText += `**🚫 Warning:** ${analysis.summary}\n\n`;
          if (analysis.recommendations.length > 0) {
            responseText += "**What you should do:**\n";
            analysis.recommendations.slice(0, 3).forEach((rec, i) => {
              responseText += `${i + 1}. ${rec}\n`;
            });
            responseText += "\n";
          }
        } else {
          responseText += `This address doesn't appear in known scam databases, but please still exercise caution.\n\n`;
        }
      } catch (error) {
        console.error(`Error analyzing wallet ${wallet.address}:`, error);
        responseText += `**⚠️ ${wallet.type} Address:** \`${wallet.address}\`\n`;
        responseText += `Unable to fully verify this address at the moment. Please proceed with extreme caution.\n\n`;
      }
    }

    // Add contextual safety advice
    responseText += `---\n\n`;
    responseText += `**💡 ${firstName}'s Safety Checklist:**\n`;
    responseText += `1. **Never send crypto to addresses you received in unsolicited messages** — legitimate projects don't ask for this\n`;
    responseText += `2. **"Send X to receive Y" is ALWAYS a scam** — no one gives away free coins for ETH/BTC\n`;
    responseText += `3. **Verify on Etherscan/blockchain explorers** — check the address history before any transaction\n`;
    responseText += `4. **When in doubt, don't send** — you can always ask me to check!\n\n`;
    responseText += `*I'm here to keep you safe, sis! Always feel free to run any suspicious addresses or messages by me before taking action.* 💜`;

  } catch (error) {
    console.error("Wallet analysis error:", error);
    responseText += `I wasn't able to fully analyze the wallet address(es) right now, but here's my advice:\n\n`;
    responseText += `🚨 **If someone is asking you to send crypto to this address, it is very likely a scam.**\n\n`;
    responseText += `1. **Never send crypto to unknown addresses** — especially if promised something in return\n`;
    responseText += `2. **No legitimate project asks you to send crypto via chat/DMs**\n`;
    responseText += `3. **Verify the source** — check official project websites and social media\n`;
    responseText += `4. **If it sounds too good to be true, it is**\n\n`;
    responseText += `*Stay safe out there, ${firstName}! I'm always here to help.* 💜`;
  }

  return streamResponse(responseText);
}

function streamResponse(text: string) {
  const encoder = new TextEncoder();
  const words = text.split(" ");
  const stream = new ReadableStream({
    async start(controller) {
      for (let i = 0; i < words.length; i++) {
        const word = (i === 0 ? "" : " ") + words[i];
        const chunk = JSON.stringify({
          choices: [{ delta: { content: word } }],
        });
        controller.enqueue(encoder.encode(`data: ${chunk}\n\n`));
        await new Promise((r) => setTimeout(r, 20));
      }
      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

function mockStreamResponse(userMessage: string, profile: UserProfile) {
  const name = profile.personalInfo.name || "sis";
  const firstName = name.split(" ")[0];

  let response: string;
  const lower = userMessage.toLowerCase();

  if (lower.includes("portfolio") || lower.includes("how") && lower.includes("look")) {
    const totalAssets =
      profile.brokerageAccounts.reduce((s, a) => s + a.balance, 0) +
      (profile.retirement.has401k ? profile.retirement.balance401k : 0) +
      (profile.retirement.hasRothIRA ? profile.retirement.balanceRothIRA : 0) +
      profile.bankAccounts.reduce((s, a) => s + a.balance, 0) +
      profile.investments.reduce((s, a) => s + a.balance, 0);
    const totalDebt = profile.debts.reduce((s, d) => s + d.remainingBalance, 0);

    response = `Hey ${firstName}! I'm so proud of you for taking charge of your finances. Let me break down where you stand.\n\nYour total assets come to about $${totalAssets.toLocaleString()}, and you have $${totalDebt.toLocaleString()} in debt, giving you a net worth of around $${(totalAssets - totalDebt).toLocaleString()}. For a ${profile.personalInfo.age}-year-old, that's a solid foundation!\n\n${
      profile.retirement.has401k
        ? `Your 401(k) at ${profile.retirement.provider401k} with $${profile.retirement.balance401k.toLocaleString()} is great, especially with that ${profile.retirement.employerMatch}% employer match — make sure you're contributing at least enough to get the full match, that's literally free money!`
        : "I'd love to see you get started with a 401(k) if your employer offers one — the tax advantages are huge."
    }\n\nOne thing I'd suggest: your savings account has a nice cushion, but you might want to look into a high-yield savings account if you haven't already. The difference in interest can really add up over time!\n\n*Note: I'm here to share knowledge, not licensed financial advice. Always good to double-check with a certified financial planner for big decisions!*`;
  } else if (lower.includes("invest") || lower.includes("next")) {
    response = `Great question, ${firstName}! Based on your profile, here are a few ideas I'd explore:\n\n**1. Max out your Roth IRA** — ${
      profile.retirement.hasRothIRA
        ? `You have $${profile.retirement.balanceRothIRA.toLocaleString()} in there. The annual limit is $7,000 for 2024. Since you're in a high tax bracket with your $${profile.personalInfo.annualIncome.toLocaleString()} salary, Roth contributions now mean tax-free growth forever!`
        : "Opening a Roth IRA should be your first move. Tax-free growth is incredible at your age."
    }\n\n**2. Consider index funds** — If you're not already invested in broad market index funds (like VTI or VXUS), they're a fantastic low-cost way to build wealth. Simple, diversified, and historically strong returns.\n\n**3. Build your emergency fund** — Financial planners typically recommend 3-6 months of expenses. Living in San Francisco, I'd lean toward 6 months given the higher cost of living.\n\n${
      profile.debts.length > 0
        ? `**4. Tackle that debt strategically** — With your ${profile.debts[0].type.toLowerCase()} at ${profile.debts[0].interestRate}%, you could consider paying a bit extra each month while still investing. It's a balance, but getting debt-free sooner gives you so much more flexibility.`
        : ""
    }\n\nWant me to dive deeper into any of these?`;
  } else if (lower.includes("retire") || lower.includes("retirement")) {
    response = `Let's talk retirement planning, ${firstName}! At ${profile.personalInfo.age}, you're in a fantastic position because time is your biggest asset.\n\n**The power of compound growth** — If you consistently invest and let your money grow, here's the exciting part: even modest contributions now can grow significantly by the time you're 60-65.\n\n**What I'd focus on:**\n- Make sure you're getting your full employer 401(k) match (that's an immediate 100% return!)\n- Try to max out your Roth IRA annually ($7,000/year)\n- Consider increasing your 401(k) contributions by 1% each year\n\n${
      profile.retirement.has401k
        ? `With $${profile.retirement.balance401k.toLocaleString()} in your 401(k) already, you're ahead of many people your age. Keep it up!`
        : ""
    }\n\nThe general rule of thumb is to aim for 1x your salary saved by 30, 3x by 40, and so on. You're tracking well!\n\n*Remember, I'm sharing general knowledge — for a personalized retirement plan, a certified financial planner can help model different scenarios for you.*`;
  } else if (lower.includes("loan") || lower.includes("debt") || lower.includes("student")) {
    response = `Let's tackle that debt together, ${firstName}! ${
      profile.debts.length > 0
        ? `You have $${profile.debts[0].remainingBalance.toLocaleString()} in ${profile.debts[0].type.toLowerCase()} at ${profile.debts[0].interestRate}% APR.`
        : "It looks like you don't have any debts listed — that's amazing!"
    }\n\n${
      profile.debts.length > 0
        ? `**Here's what I'd consider:**\n\n1. **The math approach** — At ${profile.debts[0].interestRate}% interest, this is relatively low-rate debt. You could keep making regular payments while investing the difference in your Roth IRA or brokerage, where you'd likely earn more than ${profile.debts[0].interestRate}% over time.\n\n2. **The peace-of-mind approach** — If that debt is stressing you out, there's real value in paying it off faster. You could add an extra $500-1000/month from your income and be done in about ${Math.ceil(profile.debts[0].remainingBalance / 1000)} months.\n\n3. **Check for refinancing** — Depending on your credit score, you might be able to refinance to an even lower rate.\n\nPersonally? I'd lean toward a hybrid approach — pay a little extra on the loans while still investing. But go with what lets you sleep best at night!`
        : "Since you're debt-free, you can put that extra money to work! Focus on building your investment portfolio and emergency fund."
    }`;
  } else if (lower.includes("scam") || lower.includes("safe") || lower.includes("legit")) {
    response = `Great question about staying safe, ${firstName}! Here's what I always tell my friends about avoiding scams:\n\n**Red flags to watch for:**\n1. **Guaranteed returns** — No legitimate investment can promise specific returns\n2. **Pressure to act fast** — Scammers create urgency so you don't have time to think\n3. **Requests for private keys or seed phrases** — NEVER share these with anyone\n4. **Too good to be true** — If it sounds amazing, it probably isn't real\n\n**How to verify:**\n- Check the official website directly (don't click links in messages)\n- Look up the project on trusted sources like CoinGecko or CoinMarketCap\n- Search for reviews and scam reports\n- Ask in trusted community forums\n\n**Pro tip:** You can paste any Telegram link here and I'll check it for you using BlockSteer's scam detection!\n\n*Stay vigilant, sis! Your financial security is worth protecting.*`;
  } else {
    response = `Hey ${firstName}! That's a great question. Let me share my thoughts.\n\nAs someone earning $${profile.personalInfo.annualIncome.toLocaleString()}/year in ${profile.personalInfo.location}, you're in a strong position. The key is making your money work as hard as you do.\n\nHere are the big things I always think about:\n\n1. **Are you maximizing tax-advantaged accounts?** (401k, Roth IRA)\n2. **Do you have 3-6 months of expenses saved?** (Emergency fund)\n3. **Is your money sitting idle or growing?** (Investing vs. just saving)\n4. **Are you managing debt strategically?**\n\n**New feature:** If you ever come across a suspicious Telegram link or investment opportunity, just paste it here and I'll check if it's a scam!\n\nFeel free to ask me about any of these topics specifically, or anything else on your mind! I'm here for you, sis.\n\n*Quick reminder: I'm here to help you learn and think through options, but I'm not a licensed financial advisor. For major financial decisions, it's always smart to consult with a certified financial planner.*`;
  }

  return streamResponse(response);
}
