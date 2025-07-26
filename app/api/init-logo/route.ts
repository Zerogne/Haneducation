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

    // Create logo entry
    const logoImage = new Image({
      url: "https://res.cloudinary.com/dewhswho9/image/upload/v1753428499/8f4d5273d40a38622a96290a75f72c02_480_nflduc.jpg",
      publicId: "8f4d5273d40a38622a96290a75f72c02",
      section: "logo",
      alt: "HAN Education Logo",
      type: "image",
      metadata: {
        width: 480,
        height: 480,
        format: "jpg",
        size: "cloudinary",
        cloudinaryUrl: "https://res.cloudinary.com/dewhswho9/image/upload/v1753428499/8f4d5273d40a38622a96290a75f72c02_480_nflduc.jpg"
      }
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