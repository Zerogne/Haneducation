"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react"
import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context";

export function CallToAction() {
  const { t } = useLanguage();
  return (
    <section id="contact" className="py-20">
      <div className="container px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">{t("ContactTitle")}</h2>
              <p className="text-xl text-muted-foreground">
                {t("ContactDescription")}
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{t("ContactPhone")}</p>
                  <p className="text-muted-foreground">+976 7777 7777</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{t("ContactEmail")}</p>
                  <p className="text-muted-foreground">info@haneducation.mn</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{t("ContactAddress")}</p>
                  <p className="text-muted-foreground">{t("ContactAddressValue")}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="group" asChild>
                <a href="/registration">
                  {t("ApplyNow")}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </Button>
              <Button size="lg" variant="outline">
                {t("ContactGetAdvice")}
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-0">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-2">{t("ContactGetAdvice")}</h3>
                    <p className="text-muted-foreground">
                      {t("ContactAdviceDesc")}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-4 bg-background rounded-lg">
                      <div className="text-2xl font-bold text-primary">24/7</div>
                      <div className="text-sm text-muted-foreground">{t("ContactSupport")}</div>
                    </div>
                    <div className="p-4 bg-background rounded-lg">
                      <div className="text-2xl font-bold text-primary">100%</div>
                      <div className="text-sm text-muted-foreground">{t("ContactReliable")}</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <img
                      src="/placeholder.svg?height=200&width=300&text=Contact+Us"
                      alt="Contact illustration"
                      className="mx-auto rounded-lg"
                    />
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
