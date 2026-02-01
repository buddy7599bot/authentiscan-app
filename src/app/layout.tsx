import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AuthentiScan - AI Watch Authentication",
  description: "Catch super clone watches before the wire transfer. AI-powered luxury watch authentication in seconds.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-[var(--background)] text-[var(--foreground)]`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
