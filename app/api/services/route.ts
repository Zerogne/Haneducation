import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongoose"
import Service from "@/models/service"
import { getServerSession } from "next-auth/next"
import { authOptions as rawAuthOptions } from "@/app/api/auth/[...nextauth]/route"
import type { AuthOptions } from "next-auth"

const authOptions = rawAuthOptions as AuthOptions

export const dynamic = 'force-dynamic'

// Temporary mock data for development
const mockServices = [
  {
    _id: "1",
    title: "University Placement",
    description: "Placement for bachelor, master, and PhD programs",
    icon: "GraduationCap",
    features: ["Bachelor", "Master", "PhD", "Professional Training"],
    color: "blue",
    hoverColor: "blue",
    isActive: true,
    order: 1,
    language: "en",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "2",
    title: "Language Program",
    description: "Registration and consulting for Chinese language programs",
    icon: "Languages",
    features: ["HSKPrep", "LanguageTraining", "OnlineClass", "DocumentTranslation"],
    color: "green",
    hoverColor: "green",
    isActive: true,
    order: 2,
    language: "en",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "3",
    title: "Visa Documentation",
    description: "Preparation of all documents required for student visa",
    icon: "FileText",
    features: ["VisaApplication", "DocumentTranslation", "Notarization", "Consulting"],
    color: "purple",
    hoverColor: "purple",
    isActive: true,
    order: 3,
    language: "en",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "4",
    title: "Scholarship Placement",
    description: "Assistance in obtaining government and private scholarships",
    icon: "Award",
    features: ["GovScholarship", "UniScholarship"],
    color: "orange",
    hoverColor: "orange",
    isActive: true,
    order: 4,
    language: "en",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "5",
    title: "Consulting Service",
    description: "Consulting for educational and career choices",
    icon: "Users",
    features: ["CareerConsulting", "UniConsulting"],
    color: "red",
    hoverColor: "red",
    isActive: true,
    order: 5,
    language: "en",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "6",
    title: "Support Service",
    description: "Continuous support during your studies in China",
    icon: "BookOpen",
    features: ["AcademicSupport", "LifeAdvice"],
    color: "teal",
    hoverColor: "teal",
    isActive: true,
    order: 6,
    language: "en",
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase()
    const language = req.nextUrl.searchParams.get("language") || "en"
    const query = { language, isActive: true }
    
    const services = await Service.find(query).sort({ order: 1 })
    return NextResponse.json({ services })
  } catch (error) {
    console.error("Error fetching services:", error)
    
    // Fallback: Return mock data for development
    const language = req.nextUrl.searchParams.get("language") || "en"
    const filteredServices = mockServices.filter(service => service.language === language)
    
    console.log("Returning mock services:", filteredServices.length)
    
    return NextResponse.json({ 
      services: filteredServices,
      message: "Using mock data (MongoDB not available)"
    })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectToDatabase()
    const data = await req.json()

    const service = new Service(data)
    await service.save()

    return NextResponse.json({ service }, { status: 201 })
  } catch (error) {
    console.error("Error creating service:", error)
    
    // Fallback: Store in temporary memory for development
    try {
      const session = await getServerSession(authOptions)
      if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      }

      const data = await req.json()
      const processedData = {
        ...data,
        _id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date()
      }

      mockServices.push(processedData)
      console.log("Service saved to temporary storage:", processedData)

      return NextResponse.json({ 
        service: processedData,
        message: "Service saved to temporary storage (MongoDB not available)"
      }, { status: 201 })
    } catch (fallbackError) {
      console.error("Fallback error:", fallbackError)
      return NextResponse.json({ 
        error: "Failed to create service", 
        details: "Database connection failed and fallback storage also failed"
      }, { status: 500 })
    }
  }
} 