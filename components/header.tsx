"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { Logo } from "@/components/ui/logo"

// Smooth scroll function
const smoothScrollTo = (targetId: string) => {
  if (targetId === '#top') {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  } else {
    const target = document.querySelector(targetId)
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }
}

export default function Header() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Simple navigation items - will be managed through database content
  const navItems = [
    { href: "#top", label: "Нүүр" },
    { href: "#about", label: "Бидний тухай" },
    { href: "#why-china", label: "Хятад дахь боловсрол" },
    { href: "#services", label: "Үйлчилгээ" },
    { href: "#partners", label: "Хамтрагчид" },
    { href: "#contact", label: "Холбоо барих" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Logo width={40} height={40} />
            <span className="text-xl font-bold">HAN Education</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => {
                  if (item.href.startsWith('#')) {
                    smoothScrollTo(item.href)
                  } else {
                    window.location.href = item.href
                  }
                }}
                className="text-sm font-medium transition-colors hover:text-primary bg-transparent border-none cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
              disabled={!mounted}
            >
              {!mounted ? (
                <div className="h-4 w-4" />
              ) : resolvedTheme === "light" ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-4 border-t">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => {
                    if (item.href.startsWith('#')) {
                      smoothScrollTo(item.href)
                    } else {
                      window.location.href = item.href
                    }
                    setIsMenuOpen(false)
                  }}
                  className="text-sm font-medium transition-colors hover:text-primary bg-transparent border-none cursor-pointer text-left"
                >
                  {item.label}
                </button>
              ))}
              <div className="flex items-center space-x-4 pt-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setTheme(resolvedTheme === "light" ? "dark" : "light")}
                  disabled={!mounted}
                >
                  {!mounted ? (
                    <div className="h-4 w-4" />
                  ) : resolvedTheme === "light" ? (
                    <Moon className="h-4 w-4" />
                  ) : (
                    <Sun className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
