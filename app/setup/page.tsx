"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, AlertCircle } from "lucide-react"

export default function SetupPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string; username?: string; password?: string } | null>(null)

  const setupAdmin = async () => {
    setIsLoading(true)
    setResult(null)

    try {
      const response = await fetch("/api/setup-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const data = await response.json()

      if (response.ok) {
        setResult({
          success: true,
          message: data.message,
          username: data.username,
          password: data.password
        })
      } else {
        setResult({
          success: false,
          message: data.error || "Failed to setup admin"
        })
      }
    } catch (error) {
      setResult({
        success: false,
        message: "An error occurred while setting up admin"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Admin Setup</CardTitle>
          <CardDescription>Initialize the admin user for the first time</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {result && (
            <Alert variant={result.success ? "default" : "destructive"}>
              {result.success ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                <AlertCircle className="h-4 w-4" />
              )}
              <AlertDescription>
                {result.message}
                {result.success && result.username && result.password && (
                  <div className="mt-2 p-2 bg-green-50 rounded text-sm">
                    <p><strong>Username:</strong> {result.username}</p>
                    <p><strong>Password:</strong> {result.password}</p>
                    <p className="text-xs text-gray-600 mt-1">
                      Please save these credentials and change the password after first login.
                    </p>
                  </div>
                )}
              </AlertDescription>
            </Alert>
          )}
          
          <Button 
            onClick={setupAdmin} 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? "Setting up..." : "Setup Admin User"}
          </Button>

          {result?.success && (
            <div className="text-center">
              <Button 
                onClick={() => window.location.href = "/admin/login"} 
                variant="outline" 
                className="w-full"
              >
                Go to Admin Login
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 