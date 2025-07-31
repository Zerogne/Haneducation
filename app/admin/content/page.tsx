"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Statistics } from "./statistics"
import { Contact } from "./contact"
import { Team } from "./team"
import { Testimonials } from "./testimonials"

interface TeamMember {
  _id: string
  name: string
  role: string
  email: string
  phone: string
  image: string
  linkedin: string
  bio: string
  isActive: boolean
  order: number
  department: string
  metadata: {
    experience: string
    education: string
    languages: string[]
    specializations: string[]
  }
  createdAt: string
  updatedAt: string
}

interface Testimonial {
  _id: string
  name: string
  university: string
  content: string
  rating: number
  image: string
  isActive: boolean
  order: number
  language: string
  createdAt: string
  updatedAt: string
}

interface ContentState {
  hero: {
    title: string
    subtitle: string
    description: string
    applyNowText: string
    learnMoreText: string
    stats: {
      students: string
      universities: string
      experience: string
    }
    statsLabels: {
      students: string
      universities: string
      experience: string
    }
  }
  contact: {
    title: string
    description: string
    phone: string
    email: string
    address: string
    getAdviceText: string
  }
  footer: {
    title: string
    description: string
    copyright: string
  }
}

export default function ContentPage() {
  const { data: session, status } = useSession()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState("mn")
  const [hasInitialized, setHasInitialized] = useState(false)
  
  // Team management state
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  
  const [content, setContent] = useState<ContentState>({
    hero: {
      title: "",
      subtitle: "",
      description: "",
      applyNowText: "",
      learnMoreText: "",
      stats: {
        students: "",
        universities: "",
        experience: ""
      },
      statsLabels: {
        students: "",
        universities: "",
        experience: ""
      }
    },
    contact: {
      title: "",
      description: "",
      phone: "",
      email: "",
      address: "",
      getAdviceText: ""
    },
    footer: {
      title: "",
      description: "",
      copyright: ""
    }
  })

  useEffect(() => {
    if (status === "loading") return
    if (!session) {
      window.location.href = "/admin/login"
      return
    }
    // Only fetch once when component mounts and session is available
    if (status === "authenticated" && !hasInitialized) {
      setHasInitialized(true)
      fetchContent()
      fetchTeamMembers()
      fetchTestimonials()
    }
  }, [status, hasInitialized]) // Only depend on status, not session

  const fetchContent = async () => {
    try {
      setLoading(true)
      
      
      // Reset content state to empty before fetching new language content
      setContent({
        hero: {
          title: "",
          subtitle: "",
          description: "",
          applyNowText: "",
          learnMoreText: "",
          stats: {
            students: "",
            universities: "",
            experience: ""
          },
          statsLabels: {
            students: "",
            universities: "",
            experience: ""
          }
        },
        contact: {
          title: "",
          description: "",
          phone: "",
          email: "",
          address: "",
          getAdviceText: ""
        },
        footer: {
          title: "",
          description: "",
          copyright: ""
        }
      })

      const response = await fetch(`/api/content?language=${selectedLanguage}`)
      if (response.ok) {
        const data = await response.json()
        console.log('Fetched content:', data)
        
        if (data.content && data.content.length > 0) {
          const parsedContent = data.content.reduce((acc: any, item: any) => {
            try {
              const parsed = JSON.parse(item.content)
              acc[item.section] = parsed
            } catch (error) {
              console.error(`Error parsing content for section ${item.section}:`, error)
            }
            return acc
          }, {})

          setContent(prev => ({
            ...prev,
            ...parsedContent
          }))
        }
      } else {
        console.error('Failed to fetch content:', response.status)
      }
    } catch (error) {
      console.error('Error fetching content:', error)
    } finally {
      setLoading(false)
    }
  }

  const saveContent = async (section: string, sectionData: any) => {
    try {
      setSaving(true)
      console.log(`Saving ${section} content:`, sectionData)
      
      const response = await fetch('/api/content', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          section,
          content: JSON.stringify(sectionData),
          language: selectedLanguage
        }),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: `${section} content saved successfully`,
        })
        await fetchContent()
      } else {
        const error = await response.json()
        toast({
          title: "Error",
          description: error.error || "Failed to save content",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error saving content:", error)
      toast({
        title: "Error",
        description: "Failed to save content",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const updateContent = (section: keyof ContentState, field: string, value: string) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  const updateStats = (section: string, stat: string, value: string) => {
    if (section === 'hero') {
      setContent(prev => ({
        ...prev,
        hero: {
          ...prev.hero,
          stats: {
            ...prev.hero.stats,
            [stat]: value
          }
        }
      }))
    }
  }

  const updateStatsLabels = (section: string, stat: string, value: string) => {
    if (section === 'hero') {
      setContent(prev => ({
        ...prev,
        hero: {
          ...prev.hero,
          statsLabels: {
            ...prev.hero.statsLabels,
            [stat]: value
          }
        }
      }))
    }
  }

  const fetchTeamMembers = async () => {
    try {
      console.log('Fetching team members...')
      const response = await fetch('/api/team')
      const data = await response.json()
      if (data.success) {
        setTeamMembers(data.team || [])
      } else {
        console.error("Failed to fetch team members:", data.error)
        setTeamMembers([])
      }
    } catch (error) {
      console.error("Error fetching team members:", error)
      setTeamMembers([])
    }
  }

  const fetchTestimonials = async () => {
    try {
      console.log('Fetching testimonials...')
      const response = await fetch('/api/testimonials?language=mn&admin=true')
      const data = await response.json()
      setTestimonials(data.testimonials || [])
    } catch (error) {
      console.error("Error fetching testimonials:", error)
    }
  }

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading content...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Content Management</h1>
          <p className="text-muted-foreground text-sm sm:text-base">Edit website content in Mongolian</p>
        </div>
      </div>

      <Tabs defaultValue="statistics" className="space-y-8 sm:space-y-12">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 gap-2 h-auto">
          <TabsTrigger value="statistics" className="text-xs sm:text-sm py-3">Statistics</TabsTrigger>
          <TabsTrigger value="contact" className="text-xs sm:text-sm py-3">Contact Info</TabsTrigger>
          <TabsTrigger value="team" className="text-xs sm:text-sm py-3">Team Members</TabsTrigger>
          <TabsTrigger value="testimonials" className="text-xs sm:text-sm py-3">Testimonials</TabsTrigger>
        </TabsList>

        <div className="mt-12 sm:mt-16">
          <TabsContent value="statistics" className="mt-0">
            <Statistics
              content={content}
              updateStats={updateStats}
              updateStatsLabels={updateStatsLabels}
              saveContent={saveContent}
              saving={saving}
            />
          </TabsContent>

          <TabsContent value="contact" className="mt-0">
            <Contact
              content={content}
              updateContent={updateContent}
              saveContent={saveContent}
              saving={saving}
            />
          </TabsContent>

          <TabsContent value="team" className="mt-0">
            <Team
              teamMembers={teamMembers}
              fetchTeamMembers={fetchTeamMembers}
            />
          </TabsContent>

          <TabsContent value="testimonials" className="mt-0">
            <Testimonials
              testimonials={testimonials}
              fetchTestimonials={fetchTestimonials}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
} 