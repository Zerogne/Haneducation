import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongoose"
import User from "@/models/user"
import bcrypt from "bcryptjs"

export const dynamic = 'force-dynamic'

export async function POST() {
  try {
    console.log("Attempting to setup admin user...")
    
    // For now, return success without database (temporary solution)
    // This allows the admin panel to work while database is being set up
    return NextResponse.json({ 
      message: "Admin setup completed (database not configured)",
      username: "admin",
      password: "admin123",
      note: "This is a temporary setup. Please configure MongoDB for full functionality."
    })
    
    /* 
    // Original database setup code (commented out until MongoDB is configured)
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
    */
  } catch (error) {
    console.error("Error setting up admin:", error)
    return NextResponse.json({ error: "Failed to setup admin" }, { status: 500 })
  }
} 