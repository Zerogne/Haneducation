import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"

import { SessionProviderWrapper } from "@/components/session-provider"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "HAN Education - Хятад дахь суралцах таны гүүр",
  description: "Хувийн боловсролын зөвлөх үйлчилгээ | 2022 оноос хойш үйл ажиллагаа явуулж байгаа туршлагатай"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="mn" suppressHydrationWarning>
      <body className={inter.className}>
        <SessionProviderWrapper>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <Suspense fallback={null}>
              {children}
              <Analytics />
              <SpeedInsights />
              <Toaster position="bottom-right" />
            </Suspense>
          </ThemeProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  )
}
