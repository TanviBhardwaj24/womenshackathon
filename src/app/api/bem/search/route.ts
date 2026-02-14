import { NextRequest, NextResponse } from "next/server";
import { searchKnowledgeBase } from "@/lib/bem";

export async function POST(req: NextRequest) {
  try {
    const { query } = (await req.json()) as { query: string };

    if (!query) {
      return NextResponse.json({ error: "query is required" }, { status: 400 });
    }

    const results = await searchKnowledgeBase(query);

    return NextResponse.json({
      success: true,
      results,
      query,
    });
  } catch (error) {
    console.error("BEM search error:", error);
    return NextResponse.json(
      { success: false, error: String(error), results: [] },
      { status: 500 }
    );
  }
}
