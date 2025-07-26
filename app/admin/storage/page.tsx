"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Database, Cloud, HardDrive, FileArchive } from "lucide-react"
import { Loader2 } from "lucide-react"

interface StorageData {
  mongodb: {
    used: number
    total: number
    percentage: number
  }
  cloudinary: {
    used: number
    total: number
    percentage: number
    transformations: number
    objects: number
  }
}

export default function StoragePage() {
  const [storageData, setStorageData] = useState<StorageData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchStorageData()
  }, [])

  const fetchStorageData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch("/api/storage", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setStorageData(data)
    } catch (error) {
      console.error("Error fetching storage data:", error)
      setError("Failed to load storage data. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex items-center space-x-2">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span>Loading storage data...</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-red-600 mb-4">{error}</p>
                <Button onClick={fetchStorageData} variant="outline">
                  Try Again
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Storage Management</h1>
            <p className="text-muted-foreground">Monitor storage usage across all services</p>
          </div>
          <Button onClick={fetchStorageData} variant="outline">
            Refresh Data
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="h-5 w-5" />
                <span>Database Storage</span>
              </CardTitle>
              <CardDescription>MongoDB usage and statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Used</span>
                  <span>{storageData?.mongodb.used || 0} GB / {storageData?.mongodb.total || 5} GB</span>
                </div>
                <Progress value={storageData?.mongodb.percentage || 0} className="w-full" />
                <p className="text-sm text-muted-foreground">{storageData?.mongodb.percentage || 0}% used</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Cloud className="h-5 w-5" />
                <span>Media Storage</span>
              </CardTitle>
              <CardDescription>Cloudinary usage and statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Used</span>
                  <span>{storageData?.cloudinary.used || 0} MB / {storageData?.cloudinary.total || 1000} MB</span>
                </div>
                <Progress value={storageData?.cloudinary.percentage || 0} className="w-full" />
                <p className="text-sm text-muted-foreground">{storageData?.cloudinary.percentage || 0}% used</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Storage Overview</CardTitle>
              <CardDescription>Detailed storage statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Database className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Database</p>
                    <p className="text-sm text-muted-foreground">
                      {storageData?.mongodb.used || 0}GB / {storageData?.mongodb.total || 5}GB
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Cloud className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Cloud Storage</p>
                    <p className="text-sm text-muted-foreground">
                      {storageData?.cloudinary.used || 0}MB / {storageData?.cloudinary.total || 1000}MB
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <FileArchive className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Objects</p>
                    <p className="text-sm text-muted-foreground">
                      {storageData?.cloudinary.objects || 0} files stored
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
