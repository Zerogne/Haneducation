import { type NextRequest, NextResponse } from "next/server"
import { v2 as cloudinary } from "cloudinary"
import { getServerSession } from "next-auth/next"
import { authOptions as rawAuthOptions } from "@/lib/auth"
import type { AuthOptions } from "next-auth"

const authOptions = rawAuthOptions as AuthOptions

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await req.formData()
    const file = formData.get("file") as File
    const section = formData.get("section") as string || "general"
    const title = formData.get("title") as string || "Uploaded Image"

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: `han-education/${section}`,
          resource_type: "auto",
          transformation: [
            { quality: "auto" },
            { fetch_format: "auto" }
          ]
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        }
      ).end(buffer)
    })

    const uploadResult = result as any

    // Return the uploaded image data
    return NextResponse.json({
      success: true,
      image: {
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
        width: uploadResult.width,
        height: uploadResult.height,
        format: uploadResult.format,
        size: uploadResult.bytes,
        title: title,
        section: section
      }
    })

  } catch (error) {
    console.error("Upload error:", error)
    
    // Fallback: Return mock upload data for development
    if (!process.env.CLOUDINARY_API_KEY) {
      return NextResponse.json({
        success: true,
        image: {
          url: "/placeholder.svg?height=300&width=400&text=Uploaded+Image",
          publicId: `han-education/mock-${Date.now()}`,
          width: 400,
          height: 300,
          format: "svg",
          size: 15000,
          title: "Mock Uploaded Image",
          section: "general"
        },
        message: "Mock upload (Cloudinary not configured)"
      })
    }
    
    return NextResponse.json({ 
      error: "Upload failed", 
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
}
