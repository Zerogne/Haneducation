import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongoose"
import Student from "@/models/student"
import Service from "@/models/service"
import Testimonial from "@/models/testimonial"
import Team from "@/models/team"
import Partner from "@/models/partner"
import Image from "@/models/image"
import Content from "@/models/content"

export const dynamic = 'force-dynamic'

// Mock data counts for when database is not available
const mockData = {
  services: 6,
  partners: 6,
  team: 3,
  testimonials: 4,
  images: 12,
  content: 8
}

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase()

    // Get real counts from database
    const [
      studentsCount,
      servicesCount,
      testimonialsCount,
      teamCount,
      partnersCount,
      imagesCount,
      contentCount
    ] = await Promise.all([
      Student.countDocuments(),
      Service.countDocuments(),
      Testimonial.countDocuments(),
      Team.countDocuments(),
      Partner.countDocuments(),
      Image.countDocuments(),
      Content.countDocuments()
    ])

    // Calculate storage usage
    const estimatedStorageGB = (studentsCount * 0.001 + contentCount * 0.002 + imagesCount * 0.005)
    const totalStorageGB = 0.512 // 512MB MongoDB Atlas free tier
    const storagePercentage = Math.round((estimatedStorageGB / totalStorageGB) * 100)

    // Use actual team count from database, but if it's 0, use the default count of 3
    const actualTeamCount = teamCount > 0 ? teamCount : 3

    return NextResponse.json({
      students: studentsCount,
      services: servicesCount,
      testimonials: testimonialsCount,
      team: actualTeamCount,
      partners: partnersCount,
      images: imagesCount,
      content: contentCount,
      storage: {
        used: Math.round(estimatedStorageGB * 1000) / 1000, // GB
        total: totalStorageGB,
        percentage: storagePercentage
      }
    })
  } catch (error) {
    console.error("Error fetching analytics:", error)
    
    // Fallback: Return mock data with actual counts
    const estimatedStorageGB = (mockData.content * 0.002 + mockData.images * 0.005)
    const totalStorageGB = 0.512
    const storagePercentage = Math.round((estimatedStorageGB / totalStorageGB) * 100)
    
    return NextResponse.json({
      students: 0, // No students in mock data
      services: mockData.services,
      testimonials: mockData.testimonials,
      team: 3, // Always show 3 team members as per the component
      partners: mockData.partners,
      images: mockData.images,
      content: mockData.content,
      storage: {
        used: Math.round(estimatedStorageGB * 1000) / 1000, // GB
        total: totalStorageGB,
        percentage: storagePercentage
      },
      message: "Using mock data (MongoDB not available)"
    })
  }
}
