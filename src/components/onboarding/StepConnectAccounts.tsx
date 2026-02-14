"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import Toggle from "@/components/ui/Toggle";
import { BrokerageAccount, BankAccount, InvestmentAccount, RetirementInfo } from "@/types/profile";

const BROKERAGES = [
  { value: "Fidelity", label: "Fidelity" },
  { value: "Charles Schwab", label: "Charles Schwab" },
  { value: "Vanguard", label: "Vanguard" },
  { value: "TD Ameritrade", label: "TD Ameritrade" },
  { value: "E-Trade", label: "E-Trade" },
  { value: "Robinhood", label: "Robinhood" },
  { value: "Other", label: "Other" },
];

const BROKERAGE_TYPES = [
  { value: "Individual Brokerage", label: "Individual Brokerage" },
  { value: "Joint Brokerage", label: "Joint Brokerage" },
  { value: "Margin Account", label: "Margin Account" },
];

const BANKS = [
  { value: "Chase", label: "Chase" },
  { value: "Bank of America", label: "Bank of America" },
  { value: "Wells Fargo", label: "Wells Fargo" },
  { value: "Citibank", label: "Citibank" },
  { value: "Capital One", label: "Capital One" },
  { value: "Ally Bank", label: "Ally Bank" },
  { value: "Marcus by Goldman Sachs", label: "Marcus by Goldman Sachs" },
  { value: "Other", label: "Other" },
];

const CRYPTO_PLATFORMS = [
  { value: "Coinbase", label: "Coinbase" },
  { value: "Binance", label: "Binance" },
  { value: "Kraken", label: "Kraken" },
  { value: "Gemini", label: "Gemini" },
  { value: "Wealthfront", label: "Wealthfront" },
  { value: "Betterment", label: "Betterment" },
  { value: "Other", label: "Other" },
];

interface Props {
  brokerageAccounts: BrokerageAccount[];
  bankAccounts: BankAccount[];
  investments: InvestmentAccount[];
  retirement: RetirementInfo;
  onChangeBrokerage: (data: BrokerageAccount[]) => void;
  onChangeBank: (data: BankAccount[]) => void;
  onChangeInvestments: (data: InvestmentAccount[]) => void;
  onChangeRetirement: (data: RetirementInfo) => void;
  onNext: () => void;
  onBack: () => void;
}

function RemoveButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="absolute top-3 right-3 text-text-secondary hover:text-red-500 transition-colors"
      aria-label="Remove"
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  );
}

function AddButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full py-2.5 border-2 border-dashed border-border rounded-lg text-sm text-text-secondary hover:border-accent hover:text-accent transition-colors"
    >
      {"+ " + label}
    </button>
  );
}

function CategoryHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="pb-2 border-b border-border">
      <h3 className="text-base font-semibold font-serif text-heading">{title}</h3>
      <p className="text-xs text-text-secondary mt-0.5">{subtitle}</p>
    </div>
  );
}

export default function StepConnectAccounts({
  brokerageAccounts,
  bankAccounts,
  investments,
  retirement,
  onChangeBrokerage,
  onChangeBank,
  onChangeInvestments,
  onChangeRetirement,
  onNext,
  onBack,
}: Props) {
  const [openSection, setOpenSection] = useState<string | null>("banking");

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold font-serif text-heading">Connect Your Accounts</h2>
        <p className="text-sm text-text-secondary mt-1 leading-relaxed">
          Add your financial accounts so we can give you the best advice. All sections are optional.
        </p>
      </div>

      <div className="space-y-3">
        {/* Banking Section */}
        <div className="border border-border rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection("banking")}
            className="w-full flex items-center justify-between p-4 hover:bg-accent-light/30 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-accent-light flex items-center justify-center">
                <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <div>
                <span className="text-sm font-medium text-foreground">Banking</span>
                {bankAccounts.length > 0 && (
                  <span className="text-xs text-text-secondary ml-2">
                    {"(" + bankAccounts.length + " added)"}
                  </span>
                )}
              </div>
            </div>
            <svg
              className={`w-4 h-4 text-text-secondary transition-transform ${openSection === "banking" ? "rotate-180" : ""}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {openSection === "banking" && (
            <div className="px-4 pb-4 space-y-3">
              {bankAccounts.map((account, i) => (
                <div key={i} className="p-3 border border-border rounded-lg space-y-3 relative">
                  <RemoveButton onClick={() => onChangeBank(bankAccounts.filter((_, idx) => idx !== i))} />
                  <Select label="Bank" options={BANKS} value={account.bank} onChange={(e) => {
                    const updated = [...bankAccounts]; updated[i] = { ...updated[i], bank: e.target.value }; onChangeBank(updated);
                  }} />
                  <Select label="Account Type" options={[{ value: "checking", label: "Checking" }, { value: "savings", label: "Savings" }]} value={account.accountType} onChange={(e) => {
                    const updated = [...bankAccounts]; updated[i] = { ...updated[i], accountType: e.target.value as "checking" | "savings" }; onChangeBank(updated);
                  }} />
                  <Input label="Balance ($)" type="number" placeholder="0" value={account.balance || ""} onChange={(e) => {
                    const updated = [...bankAccounts]; updated[i] = { ...updated[i], balance: parseInt(e.target.value) || 0 }; onChangeBank(updated);
                  }} />
                </div>
              ))}
              <AddButton label="Add Bank Account" onClick={() => onChangeBank([...bankAccounts, { bank: "", accountType: "checking", balance: 0 }])} />
            </div>
          )}
        </div>

        {/* Brokerage Section */}
        <div className="border border-border rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection("brokerage")}
            className="w-full flex items-center justify-between p-4 hover:bg-accent-light/30 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-accent-light flex items-center justify-center">
                <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div>
                <span className="text-sm font-medium text-foreground">Brokerage</span>
                {brokerageAccounts.length > 0 && (
                  <span className="text-xs text-text-secondary ml-2">
                    {"(" + brokerageAccounts.length + " added)"}
                  </span>
                )}
              </div>
            </div>
            <svg
              className={`w-4 h-4 text-text-secondary transition-transform ${openSection === "brokerage" ? "rotate-180" : ""}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {openSection === "brokerage" && (
            <div className="px-4 pb-4 space-y-3">
              {brokerageAccounts.map((account, i) => (
                <div key={i} className="p-3 border border-border rounded-lg space-y-3 relative">
                  <RemoveButton onClick={() => onChangeBrokerage(brokerageAccounts.filter((_, idx) => idx !== i))} />
                  <Select label="Provider" options={BROKERAGES} value={account.provider} onChange={(e) => {
                    const updated = [...brokerageAccounts]; updated[i] = { ...updated[i], provider: e.target.value }; onChangeBrokerage(updated);
                  }} />
                  <Select label="Account Type" options={BROKERAGE_TYPES} value={account.accountType} onChange={(e) => {
                    const updated = [...brokerageAccounts]; updated[i] = { ...updated[i], accountType: e.target.value }; onChangeBrokerage(updated);
                  }} />
                  <Input label="Balance ($)" type="number" placeholder="0" value={account.balance || ""} onChange={(e) => {
                    const updated = [...brokerageAccounts]; updated[i] = { ...updated[i], balance: parseInt(e.target.value) || 0 }; onChangeBrokerage(updated);
                  }} />
                </div>
              ))}
              <AddButton label="Add Brokerage Account" onClick={() => onChangeBrokerage([...brokerageAccounts, { provider: "", accountType: "", balance: 0 }])} />
            </div>
          )}
        </div>

        {/* Retirement Section */}
        <div className="border border-border rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection("retirement")}
            className="w-full flex items-center justify-between p-4 hover:bg-accent-light/30 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-accent-light flex items-center justify-center">
                <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <span className="text-sm font-medium text-foreground">Retirement</span>
                {(retirement.has401k || retirement.hasRothIRA) && (
                  <span className="text-xs text-text-secondary ml-2">(configured)</span>
                )}
              </div>
            </div>
            <svg
              className={`w-4 h-4 text-text-secondary transition-transform ${openSection === "retirement" ? "rotate-180" : ""}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {openSection === "retirement" && (
            <div className="px-4 pb-4 space-y-4">
              <div className="p-3 border border-border rounded-lg space-y-3">
                <Toggle label="I have a 401(k)" enabled={retirement.has401k} onChange={(v) => onChangeRetirement({ ...retirement, has401k: v })} />
                {retirement.has401k && (
                  <div className="space-y-3 pl-3 border-l-2 border-accent-light ml-1">
                    <Input label="Provider" placeholder="e.g., Fidelity" value={retirement.provider401k} onChange={(e) => onChangeRetirement({ ...retirement, provider401k: e.target.value })} />
                    <Input label="Balance ($)" type="number" placeholder="0" value={retirement.balance401k || ""} onChange={(e) => onChangeRetirement({ ...retirement, balance401k: parseInt(e.target.value) || 0 })} />
                    <Input label="Employer Match (%)" type="number" placeholder="4" value={retirement.employerMatch || ""} onChange={(e) => onChangeRetirement({ ...retirement, employerMatch: parseFloat(e.target.value) || 0 })} />
                  </div>
                )}
              </div>
              <div className="p-3 border border-border rounded-lg space-y-3">
                <Toggle label="I have a Roth IRA" enabled={retirement.hasRothIRA} onChange={(v) => onChangeRetirement({ ...retirement, hasRothIRA: v })} />
                {retirement.hasRothIRA && (
                  <div className="space-y-3 pl-3 border-l-2 border-accent-light ml-1">
                    <Input label="Provider" placeholder="e.g., Charles Schwab" value={retirement.providerRothIRA} onChange={(e) => onChangeRetirement({ ...retirement, providerRothIRA: e.target.value })} />
                    <Input label="Balance ($)" type="number" placeholder="0" value={retirement.balanceRothIRA || ""} onChange={(e) => onChangeRetirement({ ...retirement, balanceRothIRA: parseInt(e.target.value) || 0 })} />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Crypto & Investments Section */}
        <div className="border border-border rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection("crypto")}
            className="w-full flex items-center justify-between p-4 hover:bg-accent-light/30 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-accent-light flex items-center justify-center">
                <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div>
                <span className="text-sm font-medium text-foreground">Crypto & Investments</span>
                {investments.length > 0 && (
                  <span className="text-xs text-text-secondary ml-2">
                    {"(" + investments.length + " added)"}
                  </span>
                )}
              </div>
            </div>
            <svg
              className={`w-4 h-4 text-text-secondary transition-transform ${openSection === "crypto" ? "rotate-180" : ""}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {openSection === "crypto" && (
            <div className="px-4 pb-4 space-y-3">
              {investments.map((account, i) => (
                <div key={i} className="p-3 border border-border rounded-lg space-y-3 relative">
                  <RemoveButton onClick={() => onChangeInvestments(investments.filter((_, idx) => idx !== i))} />
                  <Select label="Platform" options={CRYPTO_PLATFORMS} value={account.platform} onChange={(e) => {
                    const updated = [...investments]; updated[i] = { ...updated[i], platform: e.target.value }; onChangeInvestments(updated);
                  }} />
                  <Input label="Holdings" placeholder="e.g., ETH (~$2,000), BTC (~$1,000)" value={account.holdings} onChange={(e) => {
                    const updated = [...investments]; updated[i] = { ...updated[i], holdings: e.target.value }; onChangeInvestments(updated);
                  }} />
                  <Input label="Total Value ($)" type="number" placeholder="0" value={account.balance || ""} onChange={(e) => {
                    const updated = [...investments]; updated[i] = { ...updated[i], balance: parseInt(e.target.value) || 0 }; onChangeInvestments(updated);
                  }} />
                </div>
              ))}
              <AddButton label="Add Investment Account" onClick={() => onChangeInvestments([...investments, { platform: "", holdings: "", balance: 0 }])} />
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button variant="secondary" onClick={onBack} className="flex-1" size="lg">
          Back
        </Button>
        <Button onClick={onNext} className="flex-1" size="lg">
          Continue
        </Button>
      </div>
    </div>
  );
}
