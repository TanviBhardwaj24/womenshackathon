import { NextResponse } from "next/server";
import { setupWalletExtractionPipeline } from "@/lib/bem";

export async function POST() {
  try {
    await setupWalletExtractionPipeline();

    return NextResponse.json({
      success: true,
      message: "BEM wallet extraction pipeline created successfully",
      pipeline: {
        transformFunction: "didi_wallet_extractor",
        workflow: "didi_wallet_extraction_workflow",
      },
    });
  } catch (error) {
    console.error("Error setting up wallet pipeline:", error);
    return NextResponse.json(
      { error: "Failed to setup wallet extraction pipeline", details: String(error) },
      { status: 500 }
    );
  }
}
