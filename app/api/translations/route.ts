import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongoose"
import Content from "@/models/content"

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase()

    const contents = await Content.find({})

    // Transform the content into a translations object
    const translations: Record<string, Record<string, string>> = {}

    contents.forEach((content) => {
      translations[content.key] = content.translations
    })

    return NextResponse.json({ translations })
  } catch (error) {
    console.error("Error fetching translations:", error)
    return NextResponse.json({ error: "Failed to fetch translations" }, { status: 500 })
  }
}
