"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { motion } from "framer-motion"
import { toast } from "sonner"
import { ArrowRight, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { Logo } from "@/components/ui/logo"

export function StudentRegistrationForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    age: "",
    currentSchool: "",
    currentGrade: "",
    highSchoolGPA: "",
    languageLevel: "",
    studyPlan: "",
    phone: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast.success("Бүртгэл амжилттай илгээгдлээ!")
        
        // Reset form
        setFormData({
          fullName: "",
          email: "",
          age: "",
          currentSchool: "",
          currentGrade: "",
          highSchoolGPA: "",
          languageLevel: "",
          studyPlan: "",
          phone: "",
        })
        setCurrentStep(1)
        
        // Redirect to home page after a short delay
        setTimeout(() => {
          router.push("/")
        }, 2000)
      } else {
        const error = await response.json()
        if (response.status === 503) {
          toast.error("Database connection failed. Your registration will be processed once the system is back online.")
          
          // Reset form and redirect even on database error
          setFormData({
            fullName: "",
            email: "",
            age: "",
            currentSchool: "",
            currentGrade: "",
            highSchoolGPA: "",
            languageLevel: "",
            studyPlan: "",
            phone: "",
          })
          setCurrentStep(1)
          
          // Redirect to home page after a short delay
          setTimeout(() => {
            router.push("/")
          }, 3000)
        } else {
          toast.error(error.error || "Бүртгэл илгээхэд алдаа гарлаа")
        }
      }
    } catch (error) {
      toast.error("Бүртгэл илгээхэд алдаа гарлаа")
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    setCurrentStep(2)
  }

  const prevStep = () => {
    setCurrentStep(1)
  }

  const isStep1Valid = () => {
    return formData.fullName && formData.email && formData.age && formData.phone && formData.currentSchool && formData.currentGrade
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <Logo width={64} height={64} />
        </div>
        <CardTitle>Оюутны бүртгэл</CardTitle>
        <CardDescription>Хятадад суралцах хүсэлтээ илгээх</CardDescription>
        
        {/* Progress Indicator */}
        <div className="flex items-center justify-center space-x-4 mt-4">
          <div className={`flex items-center ${currentStep >= 1 ? 'text-primary' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${currentStep >= 1 ? 'border-primary bg-primary text-white' : 'border-gray-300'}`}>
              1
            </div>
            <span className="ml-2 text-sm font-medium">Хувийн мэдээлэл</span>
          </div>
          <div className={`w-16 h-0.5 ${currentStep >= 2 ? 'bg-primary' : 'bg-gray-300'}`}></div>
          <div className={`flex items-center ${currentStep >= 2 ? 'text-primary' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${currentStep >= 2 ? 'border-primary bg-primary text-white' : 'border-gray-300'}`}>
              2
            </div>
            <span className="ml-2 text-sm font-medium">Академик мэдээлэл</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {currentStep === 1 ? (
            // Step 1: Personal Information
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Хувийн мэдээлэл
                </h3>
                <p className="text-sm text-gray-600">
                  Өөрийн хувийн мэдээллээ оруулна уу
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Нэр</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleChange("fullName", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Gmail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="your.email@gmail.com"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">Нас</Label>
                  <Input
                    id="age"
                    type="number"
                    min="10"
                    max="50"
                    value={formData.age}
                    onChange={(e) => handleChange("age", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Утас</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currentSchool">Сургууль</Label>
                  <Input
                    id="currentSchool"
                    value={formData.currentSchool}
                    onChange={(e) => handleChange("currentSchool", e.target.value)}
                    placeholder="Одоо сурч буй сургууль"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currentGrade">Анги</Label>
                  <Select value={formData.currentGrade} onValueChange={(value) => handleChange("currentGrade", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Одоо сурч буй анги" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="9">9-р анги</SelectItem>
                      <SelectItem value="10">10-р анги</SelectItem>
                      <SelectItem value="11">11-р анги</SelectItem>
                      <SelectItem value="12">12-р анги</SelectItem>
                      <SelectItem value="bachelor">Бакалавр</SelectItem>
                      <SelectItem value="master">Магистр</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button 
                  type="button" 
                  onClick={nextStep}
                  disabled={!isStep1Valid()}
                  className="flex items-center gap-2"
                >
                  Үргэлжлүүлэх
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          ) : (
            // Step 2: Academic Information
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Академик мэдээлэл
                </h3>
                <p className="text-sm text-gray-600">
                  Сургалтын талаарх мэдээллээ оруулна уу
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="highSchoolGPA">Голч дүн</Label>
                  <Input
                    id="highSchoolGPA"
                    type="number"
                    step="0.01"
                    min="0"
                    max="4"
                    value={formData.highSchoolGPA}
                    onChange={(e) => handleChange("highSchoolGPA", e.target.value)}
                    placeholder="Голч дүн (0-4.0)"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="languageLevel">Хэлний түвшин</Label>
                  <Select value={formData.languageLevel} onValueChange={(value) => handleChange("languageLevel", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Хэлний түвшин" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Анхан шат</SelectItem>
                      <SelectItem value="intermediate">Дунд шат</SelectItem>
                      <SelectItem value="advanced">Ахисан шат</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="studyPlan">Суралцах төлөвлөгөө</Label>
                <Textarea
                  id="studyPlan"
                  value={formData.studyPlan}
                  onChange={(e) => handleChange("studyPlan", e.target.value)}
                  placeholder="Суралцах зорилго, төлөвлөгөөгөө бичнэ үү"
                  rows={4}
                  required
                />
              </div>

              <div className="flex justify-between pt-4">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={prevStep}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Буцах
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Илгээж байна..." : "Бүртгэлийг илгээх"}
                </Button>
              </div>
            </motion.div>
          )}
        </form>
      </CardContent>
    </Card>
  )
} 