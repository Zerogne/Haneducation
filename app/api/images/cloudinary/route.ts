import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongoose"
import Image from "@/models/image"

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase()
    const data = await req.json()

    const image = new Image({
      url: data.url,
      publicId: data.publicId,
      section: data.section || "general",
      alt: data.alt || "",
      type: data.type || "image",
      metadata: {
        width: data.width,
        height: data.height,
        format: data.format,
        size: data.size,
        cloudinaryUrl: data.url
      }
    })

    await image.save()

    return NextResponse.json({ image }, { status: 201 })
  } catch (error) {
    console.error("Error saving Cloudinary image:", error)
    return NextResponse.json({ error: "Failed to save image" }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase()
    
    const section = req.nextUrl.searchParams.get("section")
    const query = section ? { section } : {}

    const images = await Image.find(query).sort({ createdAt: -1 })
    return NextResponse.json({ images })
  } catch (error) {
    console.error("Error fetching Cloudinary images:", error)
    return NextResponse.json({ error: "Failed to fetch images" }, { status: 500 })
  }
} 