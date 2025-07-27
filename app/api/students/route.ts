import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongoose"
import Student from "@/models/student"

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase()
    const students = await Student.find().sort({ createdAt: -1 })
    return NextResponse.json({ students })
  } catch (error) {
    console.error("Error fetching students:", error)
    return NextResponse.json({ error: "Failed to fetch students" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    console.log("Connecting to database for student creation...")
    await connectToDatabase()
    console.log("Database connected successfully")

    const data = await req.json()
    console.log("Received student data:", data)

    // Convert string values to numbers for required numeric fields
    const processedData = {
      ...data,
      age: parseInt(data.age) || 0,
      highSchoolGPA: parseFloat(data.highSchoolGPA) || 0
    }
    console.log("Processed student data:", processedData)

    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'age', 'currentSchool', 'currentGrade', 'highSchoolGPA', 'languageLevel', 'studyPlan', 'phone']
    const missingFields = requiredFields.filter(field => !processedData[field])
    
    if (missingFields.length > 0) {
      return NextResponse.json({ 
        error: "Missing required fields", 
        details: `Missing: ${missingFields.join(', ')}`
      }, { status: 400 })
    }

    const student = new Student(processedData)
    console.log("Student object created:", student)

    await student.save()
    console.log("Student saved successfully")

    return NextResponse.json({ student }, { status: 201 })
  } catch (error) {
    console.error("Error creating student:", error)
    
    // If it's a database connection error, return a more specific message
    if (error instanceof Error && error.message.includes('MongoDB')) {
      return NextResponse.json({ 
        error: "Database connection failed. Please try again later or contact support.",
        details: error.message
      }, { status: 503 })
    }
    
    return NextResponse.json({ 
      error: "Failed to create student", 
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
} 