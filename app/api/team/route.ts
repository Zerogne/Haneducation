import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongoose"
import Team from "@/models/team"

export const dynamic = 'force-dynamic'

// GET - Fetch all team members
export async function GET() {
  try {
    await connectToDatabase()
    
    const teamMembers = await Team.find({ isActive: true })
      .sort({ order: 1, createdAt: 1 })
      .lean()

    return NextResponse.json({ 
      success: true, 
      team: teamMembers 
    })
  } catch (error) {
    console.error("Error fetching team members:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch team members" }, 
      { status: 500 }
    )
  }
}

// POST - Create new team member
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase()
    
    const body = await request.json()
    
    const newTeamMember = new Team({
      name: body.name,
      role: body.role,
      email: body.email,
      phone: body.phone,
      image: body.image || "",
      linkedin: body.linkedin || "",
      bio: body.bio || "",
      department: body.department || "general",
      order: body.order || 0,
      metadata: {
        experience: body.experience || "",
        education: body.education || "",
        languages: body.languages || [],
        specializations: body.specializations || []
      }
    })

    await newTeamMember.save()

    return NextResponse.json({ 
      success: true, 
      message: "Team member created successfully",
      teamMember: newTeamMember 
    })
  } catch (error) {
    console.error("Error creating team member:", error)
    return NextResponse.json(
      { success: false, error: "Failed to create team member" }, 
      { status: 500 }
    )
  }
}

// PUT - Update team member
export async function PUT(request: NextRequest) {
  try {
    await connectToDatabase()
    
    const body = await request.json()
    const { id, ...updateData } = body

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Team member ID is required" }, 
        { status: 400 }
      )
    }

    const updatedTeamMember = await Team.findByIdAndUpdate(
      id,
      {
        ...updateData,
        updatedAt: new Date()
      },
      { new: true }
    )

    if (!updatedTeamMember) {
      return NextResponse.json(
        { success: false, error: "Team member not found" }, 
        { status: 404 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      message: "Team member updated successfully",
      teamMember: updatedTeamMember 
    })
  } catch (error) {
    console.error("Error updating team member:", error)
    return NextResponse.json(
      { success: false, error: "Failed to update team member" }, 
      { status: 500 }
    )
  }
}

// DELETE - Delete team member
export async function DELETE(request: NextRequest) {
  try {
    await connectToDatabase()
    
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Team member ID is required" }, 
        { status: 400 }
      )
    }

    const deletedTeamMember = await Team.findByIdAndDelete(id)

    if (!deletedTeamMember) {
      return NextResponse.json(
        { success: false, error: "Team member not found" }, 
        { status: 404 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      message: "Team member deleted successfully" 
    })
  } catch (error) {
    console.error("Error deleting team member:", error)
    return NextResponse.json(
      { success: false, error: "Failed to delete team member" }, 
      { status: 500 }
    )
  }
}
