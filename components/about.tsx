"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Building, Users, Globe } from "lucide-react"
import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context";

export function About() {
  const { t } = useLanguage();
  const features = [
    {
      icon: Building,
      title: t("AboutFeature1Title"),
      description: t("AboutFeature1Desc"),
    },
    {
      icon: Users,
      title: t("AboutFeature2Title"),
      description: t("AboutFeature2Desc"),
    },
    {
      icon: Globe,
      title: t("AboutFeature3Title"),
      description: t("AboutFeature3Desc"),
    },
  ];

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
            {t("AboutBadge")}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t("AboutTitle")}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("AboutDescription")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="group cursor-pointer"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-lg transition-all duration-300 ease-out group-hover:shadow-xl group-hover:-translate-y-1">
              <img
                src="/placeholder.svg?height=400&width=500&text=HAN+Education+Office"
                alt={t("AboutImageAlt")}
                className="rounded-2xl transition-transform duration-300 ease-out group-hover:scale-105"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold">{t("AboutWhyTitle")}</h3>

            <div className="space-y-4">
              {[t("AboutWhy1"), t("AboutWhy2"), t("AboutWhy3"), t("AboutWhy4"), t("AboutWhy5")].map((item, index) => (
                <div key={index} className="flex items-start space-x-3 group cursor-pointer p-3 rounded-lg hover:bg-primary/5 transition-all duration-300 ease-out">
                  <div className="p-2 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors duration-300 ease-out">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-300 ease-out">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
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
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300 ease-out">{feature.title}</h3>
                  <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300 ease-out">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
