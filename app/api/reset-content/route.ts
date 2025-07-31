import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongoose"
import Content from "@/models/content"

export async function POST() {
  try {
    await connectToDatabase()
    
    // Drop the entire content collection to remove any problematic indexes
    await Content.collection.drop()
    
    return NextResponse.json({ 
      success: true, 
      message: "Content collection has been completely reset"
    })
    
  } catch (error) {
    console.error("Error resetting content:", error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
} 