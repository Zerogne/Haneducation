import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongoose"
import Content from "@/models/content"

export async function POST() {
  try {
    await connectToDatabase()
    
    // Clear existing content first
    await Content.deleteMany({})
    
    // Initialize all content sections
    const contentData = [
      // Hero Section - English
      {
        section: "hero",
        title: "Hero Section",
        description: "Main hero section content",
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
            experience: "Years of Experience"
          }
        }),
        language: "en",
        isActive: true,
        order: 1
      },
      // Hero Section - Mongolian
      {
        section: "hero",
        title: "Hero Section",
        description: "Main hero section content",
        content: JSON.stringify({
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
        }),
        language: "mn",
        isActive: true,
        order: 1
      },
      // About Section - English
      {
        section: "about",
        title: "About Section",
        description: "About section content",
        content: JSON.stringify({
          title: "HAN Education - Your Educational Partner",
          description: "We are a trusted partner in educational consulting, specializing in connecting students with prestigious Chinese universities.",
          whyTitle: "Why Choose HAN Education?",
          badge: "About Us"
        }),
        language: "en",
        isActive: true,
        order: 2
      },
      // About Section - Mongolian
      {
        section: "about",
        title: "About Section",
        description: "About section content",
        content: JSON.stringify({
          title: "HAN Education - Таны боловсролын түнш",
          description: "Бид 2022 оноос хойш Монгол оюутнуудыг Хятадын нэр хүндтэй их сургуулиудад элсүүлэх чиглэлээр үйл ажиллагаа явуулж байгаа туршлагатай компани юм.",
          whyTitle: "Яагаад HAN Education?",
          badge: "Бидний тухай"
        }),
        language: "mn",
        isActive: true,
        order: 2
      },
      // Services Section - English
      {
        section: "services",
        title: "Services Section",
        description: "Services section content",
        content: JSON.stringify({
          title: "Our Services",
          description: "All the services you need to study in China",
          badge: "Services"
        }),
        language: "en",
        isActive: true,
        order: 3
      },
      // Services Section - Mongolian
      {
        section: "services",
        title: "Services Section",
        description: "Services section content",
        content: JSON.stringify({
          title: "Бидний үйлчилгээ",
          description: "Хятадад суралцахад танд хэрэгтэй бүх үйлчилгээ",
          badge: "Үйлчилгээ"
        }),
        language: "mn",
        isActive: true,
        order: 3
      },
      // Team Section - English
      {
        section: "team",
        title: "Team Section",
        description: "Team section content",
        content: JSON.stringify({
          title: "Our Team",
          description: "Our experienced and professional team",
          badge: "Team Members"
        }),
        language: "en",
        isActive: true,
        order: 4
      },
      // Team Section - Mongolian
      {
        section: "team",
        title: "Team Section",
        description: "Team section content",
        content: JSON.stringify({
          title: "Бидний баг",
          description: "Бидний туршлагатай, мэргэжлийн баг",
          badge: "Багийн гишүүд"
        }),
        language: "mn",
        isActive: true,
        order: 4
      },
      // Partners Section - English
      {
        section: "partners",
        title: "Partners Section",
        description: "Partners section content",
        content: JSON.stringify({
          title: "Partner Universities",
          description: "Our partner Chinese universities",
          badge: "Partners",
          partners: [
            { name: "Tsinghua University", logo: "/placeholder.svg?height=60&width=120&text=TSINGHUA" },
            { name: "Peking University", logo: "/placeholder.svg?height=60&width=120&text=PEKING" },
            { name: "Fudan University", logo: "/placeholder.svg?height=60&width=120&text=FUDAN" },
            { name: "Shanghai Jiao Tong", logo: "/placeholder.svg?height=60&width=120&text=SJTU" },
            { name: "Zhejiang University", logo: "/placeholder.svg?height=60&width=120&text=ZJU" },
            { name: "Nanjing University", logo: "/placeholder.svg?height=60&width=120&text=NJU" }
          ]
        }),
        language: "en",
        isActive: true,
        order: 5
      },
      // Partners Section - Mongolian
      {
        section: "partners",
        title: "Partners Section",
        description: "Partners section content",
        content: JSON.stringify({
          title: "Хамтрагч их сургуулиуд",
          description: "Бидний хамтрагч Хятадын их сургуулиуд",
          badge: "Хамтрагчид",
          partners: [
            { name: "Tsinghua University", logo: "/placeholder.svg?height=60&width=120&text=TSINGHUA" },
            { name: "Peking University", logo: "/placeholder.svg?height=60&width=120&text=PEKING" },
            { name: "Fudan University", logo: "/placeholder.svg?height=60&width=120&text=FUDAN" },
            { name: "Shanghai Jiao Tong", logo: "/placeholder.svg?height=60&width=120&text=SJTU" },
            { name: "Zhejiang University", logo: "/placeholder.svg?height=60&width=120&text=ZJU" },
            { name: "Nanjing University", logo: "/placeholder.svg?height=60&width=120&text=NJU" }
          ]
        }),
        language: "mn",
        isActive: true,
        order: 5
      },
      // Contact Section - English
      {
        section: "contact",
        title: "Contact Section",
        description: "Contact section content",
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
        order: 6
      },
      // Contact Section - Mongolian
      {
        section: "contact",
        title: "Contact Section",
        description: "Contact section content",
        content: JSON.stringify({
          title: "Холбоо барих",
          description: "Бид таны боловсролын замналыг эхнээс нь дэмжиж, амжилтад хүргэх бэлэн байна. Өнөөдөр л бидэнтэй холбогдоод эхлээрэй!",
          phone: "+976 7777 7777",
          email: "info@haneducation.mn",
          address: "Улаанбаатар хот, Сүхбаатар дүүрэг",
          getAdviceText: "Үнэгүй зөвлөгөө авах"
        }),
        language: "mn",
        isActive: true,
        order: 6
      },
      // Footer Section - English
      {
        section: "footer",
        title: "Footer Section",
        description: "Footer section content",
        content: JSON.stringify({
          title: "HAN Education",
          description: "Your trusted partner for studying in China",
          copyright: "All rights reserved"
        }),
        language: "en",
        isActive: true,
        order: 7
      },
      // Footer Section - Mongolian
      {
        section: "footer",
        title: "Footer Section",
        description: "Footer section content",
        content: JSON.stringify({
          title: "HAN Education",
          description: "Хятадад тэтгэлэгтэй суралцах боломжийг танд олгоно",
          copyright: "Бүх эрх хуулиар хамгаалагдсан."
        }),
        language: "mn",
        isActive: true,
        order: 7
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
      message: "All content sections have been initialized in the database",
      count: savedContent.length,
      sections: ["hero", "about", "services", "team", "partners", "contact", "footer"]
    })
    
  } catch (error) {
    console.error("Error initializing all content:", error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
} 