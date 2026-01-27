import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { analyzeWatchImages } from "@/lib/gemini"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const userId = (session.user as any).id

    // Check if user has scans remaining
    const user = await prisma.user.findUnique({
      where: { id: userId }
    })

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    if (user.scansRemaining <= 0 && user.plan === "free") {
      return NextResponse.json(
        { error: "No scans remaining. Please upgrade to continue." },
        { status: 403 }
      )
    }

    const { images } = await req.json()

    if (!images || !Array.isArray(images) || images.length === 0) {
      return NextResponse.json(
        { error: "At least one image is required" },
        { status: 400 }
      )
    }

    if (images.length > 10) {
      return NextResponse.json(
        { error: "Maximum 10 images allowed" },
        { status: 400 }
      )
    }

    // Analyze images with Gemini
    const analysis = await analyzeWatchImages(images)

    // Create scan record
    const scan = await prisma.scan.create({
      data: {
        userId,
        brand: analysis.brand,
        model: analysis.model,
        reference: analysis.reference,
        verdict: analysis.verdict,
        confidence: analysis.confidence,
        issues: JSON.stringify(analysis.issues),
        images: JSON.stringify(images.map((_, i) => `image_${i}`)), // Store reference, not actual data
        annotations: null
      }
    })

    // Decrement scans for free users
    if (user.plan === "free" || user.plan === "single") {
      await prisma.user.update({
        where: { id: userId },
        data: { scansRemaining: user.scansRemaining - 1 }
      })
    }

    return NextResponse.json({
      scanId: scan.id,
      brand: analysis.brand,
      model: analysis.model,
      reference: analysis.reference,
      verdict: analysis.verdict,
      confidence: analysis.confidence,
      issues: analysis.issues,
      summary: analysis.summary
    })
  } catch (error) {
    console.error("Scan error:", error)
    return NextResponse.json(
      { error: "Failed to analyze images" },
      { status: 500 }
    )
  }
}
