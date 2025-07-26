"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn, useSession } from "next-auth/react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

function ErrorBoundary({ children }: { children: React.ReactNode }) {
  const [error, setError] = useState<Error | null>(null)
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="max-w-md w-full p-6 bg-white rounded shadow">
          <h2 className="text-lg font-bold mb-2">Error</h2>
          <pre className="text-red-600 whitespace-pre-wrap">{error.message}</pre>
        </div>
      </div>
    )
  }
  return (
    <>{children}</>
  )
}

export default function LoginPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [formData, setFormData] = useState({ username: "", password: "" })
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Debug output
  console.log("[LoginPage] status:", status, "session:", session)

  // If authenticated, redirect
  if (status === "authenticated" && session) {
    router.push("/admin")
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Redirecting to admin...</p>
        </div>
      </div>
    )
  }

  // Show warning if stuck loading
  let loadingWarning = null
  if (status === "loading") {
    loadingWarning = (
      <Alert variant="destructive" className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Session status is stuck on <b>loading</b>. This usually means a NextAuth or provider issue.<br />
          Try refreshing, or check your SessionProvider setup.
        </AlertDescription>
      </Alert>
    )
  }

  // Show warning if session is null but status is authenticated
  let sessionWarning = null
  if (status === "authenticated" as typeof status && !session) {
    sessionWarning = (
      <Alert variant="destructive" className="mb-4">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Status is authenticated but session is null. This is a misconfiguration.
        </AlertDescription>
      </Alert>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const result = await signIn("credentials", {
        username: formData.username,
        password: formData.password,
        redirect: false,
      })

      if (result?.error) {
        setError("Invalid username or password")
        setIsLoading(false)
      } else {
        router.push("/admin")
      }
    } catch (error) {
      setError("An error occurred. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
            <CardDescription>Enter your credentials to access the admin panel</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Debug output */}
            <div className="mb-2 text-xs text-gray-400">
              <div>status: {status}</div>
              <div>session: {JSON.stringify(session)}</div>
            </div>
            {loadingWarning}
            {sessionWarning}
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </ErrorBoundary>
  )
}
