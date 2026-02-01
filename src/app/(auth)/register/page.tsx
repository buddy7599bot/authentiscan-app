"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Registration failed")
        return
      }

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError("Account created but sign in failed. Please login.")
      } else {
        router.push("/dashboard")
        router.refresh()
      }
    } catch (err) {
      setError("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-2xl font-bold mb-2">
            <span>⌚</span> <span className="metallic-text-gradient">AuthentiScan</span>
          </Link>
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-[var(--foreground-secondary)]">Get your first scan free</p>
        </div>

        <form onSubmit={handleSubmit} className="liquid-glass-card rounded-2xl p-8">
          {error && (
            <div className="mb-4 p-3 rounded-lg badge-fake text-sm">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-[var(--foreground-secondary)] mb-2">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="glass-input"
              placeholder="John Doe"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-[var(--foreground-secondary)] mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="glass-input"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-[var(--foreground-secondary)] mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="glass-input"
              placeholder="********"
              required
              minLength={8}
            />
            <p className="mt-1 text-xs text-[var(--foreground-secondary)]">Minimum 8 characters</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-3 rounded-xl disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>

          <div className="mt-4 p-3 rounded-lg badge-authentic text-sm text-center">
            🎉 Your first scan is free!
          </div>

          <p className="mt-6 text-center text-[var(--foreground-secondary)]">
            Already have an account?{" "}
            <Link href="/login" className="text-[var(--accent)] hover:text-[var(--accent-hover)]">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
