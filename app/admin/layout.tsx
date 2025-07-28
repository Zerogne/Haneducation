"use client"

import { useRouter, usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { useSession, signOut } from "next-auth/react"
import { Logo } from "@/components/ui/logo"
import { Loader2 } from "lucide-react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const { data: session, status } = useSession()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  useEffect(() => {
    // If we're on /admin (not /admin/login), redirect to login
    if (pathname === "/admin") {
      router.push("/admin/login")
    }
  }, [pathname, router])

  // Protect admin routes (except login)
  useEffect(() => {
    if (status === "loading") return // Still loading, wait

    if (status === "unauthenticated" && pathname !== "/admin/login") {
      // User is not authenticated, redirect to login
      router.push("/admin/login")
    } else if (status === "authenticated" && session?.user?.role !== "admin") {
      // User is authenticated but not admin, sign them out
      signOut({ redirect: false })
      router.push("/admin/login")
    }
  }, [status, session, pathname, router])

  // If we're on /admin, show loading while redirecting
  if (pathname === "/admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p>Redirecting to login...</p>
        </div>
      </div>
    )
  }

  // Show loading while checking authentication
  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p>Checking authentication...</p>
        </div>
      </div>
    )
  }

  // If user is not authenticated and not on login page, show loading
  if (status === "unauthenticated" && pathname !== "/admin/login") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p>Redirecting to login...</p>
        </div>
      </div>
    )
  }

  // If we're on login page, don't show navbar or sidebar
  if (pathname === "/admin/login") {
    return <>{children}</>
  }

  // If user is not admin, don't show admin interface
  if (session?.user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p>Access denied. Redirecting...</p>
        </div>
      </div>
    )
  }

  const handleLogout = async () => {
    await signOut({ redirect: false })
    router.push("/admin/login")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm border-b">
        <div className="flex justify-between h-16 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex items-center space-x-3 ml-4">
              <Logo width={32} height={32} />
              <h1 className="text-xl font-semibold text-gray-900">Admin Panel</h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-700">Welcome, {session?.user?.name || 'Admin'}</span>
            <button
              onClick={handleLogout}
              className="text-sm text-red-600 hover:text-red-800"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <div className={`${isSidebarOpen ? 'w-64' : 'w-16'} bg-white shadow-sm transition-all duration-300 ease-in-out`}>
          <div className="h-full py-4">
            <nav className="space-y-2 px-3">
              <a
                href="/admin/dashboard"
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  pathname === "/admin/dashboard" ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <svg className="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                </svg>
                {isSidebarOpen && <span>Dashboard</span>}
              </a>
              <a
                href="/admin/students"
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  pathname === "/admin/students" ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <svg className="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
                {isSidebarOpen && <span>Students</span>}
              </a>
              <a
                href="/admin/team"
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  pathname === "/admin/team" ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <svg className="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {isSidebarOpen && <span>Team</span>}
              </a>
              <a
                href="/admin/content"
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  pathname === "/admin/content" ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <svg className="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {isSidebarOpen && <span>Content</span>}
              </a>
              <a
                href="/admin/images"
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  pathname === "/admin/images" ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <svg className="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {isSidebarOpen && <span>Images</span>}
              </a>
              <a
                href="/admin/settings"
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                  pathname === "/admin/settings" ? 'bg-indigo-100 text-indigo-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <svg className="mr-3 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {isSidebarOpen && <span>Settings</span>}
              </a>
            </nav>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-8">
          {children}
        </div>
      </div>
    </div>
  )
} 