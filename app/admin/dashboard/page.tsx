"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Users,
  Image, 
  FileText, 
  Settings, 
  GraduationCap,
  Building,
  Database,
  BarChart3
} from "lucide-react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useState, useEffect } from "react"

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

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)

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
    } finally {
      setLoading(false)
    }
  }

  if (status === "loading") {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (!session) {
    redirect("/admin/login")
  }

  const formatStorage = (gb: number) => {
    if (gb < 1) {
      return `${Math.round(gb * 1024)} MB`
    }
    return `${gb.toFixed(2)} GB`
  }

  const adminSections = [
    {
      title: "Content",
      description: "Edit website content, team members, and testimonials",
      icon: FileText,
      href: "/admin/content",
      color: "bg-indigo-500",
      count: analytics ? `${analytics.content}` : "0"
    },
    {
      title: "Images",
      description: "Upload and manage website images",
      icon: Image,
      href: "/admin/images",
      color: "bg-teal-500",
      count: analytics ? `${analytics.images}` : "0"
    },
    {
      title: "Analytics",
      description: "View website analytics and statistics",
      icon: BarChart3,
      href: "/admin/analytics",
      color: "bg-yellow-500",
      count: "Live"
    },
    {
      title: "Storage",
      description: "Monitor database and storage usage",
      icon: Database,
      href: "/admin/storage",
      color: "bg-gray-500",
      count: "Info"
    },
    {
      title: "Settings",
      description: "Configure website settings",
      icon: Settings,
      href: "/admin/settings",
      color: "bg-slate-500",
      count: "Config"
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            Welcome back, {session.user?.name}. Manage your website content from here.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? "..." : analytics ? analytics.students : 0}
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
                {loading ? "..." : analytics ? analytics.services : 0}
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
                {loading ? "..." : analytics ? analytics.partners : 0}
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
                {loading ? "..." : analytics ? formatStorage(analytics.storage.used) : "0 MB"}
              </div>
              <p className="text-xs text-muted-foreground">
                {analytics ? `${analytics.storage.percentage}%` : "0%"} of {analytics ? formatStorage(analytics.storage.total) : "512 MB"}
              </p>
            </CardContent>
          </Card>
        </div>

                {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <Link href="/admin/content">
                <FileText className="h-4 w-4 mr-2" />
                Edit Content
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/admin/images">
                <Image className="h-4 w-4 mr-2" />
                Manage Images
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/admin/analytics">
                <BarChart3 className="h-4 w-4 mr-2" />
                View Analytics
              </Link>
            </Button>
          </div>
        </div>

        {/* Management Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {adminSections.map((section) => (
            <Link key={section.title} href={section.href}>
              <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group h-48">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-lg ${section.color} text-white group-hover:scale-110 transition-transform duration-300`}>
                      <section.icon className="h-6 w-6" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {section.count}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-lg mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {section.title}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {section.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
} 