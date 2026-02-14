import { NextResponse } from "next/server";
import { createCollection, addItemsToCollection, setupBemPipeline } from "@/lib/bem";
import { COLLECTION_NAME, SEED_ITEMS } from "@/lib/bem-seed-data";

export async function POST() {
  try {
    // Step 1: Create collection
    console.log(`Creating BEM collection: ${COLLECTION_NAME}`);
    await createCollection(COLLECTION_NAME);

    // Step 2: Add seed items in batches
    const BATCH_SIZE = 5;
    for (let i = 0; i < SEED_ITEMS.length; i += BATCH_SIZE) {
      const batch = SEED_ITEMS.slice(i, i + BATCH_SIZE);
      console.log(`Adding items ${i + 1}-${i + batch.length} of ${SEED_ITEMS.length}`);
      await addItemsToCollection(COLLECTION_NAME, batch);
      // Small delay between batches for async processing
      await new Promise((r) => setTimeout(r, 1000));
    }

    // Step 3: Set up the Transform → Enrich pipeline
    console.log("Setting up BEM search pipeline...");
    await setupBemPipeline(COLLECTION_NAME);

    return NextResponse.json({
      success: true,
      message: `Seeded ${SEED_ITEMS.length} items and set up search pipeline`,
      itemCount: SEED_ITEMS.length,
    });
  } catch (error) {
    console.error("BEM seed error:", error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
