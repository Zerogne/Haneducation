"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { ContactForm } from "@/components/contact-form"

interface ContactContent {
  title: string
  description: string
  phone: string
  email: string
  getAdviceText: string
}

export function CallToAction() {
  const [content, setContent] = useState<ContactContent>({
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
      fetchContactContent()
    }
  }, [hasInitialized])

  const fetchContactContent = async () => {
    try {
      console.log("Fetching contact content...")
      const response = await fetch('/api/content?section=contact&language=mn')
      if (response.ok) {
        const data = await response.json()
        console.log("Contact content response:", data)
        if (data.content && data.content.length > 0) {
          try {
            const parsedContent = JSON.parse(data.content[0].content)
            console.log("Parsed contact content:", parsedContent)
            setContent(parsedContent)
          } catch (error) {
            console.error("Error parsing contact content:", error)
          }
        } else {
          console.log("No contact content found in database")
        }
      } else {
        console.error("Failed to fetch contact content:", response.status)
      }
    } catch (error) {
      console.error("Error fetching contact content:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="py-20 w-full">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">{loading ? "Холбоо барих" : content.title || "Холбоо барих"}</h2>
              <p className="text-xl text-muted-foreground">
                {loading ? "Бидэнтэй холбогдоод үнэгүй зөвлөгөө аваарай" : content.description || "Бидэнтэй холбогдоод үнэгүй зөвлөгөө аваарай"}
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 group cursor-pointer p-3 rounded-lg hover:bg-primary/5 transition-all duration-300 ease-out">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300 ease-out">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium group-hover:text-primary transition-colors duration-300 ease-out">Утас</p>
                  <p className="text-muted-foreground group-hover:text-primary/70 transition-colors duration-300 ease-out">{loading ? "+976 7777 7777" : content.phone || "+976 7777 7777"}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 group cursor-pointer p-3 rounded-lg hover:bg-primary/5 transition-all duration-300 ease-out">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300 ease-out">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium group-hover:text-primary transition-colors duration-300 ease-out">И-мэйл</p>
                  <p className="text-muted-foreground group-hover:text-primary/70 transition-colors duration-300 ease-out">{loading ? "info@haneducation.mn" : content.email || "info@haneducation.mn"}</p>
                </div>
              </div>
            </div>
            <div className="w-full">
              <Button 
                size="lg" 
                className="group relative bg-primary hover:bg-primary/90 transition-all duration-300 ease-out shadow-lg hover:shadow-xl w-full" 
                asChild
              >
                <a href="/registration" className="relative z-10">
                  Өргөдөл гаргах
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
                </a>
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="group"
          >
            <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-0 hover:shadow-lg transition-all duration-300 ease-out hover:-translate-y-1 relative overflow-hidden">
              <CardContent className="p-8 relative z-10">
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors duration-300 ease-out">Үнэгүй зөвлөгөө авах</h3>
                    <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300 ease-out">
                      Бидэнтэй холбогдоод үнэгүй зөвлөгөө аваарай
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-4 bg-background rounded-lg group-hover:bg-primary/5 transition-all duration-300 ease-out hover:scale-105">
                      <div className="text-2xl font-bold text-primary group-hover:scale-110 transition-transform duration-300 ease-out">24/7</div>
                      <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300 ease-out">Дэмжлэг</div>
                    </div>
                    <div className="p-4 bg-background rounded-lg group-hover:bg-primary/5 transition-all duration-300 ease-out hover:scale-105">
                      <div className="text-2xl font-bold text-primary group-hover:scale-110 transition-transform duration-300 ease-out">100%</div>
                      <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300 ease-out">Найдвартай</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="relative group/img">
                      <img
                        src="/placeholder.svg?height=200&width=300&text=Contact+Us"
                        alt="Contact illustration"
                        className="mx-auto rounded-lg transition-all duration-300 ease-out group-hover/img:scale-105 group-hover/img:shadow-lg"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
