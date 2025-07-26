"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SessionTestPage() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Session Test</h1>
          <p className="text-muted-foreground">Test authentication session</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Session Status</CardTitle>
            <CardDescription>Current authentication status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <p className="text-muted-foreground">Session test page</p>
              <p className="text-sm text-muted-foreground mt-2">Authentication not implemented yet</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 