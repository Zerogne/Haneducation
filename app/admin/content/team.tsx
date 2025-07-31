"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, Edit, Trash2, Mail, Phone, Linkedin, User, Building, GraduationCap, Languages, Award } from "lucide-react"
import { toast } from "sonner"

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

interface TeamProps {
  teamMembers: TeamMember[]
  fetchTeamMembers: () => Promise<void>
}

export function Team({ teamMembers, fetchTeamMembers }: TeamProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [deletingMember, setDeletingMember] = useState<TeamMember | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    email: "",
    phone: "",
    image: "",
    linkedin: "",
    bio: "",
    department: "general",
    isActive: true,
    order: 0,
    experience: "",
    education: "",
    languages: "",
    specializations: ""
  })

  // Prevent dialog from closing when switching tabs
  useEffect(() => {
    const handleVisibilityChange = () => {
      // Don't close dialog when page becomes hidden/visible
      // This prevents the dialog from closing when switching tabs
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  const resetForm = () => {
    setFormData({
      name: "",
      role: "",
      email: "",
      phone: "",
      image: "",
      linkedin: "",
      bio: "",
      department: "general",
      isActive: true,
      order: 0,
      experience: "",
      education: "",
      languages: "",
      specializations: ""
    })
    setEditingMember(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (isSubmitting) return // Prevent double submission
    
    setIsSubmitting(true)
    
    try {
      const memberData = {
        ...formData,
        languages: formData.languages.split(',').map(lang => lang.trim()).filter(lang => lang),
        specializations: formData.specializations.split(',').map(spec => spec.trim()).filter(spec => spec),
        metadata: {
          experience: formData.experience,
          education: formData.education,
          languages: formData.languages.split(',').map(lang => lang.trim()).filter(lang => lang),
          specializations: formData.specializations.split(',').map(spec => spec.trim()).filter(spec => spec)
        }
      }

      const url = editingMember ? `/api/team/${editingMember._id}` : '/api/team'
      const method = editingMember ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(memberData),
      })

      if (response.ok) {
        toast.success(editingMember ? "Team member updated successfully!" : "Team member created successfully!")
        setIsDialogOpen(false)
        resetForm()
        fetchTeamMembers()
      } else {
        const error = await response.json()
        toast.error(error.error || "Failed to save team member")
      }
    } catch (error) {
      toast.error("Error saving team member")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member)
    setFormData({
      name: member.name,
      role: member.role,
      email: member.email,
      phone: member.phone,
      image: member.image,
      linkedin: member.linkedin,
      bio: member.bio,
      department: member.department,
      isActive: member.isActive,
      order: member.order,
      experience: member.metadata?.experience || "",
      education: member.metadata?.education || "",
      languages: member.metadata?.languages?.join(', ') || "",
      specializations: member.metadata?.specializations?.join(', ') || ""
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this team member?")) return

    try {
      const response = await fetch(`/api/team/${id}`, {
        method: 'DELETE'
      })
      if (response.ok) {
        toast.success("Team member deleted successfully!")
        fetchTeamMembers()
      } else {
        toast.error("Failed to delete team member")
      }
    } catch (error) {
      toast.error("Error deleting team member")
    }
  }

  const getDepartmentColor = (department: string) => {
    switch (department) {
      case 'management': return 'bg-purple-100 text-purple-800'
      case 'admissions': return 'bg-blue-100 text-blue-800'
      case 'consulting': return 'bg-green-100 text-green-800'
      case 'support': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">Team Members</h2>
          <p className="text-muted-foreground text-sm sm:text-base">Manage your team members and their information</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          // Only close dialog if user explicitly closes it, not on tab switch
          if (!open && isDialogOpen) {
            setIsDialogOpen(false)
            resetForm()
          } else if (open) {
            setIsDialogOpen(true)
          }
        }}>
          <DialogTrigger asChild>
            <Button onClick={() => {
              resetForm()
              setIsDialogOpen(true)
            }} className="w-full sm:w-auto text-sm sm:text-base">
              <Plus className="h-4 w-4 mr-2" />
              Add Team Member
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
            <DialogHeader>
              <DialogTitle className="text-lg sm:text-xl">{editingMember ? 'Edit Team Member' : 'Add New Team Member'}</DialogTitle>
              <DialogDescription className="text-sm sm:text-base">
                {editingMember ? 'Update team member information' : 'Add a new team member to your organization'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm sm:text-base">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    className="text-sm sm:text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role" className="text-sm sm:text-base">Role/Position</Label>
                  <Input
                    id="role"
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    required
                    className="text-sm sm:text-base"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select value={formData.department} onValueChange={(value) => setFormData({...formData, department: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="management">Management</SelectItem>
                      <SelectItem value="admissions">Admissions</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                      <SelectItem value="support">Support</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="order">Display Order</Label>
                  <Input
                    id="order"
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({...formData, order: parseInt(e.target.value) || 0})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Profile Image URL</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn Profile</Label>
                <Input
                  id="linkedin"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                  placeholder="linkedin.com/in/username"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="education">Education</Label>
                  <Input
                    id="education"
                    value={formData.education}
                    onChange={(e) => setFormData({...formData, education: e.target.value})}
                    placeholder="University, Degree, Year"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="experience">Experience</Label>
                  <Input
                    id="experience"
                    value={formData.experience}
                    onChange={(e) => setFormData({...formData, experience: e.target.value})}
                    placeholder="Years of experience"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="languages">Languages (comma-separated)</Label>
                  <Input
                    id="languages"
                    value={formData.languages}
                    onChange={(e) => setFormData({...formData, languages: e.target.value})}
                    placeholder="English, Mongolian, Chinese"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specializations">Specializations (comma-separated)</Label>
                  <Input
                    id="specializations"
                    value={formData.specializations}
                    onChange={(e) => setFormData({...formData, specializations: e.target.value})}
                    placeholder="Admissions, Consulting, Marketing"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                  className="rounded"
                />
                <Label htmlFor="isActive">Active Team Member</Label>
              </div>
            </form>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {editingMember ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  editingMember ? 'Update' : 'Create'
                )} Team Member
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No team members yet</h3>
            <p className="text-gray-600 mb-4">Get started by adding your first team member.</p>
            <Button onClick={() => setIsDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Team Member
            </Button>
          </div>
        ) : (
          teamMembers.map((member) => (
            <Card key={member._id} className="relative">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={member.image} alt={member.name} />
                      <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{member.name}</CardTitle>
                      <CardDescription>{member.role}</CardDescription>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(member)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(member._id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Badge className={getDepartmentColor(member.department)}>
                    <Building className="h-3 w-3 mr-1" />
                    {member.department}
                  </Badge>
                  {!member.isActive && (
                    <Badge variant="secondary">Inactive</Badge>
                  )}
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-700">{member.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span className="text-gray-700">{member.phone}</span>
                  </div>
                  {member.linkedin && (
                    <div className="flex items-center space-x-2">
                      <Linkedin className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-700">{member.linkedin}</span>
                    </div>
                  )}
                </div>

                {member.bio && (
                  <p className="text-sm text-gray-600 line-clamp-3">{member.bio}</p>
                )}

                {member.metadata && (
                  <div className="space-y-2">
                    {member.metadata.education && (
                      <div className="flex items-center space-x-2 text-sm">
                        <GraduationCap className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-700">{member.metadata.education}</span>
                      </div>
                    )}
                    {member.metadata.languages && member.metadata.languages.length > 0 && (
                      <div className="flex items-center space-x-2 text-sm">
                        <Languages className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-700">{member.metadata.languages.join(', ')}</span>
                      </div>
                    )}
                    {member.metadata.specializations && member.metadata.specializations.length > 0 && (
                      <div className="flex items-center space-x-2 text-sm">
                        <Award className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-700">{member.metadata.specializations.join(', ')}</span>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
} 