"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { ArrowRight, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { Logo } from "@/components/ui/logo"

export function StudentRegistrationForm() {
  const { t } = useLanguage()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
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
        toast.success(t("RegistrationSuccess"))
        
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
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
            firstName: "",
            lastName: "",
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
          toast.error(error.error || t("RegistrationError"))
        }
      }
    } catch (error) {
      toast.error(t("RegistrationError"))
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
    return formData.firstName && formData.lastName && formData.age && formData.phone && formData.currentSchool && formData.currentGrade
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <Logo width={64} height={64} />
        </div>
        <CardTitle>{t("StudentRegistrationTitle")}</CardTitle>
        <CardDescription>{t("StudentRegistrationDesc")}</CardDescription>
        
        {/* Progress Indicator */}
        <div className="flex items-center justify-center space-x-4 mt-4">
          <div className={`flex items-center ${currentStep >= 1 ? 'text-primary' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${currentStep >= 1 ? 'border-primary bg-primary text-white' : 'border-gray-300'}`}>
              1
            </div>
            <span className="ml-2 text-sm font-medium">{t("PersonalInfo")}</span>
          </div>
          <div className={`w-16 h-0.5 ${currentStep >= 2 ? 'bg-primary' : 'bg-gray-300'}`}></div>
          <div className={`flex items-center ${currentStep >= 2 ? 'text-primary' : 'text-gray-400'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${currentStep >= 2 ? 'border-primary bg-primary text-white' : 'border-gray-300'}`}>
              2
            </div>
            <span className="ml-2 text-sm font-medium">{t("AcademicInfo")}</span>
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
                  {t("PersonalInformation")}
                </h3>
                <p className="text-sm text-gray-600">
                  {t("PersonalInformationDesc")}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">{t("FirstName")}</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">{t("LastName")}</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age">{t("Age")}</Label>
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
                  <Label htmlFor="phone">{t("Phone")}</Label>
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
                  <Label htmlFor="currentSchool">{t("CurrentSchool")}</Label>
                  <Input
                    id="currentSchool"
                    value={formData.currentSchool}
                    onChange={(e) => handleChange("currentSchool", e.target.value)}
                    placeholder={t("CurrentSchoolPlaceholder")}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="currentGrade">{t("CurrentGrade")}</Label>
                  <Select value={formData.currentGrade} onValueChange={(value) => handleChange("currentGrade", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={t("SelectCurrentGrade")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="9">{t("Grade9")}</SelectItem>
                      <SelectItem value="10">{t("Grade10")}</SelectItem>
                      <SelectItem value="11">{t("Grade11")}</SelectItem>
                      <SelectItem value="12">{t("Grade12")}</SelectItem>
                      <SelectItem value="bachelor">{t("Bachelor")}</SelectItem>
                      <SelectItem value="master">{t("Master")}</SelectItem>
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
                  {t("Continue")}
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
                  {t("AcademicInformation")}
                </h3>
                <p className="text-sm text-gray-600">
                  {t("AcademicInformationDesc")}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="highSchoolGPA">{t("HighSchoolGPA")}</Label>
                  <Input
                    id="highSchoolGPA"
                    type="number"
                    step="0.01"
                    min="0"
                    max="4"
                    value={formData.highSchoolGPA}
                    onChange={(e) => handleChange("highSchoolGPA", e.target.value)}
                    placeholder={t("HighSchoolGPAPlaceholder")}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="languageLevel">{t("LanguageLevel")}</Label>
                  <Select value={formData.languageLevel} onValueChange={(value) => handleChange("languageLevel", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder={t("SelectLanguageLevel")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">{t("Beginner")}</SelectItem>
                      <SelectItem value="intermediate">{t("Intermediate")}</SelectItem>
                      <SelectItem value="advanced">{t("Advanced")}</SelectItem>
                      <SelectItem value="native">{t("Native")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="studyPlan">{t("StudyPlan")}</Label>
                <Textarea
                  id="studyPlan"
                  value={formData.studyPlan}
                  onChange={(e) => handleChange("studyPlan", e.target.value)}
                  placeholder={t("StudyPlanPlaceholder")}
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
                  {t("Back")}
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? t("Submitting") : t("SubmitApplication")}
                </Button>
              </div>
            </motion.div>
          )}
        </form>
      </CardContent>
    </Card>
  )
} 