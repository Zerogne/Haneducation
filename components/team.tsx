"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Mail, Phone, Linkedin } from "lucide-react"
import { motion } from "framer-motion"


interface TeamMember {
  _id: string
  name: string
  role: string
  image: string
  email: string
  phone: string
  linkedin: string
  badge?: string
  bio?: string
  department?: string
  metadata?: {
    experience?: string
    education?: string
    languages?: string[]
    specializations?: string[]
  }
}

// Default team members that will always be available
const defaultTeamMembers: TeamMember[] = [
  {
    _id: "1",
    name: "Wang Yue",
    role: "Гадаад харилцаа, бичиг баримт хариуцсан мэргэжилтэн",
    image: "/teamMember1.png",
    email: "wangyue@haneducation.mn",
    phone: "+976 7777 7780",
    linkedin: "linkedin.com/in/wangyue",
    badge: "Nanjing University 2020",
    department: "admissions",
    metadata: {
      education: "Nanjing University 2020"
    }
  },
  {
    _id: "2",
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
    _id: "3",
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

export function Team() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(defaultTeamMembers)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [hasInitialized, setHasInitialized] = useState(false)
  const [sectionContent, setSectionContent] = useState({
    title: "Бидний баг",
    description: "Бидний туршлагатай, мэргэжлийн баг",
    badge: "Багийн гишүүд"
  })

  useEffect(() => {
    if (!hasInitialized) {
      setHasInitialized(true)
      fetchTeamMembers()
      fetchSectionContent()
    }
  }, [hasInitialized])

  const fetchSectionContent = async () => {
    try {
      const response = await fetch('/api/content?section=team')
      if (response.ok) {
        const data = await response.json()
        if (data.content && data.content.length > 0) {
          try {
            const content = JSON.parse(data.content[0].content)
            setSectionContent({
              title: content.title || "Бидний баг",
              description: content.description || "Бидний туршлагатай, мэргэжлийн баг",
              badge: content.badge || "Багийн гишүүд"
            })
          } catch (error) {
            console.error('Error parsing team section content:', error)
          }
        }
      }
    } catch (error) {
      console.error('Error fetching team section content:', error)
    }
  }

  const fetchTeamMembers = async () => {
    try {
      setLoading(true)
      setError("")
      
      const response = await fetch('/api/team')
      if (response.ok) {
        const data = await response.json()
        if (data.success && data.team && data.team.length > 0) {
          setTeamMembers(data.team)
        } else {
          // Use default team members if no data found in database
          console.log("No team members found in database, using default team")
          setTeamMembers(defaultTeamMembers)
        }
      } else {
        // Use default team members if API call fails
        console.log("API call failed, using default team members")
        setTeamMembers(defaultTeamMembers)
      }
    } catch (error) {
      console.error("Error fetching team members:", error)
      // Use default team members if there's any error
      setTeamMembers(defaultTeamMembers)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section id="team" className="py-20 bg-muted/30 w-full">
        <div className="max-w-7xl mx-auto px-8 lg:px-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading team members...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="team" className="py-20 bg-muted/30 w-full">
      <div className="max-w-7xl mx-auto px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="secondary" className="mb-4">
            {sectionContent.badge}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {sectionContent.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {sectionContent.description}
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="w-full md:w-80 lg:w-80"
            >
              <Card className="h-full group cursor-pointer hover:shadow-lg transition-all duration-300 ease-out hover:-translate-y-1 border hover:border-primary/20 bg-background">
                <CardContent className="p-6 text-center">
                  <div className="relative mb-6 group/avatar">
                    <div className="w-32 h-32 mx-auto relative overflow-hidden rounded-full border-4 border-primary/20 group-hover/avatar:border-primary transition-colors duration-300 ease-out">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover/avatar:scale-105"
                      />
                    </div>
                    <Badge className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground group-hover:bg-primary/90 transition-colors duration-300 ease-out">
                      {member.badge || member.metadata?.education || member.department || "Team Member"}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300 ease-out">{member.name}</h3>
                  <p className="text-muted-foreground mb-6 group-hover:text-foreground transition-colors duration-300 ease-out">{member.role}</p>

                  {member.bio && (
                    <p className="text-sm text-muted-foreground mb-6 group-hover:text-foreground transition-colors duration-300 ease-out">
                      {member.bio}
                    </p>
                  )}

                  <div className="flex justify-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-10 h-10 p-0 group/btn hover:bg-primary hover:text-primary-foreground transition-all duration-300 ease-out"
                      asChild
                    >
                      <a href={`mailto:${member.email}`}>
                        <Mail className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-10 h-10 p-0 group/btn hover:bg-primary hover:text-primary-foreground transition-all duration-300 ease-out"
                      asChild
                    >
                      <a href={`tel:${member.phone}`}>
                        <Phone className="h-4 w-4" />
                      </a>
                    </Button>
                    {member.linkedin && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="w-10 h-10 p-0 group/btn hover:bg-primary hover:text-primary-foreground transition-all duration-300 ease-out"
                        asChild
                      >
                        <a href={`https://${member.linkedin}`} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}