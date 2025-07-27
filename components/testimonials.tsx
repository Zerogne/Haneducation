"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Quote } from "lucide-react"
import { motion } from "framer-motion"
import { useLanguage } from "@/contexts/language-context";

export function Testimonials() {
  const { t } = useLanguage();
  
  const testimonials = [
    {
      name: "Б.Мөнхзул",
      university: t("Testimonial1University"),
      content: t("Testimonial1Content"),
      rating: 5,
      image: "/placeholder.svg?height=80&width=80&text=БМ",
    },
    {
      name: "Ө.Мөнгөнзул",
      university: t("Testimonial2University"),
      content: t("Testimonial2Content"),
      rating: 5,
      image: "/placeholder.svg?height=80&width=80&text=ДБ",
    },
    {
      name: "Э.Анар",
      university: t("Testimonial3University"),
      content: t("Testimonial3Content"),
      rating: 5,
      image: "/placeholder.svg?height=80&width=80&text=СО",
    },
    {
      name: "А.Маралмаа",
      university: t("Testimonial4University"),
      content: t("Testimonial4Content"),
      rating: 5,
      image: "/placeholder.svg?height=80&width=80&text=ГЭ",
    },
  ]

  return (
    <section id="testimonials" className="py-20 bg-muted/30 w-full">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4">
            {t("TestimonialsBadge")}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t("TestimonialsTitle")}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("TestimonialsDescription")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full group cursor-pointer hover:shadow-lg transition-all duration-300 ease-out hover:-translate-y-1 border hover:border-primary/20 bg-background">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="relative group/avatar">
                      <img
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-primary/20 group-hover/avatar:border-primary transition-colors duration-300 ease-out"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold group-hover:text-primary transition-colors duration-300 ease-out">{testimonial.name}</h4>
                        <div className="flex items-center space-x-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star 
                              key={i} 
                              className="h-4 w-4 fill-yellow-400 text-yellow-400" 
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground group-hover:text-primary/70 transition-colors duration-300 ease-out">
                        {testimonial.university}
                      </p>
                    </div>
                  </div>

                  <div className="relative">
                    <Quote className="absolute -top-2 -left-2 h-8 w-8 text-primary/20" />
                    <p className="text-muted-foreground italic pl-6 group-hover:text-foreground transition-colors duration-300 ease-out">"{testimonial.content}"</p>
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
