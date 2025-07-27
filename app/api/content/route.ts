import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongoose"
import Content from "@/models/content"
import { getServerSession } from "next-auth/next"
import { authOptions as rawAuthOptions } from "@/app/api/auth/[...nextauth]/route"
import type { AuthOptions } from "next-auth"

const authOptions = rawAuthOptions as AuthOptions

export const dynamic = 'force-dynamic'

// Temporary mock data for development
const mockContents = [
  {
    _id: "1",
    section: "hero",
    title: "Welcome to HAN Education",
    content: "Your gateway to studying in China with scholarships",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "2",
    section: "about",
    title: "About Our Services",
    content: "We provide comprehensive educational consulting services",
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase()

    const section = req.nextUrl.searchParams.get("section")
    const query = section ? { section } : {}

    const contents = await Content.find(query)
    return NextResponse.json({ contents })
  } catch (error) {
    console.error("Error fetching content:", error)
    
    // Fallback: Return mock data for development
    const section = req.nextUrl.searchParams.get("section")
    const filteredContents = section 
      ? mockContents.filter(content => content.section === section)
      : mockContents
    
    console.log("Returning mock content:", filteredContents.length)
    
    return NextResponse.json({ 
      contents: filteredContents,
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

    const content = new Content(data)
    await content.save()

    return NextResponse.json({ content }, { status: 201 })
  } catch (error) {
    console.error("Error creating content:", error)
    
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

      mockContents.push(processedData)
      console.log("Content saved to temporary storage:", processedData)

      return NextResponse.json({ 
        content: processedData,
        message: "Content saved to temporary storage (MongoDB not available)"
      }, { status: 201 })
    } catch (fallbackError) {
      console.error("Fallback error:", fallbackError)
      return NextResponse.json({ 
        error: "Failed to create content", 
        details: "Database connection failed and fallback storage also failed"
      }, { status: 500 })
    }
  }
}
