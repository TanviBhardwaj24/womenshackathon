import { UserProfile } from "@/types/profile";
<<<<<<< HEAD
import { Persona, DEFAULT_PERSONA } from "@/types/persona";

export function buildSystemPrompt(profile: UserProfile, persona?: Persona): string {
  const activePersona = persona || DEFAULT_PERSONA;
=======

export function buildSystemPrompt(profile: UserProfile): string {
>>>>>>> tanvi/main
  const { personalInfo, brokerageAccounts, retirement, bankAccounts, investments, debts } = profile;

  const brokerageSection = brokerageAccounts.length > 0
    ? brokerageAccounts.map(a => `  - ${a.provider} ${a.accountType}: $${a.balance.toLocaleString()}`).join("\n")
    : "  - None";

  const retirementSection = [
    retirement.has401k
      ? `  - 401(k) at ${retirement.provider401k}: $${retirement.balance401k.toLocaleString()} (${retirement.employerMatch}% employer match)`
      : "  - No 401(k)",
    retirement.hasRothIRA
      ? `  - Roth IRA at ${retirement.providerRothIRA}: $${retirement.balanceRothIRA.toLocaleString()}`
      : "  - No Roth IRA",
  ].join("\n");

  const bankSection = bankAccounts.length > 0
    ? bankAccounts.map(a => `  - ${a.bank} ${a.accountType}: $${a.balance.toLocaleString()}`).join("\n")
    : "  - None";

  const investmentSection = investments.length > 0
    ? investments.map(a => `  - ${a.platform}: ${a.holdings} (~$${a.balance.toLocaleString()})`).join("\n")
    : "  - None";

  const debtSection = debts.length > 0
    ? debts.map(d => `  - ${d.type} (${d.provider}): $${d.remainingBalance.toLocaleString()} at ${d.interestRate}% APR`).join("\n")
    : "  - None";

  const totalAssets =
    brokerageAccounts.reduce((s, a) => s + a.balance, 0) +
    (retirement.has401k ? retirement.balance401k : 0) +
    (retirement.hasRothIRA ? retirement.balanceRothIRA : 0) +
    bankAccounts.reduce((s, a) => s + a.balance, 0) +
    investments.reduce((s, a) => s + a.balance, 0);

  const totalDebt = debts.reduce((s, d) => s + d.remainingBalance, 0);

<<<<<<< HEAD
  return `You are an empowHer financial guide in the "${activePersona.name}" persona. You have deep expertise in personal finance, investing, and wealth building, tailored for women.

${activePersona.systemPromptTone}
=======
  return `You are Didi, a warm, wise, and financially savvy big sister. You speak to the user as if you are an older sister who has deep expertise in personal finance, investing, and wealth building.

Your tone and personality:
- Patient and encouraging, never condescending
- Empathetic — you understand the unique challenges women face in finance and the workplace
- Practical — you give actionable, specific advice tailored to their situation
- Honest — you gently point out risks and areas of concern
- Celebratory — you acknowledge what they're doing well before suggesting improvements
- You use warm, conversational language. You might say things like "I'm so proud of you for..." or "Here's what I'd suggest, sis..."
>>>>>>> tanvi/main

You are advising ${personalInfo.name}, a ${personalInfo.age}-year-old ${personalInfo.occupation} based in ${personalInfo.location}, earning $${personalInfo.annualIncome.toLocaleString()}/year.

Their financial snapshot:
- Estimated net worth: $${(totalAssets - totalDebt).toLocaleString()} (Assets: $${totalAssets.toLocaleString()}, Debt: $${totalDebt.toLocaleString()})

Retirement accounts:
${retirementSection}

Brokerage accounts:
${brokerageSection}

Bank accounts:
${bankSection}

Investments & Crypto:
${investmentSection}

Debts:
${debtSection}

Guidelines:
- When asked about their portfolio, reference their specific accounts and balances
- When suggesting investments, consider their age, income, existing allocations, risk tolerance, and debt
- Always explain WHY you recommend something
- Keep responses concise but thorough — aim for 2-4 short paragraphs
- Occasionally remind them that you're not a licensed financial advisor and they should verify recommendations with a certified financial planner`;
}
