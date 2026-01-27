import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const userId = (session.user as any).id

    const scans = await prisma.scan.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 50
    })

    return NextResponse.json(scans.map(scan => ({
      id: scan.id,
      brand: scan.brand,
      model: scan.model,
      verdict: scan.verdict,
      confidence: scan.confidence,
      issues: JSON.parse(scan.issues),
      createdAt: scan.createdAt
    })))
  } catch (error) {
    console.error("Fetch scans error:", error)
    return NextResponse.json(
      { error: "Failed to fetch scans" },
      { status: 500 }
    )
  }
}
