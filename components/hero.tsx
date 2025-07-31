"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, GraduationCap, Users, Award } from "lucide-react"
import { motion } from "framer-motion"


import { useState, useEffect } from "react"

interface HeroStats {
  stats: {
    students: string
    universities: string
    experience: string
  }
  statsLabels: {
    students: string
    universities: string
    experience: string
  }
}

export function Hero() {
  // Hardcoded content
  const title = "HAN Education"
  const subtitle = "Хятадад тэтгэлэгтэй суралцах боломжийг танд олгоно"
  const description = "Хувийн боловсролын зөвлөх үйлчилгээ | 2022 оноос хойш үйл ажиллагаа явуулж байгаа туршлагатай"
  const applyNowText = "Өргөдөл гаргах"

  // Stats from database
  const [stats, setStats] = useState<HeroStats>({
    stats: {
      students: "60+",
      universities: "880+",
      experience: "4+"
    },
    statsLabels: {
      students: "Амжилттай оюутан",
      universities: "Хамтрагч их сургууль",
      experience: "Жилийн туршлага"
    }
  })
  const [loading, setLoading] = useState(true)
  const [hasInitialized, setHasInitialized] = useState(false)

  useEffect(() => {
    if (!hasInitialized) {
      setHasInitialized(true)
      fetchHeroStats()
    }
  }, [hasInitialized])

  const fetchHeroStats = async () => {
    try {
      console.log("Fetching hero stats...")
      const response = await fetch('/api/content?section=hero&language=mn')
      if (response.ok) {
        const data = await response.json()
        console.log("Hero stats response:", data)
        if (data.content && data.content.length > 0) {
          try {
            const parsedContent = JSON.parse(data.content[0].content)
            console.log("Parsed hero stats:", parsedContent)
            // Only update stats, not title/description
            if (parsedContent.stats && parsedContent.statsLabels) {
              setStats({
                stats: parsedContent.stats,
                statsLabels: parsedContent.statsLabels
              })
            }
          } catch (error) {
            console.error("Error parsing hero stats:", error)
          }
        } else {
          console.log("No hero stats found in database")
        }
      } else {
        console.error("Failed to fetch hero stats:", response.status)
      }
    } catch (error) {
      console.error("Error fetching hero stats:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden w-full">
      {/* Background gradient - full width */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />

      {/* Content container - with spacing */}
      <div className="max-w-7xl mx-auto px-8 lg:px-16 relative z-10 py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-6xl font-bold leading-tight"
              >
                {title}
                <span className="block text-primary">{subtitle}</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg text-muted-foreground max-w-2xl"
              >
                {description}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button 
                size="lg" 
                className="group relative bg-primary hover:bg-primary/90 transition-all duration-300 ease-out shadow-lg hover:shadow-xl" 
                asChild
              >
                <a href="/registration" className="relative z-10">
                  {applyNowText}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
                </a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-3 gap-6 pt-4"
            >
              <div className="text-center group cursor-pointer">
                <div className="flex justify-center mb-2">
                  <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors duration-300 ease-out">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="text-xl font-bold group-hover:text-primary transition-colors duration-300 ease-out">
                  {loading ? "60+" : stats.stats?.students || "60+"}
                </div>
                <div className="text-xs text-muted-foreground group-hover:text-primary/70 transition-colors duration-300 ease-out">
                  {loading ? "Амжилттай оюутан" : stats.statsLabels?.students || "Амжилттай оюутан"}
                </div>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="flex justify-center mb-2">
                  <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors duration-300 ease-out">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="text-xl font-bold group-hover:text-primary transition-colors duration-300 ease-out">
                  {loading ? "880+" : stats.stats?.universities || "880+"}
                </div>
                <div className="text-xs text-muted-foreground group-hover:text-primary/70 transition-colors duration-300 ease-out">
                  {loading ? "Хамтрагч их сургууль" : stats.statsLabels?.universities || "Хамтрагч их сургууль"}
                </div>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="flex justify-center mb-2">
                  <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors duration-300 ease-out">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="text-xl font-bold group-hover:text-primary transition-colors duration-300 ease-out">
                  {loading ? "4+" : stats.stats?.experience || "4+"}
                </div>
                <div className="text-xs text-muted-foreground group-hover:text-primary/70 transition-colors duration-300 ease-out">
                  {loading ? "Жилийн туршлага" : stats.statsLabels?.experience || "Жилийн туршлага"}
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative hidden lg:block group"
          >
            <div className="relative z-10 transition-transform duration-500 ease-out group-hover:-translate-y-2">
              <img
                src="/placeholder.svg?height=600&width=500&text=Students+in+China"
                alt="Хятадад суралцаж буй монгол оюутнууд"
                className="rounded-2xl shadow-2xl transition-shadow duration-500 ease-out group-hover:shadow-3xl"
              />
            </div>
            <div className="absolute -top-4 -right-4 w-full h-full bg-primary/20 rounded-2xl -z-10 transition-all duration-500 ease-out group-hover:bg-primary/30" />
            <div className="absolute -bottom-4 -left-4 w-full h-full bg-secondary/20 rounded-2xl -z-20 transition-all duration-500 ease-out group-hover:bg-secondary/30" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
