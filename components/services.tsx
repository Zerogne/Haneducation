"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Languages, FileText, Award, Users, BookOpen } from "lucide-react"
import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context";

export function Services() {
  const { t } = useLanguage();
  const services = [
    {
      icon: GraduationCap,
      title: t("Service1Title"),
      description: t("Service1Desc"),
      features: [t("Bachelor"), t("Master"), t("PhD"), t("ProfessionalTraining")],
      color: "bg-blue-500/10 text-blue-600",
    },
    {
      icon: Languages,
      title: t("Service2Title"),
      description: t("Service2Desc"),
      features: [t("HSKPrep"), t("LanguageTraining"), t("OnlineClass"), t("DocumentTranslation")],
      color: "bg-green-500/10 text-green-600",
    },
    {
      icon: FileText,
      title: t("Service3Title"),
      description: t("Service3Desc"),
      features: [t("VisaApplication"), t("DocumentTranslation"), t("Notarization"), t("Consulting")],
      color: "bg-purple-500/10 text-purple-600",
    },
    {
      icon: Award,
      title: t("Service4Title"),
      description: t("Service4Desc"),
      features: [t("GovScholarship"), t("UniScholarship"), t("ApplicationPrep"), t("InterviewPrep")],
      color: "bg-orange-500/10 text-orange-600",
    },
    {
      icon: Users,
      title: t("Service5Title"),
      description: t("Service5Desc"),
      features: [t("CareerConsulting"), t("UniConsulting"), t("CareerAdvice"), t("PrivateConsulting")],
      color: "bg-red-500/10 text-red-600",
    },
    {
      icon: BookOpen,
      title: t("Service6Title"),
      description: t("Service6Desc"),
      features: [t("AcademicSupport"), t("LifeAdvice"), t("EmergencyHelp"), t("GraduationSupport")],
      color: "bg-teal-500/10 text-teal-600",
    },
  ];
  return (
    <section id="services" className="py-20">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4">
            {t("ServicesBadge")}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t("ServicesTitle")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("ServicesDescription")}
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${service.color}`}>
                    <service.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
