import { NextResponse } from "next/server"
import { analyzeWatchImages } from "@/lib/gemini"

// Demo endpoint - no auth required for testing
export async function POST(req: Request) {
  try {
    const { images } = await req.json()

    if (!images || !Array.isArray(images) || images.length === 0) {
      return NextResponse.json(
        { error: "At least one image is required" },
        { status: 400 }
      )
    }

    if (images.length > 5) {
      return NextResponse.json(
        { error: "Demo limited to 5 images" },
        { status: 400 }
      )
    }

    // Analyze images with Gemini
    const analysis = await analyzeWatchImages(images)

    return NextResponse.json({
      brand: analysis.brand,
      model: analysis.model,
      reference: analysis.reference,
      verdict: analysis.verdict,
      confidence: analysis.confidence,
      issues: analysis.issues,
      summary: analysis.summary,
      demo: true
    })
  } catch (error) {
    console.error("Demo scan error:", error)
    return NextResponse.json(
      { error: "Analysis failed - check API key" },
      { status: 500 }
    )
  }
}
