"use client"

import Link from "next/link"
import { useSession } from "next-auth/react"
import Navbar from "@/components/Navbar"

export default function Home() {
  const { data: session } = useSession()

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-20 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-4 px-4 py-1 rounded-full text-sm border border-[var(--accent)]/20 text-[var(--accent)]" style={{
            background: "rgba(255, 184, 0, 0.08)",
          }}>
            AI-Powered Watch Authentication
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 leading-tight">
            Catch Super Clones
            <br />
            <span className="gold-text">Before the Wire Transfer</span>
          </h1>
          <p className="text-xl text-[var(--foreground-secondary)] mb-8 max-w-2xl mx-auto">
            Upload photos. Get instant AI analysis. Spot the micro-details that super clones get wrong.
            Results in seconds, not weeks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="btn-primary text-lg px-8 py-4 rounded-xl inline-block text-center">
              Try Free Scan
            </Link>
            <Link href="#how-it-works" className="btn-secondary text-lg px-8 py-4 rounded-xl inline-block text-center">
              How It Works
            </Link>
          </div>
          <p className="mt-4 text-[var(--foreground-secondary)] text-sm">
            First scan free. No credit card required.
          </p>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-8 border-y border-[var(--border)]" style={{
        background: "var(--glass)"
      }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "$62B", label: "Luxury Watch Market" },
              { value: "$400+", label: "Traditional Auth Cost" },
              { value: "<60s", label: "Analysis Time" },
              { value: "$10", label: "Per Scan" },
            ].map((item, i) => (
              <div key={i}>
                <div className="text-3xl font-bold chrome-text">{item.value}</div>
                <div className="text-[var(--foreground-secondary)] text-sm">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            How AuthentiScan Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "📸", title: "1. Upload Photos", desc: "Upload 5-10 images of the watch from listing photos or your own camera. We guide you on the best angles." },
              { icon: "🤖", title: "2. AI Analysis", desc: "Our AI scans dial markers, crown details, case finishing, and movement patterns. Checks against verified authentic database." },
              { icon: "✅", title: "3. Get Results", desc: "Receive detailed report with verdict, confidence score, and flagged issues. Share with sellers or keep for records." },
            ].map((item, i) => (
              <div key={i} className="liquid-glass-card p-8">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-[var(--foreground-secondary)]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Check */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">What Our AI Checks</h2>
          <p className="text-[var(--foreground-secondary)] text-center mb-12 max-w-2xl mx-auto">
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
              <div key={i} className="liquid-glass-card rounded-xl p-4 hover:border-[var(--accent)]/30 transition">
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="font-medium">{item.title}</div>
                <div className="text-sm text-[var(--foreground-secondary)]">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Simple Pricing</h2>
          <p className="text-[var(--foreground-secondary)] text-center mb-12">
            One caught fake pays for a lifetime of scans.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Free */}
            <div className="liquid-glass-card p-8">
              <div className="text-[var(--foreground-secondary)] text-sm font-medium mb-2">TRY IT</div>
              <div className="text-4xl font-bold mb-1">Free</div>
              <div className="text-[var(--foreground-secondary)] mb-6">1 scan included</div>
              <ul className="space-y-3 mb-8">
                {["Full AI analysis", "Detailed report", "PDF export"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-[var(--foreground-secondary)]">
                    <span className="text-green-400">✓</span> {item}
                  </li>
                ))}
              </ul>
              <Link href="/register" className="btn-secondary block w-full text-center py-3 rounded-xl">
                Start Free
              </Link>
            </div>

            {/* Pay Per Scan */}
            <div className="liquid-glass-card p-8 relative border-[var(--accent)]/30" style={{
              boxShadow: "0 0 30px rgba(255, 184, 0, 0.1)"
            }}>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-1 rounded-full btn-primary">
                POPULAR
              </div>
              <div className="text-[var(--accent)] text-sm font-medium mb-2">PAY PER SCAN</div>
              <div className="text-4xl font-bold mb-1">$10</div>
              <div className="text-[var(--foreground-secondary)] mb-6">per authentication</div>
              <ul className="space-y-3 mb-8">
                {["Full AI analysis", "Detailed report", "PDF export", "Shareable link"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-[var(--foreground-secondary)]">
                    <span className="text-green-400">✓</span> {item}
                  </li>
                ))}
              </ul>
              <Link href="/register" className="btn-primary block w-full text-center py-3 rounded-xl">
                Get Started
              </Link>
            </div>

            {/* Pro */}
            <div className="liquid-glass-card p-8">
              <div className="text-[var(--accent)] text-sm font-medium mb-2">PRO</div>
              <div className="text-4xl font-bold mb-1">$29</div>
              <div className="text-[var(--foreground-secondary)] mb-6">per month / unlimited</div>
              <ul className="space-y-3 mb-8">
                {["Unlimited scans", "Priority support", "Scan history", "API access"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-[var(--foreground-secondary)]">
                    <span className="text-green-400">✓</span> {item}
                  </li>
                ))}
              </ul>
              <Link href="/register" className="btn-secondary block w-full text-center py-3 rounded-xl">
                Go Pro
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Don't Wire $18K for a Fake
          </h2>
          <p className="text-[var(--foreground-secondary)] mb-8">
            Get peace of mind before the money moves. Your first scan is free.
          </p>
          <Link href="/register" className="btn-primary text-lg px-8 py-4 rounded-xl inline-block">
            Try Free Scan Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-[var(--border)] text-center text-[var(--foreground-secondary)] text-sm">
        <p>&copy; 2026 AuthentiScan. AI-powered watch authentication.</p>
        <p className="mt-2">
          Disclaimer: AuthentiScan is an AI assistance tool. Results should be used as guidance only.
        </p>
      </footer>
    </div>
  )
}
