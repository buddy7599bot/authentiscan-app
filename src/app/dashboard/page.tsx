"use client"

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"

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
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case "authentic":
        return "text-green-400 bg-green-400/10 border-green-400/20"
      case "suspicious":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20"
      case "fake":
        return "text-red-400 bg-red-400/10 border-red-400/20"
      default:
        return "text-slate-400 bg-slate-400/10 border-slate-400/20"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="bg-slate-900/80 backdrop-blur-md border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">⌚</span>
              <span className="font-bold text-xl text-white">AuthentiScan</span>
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-slate-400">
                {session.user?.email}
              </span>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-slate-400 hover:text-white transition"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-slate-400">Welcome back, {session.user?.name || "Collector"}</p>
          </div>
          <Link
            href="/scan"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition flex items-center gap-2"
          >
            <span>📸</span> New Scan
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="text-3xl font-bold text-white">{scans.length}</div>
            <div className="text-slate-400">Total Scans</div>
          </div>
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="text-3xl font-bold text-green-400">
              {scans.filter(s => s.verdict === "authentic").length}
            </div>
            <div className="text-slate-400">Authentic</div>
          </div>
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="text-3xl font-bold text-red-400">
              {scans.filter(s => s.verdict === "fake" || s.verdict === "suspicious").length}
            </div>
            <div className="text-slate-400">Flagged</div>
          </div>
        </div>

        {/* Recent Scans */}
        <div className="bg-slate-800 rounded-xl border border-slate-700">
          <div className="p-6 border-b border-slate-700">
            <h2 className="text-xl font-semibold text-white">Recent Scans</h2>
          </div>
          
          {scans.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-4xl mb-4">📷</div>
              <h3 className="text-lg font-medium text-white mb-2">No scans yet</h3>
              <p className="text-slate-400 mb-6">
                Start by uploading photos of a watch you want to authenticate.
              </p>
              <Link
                href="/scan"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition"
              >
                Start Your First Scan
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-slate-700">
              {scans.map((scan) => (
                <Link
                  key={scan.id}
                  href={`/report/${scan.id}`}
                  className="flex items-center justify-between p-6 hover:bg-slate-700/50 transition"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center text-2xl">
                      ⌚
                    </div>
                    <div>
                      <div className="font-medium text-white">
                        {scan.brand || "Unknown"} {scan.model || "Watch"}
                      </div>
                      <div className="text-sm text-slate-400">
                        {new Date(scan.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm text-slate-400">Confidence</div>
                      <div className="font-medium text-white">{scan.confidence}%</div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getVerdictColor(scan.verdict)}`}>
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
