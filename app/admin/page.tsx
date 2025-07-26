"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, ImageIcon, TrendingUp, Globe, Database, Cloud } from "lucide-react"
import { useRouter } from "next/navigation"
import { AdminSidebar } from "@/components/admin/sidebar"

interface DashboardData {
  students: {
    total: number
    pending: number
    enrolled: number
  }
  content: {
    total: number
    languages: number
  }
  storage: {
    mongodb: {
      used: number
      total: number
      percentage: number
    }
    cloudinary: {
      used: number
      total: number
      percentage: number
    }
  }
  media: {
    total: number
    images: number
    documents: number
  }
}

export default function AdminPanel() {
  const router = useRouter()
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true)

      // Fetch data from multiple endpoints
      const [studentsRes, contentRes, storageRes, mediaRes] = await Promise.all([
        fetch("/api/students"),
        fetch("/api/content"),
        fetch("/api/storage"),
        fetch("/api/images")
      ])

      const students = await studentsRes.json()
      const content = await contentRes.json()
      const storage = await storageRes.json()
      const media = await mediaRes.json()

      setDashboardData({
        students: {
          total: students.students?.length || 0,
          pending: students.students?.filter((s: any) => s.status === "pending").length || 0,
          enrolled: students.students?.filter((s: any) => s.status === "enrolled").length || 0
        },
        content: {
          total: content.contents?.length || 0,
          languages: content.contents?.reduce((acc: number, c: any) => {
            return acc + Object.keys(c.translations || {}).length
          }, 0) || 0
        },
        storage: {
          mongodb: storage.mongodb || { used: 0, total: 5, percentage: 0 },
          cloudinary: storage.cloudinary || { used: 0, total: 1000, percentage: 0 }
        },
        media: {
          total: media.images?.length || 0,
          images: media.images?.filter((i: any) => i.type === "image").length || 0,
          documents: media.images?.filter((i: any) => i.type === "document").length || 0
        }
      })
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-background">
      <div className="w-64 hidden md:block">
        <AdminSidebar />
      </div>

      <div className="flex-1 overflow-auto">
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground">Welcome to the admin panel</p>
            </div>
            <Button onClick={fetchDashboardData} variant="outline">
              Refresh Data
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData?.students.total || 0}</div>
                <div className="flex items-center mt-1 space-x-2">
                  <Badge variant="secondary" className="text-xs">
                    {dashboardData?.students.pending || 0} pending
                  </Badge>
                  <Badge variant="default" className="text-xs">
                    {dashboardData?.students.enrolled || 0} enrolled
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Content Items</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData?.content.total || 0}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {dashboardData?.content.languages || 0} language translations
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Media Files</CardTitle>
                <ImageIcon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData?.media.total || 0}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {dashboardData?.media.images || 0} images, {dashboardData?.media.documents || 0} documents
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Storage Usage</CardTitle>
                <Database className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{dashboardData?.storage.mongodb.percentage || 0}%</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {dashboardData?.storage.mongodb.used || 0}GB / {dashboardData?.storage.mongodb.total || 5}GB
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Storage Overview</CardTitle>
                <CardDescription>Database and cloud storage usage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Database className="h-4 w-4" />
                      <span>MongoDB</span>
                    </div>
                    <span>{dashboardData?.storage.mongodb.percentage || 0}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Cloud className="h-4 w-4" />
                      <span>Cloudinary</span>
                    </div>
                    <span>{dashboardData?.storage.cloudinary.percentage || 0}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common admin tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <Button onClick={() => router.push("/admin/students")}>
                    Manage Students
                  </Button>
                  <Button onClick={() => router.push("/admin/storage")} variant="outline">
                    View Storage
                  </Button>
                  <Button variant="outline">
                    Add Content
                  </Button>
                  <Button variant="outline">
                    Upload Media
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
