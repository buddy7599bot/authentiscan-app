"use client"

import { useState, useCallback } from "react"
import Link from "next/link"

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

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "text-red-400"
      case "moderate": return "text-yellow-400"
      case "minor": return "text-blue-400"
      default: return "text-slate-400"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <nav className="bg-slate-900/80 backdrop-blur-md border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">⌚</span>
              <span className="font-bold text-xl text-white">AuthentiScan</span>
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">DEMO MODE</span>
              <Link href="/register" className="text-blue-400 hover:text-blue-300 text-sm">
                Sign up for full access →
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">🔍 Try AuthentiScan</h1>
          <p className="text-slate-400">
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
              className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-colors ${
                dragActive ? "border-blue-500 bg-blue-500/10" : "border-slate-600 hover:border-slate-500"
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
              <p className="text-lg text-white mb-2">Drag & drop watch photos here</p>
              <p className="text-slate-400">or click to browse</p>
            </div>

            {images.length > 0 && (
              <div className="mt-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium text-white">Photos ({images.length}/5)</h3>
                  <button onClick={() => setImages([])} className="text-sm text-slate-400 hover:text-white">
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
                      >×</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {error && (
              <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400">{error}</div>
            )}

            <button
              onClick={analyzeImages}
              disabled={analyzing || images.length === 0}
              className="mt-8 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed text-white py-4 rounded-xl font-semibold text-lg transition flex items-center justify-center gap-2"
            >
              {analyzing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Analyzing with Gemini AI...
                </>
              ) : (
                <>🔍 Analyze Watch</>
              )}
            </button>
          </>
        ) : (
          <div className="space-y-6">
            <div className={`rounded-2xl p-8 text-center ${
              result.verdict === "authentic" ? "bg-green-500/20 border border-green-500/30" :
              result.verdict === "suspicious" ? "bg-yellow-500/20 border border-yellow-500/30" :
              "bg-red-500/20 border border-red-500/30"
            }`}>
              <div className="text-6xl mb-4">
                {result.verdict === "authentic" ? "✅" : result.verdict === "suspicious" ? "⚠️" : "❌"}
              </div>
              <div className="text-3xl font-bold text-white mb-2 capitalize">
                {result.verdict === "authentic" ? "Likely Authentic" : 
                 result.verdict === "suspicious" ? "Proceed with Caution" : 
                 "Likely Counterfeit"}
              </div>
              <div className="text-xl text-slate-300">{result.confidence}% Confidence</div>
            </div>

            {(result.brand || result.model) && (
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="font-medium text-white mb-3">Detected Watch</h3>
                <div className="text-2xl font-bold text-white">
                  {result.brand || "Unknown"} {result.model || "Watch"}
                </div>
                {result.reference && <div className="text-slate-400 mt-1">Ref. {result.reference}</div>}
              </div>
            )}

            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
              <h3 className="font-medium text-white mb-3">Analysis Summary</h3>
              <p className="text-slate-300">{result.summary}</p>
            </div>

            {result.issues.length > 0 && (
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="font-medium text-white mb-4">Issues Found ({result.issues.length})</h3>
                <div className="space-y-3">
                  {result.issues.map((issue, i) => (
                    <div key={i} className="flex gap-3 p-3 bg-slate-700/50 rounded-lg">
                      <div className={`font-medium ${getSeverityColor(issue.severity)}`}>
                        {issue.severity === "critical" ? "🔴" : issue.severity === "moderate" ? "🟡" : "🔵"}
                      </div>
                      <div>
                        <div className="font-medium text-white capitalize">{issue.area}</div>
                        <div className="text-sm text-slate-400">{issue.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={() => { setResult(null); setImages([]) }}
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-xl font-medium transition"
              >
                Try Another Watch
              </button>
              <Link
                href="/register"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition text-center"
              >
                Sign Up for Full Access
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
