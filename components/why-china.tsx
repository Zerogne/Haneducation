"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context"
import { Award, GraduationCap, Languages, Cpu, Users, MapPin } from "lucide-react"

interface WhyChinaContent {
  _id: string
  section: string
  title: string
  description: string
  content: string
  metadata?: {
    badge?: string
  }
}

interface ContentItem {
  t: string // title
  d: string // description
  c: string // color
  icon?: string // icon name (optional)
}

const iconMap = {
  Award: Award,
  GraduationCap: GraduationCap,
  Languages: Languages,
  Cpu: Cpu,
  Users: Users,
  MapPin: MapPin,
}

const colorMap = {
  blue: "text-blue-600",
  green: "text-green-600", 
  red: "text-red-600",
  purple: "text-purple-600",
  orange: "text-orange-600",
  indigo: "text-indigo-600",
}

// Default content that will always be available
const defaultContent: WhyChinaContent = {
  _id: "default",
  section: "why-china",
  title: "Хятад улсад суралцахын 6 томоохон давуу тал",
  description: "Хятад улсад суралцах нь танд олон давуу тал, боломжуудыг өгдөг.",
  content: JSON.stringify([
    {
      t: "Дэлхийн хэмжээнд хүлээн зөвшөөрөгдсөн боловсролын тогтолцоо",
      d: "Tsinghua University, Peking University зэрэг нь QS World University Rankings-т жил бүр дээгүүр бичигддэг.",
      c: "blue",
      icon: "Award"
    },
    {
      t: "Тэтгэлэг болон хөнгөлөлтийн өргөн боломж",
      d: "Хятадын засгийн газар болон сургуулиуд нь гадаад оюутнуудад зориулсан 100% болон хэсэгчилсэн тэтгэлэг олгодог.",
      c: "green",
      icon: "GraduationCap"
    },
    {
      t: "Хятад хэл сурах давуу тал",
      d: "Хятад хэл бол дэлхий дээрх хамгийн олон хүн ярьдаг хэл. Ажил эрхлэх боломж өргөжнө.",
      c: "red",
      icon: "Languages"
    },
    {
      t: "Технологи, инновацийн төв",
      d: "Хятад улс нь хиймэл оюун ухаан, 5G, цахим худалдаа, робот техник зэрэг салбарт дэлхийд тэргүүлж байна.",
      c: "purple",
      icon: "Cpu"
    },
    {
      t: "Соёлын олон талт байдал, шинэ туршлага",
      d: "Хятадад суралцах нь дэлхийн хамгийн эртний соёл иргэншлийг судлах, шинэ орчинд бие даах боломж.",
      c: "orange",
      icon: "Users"
    },
    {
      t: "Монголчуудын хувьд газар зүйн ойр байршил",
      d: "Гэр бүлтэйгээ ойр байх, онгоцны тийз, зорчих зардал харьцангуй бага.",
      c: "indigo",
      icon: "MapPin"
    }
  ]),
  metadata: {
    badge: "🇨🇳 Хятадад суралцахын шалтгаанууд"
  }
}

export function WhyChina() {
  const { t } = useLanguage()
  const [content, setContent] = useState<WhyChinaContent>(defaultContent)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchWhyChinaContent()
  }, [])

  const fetchWhyChinaContent = async () => {
    try {
      setLoading(true)
      setError("")
      
      const response = await fetch('/api/content?section=why-china')
      if (response.ok) {
        const data = await response.json()
        if (data.success && data.content && data.content.length > 0) {
          setContent(data.content[0])
        } else {
          // Use default content if no data found in database
          console.log("No content found in database, using default content")
          setContent(defaultContent)
        }
      } else {
        // Use default content if API call fails
        console.log("API call failed, using default content")
        setContent(defaultContent)
      }
    } catch (error) {
      console.error("Error fetching Why China content:", error)
      // Use default content if there's any error
      setContent(defaultContent)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section id="why-china" className="py-20 bg-background w-full">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading content...</p>
          </div>
        </div>
      </section>
    )
  }

  let contentItems: ContentItem[]
  try {
    contentItems = JSON.parse(content.content)
  } catch (error) {
    console.error("Error parsing content:", error)
    contentItems = JSON.parse(defaultContent.content)
  }

  return (
    <section id="why-china" className="py-20 bg-background w-full">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4">
            {content.metadata?.badge || t("WhyChinaBadge") || "🇨🇳 Хятадад суралцахын шалтгаанууд"}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {content.title || t("WhyChinaTitle") || "Хятад улсад суралцахын 6 томоохон давуу тал"}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {content.description || t("WhyChinaDescription") || "Хятад улсад суралцах нь танд олон давуу тал, боломжуудыг өгдөг."}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {contentItems.map((item, index) => {
            const IconComponent = iconMap[item.icon as keyof typeof iconMap] || Award
            const colorClass = colorMap[item.c as keyof typeof colorMap] || "text-blue-600"
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full group cursor-pointer hover:shadow-lg transition-all duration-300 ease-out hover:-translate-y-1 border hover:border-primary/20">
                  <CardHeader className="pb-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 transition-colors duration-300 ease-out bg-primary/10 group-hover:bg-primary/20 ${colorClass}`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl mb-4 group-hover:text-primary transition-colors duration-300 ease-out">
                      {item.t}
                    </CardTitle>
                    <CardDescription className="group-hover:text-foreground transition-colors duration-300 ease-out leading-relaxed">
                      {item.d}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
} 