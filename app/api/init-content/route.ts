import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongoose"
import Content from "@/models/content"

export async function POST() {
  try {
    await connectToDatabase()
    
    // Clear existing content first
    await Content.deleteMany({})
    
    // Initialize all hardcoded content
    const contentData = [
      {
        section: "hero",
        title: "HAN Education",
        subtitle: "Your Gateway to Chinese Universities",
        description: "We help students from Mongolia and around the world access quality education in China's top universities.",
        content: JSON.stringify({
          title: "HAN Education",
          subtitle: "Your Gateway to Chinese Universities",
          description: "We help students from Mongolia and around the world access quality education in China's top universities.",
          applyNowText: "Apply Now",
          learnMoreText: "Learn More",
          stats: {
            students: "60+",
            universities: "880+",
            experience: "4+"
          },
          statsLabels: {
            students: "Successful Students",
            universities: "Partner Universities",
            experience: "Years Experience"
          }
        }),
        language: "en",
        isActive: true,
        order: 1
      },
      {
        section: "about",
        title: "About HAN Education",
        description: "We are your trusted partner in educational consulting, specializing in connecting students with prestigious Chinese universities.",
        content: JSON.stringify({
          title: "About HAN Education",
          description: "We are your trusted partner in educational consulting, specializing in connecting students with prestigious Chinese universities.",
          whyTitle: "Why Choose HAN Education?",
          features: [
            {
              title: "Expert Guidance",
              description: "Professional consultants with years of experience"
            },
            {
              title: "Wide Network",
              description: "Partnerships with 880+ Chinese universities"
            },
            {
              title: "Personalized Service",
              description: "Tailored approach for each student's needs"
            },
            {
              title: "Success Rate",
              description: "High acceptance rate for our students"
            },
            {
              title: "Full Support",
              description: "From application to arrival in China"
            },
            {
              title: "Affordable Fees",
              description: "Competitive pricing for quality service"
            }
          ]
        }),
        language: "en",
        isActive: true,
        order: 2
      },
      {
        section: "contact",
        title: "Contact Information",
        description: "Get in touch with us for personalized guidance",
        content: JSON.stringify({
          title: "Contact Information",
          description: "Get in touch with us for personalized guidance",
          phone: "+976 11-123-456",
          email: "info@haneducation.mn",
          address: "Ulaanbaatar, Mongolia",
          getAdviceText: "Get Free Advice"
        }),
        language: "en",
        isActive: true,
        order: 3
      },
      {
        section: "footer",
        title: "HAN Education",
        description: "Your trusted partner for studying in China",
        content: JSON.stringify({
          title: "HAN Education",
          description: "Your trusted partner for studying in China",
          copyright: "All rights reserved"
        }),
        language: "en",
        isActive: true,
        order: 4
      },
      // Mongolian versions
      {
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
      {
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
      },
      {
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
      {
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
    ]
    
    // Save all content to database
    const savedContent = []
    for (const contentItem of contentData) {
      const content = new Content(contentItem)
      await content.save()
      savedContent.push(content)
    }
    
    return NextResponse.json({ 
      success: true, 
      message: "All hardcoded content has been saved to database",
      count: savedContent.length,
      sections: ["hero", "about", "contact", "footer"]
    })
    
  } catch (error) {
    console.error("Error initializing content:", error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
} 