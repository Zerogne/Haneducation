"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Quote } from "lucide-react"
import { motion } from "framer-motion"


interface Testimonial {
  _id: string
  name: string
  university: string
  content: string
  rating: number
  image: string
  language: string
}

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [hasInitialized, setHasInitialized] = useState(false)

  useEffect(() => {
    if (!hasInitialized) {
      setHasInitialized(true)
      fetchTestimonials()
    }
  }, [hasInitialized])

  const fetchTestimonials = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/testimonials?language=mn`)
      if (response.ok) {
        const data = await response.json()
        if (data.testimonials && data.testimonials.length > 0) {
          setTestimonials(data.testimonials)
        } else {
          console.log("No testimonials found from API")
          setTestimonials([])
        }
      } else {
        console.error("Failed to fetch testimonials:", response.status)
        setTestimonials([])
      }
    } catch (error) {
      console.error('Error fetching testimonials:', error)
      setTestimonials([])
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section id="testimonials" className="py-20 bg-muted/30 w-full">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading testimonials...</p>
          </div>
        </div>
      </section>
    )
  }

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
            Оюутнуудын сэтгэгдэл
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Оюутнуудын сэтгэгдэл
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Бидний үйлчилгээг ашигласан оюутнуудын сэтгэгдэл
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <div className="text-muted-foreground">
                <p className="text-lg mb-2">Оюутнуудын сэтгэгдэл байхгүй байна</p>
                <p className="text-sm">Оюутнуудын сэтгэгдэл нэмэгдэх хүртэл хүлээнэ үү</p>
              </div>
            </div>
          ) : (
            testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial._id}
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
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
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
            ))
          )}
        </div>
      </div>
    </section>
  )
}
