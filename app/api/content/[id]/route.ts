import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongoose"
import Content from "@/models/content"
import { getServerSession } from "next-auth/next"
import { authOptions as rawAuthOptions } from "@/app/api/auth/[...nextauth]/route"
import type { AuthOptions } from "next-auth"

const authOptions = rawAuthOptions as AuthOptions

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase()
    const content = await Content.findById(params.id)

    if (!content) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 })
    }

    return NextResponse.json({ content })
  } catch (error) {
    console.error("Error fetching content:", error)
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectToDatabase()
    const data = await req.json()

    const content = await Content.findByIdAndUpdate(params.id, { ...data, updatedAt: Date.now() }, { new: true })

    if (!content) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 })
    }

    return NextResponse.json({ content })
  } catch (error) {
    console.error("Error updating content:", error)
    return NextResponse.json({ error: "Failed to update content" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectToDatabase()
    const content = await Content.findByIdAndDelete(params.id)

    if (!content) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Content deleted successfully" })
  } catch (error) {
    console.error("Error deleting content:", error)
    return NextResponse.json({ error: "Failed to delete content" }, { status: 500 })
  }
}
