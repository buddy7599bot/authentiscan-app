"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import Navbar from "@/components/Navbar"

interface AnalysisResult {
  brand: string | null
  model: string | null
  reference: string | null
  verdict: string
  confidence: number
  issues: {
    area: string
    severity: string
    description: string
  }[]
  summary: string
}

export default function DemoPage() {
  const [images, setImages] = useState<string[]>([])
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState("")
  const [dragActive, setDragActive] = useState(false)

  const handleFiles = (files: FileList) => {
    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (e) => {
          if (e.target?.result) {
            setImages(prev => {
              if (prev.length >= 5) return prev
              return [...prev, e.target!.result as string]
            })
          }
        }
        reader.readAsDataURL(file)
      }
    })
  }

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }, [])

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const analyzeImages = async () => {
    if (images.length === 0) {
      setError("Please upload at least one image")
      return
    }

    setAnalyzing(true)
    setError("")
    setResult(null)

    try {
      const res = await fetch("/api/demo-scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ images }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Analysis failed")
        return
      }

      setResult(data)
    } catch (err) {
      setError("Something went wrong. Please try again.")
    } finally {
      setAnalyzing(false)
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical": return "🔴"
      case "moderate": return "🟡"
      case "minor": return "🔵"
      default: return "⚪"
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-block mb-2 px-3 py-1 rounded-full text-xs font-semibold badge-suspicious">
            DEMO MODE
          </div>
          <h1 className="text-3xl font-bold mb-2">🔍 Try AuthentiScan</h1>
          <p className="text-[var(--foreground-secondary)]">
            Upload watch photos and see our AI in action (demo: max 5 images)
          </p>
        </div>

        {!result ? (
          <>
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`relative liquid-glass-card rounded-2xl p-12 text-center transition-all border-2 border-dashed ${
                dragActive ? "border-[var(--accent)] bg-[var(--accent)]/5" : "border-[var(--border)]"
              }`}
            >
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => e.target.files && handleFiles(e.target.files)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="text-5xl mb-4">📸</div>
              <p className="text-lg font-medium mb-2">Drag & drop watch photos here</p>
              <p className="text-[var(--foreground-secondary)]">or click to browse</p>
            </div>

            {images.length > 0 && (
              <div className="mt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Photos ({images.length}/5)</h3>
                  <button onClick={() => setImages([])} className="text-sm text-[var(--foreground-secondary)] hover:text-[var(--foreground)]">
                    Clear all
                  </button>
                </div>
                <div className="grid grid-cols-5 gap-3">
                  {images.map((img, i) => (
                    <div key={i} className="relative group">
                      <img src={img} alt={`Upload ${i + 1}`} className="w-full aspect-square object-cover rounded-lg" />
                      <button
                        onClick={() => removeImage(i)}
                        className="absolute top-1 right-1 w-6 h-6 bg-red-500 rounded-full text-white text-sm opacity-0 group-hover:opacity-100 transition"
                      >x</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {error && (
              <div className="mt-6 p-4 rounded-xl badge-fake">{error}</div>
            )}

            <button
              onClick={analyzeImages}
              disabled={analyzing || images.length === 0}
              className="mt-8 w-full scan-button"
            >
              {analyzing ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-5 h-5 border-2 border-[#1d1d1f]/30 border-t-[#1d1d1f] rounded-full animate-spin" />
                  Analyzing with Gemini AI...
                </span>
              ) : (
                "🔍 Analyze Watch"
              )}
            </button>
          </>
        ) : (
          <div className="space-y-6">
            {/* Verdict */}
            <div className={`liquid-glass-card rounded-2xl p-8 text-center ${
              result.verdict === "authentic" ? "border-green-500/30" :
              result.verdict === "suspicious" ? "border-[var(--accent)]/30" :
              "border-red-500/30"
            }`}>
              <div className="text-6xl mb-4">
                {result.verdict === "authentic" ? "✅" : result.verdict === "suspicious" ? "⚠️" : "❌"}
              </div>
              <div className="text-3xl font-bold mb-2 capitalize">
                {result.verdict === "authentic" ? "Likely Authentic" :
                 result.verdict === "suspicious" ? "Proceed with Caution" :
                 "Likely Counterfeit"}
              </div>
              <div className="text-xl text-[var(--foreground-secondary)]">{result.confidence}% Confidence</div>
            </div>

            {(result.brand || result.model) && (
              <div className="liquid-glass-card rounded-xl p-6">
                <h3 className="font-medium mb-3 text-[var(--foreground-secondary)]">Detected Watch</h3>
                <div className="text-2xl font-bold">
                  {result.brand || "Unknown"} {result.model || "Watch"}
                </div>
                {result.reference && <div className="text-[var(--foreground-secondary)] mt-1">Ref. {result.reference}</div>}
              </div>
            )}

            <div className="liquid-glass-card rounded-xl p-6">
              <h3 className="font-medium mb-3 text-[var(--foreground-secondary)]">Analysis Summary</h3>
              <p>{result.summary}</p>
            </div>

            {result.issues.length > 0 && (
              <div className="liquid-glass-card rounded-xl p-6">
                <h3 className="font-medium mb-4 text-[var(--foreground-secondary)]">Issues Found ({result.issues.length})</h3>
                <div className="space-y-3">
                  {result.issues.map((issue, i) => (
                    <div key={i} className="flex gap-3 p-3 rounded-lg bg-[var(--glass)]">
                      <div>{getSeverityIcon(issue.severity)}</div>
                      <div>
                        <div className="font-medium capitalize">{issue.area}</div>
                        <div className="text-sm text-[var(--foreground-secondary)]">{issue.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={() => { setResult(null); setImages([]) }}
                className="flex-1 btn-secondary py-3 rounded-xl"
              >
                Try Another Watch
              </button>
              <Link href="/register" className="flex-1 btn-primary py-3 rounded-xl text-center">
                Sign Up for Full Access
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
