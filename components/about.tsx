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
    <section id="about" className="py-20 bg-muted/30">
      <div className="container px-4">
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
          >
            <img
              src="/placeholder.svg?height=400&width=500&text=HAN+Education+Office"
              alt={t("AboutImageAlt")}
              className="rounded-2xl shadow-lg"
            />
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
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
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
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
