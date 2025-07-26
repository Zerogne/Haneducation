"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Users, Database, Settings, LogOut } from "lucide-react"
import { signOut } from "next-auth/react"

export function AdminSidebar() {
  const pathname = usePathname()

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Students", href: "/admin/students", icon: Users },
    { name: "Storage", href: "/admin/storage", icon: Database },
    { name: "Settings", href: "/admin/session-test", icon: Settings },
  ]

  return (
    <Card className="h-full">
      <CardContent className="p-4">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">HAN</span>
            </div>
            <span className="font-bold text-xl">Admin</span>
          </div>
          
          <nav className="space-y-2">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href}>
                <Button
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className={cn("w-full justify-start", pathname === item.href ? "bg-secondary" : "")}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Button>
              </Link>
            ))}
          </nav>

          <div className="pt-4 border-t">
            <Button
              variant="ghost"
              className="w-full justify-start"
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
            >
              <LogOut className="h-5 w-5 mr-3" />
              Logout
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
