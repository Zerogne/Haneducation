"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Languages, FileText, Award, Users, BookOpen } from "lucide-react"
import { motion } from "framer-motion"



interface Service {
  _id: string
  title: string
  description: string
  icon: string
  features: string[]
  color: string
  hoverColor: string
  isActive: boolean
  order: number
  language: string
}

const iconMap: { [key: string]: any } = {
  GraduationCap,
  Languages,
  FileText,
  Award,
  Users,
  BookOpen,
}

export function Services() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [hasInitialized, setHasInitialized] = useState(false)
  const [sectionContent, setSectionContent] = useState({
    title: "Бидний үйлчилгээ",
    description: "Хятадад суралцахад танд хэрэгтэй бүх үйлчилгээ",
    badge: "Үйлчилгээ"
  })

  // Fallback services if API fails
  const fallbackServices = [
    {
      _id: "1",
      icon: "GraduationCap",
      title: "Их сургуулийн элсэлт",
      description: "Хятадын их сургуулиудад бакалавр, магистр, докторын зэрэгт суралцах",
      features: ["Бакалавр", "Магистр", "Доктор", "Хэлний Бэлтгэл"],
      color: "blue",
      hoverColor: "blue",
      isActive: true,
      order: 1,
      language: "mn"
    },
    {
      _id: "2",
      icon: "Languages",
      title: "Хятад хэлний сургалт",
      description: "HSK бэлтгэл, хятад хэлний сургалт, онлайн хичээл",
      features: ["HSK бэлтгэл", "Хэлний сургалт", "Онлайн хичээл", "Баримт орчуулга"],
      color: "green",
      hoverColor: "green",
      isActive: true,
      order: 2,
      language: "mn"
    },
    {
      _id: "3",
      icon: "FileText",
      title: "Виз, баримт бичиг",
      description: "Визын өргөдөл, баримт бичгийн орчуулга, нотариат",
      features: ["Визын өргөдөл", "Баримт орчуулга", "Нотариат", "Зөвлөгөө"],
      color: "purple",
      hoverColor: "purple",
      isActive: true,
      order: 3,
      language: "mn"
    },
    {
      _id: "4",
      icon: "Award",
      title: "Тэтгэлэг",
      description: "Засгийн газрын тэтгэлэг, их сургуулийн тэтгэлэг",
      features: ["Засгийн газрын тэтгэлэг", "Их сургуулийн тэтгэлэг", "Өргөдөл бэлтгэл", "Ярилцлага бэлтгэл"],
      color: "orange",
      hoverColor: "orange",
      isActive: true,
      order: 4,
      language: "mn"
    },
    {
      _id: "5",
      icon: "Users",
      title: "Зөвлөгөө",
      description: "Карьерын зөвлөгөө, их сургуулийн зөвлөгөө",
      features: ["Карьерын зөвлөгөө", "Их сургуулийн зөвлөгөө", "Карьерын зөвлөгөө", "Хувийн зөвлөгөө"],
      color: "red",
      hoverColor: "red",
      isActive: true,
      order: 5,
      language: "mn"
    },
    {
      _id: "6",
      icon: "BookOpen",
      title: "Дэмжлэг",
      description: "Академик дэмжлэг, амьдралын зөвлөгөө",
      features: ["Академик дэмжлэг", "Амьдралын зөвлөгөө", "Яаралтай тусламж", "Төгсөлтийн дэмжлэг"],
      color: "teal",
      hoverColor: "teal",
      isActive: true,
      order: 6,
      language: "mn"
    },
  ]

  useEffect(() => {
    if (!hasInitialized) {
      setHasInitialized(true)
      fetchServices()
      fetchSectionContent()
    }
  }, [hasInitialized]) // Only fetch once

  const fetchSectionContent = async () => {
    try {
      const response = await fetch(`/api/content?section=services&language=mn`)
      if (response.ok) {
        const data = await response.json()
        if (data.content && data.content.length > 0) {
          try {
            const content = JSON.parse(data.content[0].content)
            setSectionContent({
              title: content.title || "Бидний үйлчилгээ",
              description: content.description || "Хятадад суралцахад танд хэрэгтэй бүх үйлчилгээ",
              badge: content.badge || "Үйлчилгээ"
            })
          } catch (error) {
            console.error('Error parsing services section content:', error)
          }
        }
      }
    } catch (error) {
      console.error('Error fetching services section content:', error)
    }
  }

  const fetchServices = async () => {
    try {
      setLoading(true)
      setError(false)
      console.log(`Fetching services for Mongolian...`)
      const response = await fetch(`/api/services?language=mn`)
      console.log("Response status:", response.status)
      if (response.ok) {
        const data = await response.json()
        console.log("Services data:", data)
        if (data.services && data.services.length > 0) {
          setServices(data.services)
        } else {
          console.log("No services from API, using fallback")
          setServices(fallbackServices)
        }
      } else {
        console.error("Failed to fetch services:", response.status)
        setError(true)
        setServices(fallbackServices)
      }
    } catch (error) {
      console.error("Error fetching services:", error)
      setError(true)
      setServices(fallbackServices)
    } finally {
      setLoading(false)
    }
  }

  const getIconComponent = (iconName: string) => {
    return iconMap[iconName] || GraduationCap
  }

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: { color: string; hoverColor: string } } = {
      blue: {
        color: "bg-blue-500/10 text-blue-600",
        hoverColor: "group-hover:bg-blue-500/20 group-hover:text-blue-700"
      },
      green: {
        color: "bg-green-500/10 text-green-600",
        hoverColor: "group-hover:bg-green-500/20 group-hover:text-green-700"
      },
      purple: {
        color: "bg-purple-500/10 text-purple-600",
        hoverColor: "group-hover:bg-purple-500/20 group-hover:text-purple-700"
      },
      orange: {
        color: "bg-orange-500/10 text-orange-600",
        hoverColor: "group-hover:bg-orange-500/20 group-hover:text-orange-700"
      },
      red: {
        color: "bg-red-500/10 text-red-600",
        hoverColor: "group-hover:bg-red-500/20 group-hover:text-red-700"
      },
      teal: {
        color: "bg-teal-500/10 text-teal-600",
        hoverColor: "group-hover:bg-teal-500/20 group-hover:text-teal-700"
      }
    }
    return colorMap[color] || colorMap.blue
  }

  if (loading) {
    return (
      <section id="services" className="py-20 w-full">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              Үйлчилгээ
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Бидний үйлчилгээ
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Хятадад суралцахад танд хэрэгтэй бүх үйлчилгээ
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div key={index} className="animate-pulse">
                <Card className="h-full">
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 rounded-lg bg-gray-200 mb-6"></div>
                    <div className="h-6 bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      {[1, 2, 3, 4].map((featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-3">
                          <div className="w-1.5 h-1.5 bg-gray-200 rounded-full"></div>
                          <div className="h-3 bg-gray-200 rounded flex-1"></div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="services" className="py-20 w-full">
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = getIconComponent(service.icon)
            const colorClasses = getColorClasses(service.color)
            
            return (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full group cursor-pointer hover:shadow-lg transition-all duration-300 ease-out hover:-translate-y-1 border hover:border-primary/20 bg-background">
                  <CardHeader className="pb-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 transition-colors duration-300 ease-out ${colorClasses.color} ${colorClasses.hoverColor}`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl mb-4 group-hover:text-primary transition-colors duration-300 ease-out">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="group-hover:text-foreground transition-colors duration-300 ease-out leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-3 group/item">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full group-hover/item:scale-125 transition-transform duration-300 ease-out"></div>
                          <span className="text-sm text-muted-foreground group-hover/item:text-foreground transition-colors duration-300 ease-out">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
