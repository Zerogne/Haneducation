"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Header from "@/components/header"

interface Partner {
  logo: string
  name?: string
  description?: string
  location?: string
  website?: string
  established?: string
  ranking?: string
}

export default function PartnersPage() {
  const router = useRouter()
  const [partners, setPartners] = useState<Partner[]>([
    { 
      name: "Tsinghua University", 
      logo: "https://res.cloudinary.com/dewhswho9/image/upload/v1753511314/1ed120a69b9ca82a76c436dec8f8a3e0_dzjoh8.jpg",
      description: "Хятадын хамгийн том их сургуулиудын нэг, Бээжин хотод байршилтай",
      location: "Бээжин",
      website: "https://www.tsinghua.edu.cn",
      established: "1911",
      ranking: "Дэлхийн топ 20"
    },
    { 
      name: "Peking University", 
      logo: "https://res.cloudinary.com/dewhswho9/image/upload/v1753511420/7603e1ac0b09d1c1bce72c12a6e4da49_hrqnv0.jpg",
      description: "Хятадын хамгийн эртний их сургуулиудын нэг, гүн ухааны чиглэлээрээ алдартай",
      location: "Бээжин",
      website: "https://www.pku.edu.cn",
      established: "1898",
      ranking: "Дэлхийн топ 25"
    },
    { 
      name: "Fudan University", 
      logo: "https://res.cloudinary.com/dewhswho9/image/upload/v1753511427/9b759ec7d5c17c4adbe2a2e646c65654_m2d0d5.jpg",
      description: "Шанхай хотод байршилтай, олон улсын хамтын ажиллагаатай их сургууль",
      location: "Шанхай",
      website: "https://www.fudan.edu.cn",
      established: "1905",
      ranking: "Дэлхийн топ 50"
    },
    { 
      name: "Shanghai Jiao Tong University", 
      logo: "https://res.cloudinary.com/dewhswho9/image/upload/v1753511437/E7_BB_84_E4_BB_B6_2011_20_E2_80_93_201_2x_qgt3df.jpg",
      description: "Инженерийн чиглэлээрээ алдартай, технологийн хөгжлийн тэргүүлэгч",
      location: "Шанхай",
      website: "https://www.sjtu.edu.cn",
      established: "1896",
      ranking: "Дэлхийн топ 60"
    },
    { 
      name: "Zhejiang University", 
      logo: "https://res.cloudinary.com/dewhswho9/image/upload/v1753511448/2222_rrftfp.jpg",
      description: "Ханжоу хотод байршилтай, судалгааны чиглэлээрээ хүчтэй их сургууль",
      location: "Ханжоу",
      website: "https://www.zju.edu.cn",
      established: "1897",
      ranking: "Дэлхийн топ 70"
    },
    { 
      name: "Nanjing University", 
      logo: "https://res.cloudinary.com/dewhswho9/image/upload/v1753511455/anhui1_weerj6.jpg",
      description: "Нанжин хотод байршилтай, түүх, соёлын чиглэлээрээ алдартай",
      location: "Нанжин",
      website: "https://www.nju.edu.cn",
      established: "1902",
      ranking: "Дэлхийн топ 100"
    },
    { 
      name: "Tongji University", 
      logo: "https://res.cloudinary.com/dewhswho9/image/upload/v1753511480/E7_BB_84_E4_BB_B6_2036_20_E2_80_93_201_bqnvsn.jpg",
      description: "Архитектур, барилгын инженерийн чиглэлээрээ алдартай их сургууль",
      location: "Шанхай",
      website: "https://www.tongji.edu.cn",
      established: "1907",
      ranking: "Дэлхийн топ 150"
    },
    { 
      name: "Huazhong University of Science and Technology", 
      logo: "https://res.cloudinary.com/dewhswho9/image/upload/v1753511485/E4_B8_AD_E7_9F_BF-_10_y0j4ie.jpg",
      description: "Ухан хотод байршилтай, технологийн чиглэлээрээ хүчтэй их сургууль",
      location: "Ухан",
      website: "https://www.hust.edu.cn",
      established: "1952",
      ranking: "Дэлхийн топ 200"
    },
    { 
      name: "Sun Yat-sen University", 
      logo: "https://res.cloudinary.com/dewhswho9/image/upload/v1753511490/cb32f6878ec582483c5b45635ea9885c_bwdtb0.jpg",
      description: "Гуанжоу хотод байршилтай, эрүүл мэндийн чиглэлээрээ алдартай",
      location: "Гуанжоу",
      website: "https://www.sysu.edu.cn",
      established: "1924",
      ranking: "Дэлхийн топ 250"
    },
    { 
      name: "Partner 11", 
      logo: "https://res.cloudinary.com/dewhswho9/image/upload/v1753511496/E6_B2_B3_E5_8D_97_E7_A7_91_E6_8A_802_20_1_wzgtkm.jpg",
      description: "Хятадын их сургуулиудын нэг",
      location: "Хятад",
      website: "https://example.com",
      established: "1900",
      ranking: "Дэлхийн топ 400"
    },
    { 
      name: "Partner 12", 
      logo: "https://res.cloudinary.com/dewhswho9/image/upload/v1753511502/E7_BB_84_E4_BB_B6_2033_20_E2_80_93_202_compressed_agbzmi.jpg",
      description: "Хятадын их сургуулиудын нэг",
      location: "Хятад",
      website: "https://example.com",
      established: "1900",
      ranking: "Дэлхийн топ 400"
    },
    { 
      name: "Partner 13", 
      logo: "https://res.cloudinary.com/dewhswho9/image/upload/v1753511507/E7_BB_84_E4_BB_B6_2011_20_E2_80_93_201_compressed_jlq8ty.jpg",
      description: "Хятадын их сургуулиудын нэг",
      location: "Хятад",
      website: "https://example.com",
      established: "1900",
      ranking: "Дэлхийн топ 400"
    },
    { 
      name: "Partner 14", 
      logo: "https://res.cloudinary.com/dewhswho9/image/upload/v1753511514/E9_95_BF_E6_98_A5_E5_B7_A5_E7_A8_8B_20_1_pctdmy.jpg",
      description: "Хятадын их сургуулиудын нэг",
      location: "Хятад",
      website: "https://example.com",
      established: "1900",
      ranking: "Дэлхийн топ 400"
    },
    { 
      name: "Partner 15", 
      logo: "https://res.cloudinary.com/dewhswho9/image/upload/v1753511520/b696ecf65dd85a24b81e5be2b425b250_xghm56.jpg",
      description: "Хятадын их сургуулиудын нэг",
      location: "Хятад",
      website: "https://example.com",
      established: "1900",
      ranking: "Дэлхийн топ 400"
    },
    { 
      name: "Partner 16", 
      logo: "https://res.cloudinary.com/dewhswho9/image/upload/v1753511524/E7_BB_84_E4_BB_B6_2032_20_E2_80_93_201_fvarvr.jpg",
      description: "Хятадын их сургуулиудын нэг",
      location: "Хятад",
      website: "https://example.com",
      established: "1900",
      ranking: "Дэлхийн топ 400"
    },
    { 
      name: "Partner 17", 
      logo: "https://res.cloudinary.com/dewhswho9/image/upload/v1753511530/E7_BB_84_E4_BB_B6_2017_20_E2_80_93_201_u985hx.png",
      description: "Хятадын их сургуулиудын нэг",
      location: "Хятад",
      website: "https://example.com",
      established: "1900",
      ranking: "Дэлхийн топ 400"
    },
    { 
      name: "Partner 18", 
      logo: "https://res.cloudinary.com/dewhswho9/image/upload/v1753511536/f4c258c8d00dd08a18bbc321d650ce91_u77fu3.jpg",
      description: "Хятадын их сургуулиудын нэг",
      location: "Хятад",
      website: "https://example.com",
      established: "1900",
      ranking: "Дэлхийн топ 400"
    },
    { 
      name: "Partner 19", 
      logo: "https://res.cloudinary.com/dewhswho9/image/upload/v1753511546/E7_BB_84_E4_BB_B6_2053_20_E2_80_93_201_compressed_tptjrh.jpg",
      description: "Хятадын их сургуулиудын нэг",
      location: "Хятад",
      website: "https://example.com",
      established: "1900",
      ranking: "Дэлхийн топ 400"
    },
    { 
      name: "Partner 20", 
      logo: "https://res.cloudinary.com/dewhswho9/image/upload/v1753511658/1banner_teacrj.jpg",
      description: "Хятадын их сургуулиудын нэг",
      location: "Хятад",
      website: "https://example.com",
      established: "1900",
      ranking: "Дэлхийн топ 400"
    },
    { 
      name: "Partner 21", 
      logo: "https://res.cloudinary.com/dewhswho9/image/upload/v1753511666/E6_B5_99_E5_A4_A7_E5_AE_81_E6_B3_A2_E7_90_86_E5_B7_A5_20_1_vacjuu.jpg",
      description: "Хятадын их сургуулиудын нэг",
      location: "Хятад",
      website: "https://example.com",
      established: "1900",
      ranking: "Дэлхийн топ 400"
    },
    { 
      name: "Partner 22", 
      logo: "https://res.cloudinary.com/dewhswho9/image/upload/v1753511672/E5_B0_9A_E8_89_BA_E6_A5_BC_y1x35l.jpg",
      description: "Хятадын их сургуулиудын нэг",
      location: "Хятад",
      website: "https://example.com",
      established: "1900",
      ranking: "Дэлхийн топ 400"
    },
    { 
      name: "Partner 23", 
      logo: "https://res.cloudinary.com/dewhswho9/image/upload/v1753511677/E7_BB_84_E4_BB_B6_2022_20_E2_80_93_201_20_1_bd8dg1.jpg ",
      description: "Хятадын их сургуулиудын нэг",
      location: "Хятад",
      website: "https://example.com",
      established: "1900",
      ranking: "Дэлхийн топ 400"
    },
    { 
      name: "Partner 24", 
      logo: "https://res.cloudinary.com/dewhswho9/image/upload/v1753511684/E7_BB_84_E4_BB_B6_2039_20_E2_80_93_201_qule6p.jpg",
      description: "Хятадын их сургуулиудын нэг",
      location: "Хятад",
      website: "https://example.com",
      established: "1900",
      ranking: "Дэлхийн топ 400"
    },
    { 
      name: "Partner 25", 
      logo: "https://res.cloudinary.com/dewhswho9/image/upload/v1753511690/E7_BB_84_E4_BB_B6_2014_20_E2_80_93_201_a7czk1.jpg",
      description: "Хятадын их сургуулиудын нэг",
      location: "Хятад",
      website: "https://example.com",
      established: "1900",
      ranking: "Дэлхийн топ 400"
    },
    { 
      name: "Partner 26", 
      logo: "https://res.cloudinary.com/dewhswho9/image/upload/v1753511696/74e0cc4c70be63375d76eb48702e7199_aqb9yc.jpg",
      description: "Хятадын их сургуулиудын нэг",
      location: "Хятад",
      website: "https://example.com",
      established: "1900",
      ranking: "Дэлхийн топ 400"
    },
    { 
      name: "Partner 27", 
      logo: "https://res.cloudinary.com/dewhswho9/image/upload/v1753511703/E7_BB_84_E4_BB_B6_2030_20_E2_80_93_201_compressed_uur03p.jpg",
      description: "Хятадын их сургуулиудын нэг",
      location: "Хятад",
      website: "https://example.com",
      established: "1900",
      ranking: "Дэлхийн топ 400"
    },
    { 
      name: "Partner 28", 
      logo: "https://res.cloudinary.com/dewhswho9/image/upload/v1753511718/E7_BB_84_E4_BB_B6_2031_20_E2_80_93_201_2x_jjar3v.jpg",
      description: "Хятадын их сургуулиудын нэг",
      location: "Хятад",
      website: "https://example.com",
      established: "1900",
      ranking: "Дэлхийн топ 400"
    },
    { 
      name: "Partner 29", 
      logo: "https://res.cloudinary.com/dewhswho9/image/upload/v1753511788/86bcf425d95c27364606e793b8348401_tvmuly.jpg",
      description: "Хятадын их сургуулиудын нэг",
      location: "Хятад",
      website: "https://example.com",
      established: "1900",
      ranking: "Дэлхийн топ 400"
    },
    { 
      name: "Partner 30", 
      logo: "https://res.cloudinary.com/dewhswho9/image/upload/v1753511794/E7_BB_84_E4_BB_B6_2010_20_E2_80_93_201_prakvf.jpg",
      description: "Хятадын их сургуулиудын нэг",
      location: "Хятад",
      website: "https://example.com",
      established: "1900",
      ranking: "Дэлхийн топ 400"
    },
    { 
      name: "Partner 31", 
      logo: "https://res.cloudinary.com/dewhswho9/image/upload/v1753511798/E6_B1_9F_E8_A5_BF_E8_B4_A2_E7_BB_8F_E5_A4_A7_E5_AD_A6_gb4hot.jpg",
      description: "Хятадын их сургуулиудын нэг",
      location: "Хятад",
      website: "https://example.com",
      established: "1900",
      ranking: "Дэлхийн топ 400"
    },
    { 
      name: "Partner 32", 
      logo: "https://res.cloudinary.com/dewhswho9/image/upload/v1753511805/E6_B2_A7_E5_B7_9E_E8_81_8C_E4_B8_9A_20_7_gzvzde.jpg",
      description: "Хятадын их сургуулиудын нэг",
      location: "Хятад",
      website: "https://example.com",
      established: "1900",
      ranking: "Дэлхийн топ 400"
    },
    { 
      name: "Partner 33", 
      logo: "https://res.cloudinary.com/dewhswho9/image/upload/v1753511810/E7_BB_84_E4_BB_B6_207_20_E2_80_93_201_compressed_x6hmfj.jpg",
      description: "Хятадын их сургуулиудын нэг",
      location: "Хятад",
      website: "https://example.com",
      established: "1900",
      ranking: "Дэлхийн топ 400"
    },
    { 
      name: "Partner 34", 
      logo: "https://res.cloudinary.com/dewhswho9/image/upload/v1753511843/E7_BB_84_E4_BB_B6_208_20_E2_80_93_201_compressed_tfdo6s.jpg",
      description: "Хятадын их сургуулиудын нэг",
      location: "Хятад",
      website: "https://example.com",
      established: "1900",
      ranking: "Дэлхийн топ 400"
    },
    { 
      name: "Partner 35", 
      logo: "https://res.cloudinary.com/dewhswho9/image/upload/v1753511854/E7_BB_84_E4_BB_B6_2050_20_E2_80_93_201_compressed_xcslgp.jpg",
      description: "Хятадын их сургуулиудын нэг",
      location: "Хятад",
      website: "https://example.com",
      established: "1900",
      ranking: "Дэлхийн топ 400"
    },
    { 
      name: "Partner 36", 
      logo: "https://res.cloudinary.com/dewhswho9/image/upload/v1753511863/E8_BE_BD_E5_AE_81_E7_9F_B3_E6_B2_B9_E5_8C_96_E5_B7_A5_20_3_kx8pgg.jpg",
      description: "Хятадын их сургуулиудын нэг",
      location: "Хятад",
      website: "https://example.com",
      established: "1900",
      ranking: "Дэлхийн топ 400"
    },
  ])
  const [sectionContent, setSectionContent] = useState({
    title: "Хамтрагч их сургуулиуд",
    description: "Бидний хамтрагч Хятадын их сургуулиуд",
    badge: "Хамтрагчид"
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPartnersContent()
  }, [])

  const fetchPartnersContent = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/content?section=partners')
      if (response.ok) {
        const data = await response.json()
        if (data.content && data.content.length > 0) {
          try {
            const content = JSON.parse(data.content[0].content)
            setSectionContent({
              title: content.title || "Хамтрагч их сургуулиуд",
              description: content.description || "Бидний хамтрагч Хятадын их сургуулиуд",
              badge: content.badge || "Хамтрагчид"
            })
            if (content.partners && Array.isArray(content.partners)) {
              setPartners(content.partners)
            }
          } catch (error) {
            console.error('Error parsing partners content:', error)
          }
        }
      }
    } catch (error) {
      console.error('Error fetching partners content:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-7xl mx-auto px-8 lg:px-16 py-20">
        {/* Header */}
        <div className="mb-12">
          <Button
            onClick={() => router.back()}
            variant="ghost"
            className="mb-6 flex items-center gap-2 hover:bg-gray-100"
          >
            <ArrowLeft className="h-4 w-4" />
            Буцах
          </Button>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <Badge variant="secondary" className="mb-4">
              {sectionContent.badge}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {sectionContent.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {sectionContent.description}
            </p>
          </motion.div>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex justify-center items-center h-32">
                    <img
                      src={partner.logo}
                      alt={partner.name || "Partner logo"}
                      className="h-20 w-auto"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
} 