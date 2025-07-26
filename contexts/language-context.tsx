"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"

type Language = {
  code: string
  name: string
  nativeName: string
  flag: string
}

type LanguageContextType = {
  language: string
  setLanguage: (lang: string) => void
  languages: Language[]
  translations: Record<string, Record<string, string>>
  t: (key: string) => string
}

const defaultLanguages: Language[] = [
  { code: "mn", name: "Mongolian", nativeName: "Монгол", flag: "🇲🇳" },
  { code: "en", name: "English", nativeName: "English", flag: "🇺🇸" },
  { code: "zh", name: "Chinese", nativeName: "中文", flag: "🇨🇳" },
]

const inCodeTranslations: Record<string, Record<string, string>> = {
  // --- HERO SECTION ---
  HeroSubtitle: {
    mn: "Хятадад тэтгэлэгтэй суралцах боломжийг танд олгоно",
    en: "Gives you the opportunity to study in China with a scholarship",
    zh: "為您提供獎學金來中國學習的機會"
  },
  HeroDescription: {
    mn: "Хувийн боловсролын зөвлөх үйлчилгээ | 2022 оноос хойш үйл ажиллагаа явуулж байгаа туршлагатай",
    en: "Personalized education consulting service | Experienced since 2022",
    zh: "个性化教育咨询服务 | 自2022年以来的经验"
  },
  ApplyNow: {
    mn: "Өргөдөл гаргах",
    en: "Apply Now",
    zh: "立即申请"
  },
  LearnMore: {
    mn: "Дэлгэрэнгүй мэдээлэл",
    en: "Learn More",
    zh: "了解更多"
  },
  SuccessfulStudents: {
    mn: "Амжилттай оюутан",
    en: "Successful Students",
    zh: "成功的学生"
  },
  PartnerUniversities: {
    mn: "Хамтрагч их сургууль",
    en: "Partner Universities",
    zh: "合作大学"
  },
  YearsExperience: {
    mn: "Жилийн туршлага",
    en: "Years of Experience",
    zh: "多年的经验"
  },
  HeroImageAlt: {
    mn: "Хятадад суралцаж буй монгол оюутнууд",
    en: "Mongolian students in China",
    zh: "在中国留学的蒙古学生"
  },

  // --- ABOUT SECTION ---
  AboutBadge: {
    mn: "Бидний тухай",
    en: "About Us",
    zh: "关于我们"
  },
  AboutTitle: {
    mn: "HAN Education - Таны боловсролын түнш",
    en: "HAN Education - Your Education Partner",
    zh: "HAN教育 - 您的教育伙伴"
  },
  AboutDescription: {
    mn: "Бид 2022 оноос хойш Монгол оюутнуудыг Хятадын нэр хүндтэй их сургуулиудад элсүүлэх чиглэлээр үйл ажиллагаа явуулж байгаа туршлагатай компани юм.",
    en: "Since 2022, we have been helping Mongolian students enroll in prestigious Chinese universities.",
    zh: "自2022年以来，我们一直帮助蒙古学生进入中国著名大学。"
  },
  AboutImageAlt: {
    mn: "HAN Education оффис",
    en: "HAN Education office",
    zh: "HAN教育办公室"
  },
  AboutWhyTitle: {
    mn: "Яагаад HAN Education-г сонгох ёстой вэ?",
    en: "Why Choose HAN Education?",
    zh: "为什么选择HAN教育？"
  },
  AboutWhy1: {
    mn: "Хятадын их сургуулиудтай албан ёсны гэрээт харилцаатай",
    en: "Official partnerships with Chinese universities",
    zh: "与中国大学的正式合作关系"
  },
  AboutWhy2: {
    mn: "Туршлагатай, мэргэжлийн багтай",
    en: "Experienced and professional team",
    zh: "经验丰富的专业团队"
  },
  AboutWhy3: {
    mn: "Элсэлтээс эхлээд төгсөх хүртэл дэмжлэг үзүүлдэг",
    en: "Support from enrollment to graduation",
    zh: "从入学到毕业的全程支持"
  },
  AboutWhy4: {
    mn: "Тэтгэлэг олж авахад туслалцаа үзүүлдэг",
    en: "Assistance in obtaining scholarships",
    zh: "协助获得奖学金"
  },
  AboutWhy5: {
    mn: "Виз, орчуулгын бүрэн үйлчилгээтэй",
    en: "Comprehensive visa and translation services",
    zh: "全面的签证和翻译服务"
  },
  AboutFeature1Title: {
    mn: "Албан ёсны түнш",
    en: "Official Partner",
    zh: "官方合作伙伴"
  },
  AboutFeature1Desc: {
    mn: "Хятадын төрийн болон хувийн их сургуулиудтай албан ёсны гэрээт харилцаатай",
    en: "Official agreements with public and private Chinese universities",
    zh: "与中国公立和私立大学的正式协议"
  },
  AboutFeature2Title: {
    mn: "200+ амжилттай оюутан",
    en: "200+ Successful Students",
    zh: "200+成功的学生"
  },
  AboutFeature2Desc: {
    mn: "2022 оноос хойш 200 гаруй оюутныг амжилттай элсүүлсэн туршлагатай",
    en: "Experience enrolling over 200 students since 2022",
    zh: "自2022年以来成功录取200多名学生的经验"
  },
  AboutFeature3Title: {
    mn: "Иж бүрэн үйлчилгээ",
    en: "Comprehensive Service",
    zh: "全面服务"
  },
  AboutFeature3Desc: {
    mn: "Элсэлтээс эхлээд виз, орчуулга хүртэл бүх үйлчилгээг нэг дороос",
    en: "All services from enrollment to visa and translation in one place",
    zh: "从入学到签证和翻译的一站式服务"
  },
   // --- Services SECTION ---
  ServicesBadge: {
    mn: "Үйлчилгээ",
    en: "Services",
    zh: "服务"
  },
  ServicesTitle: {
    mn: "Бидний үзүүлдэг үйлчилгээнүүд",
    en: "Our Services",
    zh: "我们的服务"
  },
  ServicesDescription: {
    mn: "Элсэлтээс эхлээд төгсөх хүртэл таны боловсролын замналыг бүрэн дэмжих иж бүрэн үйлчилгээ",
    en: "Comprehensive services to support your educational journey from enrollment to graduation",
    zh: "为您的教育之旅提供从入学到毕业的全方位服务"
  },
  Service1Title: {
    mn: "Их сургуулийн зуучлал",
    en: "University Placement",
    zh: "大学申请服务"
  },
  Service1Desc: {
    mn: "Бакалавр, магистр, докторын зэрэг олгох хөтөлбөрүүдэд элсүүлэх үйлчилгээ",
    en: "Placement for bachelor, master, and PhD programs",
    zh: "本科、硕士、博士项目申请服务"
  },
  Service2Title: {
    mn: "Хэлний хөтөлбөр",
    en: "Language Program",
    zh: "语言项目"
  },
  Service2Desc: {
    mn: "Хятад хэл сурах хөтөлбөрүүдэд бүртгүүлэх болон зөвлөгөө өгөх үйлчилгээ",
    en: "Registration and consulting for Chinese language programs",
    zh: "中文学习项目注册与咨询"
  },
  Service3Title: {
    mn: "Визний баримт бичиг",
    en: "Visa Documentation",
    zh: "签证文件"
  },
  Service3Desc: {
    mn: "Оюутны виз авахад шаардлагатай бүх баримт бичгийг бэлтгэх үйлчилгээ",
    en: "Preparation of all documents required for student visa",
    zh: "学生签证所需文件准备"
  },
  Service4Title: {
    mn: "Тэтгэлгийн зуучлал",
    en: "Scholarship Placement",
    zh: "奖学金申请"
  },
  Service4Desc: {
    mn: "Төрийн болон хувийн тэтгэлэг олж авахад туслалцаа үзүүлэх үйлчилгээ",
    en: "Assistance in obtaining government and private scholarships",
    zh: "协助申请政府和私人奖学金"
  },
  Service5Title: {
    mn: "Зөвлөх үйлчилгээ",
    en: "Consulting Service",
    zh: "咨询服务"
  },
  Service5Desc: {
    mn: "Боловсролын зам сонголт, мэргэжил сонгоход зөвлөгөө өгөх үйлчилгээ",
    en: "Consulting for educational and career choices",
    zh: "教育和职业选择咨询"
  },
  Service6Title: {
    mn: "Дэмжлэг үйлчилгээ",
    en: "Support Service",
    zh: "支持服务"
  },
  Service6Desc: {
    mn: "Хятадад суралцах хугацаанд үргэлжлүүлэн дэмжлэг үзүүлэх үйлчилгээ",
    en: "Continuous support during your studies in China",
    zh: "在中国学习期间的持续支持"
  },
  // --- Testimonials SECTION ---
  TestimonialsBadge: {
    mn: "Сэтгэгдэл",
    en: "Testimonials",
    zh: "评价"
  },
  TestimonialsTitle: {
    mn: "Оюутнуудын сэтгэгдэл",
    en: "Student Testimonials",
    zh: "学生评价"
  },
  TestimonialsDescription: {
    mn: "Бидний үйлчилгээг ашиглан амжилттай элсэн орсон оюутнуудын бодит сэтгэгдэл",
    en: "Real feedback from students who successfully enrolled with our help",
    zh: "通过我们的服务成功入学学生的真实反馈"
  },
  // --- Team SECTION ---
  TeamBadge: {
    mn: "Манай баг",
    en: "Our Team",
    zh: "我们的团队"
  },
  TeamTitle: {
    mn: "Мэргэжлийн багийн гишүүд",
    en: "Professional Team Members",
    zh: "专业团队成员"
  },
  TeamDescription: {
    mn: "Туршлагатай, мэргэжлийн багийн гишүүд таны боловсролын зорилгод хүрэхэд туслахад бэлэн байна",
    en: "Experienced and professional team members are ready to help you achieve your educational goals",
    zh: "经验丰富的专业团队成员随时帮助您实现教育目标"
  },
  // --- Contact/Call to Action/ Footer SECTION ---
  ContactTitle: {
    mn: "Хятадад суралцах мөрөөдлөө биелүүлээрэй",
    en: "Fulfill your dream of studying in China",
    zh: "实现您在中国留学的梦想"
  },
  ContactDescription: {
    mn: "Бид таны боловсролын замналыг эхнээс нь дэмжиж, амжилтад хүргэх бэлэн байна. Өнөөдөр л бидэнтэй холбогдоод эхлээрэй!",
    en: "We are ready to support your educational journey from the start and help you succeed. Contact us today!",
    zh: "我们随时准备支持您的教育之旅并助您成功。今天就联系我们吧！"
  },
  ContactPhone: {
    mn: "Утас",
    en: "Phone",
    zh: "电话"
  },
  ContactEmail: {
    mn: "И-мэйл",
    en: "Email",
    zh: "电子邮件"
  },
  ContactAddress: {
    mn: "Хаяг",
    en: "Address",
    zh: "地址"
  },
  ContactAddressValue: {
    mn: "Улаанбаатар хот, Сүхбаатар дүүрэг",
    en: "Ulaanbaatar, Sukhbaatar District",
    zh: "乌兰巴托市，苏赫巴托区"
  },
  ContactGetAdvice: {
    mn: "Үнэгүй зөвлөгөө авах",
    en: "Get Free Advice",
    zh: "获取免费建议"
  },
  ContactSupport: {
    mn: "Дэмжлэг",
    en: "Support",
    zh: "支持"
  },
  ContactReliable: {
    mn: "Найдвартай",
    en: "Reliable",
    zh: "可靠"
  },
  ContactCopyright: {
    mn: "Бүх эрх хуулиар хамгаалагдсан.",
    en: "All rights reserved.",
    zh: "版权所有。"
  },
  Home: { mn: "Нүүр", en: "Home", zh: "主页" },
  About: { mn: "Бидний тухай", en: "About", zh: "关于我们" },
  Services: { mn: "Үйлчилгээ", en: "Services", zh: "服务" },
  Testimonials: { mn: "Сэтгэгдэл", en: "Testimonials", zh: "评价" },
  Team: { mn: "Баг", en: "Team", zh: "团队" },
  Contact: { mn: "Холбоо барих", en: "Contact", zh: "联系" },
  PartnersDescription: {
    mn: "Хятадын нэр хүндтэй төрийн болон хувийн их сургуулиудтай албан ёсны гэрээт харилцаатай",
    en: "Official partnerships with prestigious public and private universities in China",
    zh: "与中国著名公立和私立大学的正式合作关系"
  },
  ContactAdviceDesc: {
    mn: "Таны асуултад хариулж, зөв чиглэл зааж өгөхөд бэлэн байна",
    en: "Ready to answer your questions and provide the right guidance",
    zh: "随时为您的问题提供解答和正确指导"
  },
  PartnersBadge: {
    mn: "Хамтрагч их сургуулиуд",
    en: "Partner Universities",
    zh: "合作大学"
  },
  PartnersBottomDesc: {
    mn: "Болон бусад олон их сургуулиудтай хамтран ажиллаж байна",
    en: "And many other universities we collaborate with",
    zh: "以及我们合作的许多其他大学"
  },
  TeamRoleDirector: {
    mn: "Захирал",
    en: "Director",
    zh: "主任"
  },
  TeamDescDirector: {
    mn: "Хятадад 8 жил суралцаж, боловсрол салбарт 5 жилийн туршлагатай",
    en: "Studied in China for 8 years, 5 years of experience in education sector",
    zh: "在中国学习8年，拥有5年教育行业经验"
  },
  TeamRoleAdvisor: {
    mn: "Боловсролын зөвлөх",
    en: "Education Advisor",
    zh: "教育顾问"
  },
  TeamDescAdvisor: {
    mn: "Хятад хэлний багш, HSK-ийн бэлтгэлийн мэргэжилтэн",
    en: "Chinese language teacher, HSK preparation specialist",
    zh: "汉语教师，HSK备考专家"
  },
  TeamRoleVisa: {
    mn: "Виз мэргэжилтэн",
    en: "Visa Specialist",
    zh: "签证专家"
  },
  TeamDescVisa: {
    mn: "Виз, баримт бичгийн асуудлаар 4 жилийн туршлагатай",
    en: "4 years of experience in visa and documentation",
    zh: "拥有4年签证及文件处理经验"
  },
  TeamRoleManager: {
    mn: "Оюутны харилцааны менежер",
    en: "Student Relations Manager",
    zh: "学生关系经理"
  },
  TeamDescManager: {
    mn: "Оюутнуудтай харилцах, дэмжлэг үзүүлэх чиглэлийн мэргэжилтэн",
    en: "Specialist in student relations and support",
    zh: "学生关系与支持专家"
  },
  // --- STUDENT REGISTRATION FORM ---
  StudentRegistrationTitle: {
    mn: "Оюутны бүртгэл",
    en: "Student Registration",
    zh: "学生注册"
  },
  StudentRegistrationDesc: {
    mn: "Хятадад суралцах хүсэлтээ илгээх",
    en: "Submit your application to study in China",
    zh: "提交您在中国学习的申请"
  },
  FirstName: {
    mn: "Нэр",
    en: "First Name",
    zh: "名字"
  },
  LastName: {
    mn: "Овог",
    en: "Last Name",
    zh: "姓氏"
  },
  Email: {
    mn: "И-мэйл",
    en: "Email",
    zh: "电子邮件"
  },
  Phone: {
    mn: "Утас",
    en: "Phone",
    zh: "电话"
  },
  DateOfBirth: {
    mn: "Төрсөн огноо",
    en: "Date of Birth",
    zh: "出生日期"
  },
  Nationality: {
    mn: "Иргэншил",
    en: "Nationality",
    zh: "国籍"
  },
  CurrentEducation: {
    mn: "Одоогийн боловсрол",
    en: "Current Education",
    zh: "当前教育水平"
  },
  DesiredProgram: {
    mn: "Хүссэн хөтөлбөр",
    en: "Desired Program",
    zh: "期望项目"
  },
  DesiredUniversity: {
    mn: "Хүссэн их сургууль",
    en: "Desired University",
    zh: "期望大学"
  },
  ChineseLevel: {
    mn: "Хятад хэлний түвшин",
    en: "Chinese Level",
    zh: "中文水平"
  },
  EnglishLevel: {
    mn: "Англи хэлний түвшин",
    en: "English Level",
    zh: "英文水平"
  },
  Budget: {
    mn: "Төсөв",
    en: "Budget",
    zh: "预算"
  },
  StartDate: {
    mn: "Эхлэх огноо",
    en: "Start Date",
    zh: "开始日期"
  },
  AdditionalInfo: {
    mn: "Нэмэлт мэдээлэл",
    en: "Additional Information",
    zh: "附加信息"
  },
  SelectCurrentEducation: {
    mn: "Одоогийн боловсролоо сонгоно уу",
    en: "Select current education",
    zh: "选择当前教育水平"
  },
  SelectDesiredProgram: {
    mn: "Хүссэн хөтөлбөрөө сонгоно уу",
    en: "Select desired program",
    zh: "选择期望项目"
  },
  SelectChineseLevel: {
    mn: "Хятад хэлний түвшингээ сонгоно уу",
    en: "Select Chinese level",
    zh: "选择中文水平"
  },
  SelectEnglishLevel: {
    mn: "Англи хэлний түвшингээ сонгоно уу",
    en: "Select English level",
    zh: "选择英文水平"
  },
  SelectBudget: {
    mn: "Төсөвөө сонгоно уу",
    en: "Select budget",
    zh: "选择预算"
  },
  SelectStartDate: {
    mn: "Эхлэх огноогоо сонгоно уу",
    en: "Select start date",
    zh: "选择开始日期"
  },
  HighSchool: {
    mn: "Ахлах сургууль",
    en: "High School",
    zh: "高中"
  },
  LanguageProgram: {
    mn: "Хэлний хөтөлбөр",
    en: "Language Program",
    zh: "语言项目"
  },
  Beginner: {
    mn: "Эхлэгч",
    en: "Beginner",
    zh: "初学者"
  },
  Intermediate: {
    mn: "Дунд түвшин",
    en: "Intermediate",
    zh: "中级"
  },
  Advanced: {
    mn: "Дээд түвшин",
    en: "Advanced",
    zh: "高级"
  },
  Native: {
    mn: "Эзэн",
    en: "Native",
    zh: "母语"
  },
  Under5000: {
    mn: "5000$ доош",
    en: "Under $5,000",
    zh: "5000美元以下"
  },
  "5000To10000": {
    mn: "5000-10000$",
    en: "$5,000 - $10,000",
    zh: "5000-10000美元"
  },
  "10000To20000": {
    mn: "10000-20000$",
    en: "$10,000 - $20,000",
    zh: "10000-20000美元"
  },
  Over20000: {
    mn: "20000$ дээш",
    en: "Over $20,000",
    zh: "20000美元以上"
  },
  Fall2024: {
    mn: "Намар 2024",
    en: "Fall 2024",
    zh: "2024年秋季"
  },
  Spring2025: {
    mn: "Хаврын улирал 2025",
    en: "Spring 2025",
    zh: "2025年春季"
  },
  Fall2025: {
    mn: "Намар 2025",
    en: "Fall 2025",
    zh: "2025年秋季"
  },
  Spring2026: {
    mn: "Хаврын улирал 2026",
    en: "Spring 2026",
    zh: "2026年春季"
  },
  AdditionalInfoPlaceholder: {
    mn: "Нэмэлт мэдээлэл, асуулт эсвэл хүсэлт...",
    en: "Additional information, questions, or requests...",
    zh: "附加信息、问题或要求..."
  },
  SubmitApplication: {
    mn: "Өргөдөл илгээх",
    en: "Submit Application",
    zh: "提交申请"
  },
  Submitting: {
    mn: "Илгээж байна...",
    en: "Submitting...",
    zh: "提交中..."
  },
  RegistrationSuccess: {
    mn: "Өргөдөл амжилттай илгээгдлээ! Бид удахгүй таныг холбоно.",
    en: "Application submitted successfully! We will contact you soon.",
    zh: "申请提交成功！我们会尽快联系您。"
  },
  RegistrationError: {
    mn: "Алдаа гарлаа. Дахин оролдоно уу.",
    en: "An error occurred. Please try again.",
    zh: "发生错误。请重试。"
  },
  // --- SIMPLIFIED REGISTRATION FORM ---
  Age: {
    mn: "Нас",
    en: "Age",
    zh: "年龄"
  },
  CurrentSchool: {
    mn: "Одоогийн сургууль",
    en: "Current School",
    zh: "当前学校"
  },
  CurrentSchoolPlaceholder: {
    mn: "Сургуулийн нэр",
    en: "School name",
    zh: "学校名称"
  },
  CurrentGrade: {
    mn: "Одоогийн анги",
    en: "Current Grade",
    zh: "当前年级"
  },
  SelectCurrentGrade: {
    mn: "Ангиа сонгоно уу",
    en: "Select grade",
    zh: "选择年级"
  },
  Grade9: {
    mn: "9-р анги",
    en: "Grade 9",
    zh: "9年级"
  },
  Grade10: {
    mn: "10-р анги",
    en: "Grade 10",
    zh: "10年级"
  },
  Grade11: {
    mn: "11-р анги",
    en: "Grade 11",
    zh: "11年级"
  },
  Grade12: {
    mn: "12-р анги",
    en: "Grade 12",
    zh: "12年级"
  },
  LanguageLevel: {
    mn: "Хэлний түвшин",
    en: "Language Level",
    zh: "语言水平"
  },
  SelectLanguageLevel: {
    mn: "Хэлний түвшингээ сонгоно уу",
    en: "Select language level",
    zh: "选择语言水平"
  },
  StudyPlan: {
    mn: "Сургалтын төлөвлөгөө",
    en: "Study Plan",
    zh: "学习计划"
  },
  StudyPlanPlaceholder: {
    mn: "Хятадад юу сурах хүсэлтэй байгаагаа бичнэ үү...",
    en: "What would you like to study in China...",
    zh: "您想在中国学习什么..."
  },
  HighSchoolGPA: {
    mn: "ЕБС-ийн голч дүн",
    en: "High School GPA",
    zh: "高中平均成绩"
  },
  HighSchoolGPAPlaceholder: {
    mn: "Жишээ нь: 3.5",
    en: "Example: 3.5",
    zh: "例如：3.5"
  },
  BackToHome: {
    mn: "Нүүр хуудас руу буцах",
    en: "Back to Home",
    zh: "返回首页"
  },
  RegistrationPageDescription: {
    mn: "Доорх форм бөглөн бидний боловсролын зөвлөх үйлчилгээнд бүртгүүлнэ үү. Бид танд Хятадад суралцахад тусална.",
    en: "Complete the form below to register for our education consulting services. We'll help you plan your studies in China.",
    zh: "请填写下面的表格注册我们的教育咨询服务。我们将帮助您规划在中国的学习。"
  },
  PersonalInfo: {
    mn: "Хувийн мэдээлэл",
    en: "Personal Info",
    zh: "个人信息"
  },
  AcademicInfo: {
    mn: "Академик мэдээлэл",
    en: "Academic Info",
    zh: "学术信息"
  },
  PersonalInformation: {
    mn: "Хувийн мэдээлэл",
    en: "Personal Information",
    zh: "个人信息"
  },
  PersonalInformationDesc: {
    mn: "Таны үндсэн хувийн мэдээллийг оруулна уу",
    en: "Please provide your basic personal details",
    zh: "请提供您的基本个人信息"
  },
  AcademicInformation: {
    mn: "Академик мэдээлэл",
    en: "Academic Information",
    zh: "学术信息"
  },
  AcademicInformationDesc: {
    mn: "Таны академик мэдээл болон сургалтын төлөвлөгөөг оруулна уу",
    en: "Please provide your academic details and study plans",
    zh: "请提供您的学术详情和学习计划"
  },
  Continue: {
    mn: "Үргэлжлүүлэх",
    en: "Continue",
    zh: "继续"
  },
  Back: {
    mn: "Буцах",
    en: "Back",
    zh: "返回"
  },
  // --- TESTIMONIALS CONTENT ---
  Testimonial1University: {
    mn: "Нанжин их сургууль",
    en: "Nanjing University",
    zh: "南京大学"
  },
  Testimonial1Content: {
    mn: "HAN Education-ийн ачаар би амжилттай Нанжин хотын нэр хүндтэй сургуульд элссэн. Элсэлт, виз, орчуулга бүгдийг нь найдвартай хариуцсан. Баярлалаа!",
    en: "Thanks to HAN Education, I successfully enrolled in a prestigious university in Nanjing. They handled everything reliably from admission to visa and translation. Thank you!",
    zh: "多亏了HAN教育，我成功进入了南京的一所知名大学。他们可靠地处理了从入学到签证和翻译的一切。谢谢！"
  },
  Testimonial2University: {
    mn: "Жэжян олон улсын судлалын их сургууль",
    en: "Zhejiang International Studies University",
    zh: "浙江外国语学院"
  },
  Testimonial2Content: {
    mn: "Миний оюутан нас маш гайхалтай бас тухтай эхэлж байна. Амьдрахад таатай сургуулийн кампуст, нүд гайхам үзэсгэлэнтэй хотод хэлний бэлтгэлийн нэг жилээ өнгөрүүлэх боломжийг олгосон танай хамт олонд баярлалаа.",
    en: "My student life is starting wonderfully and comfortably. Thank you to your team for giving me the opportunity to spend one year of language preparation in a comfortable university campus in a beautiful city.",
    zh: "我的學生時代即將開啟，精彩舒適。感謝各位同事給我機會，讓我在校園裡，在一個美麗的城市，在一個美麗的城市，度過一年的語言準備時光。"
  },
  Testimonial3University: {
    mn: "Шанхайн Лишин Нягтлан бодох бүртгэл, санхүүгийн их сургууль",
    en: "Shanghai Lixin University of Accounting and Finance",
    zh: "上海立信会计金融学院"
  },
  Testimonial3Content: {
    mn: "Би багаасаа л том хотод сурч амьдрахыг хүсдэг хүсдэг байсан. Энэ хүслээ биелүүлэхэд минь Han education маш их тус дэм болсон.",
    en: "I've always wanted to study and live in a big city since I was young. Han education helped me a lot in fulfilling this dream.",
    zh: "我从很小的时候就一直想在大城市学习和生活。Han教育在实现这个梦想方面给了我很大帮助。"
  },
  Testimonial4University: {
    mn: "Чунцин их сургууль",
    en: "Chongqing University",
    zh: "重庆大学"
  },
  Testimonial4Content: {
    mn: "Би засгийн газрын тэтгэлгээр хүссэн хотдоо, хүссэн сургуульдаа суралцаж байгаа. 12-р ангтд орохдоо аль сургуульд орох, хаашаа явж сурахаа ч мэдэхгүй будилж явахад минь Han education ийн зөвлөгөө чиглүүлэг намайг энэ хүртэл авч ирсэн. Үргэлж сурах урам зоригоор тэтгэж байдаг танай хамт олны энерги гоё шүү.",
    en: "I'm studying at my desired university in my desired city with a government scholarship. When I was confused about which university to enter and where to go in 12th grade, Han education's advice and guidance brought me here. Your team's energy that always supports with learning motivation is wonderful.",
    zh: "我正在政府奖学金的资助下在我理想的城市和理想的大学学习。当我在12年级时对进入哪所大学和去哪里感到困惑时，Han教育的建议和指导把我带到了这里。你们团队总是以学习动力支持的能量很棒。"
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<string>("mn")
  const [languages, setLanguages] = useState<Language[]>(defaultLanguages)
  // Use in-code translations
  const translations = inCodeTranslations;
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Try to get language from localStorage
    const storedLanguage = localStorage.getItem("language")
    if (storedLanguage) {
      setLanguageState(storedLanguage)
    }

  }, [])

  const setLanguage = (lang: string) => {
    localStorage.setItem("language", lang)
    setLanguageState(lang)
  }

  const t = (key: string): string => {
    if (!translations[key]) return key
    return translations[key][language] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, languages, translations, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
