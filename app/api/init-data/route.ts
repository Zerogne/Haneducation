import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongoose"
import Team from "@/models/team"
import Content from "@/models/content"
import User from "@/models/user"
import bcrypt from "bcryptjs"

export const dynamic = 'force-dynamic'

export async function POST() {
  try {
    await connectToDatabase()

    // Initialize admin user with optimized storage
    const existingAdmin = await User.findOne({ username: "admin" })
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash("HanEducation123@", 12)
      const adminUser = new User({
        username: "admin",
        password: hashedPassword,
        name: "Administrator",
        email: "admin@han-education.com",
        role: "admin"
      })
      await adminUser.save()
      console.log("Admin user created successfully")
    }

    // Initialize team members with minimal data
    const existingTeam = await Team.find({})
    if (existingTeam.length === 0) {
      const teamMembers = [
        {
          name: "Wang Yue",
          role: "Гадаад харилцаа, бичиг баримт хариуцсан мэргэжилтэн",
          image: "/teamMember1.png", // Using local file to save MongoDB space
          email: "wangyue@haneducation.mn",
          phone: "+976 7777 7780",
          linkedin: "linkedin.com/in/wangyue",
          badge: "Nanjing University 2020",
          department: "admissions",
          // Minimal metadata to save space
          metadata: {
            education: "Nanjing University 2020"
          }
        },
        {
          name: "Б.Мөнхзул",
          role: "Ерөнхий захирал",
          image: "/placeholder.svg?height=200&width=200&text=БМ",
          email: "monkhzul@haneducation.mn",
          phone: "+976 7777 7777",
          linkedin: "linkedin.com/in/monkhzul",
          badge: "Тэргүүн",
          department: "management",
          metadata: {
            education: "Mongolian National University"
          }
        },
        {
          name: "Ө.Мөнгөнзул",
          role: "Хөгжүүлэлтийн захирал",
          image: "/placeholder.svg?height=200&width=200&text=ӨМ",
          email: "mungunzul@haneducation.mn",
          phone: "+976 7777 7778",
          linkedin: "linkedin.com/in/mungunzul",
          badge: "Мэргэжилтэн",
          department: "development",
          metadata: {
            education: "Mongolian University of Science and Technology"
          }
        }
      ]

      for (const member of teamMembers) {
        const newMember = new Team(member)
        await newMember.save()
      }

      console.log("Team members initialized successfully")
    }

    // Initialize content with optimized structure
    const existingContent = await Content.find({ section: "why-china" })
    if (existingContent.length === 0) {
      const whyChinaContent = {
        section: "why-china",
        title: "Хятад улсад суралцахын 6 томоохон давуу тал",
        description: "Хятад улсад суралцах нь танд олон давуу тал, боломжуудыг өгдөг.",
        // Compressed content structure to save space
        content: JSON.stringify([
          {
            t: "Дэлхийн хэмжээнд хүлээн зөвшөөрөгдсөн боловсролын тогтолцоо",
            d: "Tsinghua University, Peking University зэрэг нь QS World University Rankings-т жил бүр дээгүүр бичигддэг.",
            c: "blue"
          },
          {
            t: "Тэтгэлэг болон хөнгөлөлтийн өргөн боломж",
            d: "Хятадын засгийн газар болон сургуулиуд нь гадаад оюутнуудад зориулсан 100% болон хэсэгчилсэн тэтгэлэг олгодог.",
            c: "green"
          },
          {
            t: "Хятад хэл сурах давуу тал",
            d: "Хятад хэл бол дэлхий дээрх хамгийн олон хүн ярьдаг хэл. Ажил эрхлэх боломж өргөжнө.",
            c: "red"
          },
          {
            t: "Технологи, инновацийн төв",
            d: "Хятад улс нь хиймэл оюун ухаан, 5G, цахим худалдаа, робот техник зэрэг салбарт дэлхийд тэргүүлж байна.",
            c: "purple"
          },
          {
            t: "Соёлын олон талт байдал, шинэ туршлага",
            d: "Хятадад суралцах нь дэлхийн хамгийн эртний соёл иргэншлийг судлах, шинэ орчинд бие даах боломж.",
            c: "orange"
          },
          {
            t: "Монголчуудын хувьд газар зүйн ойр байршил",
            d: "Гэр бүлтэйгээ ойр байх, онгоцны тийз, зорчих зардал харьцангуй бага.",
            c: "indigo"
          }
        ]),
        order: 1,
        isActive: true,
        metadata: {
          badge: "🇨🇳 Хятадад суралцахын шалтгаанууд"
        }
      }

      const newContent = new Content(whyChinaContent)
      await newContent.save()

      console.log("Why China content initialized successfully")
    }

    // Get storage statistics
    const teamCount = await Team.countDocuments()
    const contentCount = await Content.countDocuments()
    const userCount = await User.countDocuments()

    return NextResponse.json({ 
      success: true,
      message: "Data initialized successfully with storage optimization",
      stats: {
        teamMembers: teamCount,
        contentSections: contentCount,
        users: userCount
      },
      optimization: {
        storageStrategy: "MongoDB for essential data only",
        fileStorage: "Cloudinary for images and files",
        dataCompression: "Minimal metadata, compressed content structure"
      }
    })
  } catch (error) {
    console.error("Error initializing data:", error)
    return NextResponse.json(
      { success: false, error: "Failed to initialize data" }, 
      { status: 500 }
    )
  }
} 