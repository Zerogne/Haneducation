import { type NextRequest, NextResponse } from "next/server"
import { v2 as cloudinary } from "cloudinary"
import { getServerSession } from "next-auth/next"
import { authOptions as rawAuthOptions } from "@/app/api/auth/[...nextauth]/route"
import type { AuthOptions } from "next-auth"
import { connectToDatabase } from "@/lib/mongoose"
import Image from "@/models/image"

const authOptions = rawAuthOptions as AuthOptions

// Force dynamic rendering
export const dynamic = 'force-dynamic'

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await req.formData()
    const file = formData.get("file") as File
    const section = (formData.get("section") as string) || "general"
    const alt = (formData.get("alt") as string) || ""
    const caption = (formData.get("caption") as string) || ""

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer())

    // Upload to Cloudinary
    type CloudinaryResult = {
      public_id: string;
      url: string;
      secure_url: string;
      width: number;
      height: number;
      format: string;
      resource_type: string;
    }
    const result = await new Promise<CloudinaryResult>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "han-education",
          resource_type: "auto",
          transformation: [{ quality: "auto", fetch_format: "auto" }],
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result as CloudinaryResult)
        },
      )

      uploadStream.end(buffer)
    })

    // Save image metadata to MongoDB
    await connectToDatabase()

    const imageData = {
      publicId: result.public_id,
      url: result.url,
      secureUrl: result.secure_url,
      width: result.width,
      height: result.height,
      format: result.format,
      resourceType: result.resource_type,
      section,
      alt,
      caption
    }

    const image = new Image(imageData)
    await image.save()

    return NextResponse.json({ image })
  } catch (error) {
    console.error("Error uploading image:", error)
    return NextResponse.json({ error: "Failed to upload image" }, { status: 500 })
  }
}
