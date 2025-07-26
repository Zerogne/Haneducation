import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongoose"
import User from "@/models/user"
import bcrypt from "bcryptjs"

export const dynamic = 'force-dynamic'

export async function POST() {
  try {
    await connectToDatabase()

    // Check if admin user already exists
    const existingAdmin = await User.findOne({ role: "admin" })
    
    if (existingAdmin) {
      return NextResponse.json({ 
        message: "Admin user already exists",
        username: existingAdmin.username 
      })
    }

    // Create default admin user
    const hashedPassword = await bcrypt.hash("admin123", 12)
    
    const adminUser = new User({
      username: "admin",
      password: hashedPassword,
      name: "Administrator",
      email: "admin@han-education.com",
      role: "admin"
    })

    await adminUser.save()

    return NextResponse.json({ 
      message: "Admin user created successfully",
      username: "admin",
      password: "admin123"
    })
  } catch (error) {
    console.error("Error setting up admin:", error)
    return NextResponse.json({ error: "Failed to setup admin" }, { status: 500 })
  }
} 