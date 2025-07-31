import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongoose"
import Content from "@/models/content"

export async function GET() {
  try {
    await connectToDatabase()
    
    // First, clear any existing content to avoid duplicate key errors
    await Content.deleteMany({})
    
    // Test creating a simple content item with valid section
    const testContent = new Content({
      section: "hero", // Using valid enum value
      title: "Test Content",
      content: JSON.stringify({ test: "data" }),
      description: "Test description",
      language: "en",
      isActive: true,
      order: 1
    })
    
    await testContent.save()
    
    // Clean up - delete the test content
    await Content.deleteOne({ section: "hero", title: "Test Content" })
    
    return NextResponse.json({ 
      success: true, 
      message: "Content API is working properly",
      database: "Connected successfully",
      validSections: ["hero", "about", "services", "testimonials", "team", "partners", "contact", "footer"]
    })
  } catch (error) {
    console.error("Test content error:", error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error",
      database: "Connection failed"
    }, { status: 500 })
  }
} 