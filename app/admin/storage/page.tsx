"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Database, 
  Cloud, 
  HardDrive, 
  RefreshCw,
  TrendingUp,
  AlertTriangle,
  CheckCircle
} from "lucide-react"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { toast } from "sonner"

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
  const { data: session, status } = useSession()
  const [storageData, setStorageData] = useState<StorageData | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  if (status === "loading") {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (!session) {
    redirect("/admin/login")
  }

  useEffect(() => {
    fetchStorageData()
  }, [])

  const fetchStorageData = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/storage")
      const data = await response.json()
      setStorageData(data)
    } catch (error) {
      console.error("Error fetching storage data:", error)
      toast.error("Failed to fetch storage data")
    } finally {
      setLoading(false)
    }
  }

  const refreshData = async () => {
    setRefreshing(true)
    await fetchStorageData()
    setRefreshing(false)
    toast.success("Storage data refreshed")
  }

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getStatusColor = (percentage: number) => {
    if (percentage < 70) return "text-green-600"
    if (percentage < 90) return "text-yellow-600"
    return "text-red-600"
  }

  const getStatusIcon = (percentage: number) => {
    if (percentage < 70) return <CheckCircle className="h-5 w-5 text-green-600" />
    if (percentage < 90) return <AlertTriangle className="h-5 w-5 text-yellow-600" />
    return <AlertTriangle className="h-5 w-5 text-red-600" />
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading storage data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Storage Management</h1>
            <p className="text-gray-600 mt-2">Monitor database and cloud storage usage</p>
          </div>
          <Button onClick={refreshData} disabled={refreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? "Refreshing..." : "Refresh"}
          </Button>
        </div>

        {/* Storage Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* MongoDB Storage */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Database className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle>MongoDB Database</CardTitle>
                    <CardDescription>Database storage usage</CardDescription>
                  </div>
                </div>
                {storageData && getStatusIcon(storageData.mongodb.percentage)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Storage Used</span>
                <span className={`text-sm font-bold ${getStatusColor(storageData?.mongodb.percentage || 0)}`}>
                  {storageData ? formatBytes(storageData.mongodb.used * 1024 * 1024 * 1024) : '0 GB'}
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Usage</span>
                  <span>{storageData?.mongodb.percentage || 0}%</span>
                </div>
                <Progress value={storageData?.mongodb.percentage || 0} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Total Space:</span>
                  <p className="font-medium">{storageData ? formatBytes(storageData.mongodb.total * 1024 * 1024 * 1024) : '0 GB'}</p>
                </div>
                <div>
                  <span className="text-gray-500">Available:</span>
                  <p className="font-medium">
                    {storageData ? formatBytes((storageData.mongodb.total - storageData.mongodb.used) * 1024 * 1024 * 1024) : '0 GB'}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Status</span>
                  <Badge variant={storageData && storageData.mongodb.percentage > 90 ? "destructive" : "default"}>
                    {storageData && storageData.mongodb.percentage > 90 ? "Critical" : "Healthy"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cloudinary Storage */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Cloud className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <CardTitle>Cloudinary Storage</CardTitle>
                    <CardDescription>Image and media storage</CardDescription>
                  </div>
                </div>
                {storageData && getStatusIcon(storageData.cloudinary.percentage)}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Storage Used</span>
                <span className={`text-sm font-bold ${getStatusColor(storageData?.cloudinary.percentage || 0)}`}>
                  {storageData ? formatBytes(storageData.cloudinary.used * 1024 * 1024) : '0 MB'}
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Usage</span>
                  <span>{storageData?.cloudinary.percentage || 0}%</span>
                </div>
                <Progress value={storageData?.cloudinary.percentage || 0} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Total Space:</span>
                  <p className="font-medium">{storageData ? formatBytes(storageData.cloudinary.total * 1024 * 1024) : '0 MB'}</p>
                </div>
                <div>
                  <span className="text-gray-500">Available:</span>
                  <p className="font-medium">
                    {storageData ? formatBytes((storageData.cloudinary.total - storageData.cloudinary.used) * 1024 * 1024) : '0 MB'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Objects:</span>
                  <p className="font-medium">{storageData?.cloudinary.objects || 0}</p>
                </div>
                <div>
                  <span className="text-gray-500">Transformations:</span>
                  <p className="font-medium">{storageData?.cloudinary.transformations || 0}</p>
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Status</span>
                  <Badge variant={storageData && storageData.cloudinary.percentage > 90 ? "destructive" : "default"}>
                    {storageData && storageData.cloudinary.percentage > 90 ? "Critical" : "Healthy"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Storage Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Storage Used</CardTitle>
              <HardDrive className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {storageData ? 
                  formatBytes((storageData.mongodb.used * 1024 * 1024 * 1024) + (storageData.cloudinary.used * 1024 * 1024)) : 
                  '0 Bytes'
                }
              </div>
              <p className="text-xs text-muted-foreground">
                Combined database and cloud storage
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Storage Efficiency</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {storageData ? 
                  Math.round(((storageData.mongodb.used + storageData.cloudinary.used) / 
                  (storageData.mongodb.total + storageData.cloudinary.total)) * 100) : 
                  0
                }%
              </div>
              <p className="text-xs text-muted-foreground">
                Overall storage utilization
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Media Objects</CardTitle>
              <Cloud className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {storageData?.cloudinary.objects || 0}
              </div>
              <p className="text-xs text-muted-foreground">
                Total uploaded media files
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recommendations */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Storage Recommendations</CardTitle>
            <CardDescription>
              Tips for optimizing your storage usage
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {storageData && storageData.mongodb.percentage > 80 && (
                <div className="flex items-start space-x-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800">Database Storage Warning</h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      Your MongoDB database is using {storageData.mongodb.percentage}% of available space. 
                      Consider cleaning up old data or upgrading your storage plan.
                    </p>
                  </div>
                </div>
              )}

              {storageData && storageData.cloudinary.percentage > 80 && (
                <div className="flex items-start space-x-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800">Cloud Storage Warning</h4>
                    <p className="text-sm text-yellow-700 mt-1">
                      Your Cloudinary storage is using {storageData.cloudinary.percentage}% of available space. 
                      Consider optimizing images or upgrading your plan.
                    </p>
                  </div>
                </div>
              )}

              {(!storageData || (storageData.mongodb.percentage < 70 && storageData.cloudinary.percentage < 70)) && (
                <div className="flex items-start space-x-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-800">Storage Health Good</h4>
                    <p className="text-sm text-green-700 mt-1">
                      Your storage usage is within healthy limits. Continue monitoring for optimal performance.
                    </p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div>
                  <h4 className="font-medium mb-2">Database Optimization Tips:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Regularly clean up old student records</li>
                    <li>• Archive inactive content</li>
                    <li>• Optimize database queries</li>
                    <li>• Monitor for duplicate data</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Media Optimization Tips:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Compress images before upload</li>
                    <li>• Use appropriate image formats</li>
                    <li>• Remove unused media files</li>
                    <li>• Implement lazy loading</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 