import { CollectionItem } from "./bem";

/**
 * Pre-built knowledge base items for the BEM collection.
 * These represent extracted content from crypto whitepapers and resources.
 *
 * To replace with your own data:
 * 1. Replace these items with your own content + metadata
 * 2. Set metadata.source to the URL you want cited
 * 3. Set metadata.title for display
 * 4. Each item's "content" is what gets semantically searched
 */
export const COLLECTION_NAME = "didi_crypto_knowledge";

export const SEED_ITEMS: CollectionItem[] = [
  // ─── Ethereum ──────────────────────────────────────────────
  {
    content:
      "Ethereum is a decentralized platform that enables smart contracts and decentralized applications (dApps). It was proposed by Vitalik Buterin in 2013 and launched in 2015. Unlike Bitcoin which is primarily a digital currency, Ethereum is a programmable blockchain that allows developers to build and deploy applications. The native cryptocurrency is called Ether (ETH), used to pay for computation and transaction fees (gas).",
    metadata: {
      source: "https://ethereum.org/en/whitepaper/",
      title: "Ethereum Whitepaper",
      topic: "ethereum",
    },
  },
  {
    content:
      "Ethereum transitioned from Proof of Work to Proof of Stake consensus through 'The Merge' in September 2022. This reduced Ethereum's energy consumption by approximately 99.95%. Validators must stake 32 ETH to participate in block validation. Staking rewards are earned for validating transactions. This made Ethereum significantly more environmentally sustainable and opened up staking as a way to earn passive income on ETH holdings.",
    metadata: {
      source: "https://ethereum.org/en/roadmap/merge/",
      title: "Ethereum — The Merge",
      topic: "ethereum-staking",
    },
  },
  {
    content:
      "EIP-1559 introduced a base fee mechanism for Ethereum transactions that gets burned, making ETH potentially deflationary. When network activity is high, more ETH is burned than is issued as staking rewards. This 'ultrasound money' thesis suggests ETH could decrease in supply over time, unlike inflationary currencies. Since The Merge, the net issuance of ETH has been negative during periods of high network activity.",
    metadata: {
      source: "https://ethereum.org/en/developers/docs/gas/",
      title: "Ethereum Gas and EIP-1559",
      topic: "ethereum-economics",
    },
  },
  {
    content:
      "Ethereum Layer 2 solutions like Arbitrum, Optimism, Base, and zkSync help scale the network by processing transactions off the main chain while inheriting Ethereum's security. L2s can reduce gas fees by 10-100x compared to Ethereum mainnet. The Ethereum roadmap focuses on a 'rollup-centric' future where L2s handle most user activity. For investors, L2 tokens (ARB, OP) represent exposure to Ethereum's scaling ecosystem.",
    metadata: {
      source: "https://ethereum.org/en/layer-2/",
      title: "Ethereum Layer 2 Scaling",
      topic: "ethereum-l2",
    },
  },

  // ─── Bitcoin ───────────────────────────────────────────────
  {
    content:
      "Bitcoin is a peer-to-peer electronic cash system proposed by Satoshi Nakamoto in 2008. It uses a decentralized ledger (blockchain) and Proof of Work consensus. Bitcoin has a fixed supply of 21 million coins, making it deflationary by design. Bitcoin halving events occur approximately every 4 years, cutting the block reward in half. The most recent halving was in April 2024, reducing the reward to 3.125 BTC per block.",
    metadata: {
      source: "https://bitcoin.org/bitcoin.pdf",
      title: "Bitcoin Whitepaper",
      topic: "bitcoin",
    },
  },
  {
    content:
      "Bitcoin ETFs were approved by the SEC in January 2024, allowing traditional investors to gain Bitcoin exposure through regulated investment vehicles. Major providers include BlackRock (iShares Bitcoin Trust - IBIT), Fidelity (Wise Origin Bitcoin Fund - FBTC), and Grayscale (GBTC). Bitcoin ETFs hold actual Bitcoin as their underlying asset and trade on traditional stock exchanges, making Bitcoin accessible through standard brokerage accounts like Schwab or Fidelity.",
    metadata: {
      source: "https://www.sec.gov/news/statement/gensler-statement-spot-bitcoin-011023",
      title: "SEC Bitcoin ETF Approval",
      topic: "bitcoin-etf",
    },
  },

  // ─── DeFi ──────────────────────────────────────────────────
  {
    content:
      "Decentralized Finance (DeFi) refers to financial services built on blockchain networks that operate without traditional intermediaries like banks. Key DeFi protocols include: Uniswap (decentralized exchange), Aave (lending/borrowing), MakerDAO (stablecoin DAI), and Lido (liquid staking). DeFi allows users to earn yield by providing liquidity, lending assets, or staking. However, DeFi carries smart contract risk, impermanent loss risk, and regulatory uncertainty.",
    metadata: {
      source: "https://ethereum.org/en/defi/",
      title: "Introduction to DeFi",
      topic: "defi",
    },
  },
  {
    content:
      "Stablecoins are cryptocurrencies pegged to a stable asset, usually the US dollar. USDC (Circle) and USDT (Tether) are the largest by market cap. USDC is considered more transparent with regular attestations of reserves. Stablecoins are useful for earning yield in DeFi (often 3-8% APY through lending), as an on-ramp/off-ramp between crypto and fiat, and for protecting portfolio value during market downturns without converting to fiat.",
    metadata: {
      source: "https://www.circle.com/en/usdc",
      title: "Understanding Stablecoins",
      topic: "stablecoins",
    },
  },

  // ─── Solana ────────────────────────────────────────────────
  {
    content:
      "Solana is a high-performance blockchain known for fast transaction speeds (~400ms finality) and low fees (fractions of a cent). It uses a unique Proof of History consensus combined with Proof of Stake. Solana's ecosystem has grown significantly with popular DeFi protocols (Jupiter, Raydium), NFT marketplaces (Magic Eden), and consumer applications (Phantom wallet). SOL is used for transaction fees and staking, with staking yields around 6-8% APY.",
    metadata: {
      source: "https://solana.com/solana-whitepaper.pdf",
      title: "Solana Overview",
      topic: "solana",
    },
  },

  // ─── Investment Strategy ───────────────────────────────────
  {
    content:
      "Dollar-cost averaging (DCA) is a popular crypto investment strategy where you invest a fixed amount at regular intervals regardless of price. This reduces the impact of volatility and removes emotional decision-making. For crypto beginners, a common allocation might be: 50-60% Bitcoin, 25-30% Ethereum, and 10-20% in altcoins or stablecoins for yield. Never invest more than you can afford to lose, and consider crypto as 5-15% of your total investment portfolio.",
    metadata: {
      source: "https://www.investopedia.com/terms/d/dollarcostaveraging.asp",
      title: "Dollar-Cost Averaging Strategy",
      topic: "investment-strategy",
    },
  },
  {
    content:
      "Self-custody in crypto means holding your own private keys using hardware wallets (Ledger, Trezor) or software wallets (MetaMask, Phantom). The phrase 'not your keys, not your coins' emphasizes that assets on exchanges (Coinbase, Binance) are technically held by the exchange. For significant holdings ($5,000+), consider a hardware wallet. Always back up your seed phrase securely offline — never store it digitally or share it with anyone. Loss of seed phrase means permanent loss of funds.",
    metadata: {
      source: "https://ethereum.org/en/wallets/",
      title: "Crypto Wallets and Self-Custody",
      topic: "security",
    },
  },
  {
    content:
      "Crypto tax implications: In the US, cryptocurrency is treated as property by the IRS. Selling, trading, or spending crypto triggers a taxable event. Short-term gains (held <1 year) are taxed as ordinary income. Long-term gains (held >1 year) get preferential tax rates (0%, 15%, or 20% depending on income). Staking rewards and DeFi yield are taxed as ordinary income when received. Use tools like CoinTracker or Koinly to track your crypto taxes. Tax-loss harvesting can offset gains.",
    metadata: {
      source: "https://www.irs.gov/individuals/international-taxpayers/frequently-asked-questions-on-virtual-currency-transactions",
      title: "Crypto Tax Guide (US)",
      topic: "taxes",
    },
  },

  // ─── Risk & Security ──────────────────────────────────────
  {
    content:
      "Common crypto scams to watch out for: (1) Phishing sites that mimic legitimate exchanges or wallets, (2) Rug pulls where project creators abandon a project after taking investor funds, (3) Pump and dump schemes on low-cap tokens, (4) Fake airdrops requiring wallet connections to malicious smart contracts, (5) Romance scams directing victims to fake investment platforms. Always verify URLs, never share private keys or seed phrases, and be skeptical of guaranteed returns.",
    metadata: {
      source: "https://www.ftc.gov/news-events/data-visualizations/data-spotlight/2022/06/reports-show-scammers-cashing-crypto-craze",
      title: "Crypto Security and Scam Prevention",
      topic: "security-scams",
    },
  },
];
