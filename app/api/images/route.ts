import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongoose"
import Image from "@/models/image"

export const dynamic = 'force-dynamic'

// Temporary mock data for development
const mockImages = [
  {
    _id: "1",
    title: "Sample Image 1",
    url: "/placeholder.svg?height=300&width=400&text=Sample+Image+1",
    section: "hero",
    format: "svg",
    width: 400,
    height: 300,
    size: 15000,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "2", 
    title: "Sample Image 2",
    url: "/placeholder.svg?height=300&width=400&text=Sample+Image+2",
    section: "about",
    format: "svg",
    width: 400,
    height: 300,
    size: 12000,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

export async function GET(req: NextRequest) {
  try {
    console.log("Connecting to database...")
    await connectToDatabase()
    console.log("Database connected successfully")

    const section = req.nextUrl.searchParams.get("section")
    console.log("Requested section:", section)
    const query = section ? { section } : {}
    console.log("Query:", query)

    const images = await Image.find(query).sort({ createdAt: -1 })
    console.log("Found images:", images.length)
    
    return NextResponse.json({ images })
  } catch (error) {
    console.error("Error fetching images:", error)
    
    // Fallback: Return mock data for development
    const section = req.nextUrl.searchParams.get("section")
    const filteredImages = section 
      ? mockImages.filter(img => img.section === section)
      : mockImages
    
    console.log("Returning mock images:", filteredImages.length)
    
    return NextResponse.json({ 
      images: filteredImages,
      message: "Using mock data (MongoDB not available)"
    })
  }
}

export async function POST(req: NextRequest) {
  try {
    console.log("Connecting to database for image creation...")
    await connectToDatabase()
    console.log("Database connected successfully")

    const data = await req.json()
    console.log("Received image data:", data)

    const image = new Image(data)
    console.log("Image object created:", image)

    await image.save()
    console.log("Image saved successfully")

    return NextResponse.json({ image }, { status: 201 })
  } catch (error) {
    console.error("Error creating image:", error)
    
    // Fallback: Store in temporary memory for development
    try {
      const data = await req.json()
      const processedData = {
        ...data,
        _id: Date.now().toString(),
        format: data.format || "jpg",
        width: data.width || 400,
        height: data.height || 300,
        size: data.size || 15000,
        createdAt: new Date(),
        updatedAt: new Date()
      }

      mockImages.push(processedData)
      console.log("Image saved to temporary storage:", processedData)

      return NextResponse.json({ 
        image: processedData,
        message: "Image saved to temporary storage (MongoDB not available)"
      }, { status: 201 })
    } catch (fallbackError) {
      console.error("Fallback error:", fallbackError)
      return NextResponse.json({ 
        error: "Failed to create image", 
        details: "Database connection failed and fallback storage also failed"
      }, { status: 500 })
    }
  }
}
