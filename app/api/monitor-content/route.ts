import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongoose"
import Content from "@/models/content"

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase()
    
    // Get all content with timestamps
    const allContent = await Content.find({}).sort({ updatedAt: -1 })
    
    // Get content counts by section
    const sectionCounts = await Content.aggregate([
      {
        $group: {
          _id: "$section",
          count: { $sum: 1 },
          languages: { $addToSet: "$language" },
          lastUpdated: { $max: "$updatedAt" }
        }
      },
      { $sort: { _id: 1 } }
    ])
    
    // Get recent changes (last 24 hours)
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    
    const recentChanges = await Content.find({
      updatedAt: { $gte: yesterday }
    }).sort({ updatedAt: -1 })
    
    return NextResponse.json({
      message: "Content monitoring results",
      totalContent: allContent.length,
      sectionCounts,
      recentChanges: recentChanges.map(item => ({
        section: item.section,
        language: item.language,
        title: item.title,
        updatedAt: item.updatedAt
      })),
      allContent: allContent.map(item => ({
        section: item.section,
        language: item.language,
        title: item.title,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt
      }))
    })
  } catch (error) {
    console.error("Error monitoring content:", error)
    return NextResponse.json({ 
      error: "Failed to monitor content",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
} 