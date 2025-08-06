"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Users, Award, Globe, CheckCircle, Building, Shield } from "lucide-react"
import { motion } from "framer-motion"


interface AboutContent {
  title: string
  description: string
  whyTitle: string
}

interface AboutFeaturesContent {
  features: {
    title: string
    description?: string
    icon: string
  }[]
}

const iconMap: { [key: string]: any } = {
  GraduationCap,
  Users,
  Award,
  Globe,
  Building,
  CheckCircle,
  Shield,
}

export function About() {
  const [content, setContent] = useState<AboutContent>({
    title: "HAN Education - Таны боловсролын хөтөч",
    description: "Бид 2022 оноос хойш Монгол оюутнуудыг Хятадын нэр хүндтэй их сургуулиудад элсүүлэх чиглэлээр үйл ажиллагаа явуулж байгаа туршлагатай.",
    whyTitle: "Яагаад HAN Education-г сонгох ёстой вэ?"
  })
  const [features, setFeatures] = useState<AboutFeaturesContent>({
    features: [
      {
        title: "Албан ёсны түнш",
        description: "Хятадад төрийн болон хувийн их сургуулиудтай албан ёсны гэрээт харилцаатай",
        icon: "Building"
      },
      {
        title: "60+ амжилттай оюутан",
        description: "2022 оноос хойш 60+ оюутаныг амжилттай элсүүлсэн туршлагатай",
        icon: "GraduationCap"
      },
      {
        title: "Цогц үйлчилгээ",
        description: "Элсэлтээс эхлээд виз, орчуулга хүртэл бүх үйлчилгээг нэг дороос",
        icon: "Shield"
      }
    ]
  })
  const [sectionContent, setSectionContent] = useState({
    title: "HAN Education - Таны боловсролын түнш",
    description: "Бид 2022 оноос хойш Монгол оюутнуудыг Хятадын нэр хүндтэй их сургуулиудад элсүүлэх чиглэлээр үйл ажиллагаа явуулж байгаа туршлагатай компани юм.",
    badge: "Бидний тухай"
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Set loading to false immediately since we're using hardcoded content
    setLoading(false)
  }, []) // Remove language dependency

  // Removed fetch functions since content is now hardcoded

  const getIconComponent = (iconName: string) => {
    return iconMap[iconName] || CheckCircle
  }

  return (
    <section id="about" className="py-20 bg-muted/30 w-full">
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
            {loading ? sectionContent.title : content.title || sectionContent.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {loading ? sectionContent.description : content.description || sectionContent.description}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16 ">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="group cursor-pointer w-fit mx-auto"
          >
            <div className="relative overflow-hidden rounded-2xl  transition-all duration-300 ease-out  group-hover:-translate-y-1 " style={{ aspectRatio: '3/4' }}>
              <img
                src="https://res.cloudinary.com/dewhswho9/image/upload/v1754370909/527598476_1098990758838320_7936771941177688783_n.jpg_mpzjcn.jpg"
                alt="HAN Education оффис"
                className="rounded-2xl w-max h-full"
              />``
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold">
              {loading ? "Яагаад HAN Education-г сонгох ёстой вэ?" : content.whyTitle || "Яагаад HAN Education-г сонгох ёстой вэ?"}
            </h3>

            <div className="space-y-4">
              {features.features.slice(0, 3).map((feature, index) => (
                <div key={index} className="flex items-start space-x-3 group cursor-pointer p-3 rounded-lg hover:bg-primary/5 transition-all duration-300 ease-out">
                  <div className="p-2 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors duration-300 ease-out">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-300 ease-out">{feature?.title || ""}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.features.map((feature, index) => {
            const IconComponent = getIconComponent(feature.icon)
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full group cursor-pointer hover:shadow-lg transition-all duration-300 ease-out hover:-translate-y-1 border hover:border-primary/20 bg-background">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors duration-300 ease-out">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300 ease-out">{feature.title}</h3>
                    <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300 ease-out">{feature.description}</p>
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
