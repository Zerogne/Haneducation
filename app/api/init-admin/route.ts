import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongoose"
import User from "@/models/user"
import bcrypt from "bcryptjs"

export const dynamic = 'force-dynamic'

// GET - Initialize admin user (for browser access)
export async function GET() {
  try {
    await connectToDatabase()

    // Check if admin user already exists
    const existingAdmin = await User.findOne({ username: "admin" })
    
    if (existingAdmin) {
      // Update existing admin password
      const hashedPassword = await bcrypt.hash("HanEducation123@", 12)
      existingAdmin.password = hashedPassword
      await existingAdmin.save()
      
      return NextResponse.json({ 
        success: true,
        message: "Admin password updated successfully",
        user: {
          id: existingAdmin._id,
          username: existingAdmin.username,
          name: existingAdmin.name,
          email: existingAdmin.email,
          role: existingAdmin.role
        }
      })
    }

    // Create new admin user
    const hashedPassword = await bcrypt.hash("HanEducation123@", 12)
    
    const adminUser = new User({
      username: "admin",
      password: hashedPassword,
      name: "Administrator",
      email: "admin@han-education.com",
      role: "admin"
    })

    await adminUser.save()

    return NextResponse.json({ 
      success: true,
      message: "Admin user created successfully",
      user: {
        id: adminUser._id,
        username: adminUser.username,
        name: adminUser.name,
        email: adminUser.email,
        role: adminUser.role
      }
    })
  } catch (error) {
    console.error("Error initializing admin user:", error)
    return NextResponse.json(
      { success: false, error: "Failed to initialize admin user" }, 
      { status: 500 }
    )
  }
}

// POST - Initialize admin user (for programmatic access)
export async function POST() {
  try {
    await connectToDatabase()

    // Check if admin user already exists
    const existingAdmin = await User.findOne({ username: "admin" })
    
    if (existingAdmin) {
      // Update existing admin password
      const hashedPassword = await bcrypt.hash("HanEducation123@", 12)
      existingAdmin.password = hashedPassword
      await existingAdmin.save()
      
      return NextResponse.json({ 
        success: true,
        message: "Admin password updated successfully",
        user: {
          id: existingAdmin._id,
          username: existingAdmin.username,
          name: existingAdmin.name,
          email: existingAdmin.email,
          role: existingAdmin.role
        }
      })
    }

    // Create new admin user
    const hashedPassword = await bcrypt.hash("HanEducation123@", 12)
    
    const adminUser = new User({
      username: "admin",
      password: hashedPassword,
      name: "Administrator",
      email: "admin@han-education.com",
      role: "admin"
    })

    await adminUser.save()

    return NextResponse.json({ 
      success: true,
      message: "Admin user created successfully",
      user: {
        id: adminUser._id,
        username: adminUser.username,
        name: adminUser.name,
        email: adminUser.email,
        role: adminUser.role
      }
    })
  } catch (error) {
    console.error("Error initializing admin user:", error)
    return NextResponse.json(
      { success: false, error: "Failed to initialize admin user" }, 
      { status: 500 }
    )
  }
} 