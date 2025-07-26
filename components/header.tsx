"use client"

import { useState } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Globe } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { Logo } from "@/components/ui/logo"

export default function Header() {
  const { language, setLanguage } = useLanguage()
  const { theme, setTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const translations = {
    mn: {
      home: "Нүүр",
      about: "Бидний тухай",
      services: "Үйлчилгээ",
      team: "Багийн гишүүд",
      contact: "Холбоо барих",
      register: "Бүртгүүлэх",
    },
    en: {
      home: "Home",
      about: "About",
      services: "Services",
      team: "Team",
      contact: "Contact",
      register: "Register",
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
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === "mn" ? "en" : "mn")}
              className="flex items-center space-x-2"
            >
              <Globe className="h-4 w-4" />
              <span>{language === "mn" ? "EN" : "MN"}</span>
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>

            {/* Register Button */}
            <Button asChild>
              <Link href="/registration">{t.register}</Link>
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
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
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
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setLanguage(language === "mn" ? "en" : "mn")}
                  className="flex items-center space-x-2"
                >
                  <Globe className="h-4 w-4" />
                  <span>{language === "mn" ? "EN" : "MN"}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                >
                  {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                </Button>
                <Button asChild>
                  <Link href="/registration">{t.register}</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
