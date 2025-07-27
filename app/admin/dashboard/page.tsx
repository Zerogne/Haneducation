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
  MessageSquare, 
  Building, 
  UserCheck,
  Upload,
  Database,
  BarChart3
} from "lucide-react"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

export default function AdminDashboard() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (!session) {
    redirect("/admin/login")
  }

  const adminSections = [
    {
      title: "Students",
      description: "Manage student registrations and applications",
      icon: Users,
      href: "/admin/students",
      color: "bg-blue-500",
      count: "60+"
    },
    {
      title: "Services",
      description: "Edit service cards and features",
      icon: GraduationCap,
      href: "/admin/services",
      color: "bg-green-500",
      count: "6"
    },
    {
      title: "Testimonials",
      description: "Manage customer testimonials",
      icon: MessageSquare,
      href: "/admin/testimonials",
      color: "bg-purple-500",
      count: "4"
    },
    {
      title: "Team",
      description: "Edit team member information",
      icon: UserCheck,
      href: "/admin/team",
      color: "bg-orange-500",
      count: "3"
    },
    {
      title: "Partners",
      description: "Manage partner universities",
      icon: Building,
      href: "/admin/partners",
      color: "bg-red-500",
      count: "6"
    },
    {
      title: "Images",
      description: "Upload and manage website images",
      icon: Image,
      href: "/admin/images",
      color: "bg-teal-500",
      count: "12"
    },
    {
      title: "Content",
      description: "Edit website content and text",
      icon: FileText,
      href: "/admin/content",
      color: "bg-indigo-500",
      count: "8"
    },
    {
      title: "Upload",
      description: "Upload new images to Cloudinary",
      icon: Upload,
      href: "/admin/upload",
      color: "bg-pink-500",
      count: "New"
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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome back, {session.user?.name}. Manage your website content from here.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">60+</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Services</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6</div>
              <p className="text-xs text-muted-foreground">
                All services active
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Partner Universities</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6</div>
              <p className="text-xs text-muted-foreground">
                Premium partnerships
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0.15 GB</div>
              <p className="text-xs text-muted-foreground">
                3% of 5GB total
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Management Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {adminSections.map((section) => (
            <Link key={section.title} href={section.href}>
              <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group">
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

      {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <Link href="/admin/upload">
                <Upload className="h-4 w-4 mr-2" />
                Upload New Image
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/admin/students">
                <Users className="h-4 w-4 mr-2" />
                View Students
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/admin/services">
                <GraduationCap className="h-4 w-4 mr-2" />
                Edit Services
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/admin/content">
                <FileText className="h-4 w-4 mr-2" />
                Edit Content
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 