"use client"

import Link from "next/link"
import { useSession } from "next-auth/react"

export default function Home() {
  const { data: session } = useSession()

  return (
    <div className="min-h-screen bg-[#1d1d1f]">
      {/* Navigation - Liquid Glass */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl border-b border-white/10" style={{
        background: "linear-gradient(180deg, rgba(29, 29, 31, 0.95) 0%, rgba(29, 29, 31, 0.9) 100%)"
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-3">
              {/* Chrome Ring Logo */}
              <div className="relative w-10 h-10 rounded-full p-[2px]" style={{
                background: "conic-gradient(from 0deg, #FFD700 0deg, #FFFFFF 30deg, #E6C200 60deg, #F0E68C 90deg, #DAA520 120deg, #FFFACD 150deg, #FFD700 180deg, #E8E8E8 210deg, #FFE55C 240deg, #FFCC00 270deg, #FFFFFF 300deg, #F5DEB3 330deg, #FFD700 360deg)",
                boxShadow: "0 2px 12px rgba(255, 215, 0, 0.25), 0 4px 16px rgba(0, 0, 0, 0.4)"
              }}>
                <div className="w-full h-full rounded-full flex items-center justify-center text-lg" style={{
                  background: "linear-gradient(180deg, #2a2a2e 0%, #1e1e22 50%, #18181c 100%)"
                }}>
                  ⌚
                </div>
              </div>
              <span className="font-bold text-xl metallic-text-gradient">AuthentiScan</span>
            </div>
            <div className="flex items-center gap-4">
              {session ? (
                <Link
                  href="/dashboard"
                  className="px-4 py-2 rounded-xl font-medium transition text-[#1d1d1f]"
                  style={{
                    background: "linear-gradient(180deg, #FFB800 0%, #E6A600 100%)",
                    boxShadow: "0 4px 12px rgba(255, 184, 0, 0.3)"
                  }}
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link href="/login" className="text-[#a1a1a6] hover:text-white transition">
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="px-4 py-2 rounded-xl font-medium transition text-[#1d1d1f]"
                    style={{
                      background: "linear-gradient(180deg, #FFB800 0%, #E6A600 100%)",
                      boxShadow: "0 4px 12px rgba(255, 184, 0, 0.3)"
                    }}
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
          <div className="inline-block mb-4 px-4 py-1 rounded-full text-sm" style={{
            background: "rgba(255, 184, 0, 0.1)",
            border: "1px solid rgba(255, 184, 0, 0.2)",
            color: "#FFB800"
          }}>
            AI-Powered Watch Authentication
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-[#f5f5f7] mb-6 leading-tight">
            Catch Super Clones
            <br />
            <span className="gold-text">
              Before the Wire Transfer
            </span>
          </h1>
          <p className="text-xl text-[#a1a1a6] mb-8 max-w-2xl mx-auto">
            Upload photos. Get instant AI analysis. Spot the micro-details that super clones get wrong.
            Results in seconds, not weeks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="px-8 py-4 rounded-xl font-semibold text-lg transition text-[#1d1d1f]"
              style={{
                background: "linear-gradient(180deg, #FFB800 0%, #E6A600 100%)",
                boxShadow: "0 6px 24px rgba(255, 184, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)"
              }}
            >
              Try Free Scan →
            </Link>
            <Link
              href="#how-it-works"
              className="px-8 py-4 rounded-xl font-semibold text-lg transition text-[#f5f5f7]"
              style={{
                background: "linear-gradient(180deg, rgba(55, 55, 60, 0.9) 0%, rgba(40, 40, 45, 0.85) 100%)",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.08)"
              }}
            >
              How It Works
            </Link>
          </div>
          <p className="mt-4 text-[#a1a1a6] text-sm">
            First scan free. No credit card required.
          </p>
        </div>
      </section>

      {/* Trust Bar - Liquid Glass */}
      <section className="py-8 border-y border-white/10" style={{
        background: "linear-gradient(180deg, rgba(45, 45, 48, 0.5) 0%, rgba(35, 35, 38, 0.4) 100%)"
      }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold chrome-text">$62B</div>
              <div className="text-[#a1a1a6] text-sm">Luxury Watch Market</div>
            </div>
            <div>
              <div className="text-3xl font-bold chrome-text">$400+</div>
              <div className="text-[#a1a1a6] text-sm">Traditional Auth Cost</div>
            </div>
            <div>
              <div className="text-3xl font-bold chrome-text">&lt;60s</div>
              <div className="text-[#a1a1a6] text-sm">Analysis Time</div>
            </div>
            <div>
              <div className="text-3xl font-bold chrome-text">$10</div>
              <div className="text-[#a1a1a6] text-sm">Per Scan</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#f5f5f7] text-center mb-12">
            How AuthentiScan Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: "📸", title: "1. Upload Photos", desc: "Upload 5-10 images of the watch from listing photos or your own camera. We guide you on the best angles." },
              { icon: "🤖", title: "2. AI Analysis", desc: "Our AI scans dial markers, crown details, case finishing, and movement patterns. Checks against verified authentic database." },
              { icon: "✅", title: "3. Get Results", desc: "Receive detailed report with verdict, confidence score, and flagged issues. Share with sellers or keep for records." },
            ].map((item, i) => (
              <div key={i} className="rounded-2xl p-8 border border-white/10 backdrop-blur-sm" style={{
                background: "linear-gradient(135deg, rgba(45, 45, 48, 0.8) 0%, rgba(35, 35, 38, 0.7) 100%)",
                boxShadow: "0 4px 24px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)"
              }}>
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-[#f5f5f7] mb-2">{item.title}</h3>
                <p className="text-[#a1a1a6]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Check */}
      <section className="py-20 px-4" style={{
        background: "linear-gradient(180deg, rgba(45, 45, 48, 0.3) 0%, rgba(29, 29, 31, 0) 100%)"
      }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-[#f5f5f7] text-center mb-4">
            What Our AI Checks
          </h2>
          <p className="text-[#a1a1a6] text-center mb-12 max-w-2xl mx-auto">
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
              <div key={i} className="rounded-xl p-4 border border-white/10 transition hover:border-[#FFB800]/30" style={{
                background: "linear-gradient(135deg, rgba(45, 45, 48, 0.6) 0%, rgba(35, 35, 38, 0.5) 100%)"
              }}>
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="font-medium text-[#f5f5f7]">{item.title}</div>
                <div className="text-sm text-[#a1a1a6]">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-[#f5f5f7] text-center mb-4">
            Simple Pricing
          </h2>
          <p className="text-[#a1a1a6] text-center mb-12">
            One caught fake pays for a lifetime of scans.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Free */}
            <div className="rounded-2xl p-8 border border-white/10" style={{
              background: "linear-gradient(135deg, rgba(45, 45, 48, 0.8) 0%, rgba(35, 35, 38, 0.7) 100%)"
            }}>
              <div className="text-[#a1a1a6] text-sm font-medium mb-2">TRY IT</div>
              <div className="text-4xl font-bold text-[#f5f5f7] mb-1">Free</div>
              <div className="text-[#a1a1a6] mb-6">1 scan included</div>
              <ul className="space-y-3 mb-8">
                {["Full AI analysis", "Detailed report", "PDF export"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-[#a1a1a6]">
                    <span className="text-green-400">✓</span> {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/register"
                className="block w-full text-center py-3 rounded-xl font-medium transition text-[#f5f5f7]"
                style={{
                  background: "linear-gradient(180deg, rgba(55, 55, 60, 0.9) 0%, rgba(40, 40, 45, 0.85) 100%)",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.08)"
                }}
              >
                Start Free
              </Link>
            </div>
            
            {/* Pay Per Scan - Featured */}
            <div className="rounded-2xl p-8 relative" style={{
              background: "linear-gradient(135deg, rgba(45, 45, 48, 0.9) 0%, rgba(35, 35, 38, 0.85) 100%)",
              border: "1px solid rgba(255, 184, 0, 0.3)",
              boxShadow: "0 0 30px rgba(255, 184, 0, 0.1)"
            }}>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-1 rounded-full text-[#1d1d1f]" style={{
                background: "linear-gradient(180deg, #FFB800 0%, #E6A600 100%)"
              }}>
                POPULAR
              </div>
              <div className="text-[#FFB800] text-sm font-medium mb-2">PAY PER SCAN</div>
              <div className="text-4xl font-bold text-[#f5f5f7] mb-1">$10</div>
              <div className="text-[#a1a1a6] mb-6">per authentication</div>
              <ul className="space-y-3 mb-8">
                {["Full AI analysis", "Detailed report", "PDF export", "Shareable link"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-[#a1a1a6]">
                    <span className="text-green-400">✓</span> {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/register"
                className="block w-full text-center py-3 rounded-xl font-semibold transition text-[#1d1d1f]"
                style={{
                  background: "linear-gradient(180deg, #FFB800 0%, #E6A600 100%)",
                  boxShadow: "0 4px 16px rgba(255, 184, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)"
                }}
              >
                Get Started
              </Link>
            </div>
            
            {/* Pro */}
            <div className="rounded-2xl p-8 border border-white/10" style={{
              background: "linear-gradient(135deg, rgba(45, 45, 48, 0.8) 0%, rgba(35, 35, 38, 0.7) 100%)"
            }}>
              <div className="text-purple-400 text-sm font-medium mb-2">PRO</div>
              <div className="text-4xl font-bold text-[#f5f5f7] mb-1">$29</div>
              <div className="text-[#a1a1a6] mb-6">per month / unlimited</div>
              <ul className="space-y-3 mb-8">
                {["Unlimited scans", "Priority support", "Scan history", "API access"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-[#a1a1a6]">
                    <span className="text-green-400">✓</span> {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/register"
                className="block w-full text-center py-3 rounded-xl font-medium transition text-[#f5f5f7]"
                style={{
                  background: "linear-gradient(180deg, rgba(55, 55, 60, 0.9) 0%, rgba(40, 40, 45, 0.85) 100%)",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.08)"
                }}
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
          <h2 className="text-3xl font-bold text-[#f5f5f7] mb-4">
            Don't Wire $18K for a Fake
          </h2>
          <p className="text-[#a1a1a6] mb-8">
            Get peace of mind before the money moves. Your first scan is free.
          </p>
          <Link
            href="/register"
            className="inline-block px-8 py-4 rounded-xl font-semibold text-lg transition text-[#1d1d1f]"
            style={{
              background: "linear-gradient(180deg, #FFB800 0%, #E6A600 100%)",
              boxShadow: "0 6px 24px rgba(255, 184, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)"
            }}
          >
            Try Free Scan Now →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10 text-center text-[#a1a1a6] text-sm">
        <p>© 2026 AuthentiScan. AI-powered watch authentication.</p>
        <p className="mt-2">
          Disclaimer: AuthentiScan is an AI assistance tool. Results should be used as guidance only.
        </p>
      </footer>
    </div>
  )
}
