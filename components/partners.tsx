"use client"

import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context";

export function Partners() {
  const { t } = useLanguage();
  const partners = [
    { name: "Бээжин их сургууль", logo: "/placeholder.svg?height=80&width=120&text=Beijing+Uni" },
    { name: "Цинхуа их сургууль", logo: "/placeholder.svg?height=80&width=120&text=Tsinghua" },
    { name: "Нанжин их сургууль", logo: "/placeholder.svg?height=80&width=120&text=Nanjing+Uni" },
    { name: "Шанхай их сургууль", logo: "/placeholder.svg?height=80&width=120&text=Shanghai+Uni" },
    { name: "Гуанжоу их сургууль", logo: "/placeholder.svg?height=80&width=120&text=Guangzhou" },
    { name: "Шэньжэн их сургууль", logo: "/placeholder.svg?height=80&width=120&text=Shenzhen" },
    { name: "Ханжоу их сургууль", logo: "/placeholder.svg?height=80&width=120&text=Hangzhou" },
    { name: "Чэнду их сургууль", logo: "/placeholder.svg?height=80&width=120&text=Chengdu" },
  ]

  return (
    <section id="partners" className="py-20">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="secondary" className="mb-4">
            {t("PartnersBadge")}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t("PartnerUniversities")}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("PartnersDescription")}
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center justify-center p-6 bg-background border rounded-lg hover:shadow-md transition-shadow duration-300"
            >
              <img
                src={partner.logo || "/placeholder.svg"}
                alt={partner.name}
                className="max-w-full h-12 object-contain grayscale hover:grayscale-0 transition-all duration-300"
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground">{t("PartnersBottomDesc")}</p>
        </motion.div>
      </div>
    </section>
  )
}
