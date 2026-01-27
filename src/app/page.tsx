"use client"

import Link from "next/link"
import { useSession } from "next-auth/react"

export default function Home() {
  const { data: session } = useSession()

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <span className="text-2xl">⌚</span>
              <span className="font-bold text-xl text-white">AuthentiScan</span>
            </div>
            <div className="flex items-center gap-4">
              {session ? (
                <Link
                  href="/dashboard"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link href="/login" className="text-slate-300 hover:text-white transition">
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition"
                  >
                    Start Free
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-4 px-4 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm">
            AI-Powered Watch Authentication
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight">
            Catch Super Clones
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Before the Wire Transfer
            </span>
          </h1>
          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Upload photos. Get instant AI analysis. Spot the micro-details that super clones get wrong.
            Results in seconds, not weeks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition shadow-lg shadow-blue-500/25"
            >
              Try Free Scan →
            </Link>
            <Link
              href="#how-it-works"
              className="bg-slate-700 hover:bg-slate-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition"
            >
              How It Works
            </Link>
          </div>
          <p className="mt-4 text-slate-500 text-sm">
            First scan free. No credit card required.
          </p>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-8 border-y border-slate-700 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-white">$62B</div>
              <div className="text-slate-400 text-sm">Luxury Watch Market</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">$400+</div>
              <div className="text-slate-400 text-sm">Traditional Auth Cost</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">&lt;60s</div>
              <div className="text-slate-400 text-sm">Analysis Time</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white">$10</div>
              <div className="text-slate-400 text-sm">Per Scan</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            How AuthentiScan Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700">
              <div className="text-4xl mb-4">📸</div>
              <h3 className="text-xl font-semibold text-white mb-2">1. Upload Photos</h3>
              <p className="text-slate-400">
                Upload 5-10 images of the watch from listing photos or your own camera.
                We guide you on the best angles.
              </p>
            </div>
            <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold text-white mb-2">2. AI Analysis</h3>
              <p className="text-slate-400">
                Our AI scans dial markers, crown details, case finishing, and movement patterns.
                Checks against verified authentic database.
              </p>
            </div>
            <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-semibold text-white mb-2">3. Get Results</h3>
              <p className="text-slate-400">
                Receive detailed report with verdict, confidence score, and flagged issues.
                Share with sellers or keep for records.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Check */}
      <section className="py-20 px-4 bg-slate-800/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            What Our AI Checks
          </h2>
          <p className="text-slate-400 text-center mb-12 max-w-2xl mx-auto">
            Super clones get most things right. We catch the micro-details they get wrong.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: "🔤", title: "Font Spacing", desc: "Millimeter-level text analysis" },
              { icon: "👑", title: "Crown Details", desc: "Logo engraving depth & shape" },
              { icon: "💡", title: "Lume Application", desc: "Glow patterns & consistency" },
              { icon: "📅", title: "Date Window", desc: "Cyclops magnification & alignment" },
              { icon: "⚙️", title: "Case Finishing", desc: "Polish quality & proportions" },
              { icon: "🎯", title: "Bezel Markers", desc: "Alignment & color accuracy" },
              { icon: "🔧", title: "Movement", desc: "Engravings & finishing (if visible)" },
              { icon: "✨", title: "Dial Quality", desc: "Print quality & marker alignment" },
            ].map((item, i) => (
              <div key={i} className="bg-slate-800 rounded-xl p-4 border border-slate-700">
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="font-medium text-white">{item.title}</div>
                <div className="text-sm text-slate-400">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-4">
            Simple Pricing
          </h2>
          <p className="text-slate-400 text-center mb-12">
            One caught fake pays for a lifetime of scans.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Free */}
            <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
              <div className="text-slate-400 text-sm font-medium mb-2">TRY IT</div>
              <div className="text-4xl font-bold text-white mb-1">Free</div>
              <div className="text-slate-400 mb-6">1 scan included</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-slate-300">
                  <span className="text-green-400">✓</span> Full AI analysis
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <span className="text-green-400">✓</span> Detailed report
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <span className="text-green-400">✓</span> PDF export
                </li>
              </ul>
              <Link
                href="/register"
                className="block w-full text-center bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-xl font-medium transition"
              >
                Start Free
              </Link>
            </div>
            
            {/* Pay Per Scan */}
            <div className="bg-slate-800 rounded-2xl p-8 border border-blue-500 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                POPULAR
              </div>
              <div className="text-blue-400 text-sm font-medium mb-2">PAY PER SCAN</div>
              <div className="text-4xl font-bold text-white mb-1">$10</div>
              <div className="text-slate-400 mb-6">per authentication</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-slate-300">
                  <span className="text-green-400">✓</span> Full AI analysis
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <span className="text-green-400">✓</span> Detailed report
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <span className="text-green-400">✓</span> PDF export
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <span className="text-green-400">✓</span> Shareable link
                </li>
              </ul>
              <Link
                href="/register"
                className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium transition"
              >
                Get Started
              </Link>
            </div>
            
            {/* Pro */}
            <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
              <div className="text-purple-400 text-sm font-medium mb-2">PRO</div>
              <div className="text-4xl font-bold text-white mb-1">$29</div>
              <div className="text-slate-400 mb-6">per month / unlimited</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-slate-300">
                  <span className="text-green-400">✓</span> Unlimited scans
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <span className="text-green-400">✓</span> Priority support
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <span className="text-green-400">✓</span> Scan history
                </li>
                <li className="flex items-center gap-2 text-slate-300">
                  <span className="text-green-400">✓</span> API access
                </li>
              </ul>
              <Link
                href="/register"
                className="block w-full text-center bg-slate-700 hover:bg-slate-600 text-white py-3 rounded-xl font-medium transition"
              >
                Go Pro
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Don't Wire $18K for a Fake
          </h2>
          <p className="text-slate-400 mb-8">
            Get peace of mind before the money moves. Your first scan is free.
          </p>
          <Link
            href="/register"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition shadow-lg shadow-blue-500/25"
          >
            Try Free Scan Now →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-700 text-center text-slate-500 text-sm">
        <p>© 2026 AuthentiScan. AI-powered watch authentication.</p>
        <p className="mt-2">
          Disclaimer: AuthentiScan is an AI assistance tool. Results should be used as guidance only.
        </p>
      </footer>
    </div>
  )
}
