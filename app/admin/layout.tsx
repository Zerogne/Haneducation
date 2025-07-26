"use client"

import type React from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { SessionProvider } from "next-auth/react"

function AdminAuthWrapper({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "loading") return // Still loading

    if (!session) {
      router.push("/admin/login")
    }
  }, [session, status, router])

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null // Will redirect to login
  }

  return <>{children}</>
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthWrapper>
      <div className="min-h-screen bg-background">
        {children}
      </div>
    </AdminAuthWrapper>
  )
}
