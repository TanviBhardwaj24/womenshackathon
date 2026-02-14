export interface PersonalInfo {
  name: string;
  age: number;
  occupation: string;
  location: string;
  annualIncome: number;
}

export interface BrokerageAccount {
  provider: string;
  accountType: string;
  balance: number;
}

export interface RetirementInfo {
  has401k: boolean;
  provider401k: string;
  balance401k: number;
  employerMatch: number;
  hasRothIRA: boolean;
  providerRothIRA: string;
  balanceRothIRA: number;
}

export interface BankAccount {
  bank: string;
  accountType: "checking" | "savings";
  balance: number;
}

export interface InvestmentAccount {
  platform: string;
  holdings: string;
  balance: number;
}

export interface DebtItem {
  type: string;
  provider: string;
  remainingBalance: number;
  interestRate: number;
}

export interface UserProfile {
  personalInfo: PersonalInfo;
  brokerageAccounts: BrokerageAccount[];
  retirement: RetirementInfo;
  bankAccounts: BankAccount[];
  investments: InvestmentAccount[];
  debts: DebtItem[];
}

export const emptyProfile: UserProfile = {
  personalInfo: { name: "", age: 0, occupation: "", location: "", annualIncome: 0 },
  brokerageAccounts: [],
  retirement: {
    has401k: false,
    provider401k: "",
    balance401k: 0,
    employerMatch: 0,
    hasRothIRA: false,
    providerRothIRA: "",
    balanceRothIRA: 0,
  },
  bankAccounts: [],
  investments: [],
  debts: [],
};
