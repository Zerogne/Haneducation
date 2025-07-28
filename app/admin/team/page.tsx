"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Plus, Edit, Trash2, Mail, Phone, Linkedin, User } from "lucide-react"
import { toast } from "sonner"

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

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null)
  const [deletingMember, setDeletingMember] = useState<TeamMember | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    image: "",
    email: "",
    phone: "",
    linkedin: "",
    badge: "",
    bio: "",
    department: "general",
    experience: "",
    education: "",
  })

  useEffect(() => {
    fetchTeamMembers()
  }, [])

  const fetchTeamMembers = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/team')
      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setTeamMembers(data.team || [])
        } else {
          setError("Failed to fetch team members")
        }
      } else {
        setError("Failed to fetch team members")
      }
    } catch (error) {
      console.error("Error fetching team members:", error)
      setError("Error connecting to database")
    } finally {
      setLoading(false)
    }
  }

  const handleAddMember = () => {
    setEditingMember(null)
    setFormData({
      name: "",
      role: "",
      image: "",
      email: "",
      phone: "",
      linkedin: "",
      badge: "",
      bio: "",
      department: "general",
      experience: "",
      education: "",
    })
    setIsDialogOpen(true)
  }

  const handleEditMember = (member: TeamMember) => {
    setEditingMember(member)
    setFormData({
      name: member.name,
      role: member.role,
      image: member.image,
      email: member.email,
      phone: member.phone,
      linkedin: member.linkedin,
      badge: member.badge || "",
      bio: member.bio || "",
      department: member.department || "general",
      experience: member.metadata?.experience || "",
      education: member.metadata?.education || "",
    })
    setIsDialogOpen(true)
  }

  const handleDeleteMember = (member: TeamMember) => {
    setDeletingMember(member)
    setIsDeleteDialogOpen(true)
  }

  const handleSubmit = async () => {
    if (!formData.name || !formData.role || !formData.email) {
      toast.error("Нэр, албан тушаал, имэйл заавал бөглөх шаардлагатай")
      return
    }

    try {
      const memberData = {
        name: formData.name,
        role: formData.role,
        image: formData.image,
        email: formData.email,
        phone: formData.phone,
        linkedin: formData.linkedin,
        badge: formData.badge,
        bio: formData.bio,
        department: formData.department,
        metadata: {
          experience: formData.experience,
          education: formData.education,
        }
      }

      if (editingMember) {
        // Update existing member
        const response = await fetch('/api/team', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingMember._id, ...memberData })
        })

        if (response.ok) {
          const data = await response.json()
          if (data.success) {
            setTeamMembers(prev => prev.map(member => 
              member._id === editingMember._id ? data.teamMember : member
            ))
            toast.success("Гишүүний мэдээлэл амжилттай шинэчлэгдлээ")
          } else {
            toast.error(data.error || "Failed to update team member")
          }
        } else {
          toast.error("Failed to update team member")
        }
      } else {
        // Add new member
        const response = await fetch('/api/team', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(memberData)
        })

        if (response.ok) {
          const data = await response.json()
          if (data.success) {
            setTeamMembers(prev => [...prev, data.teamMember])
            toast.success("Шинэ гишүүн амжилттай нэмэгдлээ")
          } else {
            toast.error(data.error || "Failed to add team member")
          }
        } else {
          toast.error("Failed to add team member")
        }
      }

      setIsDialogOpen(false)
      setFormData({
        name: "",
        role: "",
        image: "",
        email: "",
        phone: "",
        linkedin: "",
        badge: "",
        bio: "",
        department: "general",
        experience: "",
        education: "",
      })
    } catch (error) {
      console.error("Error saving team member:", error)
      toast.error("Error saving team member")
    }
  }

  const confirmDelete = async () => {
    if (!deletingMember) return

    try {
      const response = await fetch(`/api/team?id=${deletingMember._id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setTeamMembers(prev => prev.filter(member => member._id !== deletingMember._id))
          toast.success("Гишүүн амжилттай устгагдлаа")
        } else {
          toast.error(data.error || "Failed to delete team member")
        }
      } else {
        toast.error("Failed to delete team member")
      }
    } catch (error) {
      console.error("Error deleting team member:", error)
      toast.error("Error deleting team member")
    }

    setIsDeleteDialogOpen(false)
    setDeletingMember(null)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading team members...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Багийн гишүүд</h1>
          <p className="text-muted-foreground">HAN Education-ийн багийн гишүүдийн мэдээллийг удирдах</p>
        </div>
        <Button onClick={handleAddMember} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Гишүүн нэмэх
        </Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <Card key={member._id} className="group hover:shadow-lg transition-all duration-300">
            <CardHeader className="text-center pb-4">
              <div className="relative mx-auto mb-4">
                <div className="w-24 h-24 mx-auto relative overflow-hidden rounded-full border-4 border-primary/20">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <Badge className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                  {member.badge || member.metadata?.education || member.department || "Team Member"}
                </Badge>
              </div>
              <CardTitle className="text-xl">{member.name}</CardTitle>
              <CardDescription className="text-sm">{member.role}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{member.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{member.phone}</span>
              </div>
              {member.linkedin && (
                <div className="flex items-center gap-2 text-sm">
                  <Linkedin className="h-4 w-4 text-muted-foreground" />
                  <span>{member.linkedin}</span>
                </div>
              )}
              
              <div className="flex gap-2 pt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditMember(member)}
                  className="flex-1"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Засах
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDeleteMember(member)}
                  className="flex-1 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Устгах
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {teamMembers.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No team members found</p>
        </div>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingMember ? "Гишүүний мэдээлэл засах" : "Шинэ гишүүн нэмэх"}
            </DialogTitle>
            <DialogDescription>
              Багийн гишүүний мэдээллийг оруулна уу
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Нэр *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Гишүүний нэр"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role">Албан тушаал *</Label>
              <Input
                id="role"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                placeholder="Албан тушаал"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="image">Зургийн URL</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="/path/to/image.png"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Имэйл *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="email@example.com"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Утас</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+976 7777 7777"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input
                id="linkedin"
                value={formData.linkedin}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                placeholder="linkedin.com/in/username"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="badge">Тэмдэг</Label>
              <Input
                id="badge"
                value={formData.badge}
                onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                placeholder="Тэмдэг/зэрэг"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Товч танилцуулга</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Гишүүний товч танилцуулга"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">Хэлтэс</Label>
              <Input
                id="department"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                placeholder="Хэлтэс"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Туршлага</Label>
              <Input
                id="experience"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                placeholder="Туршлага"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="education">Боловсрол</Label>
              <Input
                id="education"
                value={formData.education}
                onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                placeholder="Боловсрол"
              />
            </div>
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="flex-1">
              Цуцлах
            </Button>
            <Button onClick={handleSubmit} className="flex-1">
              {editingMember ? "Хадгалах" : "Нэмэх"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Гишүүн устгах</DialogTitle>
            <DialogDescription>
              "{deletingMember?.name}" гишүүнийг устгахдаа итгэлтэй байна уу? Энэ үйлдлийг буцаах боломжгүй.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex gap-2 pt-4">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} className="flex-1">
              Цуцлах
            </Button>
            <Button onClick={confirmDelete} variant="destructive" className="flex-1">
              Устгах
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 