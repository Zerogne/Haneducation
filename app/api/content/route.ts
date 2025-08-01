import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongoose"
import Content from "@/models/content"
import { getServerSession } from "next-auth/next"
import { authOptions as rawAuthOptions } from "@/lib/auth"
import type { AuthOptions } from "next-auth"

const authOptions = rawAuthOptions as AuthOptions

export const dynamic = 'force-dynamic'

// Default content structure
const defaultContent = {
  hero: {
    title: "HAN Education",
    subtitle: "Хятадад тэтгэлэгтэй суралцах боломжийг танд олгоно",
    description: "Хувийн боловсролын зөвлөх үйлчилгээ | 2022 оноос хойш үйл ажиллагаа явуулж байгаа туршлагатай",
    applyNowText: "Өргөдөл гаргах",
    learnMoreText: "Дэлгэрэнгүй мэдээлэл",
    stats: {
      students: "60+",
      universities: "880+",
      experience: "4+"
    },
    statsLabels: {
      students: "Амжилттай оюутан",
      universities: "Хамтрагч их сургууль",
      experience: "Жилийн туршлага"
    }
  },
  about: {
    title: "HAN Education - Таны боловсролын түнш",
    description: "Бид 2022 оноос хойш Монгол оюутнуудыг Хятадын нэр хүндтэй их сургуулиудад элсүүлэх чиглэлээр үйл ажиллагаа явуулж байгаа туршлагатай компани юм.",
    whyTitle: "Яагаад HAN Education-г сонгох ёстой вэ?",
    features: [
      {
        title: "Хятадын их сургуулиудтай албан ёсны гэрээт харилцаатай",
        description: "Official partnerships with Chinese universities"
      },
      {
        title: "Туршлагатай, мэргэжлийн багтай",
        description: "Experienced and professional team"
      },
      {
        title: "Элсэлтээс эхлээд төгсөх хүртэл дэмжлэг үзүүлдэг",
        description: "Support from enrollment to graduation"
      },
      {
        title: "Тэтгэлэг олж авахад туслалцаа үзүүлдэг",
        description: "Assistance in obtaining scholarships"
      },
      {
        title: "Виз, орчуулгын бүрэн үйлчилгээтэй",
        description: "Comprehensive visa and translation services"
      }
    ]
  },
  contact: {
    title: "Хятадад суралцах мөрөөдлөө биелүүлээрэй",
    description: "Бид таны боловсролын замналыг эхнээс нь дэмжиж, амжилтад хүргэх бэлэн байна. Өнөөдөр л бидэнтэй холбогдоод эхлээрэй!",
    phone: "+976 7777 7777",
    email: "info@haneducation.mn",
    address: "Улаанбаатар хот, Сүхбаатар дүүрэг",
    getAdviceText: "Үнэгүй зөвлөгөө авах"
  },
  footer: {
    description: "HAN Education - Таны боловсролын түнш",
    copyright: "Бүх эрх хуулиар хамгаалагдсан."
  }
}

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase()
    const { searchParams } = new URL(req.url)
    const section = searchParams.get("section")
    
    let query: any = { isActive: true }
    
    if (section) {
      query.section = section
    }
    
    const content = await Content.find(query).sort({ order: 1 })
    
    if (content.length === 0) {
      // Return default content if no content found
      if (section === "about") {
        return NextResponse.json({ 
          content: [{
            section: "about",
            title: "ХАН Боловсролын Тухай",
            description: "Бид таны найдвартай түнш бөгөөд оюутнуудыг Хятадын нэр хүндтэй их сургуулиудтай холбоход мэргэшсэн боловсролын зөвлөгөөний компани юм.",
            content: JSON.stringify({
              title: "ХАН Боловсролын Тухай",
              description: "Бид таны найдвартай түнш бөгөөд оюутнуудыг Хятадын нэр хүндтэй их сургуулиудтай холбоход мэргэшсэн боловсролын зөвлөгөөний компани юм.",
              whyTitle: "Яагаад ХАН Боловсролыг Сонгох вэ?",
              features: [
                {
                  title: "Мэргэжлийн Зөвлөгөө",
                  description: "Олон жилийн туршлагатай мэргэжлийн зөвлөгчид"
                },
                {
                  title: "Өргөн Сүлжээ",
                  description: "880+ Хятадын их сургуулиудтай хамтын ажиллагаа"
                },
                {
                  title: "Хувь хүний Хандлага",
                  description: "Оюутан бүрийн хэрэгцээнд тохируулсан арга"
                },
                {
                  title: "Амжилтын Хэмжээ",
                  description: "Манай оюутнуудын өндөр хүлээн авах хувь"
                },
                {
                  title: "Бүрэн Дэмжлэг",
                  description: "Бүртгүүлэлтээс эхлээд Хятадад ирэх хүртэл"
                },
                {
                  title: "Хямд Үнэ",
                  description: "Чанартай үйлчилгээнд зориулсан өрсөлдөхүйц үнэ"
                }
              ]
            }),
            language: "mn",
            isActive: true,
            order: 2
          }],
          message: "Returning default content for about section"
        })
      }
      
      // Return default content for other sections if not found
      const defaultContentMap: any = {
        "hero": {
          section: "hero",
          title: "ХАН Боловсрол",
          subtitle: "Хятадын Их Сургуулиудад Орох Зам",
          description: "Бид Монгол болон дэлхийн бусад орнуудаас ирсэн оюутнуудад Хятадын шилдэг их сургуулиудад чанартай боловсрол эзэмшихэд тусалдаг.",
          content: JSON.stringify({
            title: "ХАН Боловсрол",
            subtitle: "Хятадын Их Сургуулиудад Орох Зам",
            description: "Бид Монгол болон дэлхийн бусад орнуудаас ирсэн оюутнуудад Хятадын шилдэг их сургуулиудад чанартай боловсрол эзэмшихэд тусалдаг.",
            applyNowText: "Одоо Бүртгүүлэх",
            learnMoreText: "Дэлгэрэнгүй",
            stats: {
              students: "60+",
              universities: "880+",
              experience: "4+"
            },
            statsLabels: {
              students: "Амжилттай оюутан",
              universities: "Хамтрагч их сургууль",
              experience: "Жилийн туршлага"
            }
          }),
          language: "mn",
          isActive: true,
          order: 1
        },
        "contact": {
          section: "contact",
          title: "Холбоо Барих",
          description: "Хувь хүний зөвлөгөө авахын тулд бидэнтэй холбогдоно уу",
          content: JSON.stringify({
            title: "Холбоо Барих",
            description: "Хувь хүний зөвлөгөө авахын тулд бидэнтэй холбогдоно уу",
            phone: "+976 11-123-456",
            email: "info@haneducation.mn",
            address: "Улаанбаатар, Монгол",
            getAdviceText: "Үнэгүй Зөвлөгөө Авах"
          }),
          language: "mn",
          isActive: true,
          order: 3
        },
        "footer": {
          section: "footer",
          title: "ХАН Боловсрол",
          description: "Хятадад суралцах таны найдвартай түнш",
          content: JSON.stringify({
            title: "ХАН Боловсрол",
            description: "Хятадад суралцах таны найдвартай түнш",
            copyright: "Бүх эрх хуулиар хамгаалагдсан"
          }),
          language: "mn",
          isActive: true,
          order: 4
        }
      }

      if (section && defaultContentMap[section]) {
        return NextResponse.json({ 
          content: [defaultContentMap[section]],
          message: `Returning default content for ${section} section`
        })
      }
      
      return NextResponse.json({ 
        content: [],
        message: "No content found for the specified criteria"
      })
    }
    
    return NextResponse.json({ content })
  } catch (error) {
    console.error("Error fetching content:", error)
    return NextResponse.json({ 
      content: [],
      message: "Failed to fetch content from database"
    }, { status: 500 })
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

    const content = new Content(data)
    await content.save()

    return NextResponse.json({ content }, { status: 201 })
  } catch (error) {
    console.error("Error creating content:", error)
    return NextResponse.json({ 
      error: "Failed to create content" 
    }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  try {
    // Temporarily disable authentication for testing
    // const session = await getServerSession(authOptions)
    // if (!session) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    // }

    await connectToDatabase()
    const data = await req.json()
    const { section } = data

    if (!section) {
      return NextResponse.json({ error: "Section is required" }, { status: 400 })
    }

    // Find existing content for this section
    const existingContent = await Content.findOne({ 
      section
    })

    if (existingContent) {
      // Update existing content - preserve existing data if not provided
      const updateData = {
        title: data.title !== undefined ? data.title : existingContent.title,
        subtitle: data.subtitle !== undefined ? data.subtitle : existingContent.subtitle,
        content: data.content !== undefined ? data.content : existingContent.content,
        description: data.description !== undefined ? data.description : existingContent.description,
        isActive: data.isActive !== undefined ? data.isActive : existingContent.isActive,
        order: data.order !== undefined ? data.order : existingContent.order,
        metadata: data.metadata || existingContent.metadata
      }
      
      // Update the existing content
      Object.assign(existingContent, updateData)
      await existingContent.save()
      
      console.log(`Updated existing content for section: ${section}`)
      return NextResponse.json({ content: existingContent })
    } else {
      // Create new content if none exists
      const content = new Content({
        section: data.section,
        title: data.title || "",
        subtitle: data.subtitle || "",
        content: data.content || JSON.stringify(data),
        description: data.description || "",
        language: "mn",
        isActive: data.isActive !== false,
        order: data.order || 0,
        metadata: data.metadata || {}
      })
      
      await content.save()
      console.log(`Created new content for section: ${section}`)
      return NextResponse.json({ content })
    }
  } catch (error) {
    console.error("Error updating content:", error)
    return NextResponse.json({ 
      error: "Failed to update content",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
}
