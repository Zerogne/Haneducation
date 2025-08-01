"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { Send, Phone, Mail, MapPin } from "lucide-react"

interface ContactFormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

export function ContactForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast.success("Холбоо барих хүсэлт амжилттай илгээгдлээ!")
        
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: ""
        })
      } else {
        const error = await response.json()
        toast.error(error.error || "Холбоо барих хүсэлт илгээхэд алдаа гарлаа")
      }
    } catch (error) {
      toast.error("Холбоо барих хүсэлт илгээхэд алдаа гарлаа")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Contact Information */}
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-bold mb-4">Холбоо барих мэдээлэл</h3>
          <p className="text-muted-foreground mb-6">
            Бидэнтэй холбогдоод үнэгүй зөвлөгөө аваарай
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-3 group cursor-pointer p-3 rounded-lg hover:bg-primary/5 transition-all duration-300">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Phone className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium">Утас</p>
              <p className="text-muted-foreground">+976 7777 7777</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 group cursor-pointer p-3 rounded-lg hover:bg-primary/5 transition-all duration-300">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium">И-мэйл</p>
              <p className="text-muted-foreground">info@haneducation.mn</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 group cursor-pointer p-3 rounded-lg hover:bg-primary/5 transition-all duration-300">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <MapPin className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium">Хаяг</p>
              <p className="text-muted-foreground">Улаанбаатар хот, Монгол улс</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle>Холбоо барих хүсэлт</CardTitle>
          <CardDescription>
            Дээрх мэдээллийг бөглөөд бидэнтэй холбогдоно уу
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Нэр *</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  required
                  placeholder="Таны нэр"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">И-мэйл *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  required
                  placeholder="example@email.com"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Утасны дугаар *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                required
                placeholder="+976 9999 9999"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subject">Гарчиг</Label>
              <Input
                id="subject"
                type="text"
                value={formData.subject}
                onChange={(e) => handleChange("subject", e.target.value)}
                placeholder="Холбоо барих шалтгаан"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">Мессеж *</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                required
                placeholder="Таны мессеж..."
                rows={4}
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? (
                "Илгээж байна..."
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Илгээх
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 