import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongoose"
import Content from "@/models/content"
import { getServerSession } from "next-auth/next"
import { authOptions as rawAuthOptions } from "@/app/api/auth/[...nextauth]/route"
import type { AuthOptions } from "next-auth"

const authOptions = rawAuthOptions as AuthOptions

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase()

    const section = req.nextUrl.searchParams.get("section")
    const query = section ? { section } : {}

    const contents = await Content.find(query)
    return NextResponse.json({ contents })
  } catch (error) {
    console.error("Error fetching content:", error)
    return NextResponse.json({ error: "Failed to fetch content" }, { status: 500 })
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

    const content = new Content(data)
    await content.save()

    return NextResponse.json({ content }, { status: 201 })
  } catch (error) {
    console.error("Error creating content:", error)
    return NextResponse.json({ error: "Failed to create content" }, { status: 500 })
  }
}
