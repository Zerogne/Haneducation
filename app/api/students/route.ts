import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongoose"
import Student from "@/models/student"

export const dynamic = 'force-dynamic'

// Temporary in-memory storage for development
let tempStudents: any[] = []

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase()
    const students = await Student.find().sort({ createdAt: -1 })
    return NextResponse.json({ students })
  } catch (error) {
    console.error("Error fetching students:", error)
    // Fallback to temporary storage
    return NextResponse.json({ students: tempStudents })
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
    
    // Fallback: Store in temporary memory for development
    try {
      const data = await req.json()
      const processedData = {
        ...data,
        age: parseInt(data.age) || 0,
        highSchoolGPA: parseFloat(data.highSchoolGPA) || 0,
        _id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
        status: "pending"
      }

      // Validate required fields
      const requiredFields = ['firstName', 'lastName', 'age', 'currentSchool', 'currentGrade', 'highSchoolGPA', 'languageLevel', 'studyPlan', 'phone']
      const missingFields = requiredFields.filter(field => !processedData[field])
      
      if (missingFields.length > 0) {
        return NextResponse.json({ 
          error: "Missing required fields", 
          details: `Missing: ${missingFields.join(', ')}`
        }, { status: 400 })
      }

      tempStudents.push(processedData)
      console.log("Student saved to temporary storage:", processedData)

      return NextResponse.json({ 
        student: processedData,
        message: "Student saved to temporary storage (MongoDB not available)"
      }, { status: 201 })
    } catch (fallbackError) {
      console.error("Fallback error:", fallbackError)
      return NextResponse.json({ 
        error: "Failed to create student", 
        details: "Database connection failed and fallback storage also failed"
      }, { status: 500 })
    }
  }
} 