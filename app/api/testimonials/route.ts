import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongoose"
import Testimonial from "@/models/testimonial"
import { getServerSession } from "next-auth/next"
import { authOptions as rawAuthOptions } from "@/app/api/auth/[...nextauth]/route"
import type { AuthOptions } from "next-auth"

const authOptions = rawAuthOptions as AuthOptions

export const dynamic = 'force-dynamic'

// Temporary mock data for development
const mockTestimonials = [
  {
    _id: "1",
    name: "Б.Мөнхзул",
    university: "Tsinghua University",
    content: "HAN Education helped me get into one of the best universities in China. The process was smooth and professional.",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80&text=БМ",
    isActive: true,
    order: 1,
    language: "en",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "2",
    name: "Ө.Мөнгөнзул",
    university: "Peking University",
    content: "Excellent service and support throughout my application process. Highly recommended!",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80&text=ӨМ",
    isActive: true,
    order: 2,
    language: "en",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "3",
    name: "Э.Анар",
    university: "Fudan University",
    content: "The team at HAN Education is very knowledgeable and helped me with every step of the process.",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80&text=ЭА",
    isActive: true,
    order: 3,
    language: "en",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "4",
    name: "А.Маралмаа",
    university: "Shanghai Jiao Tong University",
    content: "I'm grateful for the guidance and support I received. The scholarship application was handled perfectly.",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80&text=АМ",
    isActive: true,
    order: 4,
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
    
    const testimonials = await Testimonial.find(query).sort({ order: 1 })
    return NextResponse.json({ testimonials })
  } catch (error) {
    console.error("Error fetching testimonials:", error)
    
    // Fallback: Return mock data for development
    const language = req.nextUrl.searchParams.get("language") || "en"
    const filteredTestimonials = mockTestimonials.filter(testimonial => testimonial.language === language)
    
    console.log("Returning mock testimonials:", filteredTestimonials.length)
    
    return NextResponse.json({ 
      testimonials: filteredTestimonials,
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

    const testimonial = new Testimonial(data)
    await testimonial.save()

    return NextResponse.json({ testimonial }, { status: 201 })
  } catch (error) {
    console.error("Error creating testimonial:", error)
    
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

      mockTestimonials.push(processedData)
      console.log("Testimonial saved to temporary storage:", processedData)

      return NextResponse.json({ 
        testimonial: processedData,
        message: "Testimonial saved to temporary storage (MongoDB not available)"
      }, { status: 201 })
    } catch (fallbackError) {
      console.error("Fallback error:", fallbackError)
      return NextResponse.json({ 
        error: "Failed to create testimonial", 
        details: "Database connection failed and fallback storage also failed"
      }, { status: 500 })
    }
  }
} 