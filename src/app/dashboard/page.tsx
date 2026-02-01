"use client"

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import Navbar from "@/components/Navbar"

interface Scan {
  id: string
  brand: string | null
  model: string | null
  verdict: string
  confidence: number
  createdAt: string
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [scans, setScans] = useState<Scan[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  useEffect(() => {
    if (session) {
      fetchScans()
    }
  }, [session])

  const fetchScans = async () => {
    try {
      const res = await fetch("/api/scans")
      const data = await res.json()
      setScans(data)
    } catch (error) {
      console.error("Failed to fetch scans:", error)
    } finally {
      setLoading(false)
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[var(--foreground-secondary)]">Loading...</div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const getVerdictBadge = (verdict: string) => {
    switch (verdict) {
      case "authentic": return "badge-authentic"
      case "suspicious": return "badge-suspicious"
      case "fake": return "badge-fake"
      default: return "badge-suspicious"
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-[var(--foreground-secondary)]">Welcome back, {session.user?.name || "Collector"}</p>
          </div>
          <Link href="/scan" className="btn-primary px-6 py-3 rounded-xl flex items-center gap-2">
            <span>📸</span> New Scan
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="liquid-glass-card rounded-xl p-6">
            <div className="text-3xl font-bold">{scans.length}</div>
            <div className="text-[var(--foreground-secondary)]">Total Scans</div>
          </div>
          <div className="liquid-glass-card rounded-xl p-6">
            <div className="text-3xl font-bold text-green-400">
              {scans.filter(s => s.verdict === "authentic").length}
            </div>
            <div className="text-[var(--foreground-secondary)]">Authentic</div>
          </div>
          <div className="liquid-glass-card rounded-xl p-6">
            <div className="text-3xl font-bold text-red-400">
              {scans.filter(s => s.verdict === "fake" || s.verdict === "suspicious").length}
            </div>
            <div className="text-[var(--foreground-secondary)]">Flagged</div>
          </div>
        </div>

        {/* Recent Scans */}
        <div className="liquid-glass-card rounded-xl overflow-hidden">
          <div className="p-6 border-b border-[var(--border)]">
            <h2 className="text-xl font-semibold">Recent Scans</h2>
          </div>

          {scans.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-4xl mb-4">📷</div>
              <h3 className="text-lg font-medium mb-2">No scans yet</h3>
              <p className="text-[var(--foreground-secondary)] mb-6">
                Start by uploading photos of a watch you want to authenticate.
              </p>
              <Link href="/scan" className="btn-primary px-6 py-3 rounded-xl inline-block">
                Start Your First Scan
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-[var(--border)]">
              {scans.map((scan) => (
                <Link
                  key={scan.id}
                  href={`/report/${scan.id}`}
                  className="flex items-center justify-between p-6 hover:bg-[var(--glass)] transition"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl liquid-glass-card">
                      ⌚
                    </div>
                    <div>
                      <div className="font-medium">
                        {scan.brand || "Unknown"} {scan.model || "Watch"}
                      </div>
                      <div className="text-sm text-[var(--foreground-secondary)]">
                        {new Date(scan.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm text-[var(--foreground-secondary)]">Confidence</div>
                      <div className="font-medium">{scan.confidence}%</div>
                    </div>
                    <span className={getVerdictBadge(scan.verdict)}>
                      {scan.verdict.charAt(0).toUpperCase() + scan.verdict.slice(1)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
