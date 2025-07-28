import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongoose"
import Content from "@/models/content"

export const dynamic = 'force-dynamic'

// GET - Fetch all content or specific section
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase()
    
    const { searchParams } = new URL(request.url)
    const section = searchParams.get('section')

    let query = {}
    if (section) {
      query = { section }
    }

    const content = await Content.find(query)
      .sort({ order: 1, createdAt: 1 })
      .lean()

    return NextResponse.json({ 
      success: true, 
      content 
    })
  } catch (error) {
    console.error("Error fetching content:", error)
    return NextResponse.json(
      { success: false, error: "Failed to fetch content" }, 
      { status: 500 }
    )
  }
}

// POST - Create new content
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase()
    
    const body = await request.json()
    
    const newContent = new Content({
      section: body.section,
      title: body.title,
      description: body.description,
      content: body.content,
      order: body.order || 0,
      isActive: body.isActive !== false,
      metadata: body.metadata || {}
    })

    await newContent.save()

    return NextResponse.json({ 
      success: true, 
      message: "Content created successfully",
      content: newContent 
    })
  } catch (error) {
    console.error("Error creating content:", error)
    return NextResponse.json(
      { success: false, error: "Failed to create content" }, 
      { status: 500 }
    )
  }
}

// PUT - Update content
export async function PUT(request: NextRequest) {
  try {
    await connectToDatabase()
    
    const body = await request.json()
    const { id, ...updateData } = body

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Content ID is required" }, 
        { status: 400 }
      )
    }

    const updatedContent = await Content.findByIdAndUpdate(
      id,
      {
        ...updateData,
        updatedAt: new Date()
      },
      { new: true }
    )

    if (!updatedContent) {
      return NextResponse.json(
        { success: false, error: "Content not found" }, 
        { status: 404 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      message: "Content updated successfully",
      content: updatedContent 
    })
  } catch (error) {
    console.error("Error updating content:", error)
    return NextResponse.json(
      { success: false, error: "Failed to update content" }, 
      { status: 500 }
    )
  }
}

// DELETE - Delete content
export async function DELETE(request: NextRequest) {
  try {
    await connectToDatabase()
    
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Content ID is required" }, 
        { status: 400 }
      )
    }

    const deletedContent = await Content.findByIdAndDelete(id)

    if (!deletedContent) {
      return NextResponse.json(
        { success: false, error: "Content not found" }, 
        { status: 404 }
      )
    }

    return NextResponse.json({ 
      success: true, 
      message: "Content deleted successfully" 
    })
  } catch (error) {
    console.error("Error deleting content:", error)
    return NextResponse.json(
      { success: false, error: "Failed to delete content" }, 
      { status: 500 }
    )
  }
}
