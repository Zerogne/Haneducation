import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongoose"
import { getServerSession } from "next-auth/next"
import { authOptions as rawAuthOptions } from "@/app/api/auth/[...nextauth]/route"
import type { AuthOptions } from "next-auth"
import Language from "@/models/language"

const authOptions = rawAuthOptions as AuthOptions

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase()
    const language = await Language.findById(params.id)

    if (!language) {
      return NextResponse.json({ error: "Language not found" }, { status: 404 })
    }

    return NextResponse.json({ language })
  } catch (error) {
    console.error("Error fetching language:", error)
    return NextResponse.json({ error: "Failed to fetch language" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions as any)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectToDatabase()
    const data = await req.json()

    // If this is set as default, unset any existing default
    if (data.isDefault) {
      await Language.updateMany({ isDefault: true }, { isDefault: false })
    }

    const language = await Language.findByIdAndUpdate(params.id, { ...data, updatedAt: Date.now() }, { new: true })

    if (!language) {
      return NextResponse.json({ error: "Language not found" }, { status: 404 })
    }

    return NextResponse.json({ language })
  } catch (error) {
    console.error("Error updating language:", error)
    return NextResponse.json({ error: "Failed to update language" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions as any)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectToDatabase()

    // Check if this is the default language
    const language = await Language.findById(params.id)
    if (language?.isDefault) {
      return NextResponse.json({ error: "Cannot delete default language" }, { status: 400 })
    }

    const result = await Language.findByIdAndDelete(params.id)

    if (!result) {
      return NextResponse.json({ error: "Language not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Language deleted successfully" })
  } catch (error) {
    console.error("Error deleting language:", error)
    return NextResponse.json({ error: "Failed to delete language" }, { status: 500 })
  }
}
