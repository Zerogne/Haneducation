import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongoose"
import Student from "@/models/student"
import { getServerSession } from "next-auth/next"
import { authOptions as rawAuthOptions } from "@/lib/auth"
import type { AuthOptions } from "next-auth"

const authOptions = rawAuthOptions as AuthOptions

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectToDatabase()
    const student = await Student.findById(params.id)
    
    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, student })
  } catch (error) {
    console.error("Error fetching student:", error)
    return NextResponse.json({ error: "Failed to fetch student" }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    console.log("PATCH request for student:", params.id)
    
    // Temporarily disable authentication for testing
    // const session = await getServerSession(authOptions)
    // if (!session) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    // }

    await connectToDatabase()
    const data = await req.json()
    console.log("Update data:", data)

    const student = await Student.findByIdAndUpdate(
      params.id,
      { $set: data },
      { new: true, runValidators: true }
    )

    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 })
    }

    console.log("Student updated successfully:", student)
    return NextResponse.json({ success: true, student })
  } catch (error) {
    console.error("Error updating student:", error)
    return NextResponse.json({ 
      error: "Failed to update student",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectToDatabase()
    const student = await Student.findByIdAndDelete(params.id)

    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Student deleted successfully" })
  } catch (error) {
    console.error("Error deleting student:", error)
    return NextResponse.json({ error: "Failed to delete student" }, { status: 500 })
  }
} 