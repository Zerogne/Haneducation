import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongoose"
import Student from "@/models/student"

export async function POST() {
  try {
    await connectToDatabase()
    
    // Find all students with invalid status values
    const students = await Student.find({})
    console.log("Found students:", students.length)
    
    let updatedCount = 0
    for (const student of students) {
      console.log("Student status:", student.status)
      
      // If status is not in the valid enum, update it to "pending"
      if (!["pending", "contacted", "enrolled", "approved", "rejected"].includes(student.status)) {
        console.log("Fixing invalid status for student:", student._id)
        await Student.findByIdAndUpdate(student._id, { status: "pending" })
        updatedCount++
      }
    }
    
    return NextResponse.json({ 
      success: true, 
      message: `Fixed ${updatedCount} students with invalid statuses`,
      totalStudents: students.length
    })
    
  } catch (error) {
    console.error("Error fixing student statuses:", error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
} 