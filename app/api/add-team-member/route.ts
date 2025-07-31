import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongoose"
import Team from "@/models/team"

export const dynamic = 'force-dynamic'

export async function POST() {
  try {
    await connectToDatabase()

    // Check if the missing team member exists
    const existingMember = await Team.findOne({ name: "Ө.Мөнгөнзул" })
    
    if (!existingMember) {
      const newMember = new Team({
        name: "Ө.Мөнгөнзул",
        role: "Хөгжүүлэлтийн захирал",
        image: "/placeholder.svg?height=200&width=200&text=ӨМ",
        email: "mungunzul@haneducation.mn",
        phone: "+976 7777 7778",
        linkedin: "linkedin.com/in/mungunzul",
        badge: "Мэргэжилтэн",
        department: "development",
        metadata: {
          education: "Mongolian University of Science and Technology"
        }
      })
      
      await newMember.save()
      console.log("Missing team member added successfully")
      
      return NextResponse.json({ 
        success: true, 
        message: "Missing team member added successfully" 
      })
    } else {
      return NextResponse.json({ 
        success: true, 
        message: "Team member already exists" 
      })
    }
  } catch (error) {
    console.error("Error adding team member:", error)
    return NextResponse.json(
      { success: false, error: "Failed to add team member" }, 
      { status: 500 }
    )
  }
} 