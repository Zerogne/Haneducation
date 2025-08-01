"use client"
import Link from "next/link"
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"

import { Logo } from "@/components/ui/logo"
import { useState, useEffect } from "react"

// Smooth scroll function
const smoothScrollTo = (targetId: string) => {
  const target = document.querySelector(targetId)
  if (target) {
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }
}


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
              <Link href="https://www.facebook.com/profile.php?id=61574712638499" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="https://www.instagram.com/haneducation_/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Үйлчилгээ</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <button onClick={() => smoothScrollTo('#services')} className="hover:text-primary bg-transparent border-none cursor-pointer text-left w-full text-muted-foreground">
                  Их сургуулийн элсэлт
                </button>
              </li>
              <li>
                <button onClick={() => smoothScrollTo('#services')} className="hover:text-primary bg-transparent border-none cursor-pointer text-left w-full text-muted-foreground">
                  Хятад хэлний сургалт
                </button>
              </li>
              <li>
                <button onClick={() => smoothScrollTo('#services')} className="hover:text-primary bg-transparent border-none cursor-pointer text-left w-full text-muted-foreground">
                  Виз, баримт бичиг
                </button>
              </li>
              <li>
                <button onClick={() => smoothScrollTo('#services')} className="hover:text-primary bg-transparent border-none cursor-pointer text-left w-full text-muted-foreground">
                  Тэтгэлэг
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Бидний тухай</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <button onClick={() => smoothScrollTo('#about')} className="hover:text-primary bg-transparent border-none cursor-pointer text-left w-full text-muted-foreground">
                  Бидний тухай
                </button>
              </li>
              <li>
                <button onClick={() => smoothScrollTo('#team')} className="hover:text-primary bg-transparent border-none cursor-pointer text-left w-full text-muted-foreground">
                  Багийн гишүүд
                </button>
              </li>
              <li>
                <button onClick={() => smoothScrollTo('#partners')} className="hover:text-primary bg-transparent border-none cursor-pointer text-left w-full text-muted-foreground">
                  Хамтрагч их сургууль
                </button>
              </li>
              
              <li>
                <button onClick={() => smoothScrollTo('#contact')} className="hover:text-primary bg-transparent border-none cursor-pointer text-left w-full text-muted-foreground">
                  Холбоо барих
                </button>
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
          <p>2025 HAN Education | All rights reserved. </p>
        </div>
      </div>
    </footer>
  )
}
