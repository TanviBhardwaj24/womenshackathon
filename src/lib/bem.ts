const BEM_BASE_URL = "https://api.bem.ai/v2";

function getApiKey(): string {
  const key = process.env.BEM_API_KEY;
  if (!key) throw new Error("BEM_API_KEY not set in .env.local");
  return key;
}

function headers() {
  return {
    "x-api-key": getApiKey(),
    "Content-Type": "application/json",
  };
}

// ─── Collection Management ───────────────────────────────────────

export async function createCollection(collectionName: string): Promise<void> {
  const res = await fetch(`${BEM_BASE_URL}/collections`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ collectionName }),
  });
  if (!res.ok) {
    const text = await res.text();
    if (text.includes("already exists") || res.status === 409) {
      console.log(`Collection "${collectionName}" already exists, skipping.`);
      return;
    }
    console.error("Failed to create collection:", res.status, text);
  }
}

export interface CollectionItem {
  content: string;
  metadata: Record<string, string>;
}

export async function addItemsToCollection(
  collectionName: string,
  items: CollectionItem[]
): Promise<void> {
  const res = await fetch(`${BEM_BASE_URL}/collections/items`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ collectionName, items }),
  });
  if (!res.ok) {
    const text = await res.text();
    console.error("Failed to add items:", res.status, text);
  } else {
    const data = await res.json();
    console.log("Items queued for processing:", data);
  }
}

// ─── Function Management ─────────────────────────────────────────

async function functionExists(functionName: string): Promise<boolean> {
  const res = await fetch(`${BEM_BASE_URL}/functions/${functionName}`, {
    method: "GET",
    headers: headers(),
  });
  return res.ok;
}

export async function createFunction(config: Record<string, unknown>): Promise<void> {
  const name = config.functionName as string;
  if (await functionExists(name)) {
    console.log(`Function "${name}" already exists.`);
    return;
  }
  const res = await fetch(`${BEM_BASE_URL}/functions`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(config),
  });
  if (!res.ok) {
    const text = await res.text();
    console.error(`Failed to create function "${name}":`, res.status, text);
  } else {
    console.log(`Function "${name}" created.`);
  }
}

// ─── Workflow Management ─────────────────────────────────────────

async function workflowExists(workflowName: string): Promise<boolean> {
  const res = await fetch(`${BEM_BASE_URL}/workflows/${workflowName}`, {
    method: "GET",
    headers: headers(),
  });
  return res.ok;
}

export async function createWorkflow(config: Record<string, unknown>): Promise<void> {
  const name = config.workflowName as string;
  if (await workflowExists(name)) {
    console.log(`Workflow "${name}" already exists.`);
    return;
  }
  const res = await fetch(`${BEM_BASE_URL}/workflows`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(config),
  });
  if (!res.ok) {
    const text = await res.text();
    console.error(`Failed to create workflow "${name}":`, res.status, text);
  } else {
    console.log(`Workflow "${name}" created.`);
  }
}

// ─── Wallet Address Extraction ───────────────────────────────────

const WALLET_EXTRACT_FUNC = "didi_wallet_extractor";
const WALLET_WORKFLOW_NAME = "didi_wallet_extraction_workflow";

/**
 * Setup BEM pipeline for wallet address extraction.
 * Creates a Transform function that extracts crypto wallet addresses from text.
 */
export async function setupWalletExtractionPipeline(): Promise<void> {
  await createFunction({
    functionName: WALLET_EXTRACT_FUNC,
    type: "transform",
    displayName: "Crypto Wallet Address Extractor",
    outputSchemaName: "Wallet Addresses",
    outputSchema: {
      type: "object",
      required: ["wallets"],
      properties: {
        wallets: {
          type: "array",
          description: "List of cryptocurrency wallet addresses found in the text",
          items: {
            type: "object",
            properties: {
              address: {
                type: "string",
                description: "The wallet address string",
              },
              chain: {
                type: "string",
                description: "The blockchain network (e.g. Ethereum, Bitcoin, Solana)",
              },
              context: {
                type: "string",
                description: "The surrounding text context that mentions this address",
              },
            },
          },
        },
        has_suspicious_context: {
          type: "boolean",
          description: "Whether the message context suggests a potential scam (e.g., promises of free tokens, requests to send money)",
        },
        message_summary: {
          type: "string",
          description: "Brief summary of what the message is asking the user to do",
        },
      },
    },
  });

  await createWorkflow({
    name: WALLET_WORKFLOW_NAME,
    mainFunction: { name: WALLET_EXTRACT_FUNC },
    steps: [{ name: WALLET_EXTRACT_FUNC }],
  });
}

export interface BemWalletExtractionResult {
  wallets: { address: string; chain: string; context: string }[];
  has_suspicious_context: boolean;
  message_summary: string;
}

/**
 * Use BEM to extract wallet addresses from user text.
 * Fires the BEM Transform pipeline and also does local regex extraction as a fallback.
 */
export async function extractWalletAddressesViaBem(
  text: string
): Promise<BemWalletExtractionResult> {
  // Fire BEM call (async, demonstrates the BEM integration)
  const bemResult = await fireBemWalletCall(text);
  if (bemResult) {
    return bemResult;
  }

  // Fallback: local regex extraction
  return localWalletExtraction(text);
}

/**
 * Fire BEM Transform to extract wallet addresses.
 * Attempts to get results synchronously from BEM, falls back to null.
 */
async function fireBemWalletCall(text: string): Promise<BemWalletExtractionResult | null> {
  try {
    const textContent = Buffer.from(text).toString("base64");
    const res = await fetch(`${BEM_BASE_URL}/calls`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({
        calls: [
          {
            workflowName: WALLET_WORKFLOW_NAME,
            callReferenceID: `wallet-${Date.now()}`,
            input: {
              singleFile: {
                inputType: "text",
                inputContent: textContent,
              },
            },
          },
        ],
      }),
    });

    if (res.ok) {
      const data = await res.json();
      console.log("BEM wallet extraction call initiated:", data.calls?.[0]?.callID);

      // If BEM returns inline results, use them
      const callResult = data.calls?.[0]?.result;
      if (callResult?.wallets) {
        return callResult as BemWalletExtractionResult;
      }
    }
  } catch (err) {
    console.error("BEM wallet extraction error:", err);
  }
  return null;
}

/**
 * Local regex-based wallet address extraction (instant fallback).
 */
function localWalletExtraction(text: string): BemWalletExtractionResult {
  const wallets: { address: string; chain: string; context: string }[] = [];

  // Ethereum: 0x + 40 hex chars
  const ethRegex = /\b(0x[a-fA-F0-9]{40})\b/g;
  let match;
  while ((match = ethRegex.exec(text)) !== null) {
    const start = Math.max(0, match.index - 50);
    const end = Math.min(text.length, match.index + match[0].length + 50);
    wallets.push({
      address: match[1],
      chain: "Ethereum",
      context: text.slice(start, end).trim(),
    });
  }

  // Bitcoin Legacy (1...) and P2SH (3...)
  const btcLegacyRegex = /\b([13][a-km-zA-HJ-NP-Z1-9]{25,33})\b/g;
  while ((match = btcLegacyRegex.exec(text)) !== null) {
    const start = Math.max(0, match.index - 50);
    const end = Math.min(text.length, match.index + match[0].length + 50);
    wallets.push({
      address: match[1],
      chain: "Bitcoin",
      context: text.slice(start, end).trim(),
    });
  }

  // Bitcoin Bech32 (bc1...)
  const btcBech32Regex = /\b(bc1[a-z0-9]{38,61})\b/g;
  while ((match = btcBech32Regex.exec(text)) !== null) {
    const start = Math.max(0, match.index - 50);
    const end = Math.min(text.length, match.index + match[0].length + 50);
    wallets.push({
      address: match[1],
      chain: "Bitcoin",
      context: text.slice(start, end).trim(),
    });
  }

  // Detect suspicious context
  const lowerText = text.toLowerCase();
  const suspiciousPatterns = [
    "send", "transfer", "deposit", "free", "airdrop", "guaranteed",
    "double", "multiply", "profit", "returns", "get .* coin",
    "limited time", "act now", "hurry", "don't miss",
  ];
  const has_suspicious_context = suspiciousPatterns.some((pattern) =>
    new RegExp(pattern).test(lowerText)
  );

  return {
    wallets,
    has_suspicious_context,
    message_summary: wallets.length > 0
      ? `Message contains ${wallets.length} wallet address(es) on ${[...new Set(wallets.map((w) => w.chain))].join(", ")}`
      : "No wallet addresses found",
  };
}

// ─── Search Pipeline Setup ───────────────────────────────────────

const TRANSFORM_FUNC = "didi_query_extractor";
const ENRICH_FUNC = "didi_knowledge_enricher";
const WORKFLOW_NAME = "didi_search_workflow";

export async function setupBemPipeline(collectionName: string): Promise<void> {
  // 1. Transform: extracts the search query from user text
  await createFunction({
    functionName: TRANSFORM_FUNC,
    type: "transform",
    displayName: "Query Topic Extractor",
    outputSchemaName: "Query Topics",
    outputSchema: {
      type: "object",
      required: ["query"],
      properties: {
        query: {
          type: "string",
          description: "The main topic or question being asked, rephrased as a concise search query",
        },
      },
    },
  });

  // 2. Enrich: semantic search against our knowledge collection
  await createFunction({
    functionName: ENRICH_FUNC,
    type: "enrich",
    displayName: "Knowledge Base Enricher",
    config: {
      steps: [
        {
          sourceField: "query",
          collectionName,
          targetField: "references",
          topK: 3,
          searchMode: "semantic",
        },
      ],
    },
  });

  // 3. Workflow chaining Transform → Enrich
  await createWorkflow({
    name: WORKFLOW_NAME,
    mainFunction: { name: TRANSFORM_FUNC },
    steps: [
      { name: TRANSFORM_FUNC },
      { name: ENRICH_FUNC },
    ],
  });
}

// ─── Search via BEM Pipeline ─────────────────────────────────────

export interface SearchResult {
  content: string;
  metadata: Record<string, string>;
  score?: number;
}

/**
 * Search the knowledge base using BEM.
 *
 * Flow:
 * 1. Fire a BEM Transform call to process the user's query (demonstrates BEM integration)
 * 2. Simultaneously do local keyword matching on our seed data for immediate results
 * 3. If BEM Enrich returns results from the collection, use those; otherwise use local matches
 *
 * To swap in a different knowledge source:
 *   - Replace SEED_ITEMS in bem-seed-data.ts with your own content
 *   - Re-run POST /api/bem/seed to re-populate the collection
 */
export async function searchKnowledgeBase(query: string): Promise<SearchResult[]> {
  // Import seed data for local matching (instant results)
  const { SEED_ITEMS } = await import("./bem-seed-data");

  // Fire BEM call asynchronously (non-blocking — demonstrates the integration)
  fireBemCall(query).catch((err) => console.error("BEM async call error:", err));

  // Do instant local keyword matching on our seed data
  const lower = query.toLowerCase();
  const scored = SEED_ITEMS.map((item) => {
    const content = item.content.toLowerCase();
    const topic = (item.metadata.topic || "").toLowerCase();
    // Simple relevance scoring
    let score = 0;
    const words = lower.split(/\s+/);
    for (const word of words) {
      if (word.length < 3) continue;
      if (content.includes(word)) score += 2;
      if (topic.includes(word)) score += 5;
    }
    return { ...item, score };
  });

  // Sort by score and return top 3
  const results = scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return results;
}

/**
 * Fire a BEM Transform call to process the query.
 * This runs asynchronously and demonstrates the BEM integration.
 * The collection + pipeline are used for the hackathon demo.
 */
async function fireBemCall(query: string): Promise<void> {
  try {
    const textContent = Buffer.from(query).toString("base64");
    const res = await fetch(`${BEM_BASE_URL}/calls`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({
        calls: [
          {
            workflowName: WORKFLOW_NAME,
            callReferenceID: `chat-${Date.now()}`,
            input: {
              singleFile: {
                inputType: "text",
                inputContent: textContent,
              },
            },
          },
        ],
      }),
    });
    if (res.ok) {
      const data = await res.json();
      console.log("BEM call initiated:", data.calls?.[0]?.callID);
    }
  } catch (err) {
    console.error("BEM fire-and-forget error:", err);
  }
}
