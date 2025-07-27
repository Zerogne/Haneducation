"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Phone, Mail, MapPin } from "lucide-react"
import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context";

export function CallToAction() {
  const { t } = useLanguage();
  return (
    <section id="contact" className="py-20 w-full">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
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
              <div className="flex items-center space-x-3 group cursor-pointer p-3 rounded-lg hover:bg-primary/5 transition-all duration-300 ease-out">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300 ease-out">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium group-hover:text-primary transition-colors duration-300 ease-out">{t("ContactPhone")}</p>
                  <p className="text-muted-foreground group-hover:text-primary/70 transition-colors duration-300 ease-out">+976 7777 7777</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 group cursor-pointer p-3 rounded-lg hover:bg-primary/5 transition-all duration-300 ease-out">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300 ease-out">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium group-hover:text-primary transition-colors duration-300 ease-out">{t("ContactEmail")}</p>
                  <p className="text-muted-foreground group-hover:text-primary/70 transition-colors duration-300 ease-out">info@haneducation.mn</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 group cursor-pointer p-3 rounded-lg hover:bg-primary/5 transition-all duration-300 ease-out">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300 ease-out">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium group-hover:text-primary transition-colors duration-300 ease-out">{t("ContactAddress")}</p>
                  <p className="text-muted-foreground group-hover:text-primary/70 transition-colors duration-300 ease-out">{t("ContactAddressValue")}</p>
                </div>
              </div>
            </div>
            <div className="w-full">
              <Button 
                size="lg" 
                className="group relative bg-primary hover:bg-primary/90 transition-all duration-300 ease-out shadow-lg hover:shadow-xl w-full" 
                asChild
              >
                <a href="/registration" className="relative z-10">
                  {t("ApplyNow")}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
                </a>
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="group"
          >
            <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-0 hover:shadow-lg transition-all duration-300 ease-out hover:-translate-y-1 relative overflow-hidden">
              <CardContent className="p-8 relative z-10">
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors duration-300 ease-out">{t("ContactGetAdvice")}</h3>
                    <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300 ease-out">
                      {t("ContactAdviceDesc")}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-4 bg-background rounded-lg group-hover:bg-primary/5 transition-all duration-300 ease-out hover:scale-105">
                      <div className="text-2xl font-bold text-primary group-hover:scale-110 transition-transform duration-300 ease-out">24/7</div>
                      <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300 ease-out">{t("ContactSupport")}</div>
                    </div>
                    <div className="p-4 bg-background rounded-lg group-hover:bg-primary/5 transition-all duration-300 ease-out hover:scale-105">
                      <div className="text-2xl font-bold text-primary group-hover:scale-110 transition-transform duration-300 ease-out">100%</div>
                      <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300 ease-out">{t("ContactReliable")}</div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="relative group/img">
                      <img
                        src="/placeholder.svg?height=200&width=300&text=Contact+Us"
                        alt="Contact illustration"
                        className="mx-auto rounded-lg transition-all duration-300 ease-out group-hover/img:scale-105 group-hover/img:shadow-lg"
                      />
                    </div>
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
