"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"


export function Partners() {
  const [partners, setPartners] = useState([
    { name: "Tsinghua University", logo: "/placeholder.svg?height=60&width=120&text=TSINGHUA" },
    { name: "Peking University", logo: "/placeholder.svg?height=60&width=120&text=PEKING" },
    { name: "Fudan University", logo: "/placeholder.svg?height=60&width=120&text=FUDAN" },
    { name: "Shanghai Jiao Tong", logo: "/placeholder.svg?height=60&width=120&text=SJTU" },
    { name: "Zhejiang University", logo: "/placeholder.svg?height=60&width=120&text=ZJU" },
    { name: "Nanjing University", logo: "/placeholder.svg?height=60&width=120&text=NJU" },
  ])
  const [sectionContent, setSectionContent] = useState({
    title: "Хамтрагч их сургуулиуд",
    description: "Бидний хамтрагч Хятадын их сургуулиуд",
    badge: "Хамтрагчид"
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPartnersContent()
  }, [])

  const fetchPartnersContent = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/content?section=partners')
      if (response.ok) {
        const data = await response.json()
        if (data.content && data.content.length > 0) {
          try {
            const content = JSON.parse(data.content[0].content)
            setSectionContent({
              title: content.title || "Хамтрагч их сургуулиуд",
              description: content.description || "Бидний хамтрагч Хятадын их сургуулиуд",
              badge: content.badge || "Хамтрагчид"
            })
            if (content.partners && Array.isArray(content.partners)) {
              setPartners(content.partners)
            }
          } catch (error) {
            console.error('Error parsing partners content:', error)
          }
        }
      }
    } catch (error) {
      console.error('Error fetching partners content:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="partners" className="py-20 w-full">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4">
            {sectionContent.badge}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {sectionContent.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {sectionContent.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="flex items-center justify-center p-6 bg-background border border-border rounded-lg hover:shadow-lg transition-all duration-300 ease-out hover:-translate-y-1 hover:border-primary/20">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-12 w-auto grayscale group-hover:grayscale-0 transition-all duration-300 ease-out group-hover:scale-105"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
