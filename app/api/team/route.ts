import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongoose"
import Team from "@/models/team"
import { getServerSession } from "next-auth/next"
import { authOptions as rawAuthOptions } from "@/app/api/auth/[...nextauth]/route"
import type { AuthOptions } from "next-auth"

const authOptions = rawAuthOptions as AuthOptions

// Force dynamic rendering
export const dynamic = 'force-dynamic'

// Temporary mock data for development
const mockTeam = [
  {
    _id: "1",
    name: "Б.Мөнхзул",
    role: "Director",
    email: "monkhzul@haneducation.mn",
    phone: "+976 7777 7777",
    image: "/placeholder.svg?height=200&width=200&text=БМ",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "2",
    name: "Ө.Мөнгөнзул",
    role: "Advisor",
    email: "mungunzul@haneducation.mn",
    phone: "+976 7777 7778",
    image: "/placeholder.svg?height=200&width=200&text=ӨМ",
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase()
    const team = await Team.find({})
    return NextResponse.json({ team })
  } catch (error) {
    console.error("Error fetching team:", error)
    
    // Fallback: Return mock data for development
    console.log("Returning mock team data")
    
    return NextResponse.json({ 
      team: mockTeam,
      message: "Using mock data (MongoDB not available)"
    })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectToDatabase()
    const data = await req.json()

    const member = new Team(data)
    await member.save()

    return NextResponse.json({ member }, { status: 201 })
  } catch (error) {
    console.error("Error creating team member:", error)
    
    // Fallback: Store in temporary memory for development
    try {
      const session = await getServerSession(authOptions)
      if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      }

      const data = await req.json()
      const processedData = {
        ...data,
        _id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date()
      }

      mockTeam.push(processedData)
      console.log("Team member saved to temporary storage:", processedData)

      return NextResponse.json({ 
        member: processedData,
        message: "Team member saved to temporary storage (MongoDB not available)"
      }, { status: 201 })
    } catch (fallbackError) {
      console.error("Fallback error:", fallbackError)
      return NextResponse.json({ 
        error: "Failed to create team member", 
        details: "Database connection failed and fallback storage also failed"
      }, { status: 500 })
    }
  }
}
