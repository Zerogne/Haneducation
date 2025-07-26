"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mail, Phone } from "lucide-react"
import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context";

export function Team() {
  const { t } = useLanguage();
  const team = [
    {
      name: "Б.Ганбаатар",
      role: t("TeamRoleDirector"),
      description: t("TeamDescDirector"),
      image: "/placeholder.svg?height=300&width=300&text=БГ",
      email: "ganbat@haneducation.mn",
      phone: "+976 9999 0001",
    },
    {
      name: "С.Оюунчимэг",
      role: t("TeamRoleAdvisor"),
      description: t("TeamDescAdvisor"),
      image: "/placeholder.svg?height=300&width=300&text=СО",
      email: "oyunchimeg@haneducation.mn",
      phone: "+976 9999 0002",
    },
    {
      name: "Д.Батбаяр",
      role: t("TeamRoleVisa"),
      description: t("TeamDescVisa"),
      image: "/placeholder.svg?height=300&width=300&text=ДБ",
      email: "batbayar@haneducation.mn",
      phone: "+976 9999 0003",
    },
    {
      name: "Г.Мөнхбат",
      role: t("TeamRoleManager"),
      description: t("TeamDescManager"),
      image: "/placeholder.svg?height=300&width=300&text=ГМ",
      email: "munkhbat@haneducation.mn",
      phone: "+976 9999 0004",
    },
  ]

  return (
    <section id="team" className="py-20 bg-muted/30">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4">
            {t("TeamBadge")}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t("TeamTitle")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("TeamDescription")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                <CardContent className="p-6 text-center">
                  <div className="relative mb-6">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-background shadow-lg"
                    />
                  </div>

                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <Badge variant="outline" className="mb-3">
                    {member.role}
                  </Badge>
                  <p className="text-muted-foreground text-sm mb-6">{member.description}</p>

                  <div className="space-y-2 transition-opacity duration-300">
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      <Mail className="h-4 w-4 mr-2" />
                      <span className="text-xs truncate">{member.email}</span>
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start">
                      <Phone className="h-4 w-4 mr-2" />
                      <span className="text-xs">{member.phone}</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
