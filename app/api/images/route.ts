import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongoose"
import Image from "@/models/image"

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    console.log("Connecting to database...")
    await connectToDatabase()
    console.log("Database connected successfully")

    const section = req.nextUrl.searchParams.get("section")
    console.log("Requested section:", section)
    const query = section ? { section } : {}
    console.log("Query:", query)

    const images = await Image.find(query).sort({ createdAt: -1 })
    console.log("Found images:", images.length)
    
    return NextResponse.json({ images })
  } catch (error) {
    console.error("Error fetching images:", error)
    return NextResponse.json({ 
      error: "Failed to fetch images", 
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
}
