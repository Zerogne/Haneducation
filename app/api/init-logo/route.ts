import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongoose"
import Image from "@/models/image"

export const dynamic = 'force-dynamic'

export async function POST() {
  try {
    await connectToDatabase()

    // Check if logo already exists
    const existingLogo = await Image.findOne({ section: "logo" })
    
    if (existingLogo) {
      return NextResponse.json({ 
        message: "Logo already exists",
        image: existingLogo 
      })
    }

    // Create logo entry with the new image
    const logoImage = new Image({
      publicId: "image-removebg-preview",
      url: "/image-removebg-preview.png",
      secureUrl: "/image-removebg-preview.png",
      width: 480,
      height: 480,
      format: "png",
      resourceType: "image",
      alt: "HAN Education Logo",
      caption: "HAN Education Logo",
      section: "logo"
    })

    await logoImage.save()

    return NextResponse.json({ 
      message: "Logo initialized successfully",
      image: logoImage 
    })
  } catch (error) {
    console.error("Error initializing logo:", error)
    return NextResponse.json({ error: "Failed to initialize logo" }, { status: 500 })
  }
} 