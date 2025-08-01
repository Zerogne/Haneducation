import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import Statistics from "@/models/statistics"

export async function POST(req: NextRequest) {
  try {
    console.log("Connecting to database for statistics tracking...")
    await connectToDatabase()
    console.log("Database connected successfully")

    const data = await req.json()
    console.log("Received statistics data:", data)

    // Validate required fields
    if (!data.type) {
      return NextResponse.json({ 
        error: "Missing required field: type"
      }, { status: 400 })
    }

    // Get client information
    const userAgent = req.headers.get('user-agent') || ''
    const ipAddress = req.headers.get('x-forwarded-for') || 
                     req.headers.get('x-real-ip') || 
                     'unknown'
    const referrer = req.headers.get('referer') || ''

    // Create statistics entry
    const statsData = {
      ...data,
      metadata: {
        userAgent,
        ipAddress,
        referrer,
        ...data.metadata
      }
    }

    const stats = new Statistics(statsData)
    console.log("Statistics object created:", stats)

    await stats.save()
    console.log("Statistics saved successfully")

    return NextResponse.json({ 
      success: true, 
      message: "Statistics tracked successfully",
      stats 
    }, { status: 201 })
  } catch (error) {
    console.error("Error creating statistics:", error)
    return NextResponse.json({ 
      error: "Failed to track statistics", 
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase()
    
    const { searchParams } = new URL(req.url)
    const type = searchParams.get('type')
    const page = searchParams.get('page')
    const section = searchParams.get('section')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    const limit = parseInt(searchParams.get('limit') || '50')
    
    let query: any = {}
    
    if (type) {
      query.type = type
    }
    
    if (page) {
      query.page = page
    }
    
    if (section) {
      query.section = section
    }
    
    // Date range filter
    if (startDate || endDate) {
      query.date = {}
      if (startDate) {
        query.date.$gte = new Date(startDate)
      }
      if (endDate) {
        query.date.$lte = new Date(endDate)
      }
    }
    
    // Get aggregated statistics
    const aggregation = [
      { $match: query },
      {
        $group: {
          _id: {
            type: "$type",
            page: "$page",
            section: "$section",
            action: "$action",
            value: "$value",
            date: { $dateToString: { format: "%Y-%m-%d", date: "$date" } }
          },
          count: { $sum: "$count" },
          totalCount: { $sum: 1 }
        }
      },
      { $sort: { "_id.date": -1, count: -1 } },
      { $limit: limit }
    ]
    
    const stats = await Statistics.aggregate(aggregation)
    
    // Get summary statistics
    const summaryQuery = type ? { type } : {}
    const totalStats = await Statistics.countDocuments(summaryQuery)
    
    // Get unique visitors (by IP) for the last 30 days
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
    
    const uniqueVisitors = await Statistics.distinct('metadata.ipAddress', {
      ...summaryQuery,
      date: { $gte: thirtyDaysAgo }
    })
    
    return NextResponse.json({ 
      statistics: stats,
      summary: {
        total: totalStats,
        uniqueVisitors: uniqueVisitors.length,
        period: "30 days"
      }
    })
  } catch (error) {
    console.error("Error fetching statistics:", error)
    return NextResponse.json({ 
      error: "Failed to fetch statistics", 
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
} 