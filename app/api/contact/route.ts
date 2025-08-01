import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import Contact from "@/models/contact"
import Statistics from "@/models/statistics"

export async function POST(req: NextRequest) {
  try {
    console.log("Connecting to database for contact submission...")
    await connectToDatabase()
    console.log("Database connected successfully")

    const data = await req.json()
    console.log("Received contact data:", data)

    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'message']
    const missingFields = requiredFields.filter(field => !data[field])
    
    if (missingFields.length > 0) {
      return NextResponse.json({ 
        error: "Missing required fields", 
        details: `Missing: ${missingFields.join(', ')}`
      }, { status: 400 })
    }

    // Get client information
    const userAgent = req.headers.get('user-agent') || ''
    const ipAddress = req.headers.get('x-forwarded-for') || 
                     req.headers.get('x-real-ip') || 
                     'unknown'
    const referrer = req.headers.get('referer') || ''

    // Create contact submission
    const contactData = {
      ...data,
      metadata: {
        userAgent,
        ipAddress,
        referrer
      }
    }

    const contact = new Contact(contactData)
    console.log("Contact object created:", contact)

    await contact.save()
    console.log("Contact saved successfully")

    // Track statistics
    try {
      const statsData = {
        type: "contact_form",
        page: "contact",
        action: "submit",
        value: data.subject || "Contact Form",
        metadata: {
          userAgent,
          ipAddress,
          referrer
        }
      }

      const stats = new Statistics(statsData)
      await stats.save()
      console.log("Statistics tracked successfully")
    } catch (statsError) {
      console.error("Error tracking statistics:", statsError)
      // Don't fail the contact submission if stats tracking fails
    }

    return NextResponse.json({ 
      success: true, 
      message: "Contact form submitted successfully",
      contact 
    }, { status: 201 })
  } catch (error) {
    console.error("Error creating contact:", error)
    return NextResponse.json({ 
      error: "Failed to submit contact form", 
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase()
    
    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const language = searchParams.get('language') || 'mn'
    
    let query: any = { language }
    
    if (status) {
      query.status = status
    }
    
    const skip = (page - 1) * limit
    
    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
    
    const total = await Contact.countDocuments(query)
    
    return NextResponse.json({ 
      contacts, 
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    })
  } catch (error) {
    console.error("Error fetching contacts:", error)
    return NextResponse.json({ 
      error: "Failed to fetch contacts", 
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
} 