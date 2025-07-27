import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongoose"
import Partner from "@/models/partner"
import { getServerSession } from "next-auth/next"
import { authOptions as rawAuthOptions } from "@/app/api/auth/[...nextauth]/route"
import type { AuthOptions } from "next-auth"

const authOptions = rawAuthOptions as AuthOptions

export const dynamic = 'force-dynamic'

// Temporary mock data for development
const mockPartners = [
  {
    _id: "1",
    name: "Tsinghua University",
    logo: "/placeholder.svg?height=60&width=120&text=TSINGHUA",
    website: "https://www.tsinghua.edu.cn",
    description: "One of China's most prestigious universities",
    isActive: true,
    order: 1,
    type: "university",
    location: "Beijing, China",
    partnershipLevel: "premium",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "2",
    name: "Peking University",
    logo: "/placeholder.svg?height=60&width=120&text=PEKING",
    website: "https://www.pku.edu.cn",
    description: "China's first national comprehensive university",
    isActive: true,
    order: 2,
    type: "university",
    location: "Beijing, China",
    partnershipLevel: "premium",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "3",
    name: "Fudan University",
    logo: "/placeholder.svg?height=60&width=120&text=FUDAN",
    website: "https://www.fudan.edu.cn",
    description: "Leading research university in Shanghai",
    isActive: true,
    order: 3,
    type: "university",
    location: "Shanghai, China",
    partnershipLevel: "standard",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "4",
    name: "Shanghai Jiao Tong University",
    logo: "/placeholder.svg?height=60&width=120&text=SJTU",
    website: "https://www.sjtu.edu.cn",
    description: "Top engineering university in China",
    isActive: true,
    order: 4,
    type: "university",
    location: "Shanghai, China",
    partnershipLevel: "standard",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "5",
    name: "Zhejiang University",
    logo: "/placeholder.svg?height=60&width=120&text=ZJU",
    website: "https://www.zju.edu.cn",
    description: "Comprehensive research university",
    isActive: true,
    order: 5,
    type: "university",
    location: "Hangzhou, China",
    partnershipLevel: "standard",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    _id: "6",
    name: "Nanjing University",
    logo: "/placeholder.svg?height=60&width=120&text=NJU",
    website: "https://www.nju.edu.cn",
    description: "Ancient and prestigious university",
    isActive: true,
    order: 6,
    type: "university",
    location: "Nanjing, China",
    partnershipLevel: "standard",
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase()
    const query = { isActive: true }
    
    const partners = await Partner.find(query).sort({ order: 1 })
    return NextResponse.json({ partners })
  } catch (error) {
    console.error("Error fetching partners:", error)
    
    // Fallback: Return mock data for development
    console.log("Returning mock partners:", mockPartners.length)
    
    return NextResponse.json({ 
      partners: mockPartners,
      message: "Using mock data (MongoDB not available)"
    })
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

    const partner = new Partner(data)
    await partner.save()

    return NextResponse.json({ partner }, { status: 201 })
  } catch (error) {
    console.error("Error creating partner:", error)
    
    // Fallback: Store in temporary memory for development
    try {
      const session = await getServerSession(authOptions)
      if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      }

      const data = await req.json()
      const processedData = {
        ...data,
        _id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date()
      }

      mockPartners.push(processedData)
      console.log("Partner saved to temporary storage:", processedData)

      return NextResponse.json({ 
        partner: processedData,
        message: "Partner saved to temporary storage (MongoDB not available)"
      }, { status: 201 })
    } catch (fallbackError) {
      console.error("Fallback error:", fallbackError)
      return NextResponse.json({ 
        error: "Failed to create partner", 
        details: "Database connection failed and fallback storage also failed"
      }, { status: 500 })
    }
  }
} 