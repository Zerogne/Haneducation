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
  Building, 
  Save,
  ExternalLink,
  MapPin
} from "lucide-react"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { toast } from "sonner"

interface Partner {
  _id: string
  name: string
  logo: string
  website: string
  description: string
  isActive: boolean
  order: number
  type: string
  location: string
  partnershipLevel: string
  createdAt: string
  updatedAt: string
}

export default function PartnersPage() {
  const { data: session, status } = useSession()
  const [partners, setPartners] = useState<Partner[]>([])
  const [loading, setLoading] = useState(true)
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [partnerToDelete, setPartnerToDelete] = useState<Partner | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    website: "",
    description: "",
    isActive: true,
    order: 0,
    type: "university",
    location: "",
    partnershipLevel: "standard"
  })

  if (status === "loading") {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (!session) {
    redirect("/admin/login")
  }

  useEffect(() => {
    fetchPartners()
  }, [])

  const fetchPartners = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/partners")
      const data = await response.json()
      setPartners(data.partners || [])
    } catch (error) {
      console.error("Error fetching partners:", error)
      toast.error("Failed to fetch partners")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const url = editingPartner ? `/api/partners/${editingPartner._id}` : "/api/partners"
      const method = editingPartner ? "PUT" : "POST"
      
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast.success(editingPartner ? "Partner updated successfully" : "Partner created successfully")
        setIsDialogOpen(false)
        resetForm()
        fetchPartners()
      } else {
        const error = await response.json()
        toast.error(error.error || "Failed to save partner")
      }
    } catch (error) {
      console.error("Error saving partner:", error)
      toast.error("Failed to save partner")
    }
  }

  const handleEdit = (partner: Partner) => {
    setEditingPartner(partner)
    setFormData({
      name: partner.name,
      logo: partner.logo,
      website: partner.website,
      description: partner.description,
      isActive: partner.isActive,
      order: partner.order,
      type: partner.type,
      location: partner.location,
      partnershipLevel: partner.partnershipLevel
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async () => {
    if (!partnerToDelete) return

    try {
      const response = await fetch(`/api/partners/${partnerToDelete._id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        toast.success("Partner deleted successfully")
        setIsDeleteDialogOpen(false)
        setPartnerToDelete(null)
        fetchPartners()
      } else {
        const error = await response.json()
        toast.error(error.error || "Failed to delete partner")
      }
    } catch (error) {
      console.error("Error deleting partner:", error)
      toast.error("Failed to delete partner")
    }
  }

  const resetForm = () => {
    setEditingPartner(null)
    setFormData({
      name: "",
      logo: "",
      website: "",
      description: "",
      isActive: true,
      order: 0,
      type: "university",
      location: "",
      partnershipLevel: "standard"
    })
  }

  const getPartnershipLevelColor = (level: string) => {
    switch (level) {
      case "exclusive": return "bg-purple-100 text-purple-800"
      case "premium": return "bg-blue-100 text-blue-800"
      case "standard": return "bg-green-100 text-green-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "university": return "bg-blue-100 text-blue-800"
      case "organization": return "bg-green-100 text-green-800"
      case "government": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading partners...</p>
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
            <h1 className="text-3xl font-bold text-gray-900">Partners Management</h1>
            <p className="text-gray-600 mt-2">Manage partner universities and organizations</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                Add Partner
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingPartner ? "Edit Partner" : "Add New Partner"}
                </DialogTitle>
                <DialogDescription>
                  {editingPartner ? "Update the partner information below." : "Fill in the partner information below."}
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Partner Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      required
                    />
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
                  <Label htmlFor="logo">Logo URL</Label>
                  <Input
                    id="logo"
                    value={formData.logo}
                    onChange={(e) => setFormData(prev => ({ ...prev, logo: e.target.value }))}
                    placeholder="https://example.com/logo.png"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="website">Website URL</Label>
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                    placeholder="https://example.com"
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

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="type">Type</Label>
                    <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="university">University</SelectItem>
                        <SelectItem value="organization">Organization</SelectItem>
                        <SelectItem value="government">Government</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="partnershipLevel">Partnership Level</Label>
                    <Select value={formData.partnershipLevel} onValueChange={(value) => setFormData(prev => ({ ...prev, partnershipLevel: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="premium">Premium</SelectItem>
                        <SelectItem value="exclusive">Exclusive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      placeholder="City, Country"
                    />
                  </div>
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
                    {editingPartner ? "Update" : "Create"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {partners.map((partner) => (
            <Card key={partner._id} className="relative group">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Building className="h-6 w-6 text-gray-600" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{partner.name}</CardTitle>
                      <CardDescription className="text-sm">
                        {partner.location}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={partner.isActive ? "default" : "secondary"}>
                      {partner.isActive ? "Active" : "Inactive"}
                    </Badge>
                    <Badge variant="outline">
                      #{partner.order}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mb-3">
                  <Badge className={getTypeColor(partner.type)}>
                    {partner.type}
                  </Badge>
                  <Badge className={getPartnershipLevelColor(partner.partnershipLevel)}>
                    {partner.partnershipLevel}
                  </Badge>
                </div>
                
                {partner.description && (
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                    {partner.description}
                  </p>
                )}

                {partner.website && (
                  <div className="flex items-center space-x-2 mb-4">
                    <ExternalLink className="h-4 w-4 text-gray-400" />
                    <a 
                      href={partner.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Visit Website
                    </a>
                  </div>
                )}

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Updated: {new Date(partner.updatedAt).toLocaleDateString()}</span>
                  <span>Type: {partner.type}</span>
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(partner)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setPartnerToDelete(partner)
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

        {partners.length === 0 && (
          <Card className="mt-8">
            <CardContent className="text-center py-12">
              <Building className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No partners found</h3>
              <p className="text-gray-500 mb-4">
                No partners have been added yet.
              </p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add First Partner
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Partner</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete "{partnerToDelete?.name}"? This action cannot be undone.
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