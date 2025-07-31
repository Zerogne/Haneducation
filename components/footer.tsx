"use client"
import Link from "next/link"
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"

import { Logo } from "@/components/ui/logo"
import { useState, useEffect } from "react"


interface FooterContent {
  description: string
  copyright: string
}

interface ContactContent {
  title: string
  description: string
  phone: string
  email: string
  getAdviceText: string
}

export function Footer() {
  const [content, setContent] = useState<FooterContent>({
    description: "HAN Education - Таны боловсролын түнш",
    copyright: "Бүх эрх хуулиар хамгаалагдсан."
  })
  const [contactContent, setContactContent] = useState<ContactContent>({
    title: "Холбоо барих",
    description: "Бидэнтэй холбогдоод үнэгүй зөвлөгөө аваарай",
    phone: "+976 7777 7777",
    email: "info@haneducation.mn",
    getAdviceText: "Үнэгүй зөвлөгөө авах"
  })
  const [loading, setLoading] = useState(true)
  const [hasInitialized, setHasInitialized] = useState(false)

  useEffect(() => {
    if (!hasInitialized) {
      setHasInitialized(true)
      fetchFooterContent()
      fetchContactContent()
    }
  }, [hasInitialized])

  const fetchFooterContent = async () => {
    try {
      const response = await fetch(`/api/content?section=footer&language=mn`)
      if (response.ok) {
        const data = await response.json()
        if (data.content && data.content.length > 0) {
          try {
            const footerContent = JSON.parse(data.content[0].content)
            setContent(footerContent)
          } catch {
            // Use default content if parsing fails
            console.log("Failed to parse footer content, using default")
          }
        }
      }
    } catch (error) {
      console.error('Error fetching footer content:', error)
    }
  }

  const fetchContactContent = async () => {
    try {
      const response = await fetch(`/api/content?section=contact&language=mn`)
      if (response.ok) {
        const data = await response.json()
        if (data.content && data.content.length > 0) {
          try {
            const contactData = JSON.parse(data.content[0].content)
            setContactContent(contactData)
          } catch {
            console.log("Failed to parse contact content, using default")
          }
        }
      }
    } catch (error) {
      console.error('Error fetching contact content:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <footer className="bg-muted/50 border-t w-full">
      <div className="max-w-7xl mx-auto px-8 lg:px-16 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Logo width={32} height={32} />
              <span className="font-bold text-xl">HAN Education</span>
            </div>
            <p className="text-muted-foreground">
              {loading ? "Хятадад тэтгэлэгтэй суралцах боломжийг танд олгоно" : content.description || "Хятадад тэтгэлэгтэй суралцах боломжийг танд олгоно"}
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Үйлчилгээ</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-primary">
                  Их сургуулийн элсэлт
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Хятад хэлний сургалт
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Виз, баримт бичиг
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Тэтгэлэг
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Бидний тухай</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-primary">
                  Бидний тухай
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Багийн гишүүд
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Хамтрагч их сургууль
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Карьер
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Холбоо барих
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Холбоо барих</h3>
            <div className="space-y-3 text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>Утас: {loading ? "+976 7777 7777" : contactContent.phone || "+976 7777 7777"}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>И-мэйл: {loading ? "info@haneducation.mn" : contactContent.email || "info@haneducation.mn"}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} HAN Education. {loading ? "All rights reserved." : content.copyright || "All rights reserved."}</p>
        </div>
      </div>
    </footer>
  )
}
