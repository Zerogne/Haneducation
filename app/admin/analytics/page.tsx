"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Users, 
  GraduationCap, 
  MessageSquare, 
  UserCheck,
  Building,
  Image,
  FileText,
  Database,
  RefreshCw,
  TrendingUp,
  BarChart3
} from "lucide-react"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { toast } from "sonner"

interface AnalyticsData {
  students: number
  services: number
  testimonials: number
  team: number
  partners: number
  images: number
  content: number
  storage: {
    used: number
    total: number
    percentage: number
  }
}

export default function AnalyticsPage() {
  const { data: session, status } = useSession()
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  if (status === "loading") {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (!session) {
    redirect("/admin/login")
  }

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/analytics')
      if (response.ok) {
        const data = await response.json()
        setAnalytics(data)
      }
    } catch (error) {
      console.error('Error fetching analytics:', error)
      toast.error("Failed to fetch analytics data")
    } finally {
      setLoading(false)
    }
  }

  const refreshData = async () => {
    setRefreshing(true)
    await fetchAnalytics()
    setRefreshing(false)
    toast.success("Analytics data refreshed")
  }

  const formatStorage = (gb: number) => {
    if (gb < 1) {
      return `${Math.round(gb * 1024)} MB`
    }
    return `${gb.toFixed(3)} GB`
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading analytics...</p>
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
            <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-600 mt-2">Real-time website statistics and insights</p>
          </div>
          <Button onClick={refreshData} disabled={refreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? "Refreshing..." : "Refresh"}
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analytics ? analytics.students : 0}
              </div>
              <p className="text-xs text-muted-foreground">
                Registered students
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Services</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analytics ? analytics.services : 0}
              </div>
              <p className="text-xs text-muted-foreground">
                Available services
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Partner Universities</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analytics ? analytics.partners : 0}
              </div>
              <p className="text-xs text-muted-foreground">
                Partner institutions
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analytics ? formatStorage(analytics.storage.used) : "0 MB"}
              </div>
              <p className="text-xs text-muted-foreground">
                {analytics ? `${analytics.storage.percentage}%` : "0%"} of {analytics ? formatStorage(analytics.storage.total) : "512 MB"}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Content Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Testimonials</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analytics ? analytics.testimonials : 0}
              </div>
              <p className="text-xs text-muted-foreground">
                Customer reviews
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Team Members</CardTitle>
              <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analytics ? analytics.team : 0}
              </div>
              <p className="text-xs text-muted-foreground">
                Staff members
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Media Files</CardTitle>
              <Image className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {analytics ? analytics.images : 0}
              </div>
              <p className="text-xs text-muted-foreground">
                Uploaded images
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Storage Analysis */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="h-5 w-5 mr-2" />
              Storage Analysis
            </CardTitle>
            <CardDescription>
              Database and content storage breakdown
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-4">Database Usage</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Students Data</span>
                    <Badge variant="outline">
                      {analytics ? Math.round(analytics.students * 0.001 * 1024) : 0} MB
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Content Data</span>
                    <Badge variant="outline">
                      {analytics ? Math.round(analytics.content * 0.002 * 1024) : 0} MB
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Media Metadata</span>
                    <Badge variant="outline">
                      {analytics ? Math.round(analytics.images * 0.005 * 1024) : 0} MB
                    </Badge>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-medium mb-4">Storage Status</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Used Space</span>
                    <span className="font-medium">
                      {analytics ? formatStorage(analytics.storage.used) : "0 MB"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Available Space</span>
                    <span className="font-medium">
                      {analytics ? formatStorage(analytics.storage.total - analytics.storage.used) : "512 MB"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Usage Percentage</span>
                    <Badge variant={analytics && analytics.storage.percentage > 80 ? "destructive" : "default"}>
                      {analytics ? `${analytics.storage.percentage}%` : "0%"}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Insights & Recommendations
            </CardTitle>
            <CardDescription>
              Data-driven insights for your website
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics && analytics.students === 0 && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">No Students Yet</h4>
                  <p className="text-sm text-blue-700">
                    You haven't received any student registrations yet. Consider promoting your services 
                    and making the registration form more visible on your website.
                  </p>
                </div>
              )}

              {analytics && analytics.storage.percentage > 70 && (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-medium text-yellow-800 mb-2">Storage Warning</h4>
                  <p className="text-sm text-yellow-700">
                    Your database is using {analytics.storage.percentage}% of available space. 
                    Consider cleaning up old data or upgrading your MongoDB Atlas plan.
                  </p>
                </div>
              )}

              {analytics && analytics.students > 0 && (
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-2">Active Engagement</h4>
                  <p className="text-sm text-green-700">
                    Great! You have {analytics.students} student{analytics.students === 1 ? '' : 's'} registered. 
                    Keep up the good work with your marketing efforts.
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div>
                  <h4 className="font-medium mb-2">Quick Actions:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Review and respond to student inquiries</li>
                    <li>• Update service offerings</li>
                    <li>• Add new testimonials</li>
                    <li>• Optimize website content</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Performance Tips:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Monitor storage usage regularly</li>
                    <li>• Backup important data</li>
                    <li>• Keep content fresh and updated</li>
                    <li>• Track student engagement metrics</li>
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