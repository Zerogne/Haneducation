import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongoose"
import Student from "@/models/student"
import Service from "@/models/service"
import Team from "@/models/team"
import Partner from "@/models/partner"

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    console.log("Testing database connection...")
    await connectToDatabase()
    console.log("Database connected successfully")

    // Count documents
    const [studentsCount, servicesCount, teamCount, partnersCount] = await Promise.all([
      Student.countDocuments(),
      Service.countDocuments(),
      Team.countDocuments(),
      Partner.countDocuments()
    ])

    return NextResponse.json({
      success: true,
      message: "Database connection successful",
      counts: {
        students: studentsCount,
        services: servicesCount,
        team: teamCount,
        partners: partnersCount
      }
    })
  } catch (error) {
    console.error("Database connection failed:", error)
    return NextResponse.json({
      success: false,
      error: "Database connection failed",
      message: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
} 