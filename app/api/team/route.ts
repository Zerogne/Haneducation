import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongoose"
import Team from "@/models/team"
import { getServerSession } from "next-auth/next"
import { authOptions as rawAuthOptions } from "@/app/api/auth/[...nextauth]/route"
import type { AuthOptions } from "next-auth"

const authOptions = rawAuthOptions as AuthOptions

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase()
    const team = await Team.find({})
    return NextResponse.json({ team })
  } catch (error) {
    console.error("Error fetching team:", error)
    return NextResponse.json({ error: "Failed to fetch team" }, { status: 500 })
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
    return NextResponse.json({ error: "Failed to create team member" }, { status: 500 })
  }
}
