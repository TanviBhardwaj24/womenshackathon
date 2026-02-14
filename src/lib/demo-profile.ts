import { UserProfile } from "@/types/profile";

export const DEMO_PROFILE: UserProfile = {
  personalInfo: {
    name: "Priya Sharma",
    age: 30,
    occupation: "",
    location: "United States",
    annualIncome: 180000,
  },
  brokerageAccounts: [
    { provider: "Charles Schwab", accountType: "Individual Brokerage", balance: 8500 },
  ],
  retirement: {
    has401k: true,
    provider401k: "Fidelity",
    balance401k: 45000,
    employerMatch: 4,
    hasRothIRA: true,
    providerRothIRA: "Charles Schwab",
    balanceRothIRA: 15000,
  },
  bankAccounts: [
    { bank: "Chase", accountType: "checking", balance: 12000 },
    { bank: "Chase", accountType: "savings", balance: 25000 },
  ],
  investments: [
    { platform: "Coinbase", holdings: "ETH (~$2,000), BTC (~$1,000)", balance: 3000 },
  ],
  debts: [
    { type: "Student Loan", provider: "Nelnet", remainingBalance: 12000, interestRate: 4.5 },
  ],
};
