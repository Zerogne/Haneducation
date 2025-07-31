import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongoose"
import Image from "@/models/image"

export async function PUT(req: NextRequest) {
  try {
    await connectToDatabase()
    const { imageId, section } = await req.json()

    if (!imageId || !section) {
      return NextResponse.json({ 
        error: "Image ID and section are required" 
      }, { status: 400 })
    }

    // First, unset all primary images for this section
    await Image.updateMany(
      { section, isPrimary: true },
      { $set: { isPrimary: false } }
    )

    // Then set the specified image as primary
    const result = await Image.findByIdAndUpdate(
      imageId,
      { $set: { isPrimary: true } },
      { new: true }
    )

    if (!result) {
      return NextResponse.json({ 
        error: "Image not found" 
      }, { status: 404 })
    }

    return NextResponse.json({ 
      success: true, 
      message: "Primary image updated successfully",
      image: result
    })

  } catch (error) {
    console.error("Error setting primary image:", error)
    return NextResponse.json({ 
      error: "Failed to update primary image",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
} 