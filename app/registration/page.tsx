"use client"

import { StudentRegistrationForm } from "@/components/student-registration-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import Header from "@/components/header"
import { useLanguage } from "@/contexts/language-context"

export default function RegistrationPage() {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Use the same header as homepage */}
      <Header />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/">
            <Button variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              {t("BackToHome")}
            </Button>
          </Link>
        </div>

        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t("StudentRegistrationTitle")}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t("RegistrationPageDescription")}
          </p>
        </div>

        {/* Registration Form */}
        <div className="flex justify-center">
          <StudentRegistrationForm />
        </div>
      </div>
    </div>
  )
} 