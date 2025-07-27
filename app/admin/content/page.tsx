"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { 
  Plus, 
  Edit, 
  Trash2, 
  FileText, 
  Save,
  X,
  Globe,
  Languages
} from "lucide-react"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { toast } from "sonner"

interface Content {
  _id: string
  section: string
  title: string
  subtitle: string
  content: string
  description: string
  language: string
  isActive: boolean
  order: number
  createdAt: string
  updatedAt: string
}

export default function ContentPage() {
  const { data: session, status } = useSession()
  const [contents, setContents] = useState<Content[]>([])
  const [loading, setLoading] = useState(true)
  const [editingContent, setEditingContent] = useState<Content | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [contentToDelete, setContentToDelete] = useState<Content | null>(null)
  const [selectedLanguage, setSelectedLanguage] = useState("en")

  const [formData, setFormData] = useState({
    section: "hero",
    title: "",
    subtitle: "",
    content: "",
    description: "",
    language: "en",
    isActive: true,
    order: 0
  })

  if (status === "loading") {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (!session) {
    redirect("/admin/login")
  }

  useEffect(() => {
    fetchContents()
  }, [selectedLanguage])

  const fetchContents = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/content?language=${selectedLanguage}`)
      const data = await response.json()
      setContents(data.contents || [])
    } catch (error) {
      console.error("Error fetching content:", error)
      toast.error("Failed to fetch content")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const url = editingContent ? `/api/content/${editingContent._id}` : "/api/content"
      const method = editingContent ? "PUT" : "POST"
      
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast.success(editingContent ? "Content updated successfully" : "Content created successfully")
        setIsDialogOpen(false)
        resetForm()
        fetchContents()
      } else {
        const error = await response.json()
        toast.error(error.error || "Failed to save content")
      }
    } catch (error) {
      console.error("Error saving content:", error)
      toast.error("Failed to save content")
    }
  }

  const handleEdit = (content: Content) => {
    setEditingContent(content)
    setFormData({
      section: content.section,
      title: content.title,
      subtitle: content.subtitle,
      content: content.content,
      description: content.description,
      language: content.language,
      isActive: content.isActive,
      order: content.order
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async () => {
    if (!contentToDelete) return

    try {
      const response = await fetch(`/api/content/${contentToDelete._id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast.success("Content deleted successfully")
        setIsDeleteDialogOpen(false)
        setContentToDelete(null)
        fetchContents()
      } else {
        const error = await response.json()
        toast.error(error.error || "Failed to delete content")
      }
    } catch (error) {
      console.error("Error deleting content:", error)
      toast.error("Failed to delete content")
    }
  }

  const resetForm = () => {
    setEditingContent(null)
    setFormData({
      section: "hero",
      title: "",
      subtitle: "",
      content: "",
      description: "",
      language: "en",
      isActive: true,
      order: 0
    })
  }

  const sectionOptions = [
    { value: "hero", label: "Hero Section" },
    { value: "about", label: "About Section" },
    { value: "services", label: "Services Section" },
    { value: "testimonials", label: "Testimonials Section" },
    { value: "team", label: "Team Section" },
    { value: "partners", label: "Partners Section" },
    { value: "contact", label: "Contact Section" },
    { value: "footer", label: "Footer" },
  ]

  const getSectionIcon = (section: string) => {
    switch (section) {
      case "hero": return "🏠"
      case "about": return "ℹ️"
      case "services": return "🎓"
      case "testimonials": return "💬"
      case "team": return "👥"
      case "partners": return "🤝"
      case "contact": return "📞"
      case "footer": return "📄"
      default: return "📝"
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading content...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
            <p className="text-gray-600 mt-2">Manage all website text content and sections</p>
          </div>
          <div className="flex items-center space-x-4">
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="mn">Mongolian</SelectItem>
              </SelectContent>
            </Select>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetForm}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Content
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingContent ? "Edit Content" : "Add New Content"}
                  </DialogTitle>
                  <DialogDescription>
                    {editingContent ? "Update the content information below." : "Fill in the content information below."}
                  </DialogDescription>
                </DialogHeader>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="section">Section</Label>
                      <Select value={formData.section} onValueChange={(value) => setFormData(prev => ({ ...prev, section: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {sectionOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="order">Order</Label>
                      <Input
                        id="order"
                        type="number"
                        value={formData.order}
                        onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) }))}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="subtitle">Subtitle</Label>
                    <Input
                      id="subtitle"
                      value={formData.subtitle}
                      onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      value={formData.content}
                      onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                      rows={4}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      rows={3}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="isActive"
                      checked={formData.isActive}
                      onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                    />
                    <Label htmlFor="isActive">Active</Label>
                  </div>

                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      <Save className="h-4 w-4 mr-2" />
                      {editingContent ? "Update" : "Create"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contents.map((content) => (
            <Card key={content._id} className="relative group">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{getSectionIcon(content.section)}</span>
                    <div>
                      <CardTitle className="text-lg">{content.title}</CardTitle>
                      <CardDescription className="text-sm">
                        {content.section} • {content.language.toUpperCase()}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={content.isActive ? "default" : "secondary"}>
                      {content.isActive ? "Active" : "Inactive"}
                    </Badge>
                    <Badge variant="outline">
                      #{content.order}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {content.subtitle && (
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    {content.subtitle}
                  </p>
                )}
                
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {content.content}
                </p>

                {content.description && (
                  <p className="text-xs text-gray-500 mb-4 line-clamp-2">
                    {content.description}
                  </p>
                )}

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Updated: {new Date(content.updatedAt).toLocaleDateString()}</span>
                  <span>Language: {content.language.toUpperCase()}</span>
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(content)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setContentToDelete(content)
                        setIsDeleteDialogOpen(true)
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {contents.length === 0 && (
          <Card className="mt-8">
            <CardContent className="text-center py-12">
              <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No content found</h3>
              <p className="text-gray-500 mb-4">
                No content found for {selectedLanguage.toUpperCase()} language.
              </p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add First Content
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Content</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete "{contentToDelete?.title}"? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
} 