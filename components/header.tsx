"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Globe, ChevronDown } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { Logo } from "@/components/ui/logo"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Header() {
  const { language, setLanguage, isHydrated } = useLanguage()
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const translations = {
    mn: {
      home: "Нүүр",
      about: "Бидний тухай",
      whyChina: "Хятад дахь боловсрол",
      services: "Үйлчилгээ",
      team: "Багийн гишүүд",
      contact: "Холбоо барих",
    },
    en: {
      home: "Home",
      about: "About",
      whyChina: "Study in China",
      services: "Services",
      team: "Team",
      contact: "Contact",
    },
    zh: {
      home: "主页",
      about: "关于我们",
      whyChina: "在中国学习",
      services: "服务",
      team: "团队",
      contact: "联系",
    },
  }

  const t = translations[language as keyof typeof translations]

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
            <Link href="/" className="text-sm font-medium transition-colors hover:text-primary">
              {t.home}
            </Link>
            <Link href="#about" className="text-sm font-medium transition-colors hover:text-primary">
              {t.about}
            </Link>
            <Link href="#why-china" className="text-sm font-medium transition-colors hover:text-primary">
              {t.whyChina}
            </Link>
            <Link href="#services" className="text-sm font-medium transition-colors hover:text-primary">
              {t.services}
            </Link>
            <Link href="#team" className="text-sm font-medium transition-colors hover:text-primary">
              {t.team}
            </Link>
            <Link href="#contact" className="text-sm font-medium transition-colors hover:text-primary">
              {t.contact}
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <Globe className="h-4 w-4" />
                  <span>
                    {!isHydrated ? "🇲🇳" : language === "mn" ? "🇲🇳" : language === "en" ? "🇺🇸" : "🇨🇳"}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setLanguage("mn")}>
                  🇲🇳 Монгол
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("en")}>
                  🇺🇸 English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("zh")}>
                  🇨🇳 中文
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

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
              <Link
                href="/"
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.home}
              </Link>
              <Link
                href="#about"
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.about}
              </Link>
              <Link
                href="#why-china"
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.whyChina}
              </Link>
              <Link
                href="#services"
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.services}
              </Link>
              <Link
                href="#team"
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.team}
              </Link>
              <Link
                href="#contact"
                className="text-sm font-medium transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                {t.contact}
              </Link>
              <div className="flex items-center space-x-4 pt-4">
                {/* Mobile Language Selector */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                      <Globe className="h-4 w-4" />
                      <span>
                        {!isHydrated ? "🇲🇳" : language === "mn" ? "🇲🇳" : language === "en" ? "🇺🇸" : "🇨🇳"}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setLanguage("mn")}>
                      🇲🇳 Монгол
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setLanguage("en")}>
                      🇺🇸 English
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setLanguage("zh")}>
                      🇨🇳 中文
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
