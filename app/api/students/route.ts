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
    await connectToDatabase()
    const data = await req.json()

    const student = new Student(data)
    await student.save()

    return NextResponse.json({ student }, { status: 201 })
  } catch (error) {
    console.error("Error creating student:", error)
    return NextResponse.json({ error: "Failed to create student" }, { status: 500 })
  }
} 