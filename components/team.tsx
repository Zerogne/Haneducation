"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mail, Phone, Linkedin } from "lucide-react"
import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context";

export function Team() {
  const { t } = useLanguage();
  
  const team = [
    {
      name: "Б.Мөнхзул",
      role: t("TeamRole1"),
      image: "/placeholder.svg?height=200&width=200&text=БМ",
      email: "monkhzul@haneducation.mn",
      phone: "+976 7777 7777",
      linkedin: "linkedin.com/in/monkhzul",
      badge: t("TeamBadge1"),
    },
    {
      name: "Ө.Мөнгөнзул",
      role: t("TeamRole2"),
      image: "/placeholder.svg?height=200&width=200&text=ӨМ",
      email: "mungunzul@haneducation.mn",
      phone: "+976 7777 7778",
      linkedin: "linkedin.com/in/mungunzul",
      badge: t("TeamBadge2"),
    },
    {
      name: "Э.Анар",
      role: t("TeamRole3"),
      image: "/placeholder.svg?height=200&width=200&text=ЭА",
      email: "anar@haneducation.mn",
      phone: "+976 7777 7779",
      linkedin: "linkedin.com/in/anar",
      badge: t("TeamBadge3"),
    },
  ]

  return (
    <section id="team" className="py-20 bg-muted/30 w-full">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full group cursor-pointer hover:shadow-lg transition-all duration-300 ease-out hover:-translate-y-1 border hover:border-primary/20 bg-background">
                <CardContent className="p-6 text-center">
                  <div className="relative mb-6 group/avatar">
                    <div className="w-32 h-32 mx-auto relative overflow-hidden rounded-full border-4 border-primary/20 group-hover/avatar:border-primary transition-colors duration-300 ease-out">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover/avatar:scale-105"
                      />
                    </div>
                    <Badge className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground group-hover:bg-primary/90 transition-colors duration-300 ease-out">
                      {member.badge}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300 ease-out">{member.name}</h3>
                  <p className="text-muted-foreground mb-6 group-hover:text-foreground transition-colors duration-300 ease-out">{member.role}</p>

                  <div className="flex justify-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-10 h-10 p-0 group/btn hover:bg-primary hover:text-primary-foreground transition-all duration-300 ease-out"
                      asChild
                    >
                      <a href={`mailto:${member.email}`}>
                        <Mail className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-10 h-10 p-0 group/btn hover:bg-primary hover:text-primary-foreground transition-all duration-300 ease-out"
                      asChild
                    >
                      <a href={`tel:${member.phone}`}>
                        <Phone className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-10 h-10 p-0 group/btn hover:bg-primary hover:text-primary-foreground transition-all duration-300 ease-out"
                      asChild
                    >
                      <a href={`https://${member.linkedin}`} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-4 w-4" />
                      </a>
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
