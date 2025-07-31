"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"


export function Partners() {
  const router = useRouter()
  const [partners, setPartners] = useState([
    { name: "Tsinghua University", logo: "https://res.cloudinary.com/dewhswho9/image/upload/v1753511863/E8_BE_BD_E5_AE_81_E7_9F_B3_E6_B2_B9_E5_8C_96_E5_B7_A5_20_3_kx8pgg.jpg" },
    { name: "Peking University", logo: "https://res.cloudinary.com/dewhswho9/image/upload/v1753511854/E7_BB_84_E4_BB_B6_2050_20_E2_80_93_201_compressed_xcslgp.jpg" },
    { name: "Fudan University", logo: "https://res.cloudinary.com/dewhswho9/image/upload/v1753511843/E7_BB_84_E4_BB_B6_208_20_E2_80_93_201_compressed_tfdo6s.jpg" },
    { name: "Shanghai Jiao Tong", logo: "https://res.cloudinary.com/dewhswho9/image/upload/v1753511810/E7_BB_84_E4_BB_B6_207_20_E2_80_93_201_compressed_x6hmfj.jpg" },
    { name: "Zhejiang University", logo: "https://res.cloudinary.com/dewhswho9/image/upload/v1753511805/E6_B2_A7_E5_B7_9E_E8_81_8C_E4_B8_9A_20_7_gzvzde.jpg" },
    { name: "Nanjing University", logo: "https://res.cloudinary.com/dewhswho9/image/upload/v1753511798/E6_B1_9F_E8_A5_BF_E8_B4_A2_E7_BB_8F_E5_A4_A7_E5_AD_A6_gb4hot.jpg" },
  ])
  const [sectionContent, setSectionContent] = useState({
    title: "Хамтрагч их сургуулиуд",
    description: "Бидний хамтрагч Хятадын их сургуулиуд",
    badge: "Хамтрагчид"
  })
  const [loading, setLoading] = useState(true)

  
  

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

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
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
                  className="h-12 w-auto transition-all duration-300 ease-out group-hover:scale-105"
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button 
            onClick={() => router.push('/partners')}
            variant="outline"
            size="lg"
            className="px-8 py-3 text-lg font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            Дэлгэрэнгүй
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
