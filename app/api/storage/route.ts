import { type NextRequest, NextResponse } from "next/server"
import { v2 as cloudinary } from "cloudinary"
import { connectToDatabase } from "@/lib/mongoose"
import Student from "@/models/student"
import Content from "@/models/content"
import Image from "@/models/image"

export const dynamic = 'force-dynamic'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase()

    // Calculate MongoDB storage usage based on document counts
    const [studentsCount, contentCount, imagesCount] = await Promise.all([
      Student.countDocuments(),
      Content.countDocuments(),
      Image.countDocuments()
    ])

    // Estimate storage usage (rough calculation)
    const estimatedStorageGB = (studentsCount * 0.001 + contentCount * 0.002 + imagesCount * 0.005)
    const totalStorageGB = 0.512 // MongoDB Atlas free tier: 512MB
    const mongoDbStorage = {
      used: Math.round(estimatedStorageGB * 1000) / 1000, // GB
      total: totalStorageGB,
      percentage: Math.round((estimatedStorageGB / totalStorageGB) * 100),
    }

    // Get Cloudinary usage
    let cloudinaryStorage = {
      used: 0,
      total: 1000, // MB
      percentage: 0,
      transformations: 0,
      objects: 0,
    }

    try {
      const cloudinaryUsage = await cloudinary.api.usage()
      cloudinaryStorage = {
        used: Math.round(cloudinaryUsage.resources.usage / 1024 / 1024), // MB
        total: Math.round(cloudinaryUsage.resources.limit / 1024 / 1024), // MB
        percentage: Math.round((cloudinaryUsage.resources.usage / cloudinaryUsage.resources.limit) * 100),
        transformations: cloudinaryUsage.transformations.usage,
        objects: cloudinaryUsage.objects.usage,
      }
    } catch (cloudinaryError) {
      console.error("Cloudinary error:", cloudinaryError)
      // Use default values if Cloudinary is not configured
    }

    return NextResponse.json({
      mongodb: mongoDbStorage,
      cloudinary: cloudinaryStorage,
    })
  } catch (error) {
    console.error("Error fetching storage info:", error)
    
    // Fallback: Return mock storage data for development
    const mockStorageData = {
      mongodb: {
        used: 0.001, // GB
        total: 0.512, // GB (512MB)
        percentage: 0.2,
      },
      cloudinary: {
        used: 25, // MB
        total: 1000, // MB
        percentage: 2.5,
        transformations: 150,
        objects: 12,
      },
    }
    
    console.log("Returning mock storage data")
    
    return NextResponse.json({
      ...mockStorageData,
      message: "Using mock data (MongoDB not available)"
    })
  }
}
