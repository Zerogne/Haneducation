import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongoose"
import Content from "@/models/content"

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase()
    
    // Get all content from database
    const allContent = await Content.find({}).sort({ createdAt: -1 })
    
    // Get content by section
    const contactContent = await Content.find({ section: "contact" })
    const heroContent = await Content.find({ section: "hero" })
    
    return NextResponse.json({
      message: "Content test results",
      totalContent: allContent.length,
      contactContent: contactContent.length,
      heroContent: heroContent.length,
      allContent: allContent.map(item => ({
        section: item.section,
        language: item.language,
        title: item.title,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt
      })),
      contactDetails: contactContent.map(item => ({
        section: item.section,
        language: item.language,
        content: item.content,
        createdAt: item.createdAt
      })),
      heroDetails: heroContent.map(item => ({
        section: item.section,
        language: item.language,
        content: item.content,
        createdAt: item.createdAt
      }))
    })
  } catch (error) {
    console.error("Error testing content:", error)
    return NextResponse.json({ 
      error: "Failed to test content",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
} 