import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongoose"
import Language from "@/models/language"
import { getServerSession } from "next-auth/next"
import { authOptions as rawAuthOptions } from "@/lib/auth"
import type { AuthOptions } from "next-auth"

const authOptions = rawAuthOptions as AuthOptions

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase()
    const languages = await Language.find({ isActive: true })
    return NextResponse.json({ languages })
  } catch (error) {
    console.error("Error fetching languages:", error)
    return NextResponse.json({ error: "Failed to fetch languages" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    await connectToDatabase()
    const data = await req.json()

    // If this is set as default, unset any existing default
    if (data.isDefault) {
      await Language.updateMany({ isDefault: true }, { isDefault: false })
    }

    const language = new Language(data)
    await language.save()

    return NextResponse.json({ language }, { status: 201 })
  } catch (error) {
    console.error("Error creating language:", error)
    return NextResponse.json({ error: "Failed to create language" }, { status: 500 })
  }
}
