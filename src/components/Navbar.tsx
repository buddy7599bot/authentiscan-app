"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function Navbar() {
  const { data: session } = useSession()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  return (
    <nav className="glass-navbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full p-[2px]" style={{
              background: "conic-gradient(from 0deg, #FFD700 0deg, #FFFFFF 30deg, #E6C200 60deg, #F0E68C 90deg, #DAA520 120deg, #FFFACD 150deg, #FFD700 180deg, #E8E8E8 210deg, #FFE55C 240deg, #FFCC00 270deg, #FFFFFF 300deg, #F5DEB3 330deg, #FFD700 360deg)",
              boxShadow: "0 2px 12px rgba(255, 215, 0, 0.25), 0 4px 16px rgba(0, 0, 0, 0.2)"
            }}>
              <div className="w-full h-full rounded-full flex items-center justify-center text-lg bg-[var(--background)]">
                ⌚
              </div>
            </div>
            <span className="font-bold text-xl metallic-text-gradient">AuthentiScan</span>
          </Link>

          <div className="flex items-center gap-4">
            {/* Theme toggle - chrome ring button */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="chrome-ring-button"
                aria-label="Toggle theme"
              >
                <div className="chrome-ring-inner">
                  {theme === "dark" ? "☀️" : "🌙"}
                </div>
              </button>
            )}

            {session ? (
              <div className="flex items-center gap-3">
                <Link href="/dashboard" className="chrome-pill-button primary">
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition text-sm"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login" className="text-[var(--foreground-secondary)] hover:text-[var(--foreground)] transition text-sm">
                  Login
                </Link>
                <Link href="/register" className="chrome-pill-button primary">
                  Start Free
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
