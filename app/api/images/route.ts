import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongoose"
import Image from "@/models/image"

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase()

    const section = req.nextUrl.searchParams.get("section")
    const query = section ? { section } : {}

    const images = await Image.find(query).sort({ createdAt: -1 })
    return NextResponse.json({ images })
  } catch (error) {
    console.error("Error fetching images:", error)
    return NextResponse.json({ error: "Failed to fetch images" }, { status: 500 })
  }
}
