"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Star } from "lucide-react"
import { toast } from "sonner"

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

interface TestimonialsProps {
  testimonials: Testimonial[]
  fetchTestimonials: () => Promise<void>
}

export function Testimonials({ testimonials, fetchTestimonials }: TestimonialsProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [deletingTestimonial, setDeletingTestimonial] = useState<Testimonial | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    university: "",
    content: "",
    rating: 5,
    image: "",
    isActive: true,
    order: 0,
    language: "mn"
  })

  const resetForm = () => {
    setFormData({
      name: "",
      university: "",
      content: "",
      rating: 5,
      image: "",
      isActive: true,
      order: 0,
      language: "mn"
    })
    setEditingTestimonial(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const url = editingTestimonial ? `/api/testimonials/${editingTestimonial._id}` : "/api/testimonials"
      const method = editingTestimonial ? "PUT" : "POST"
      
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast.success(editingTestimonial ? "Testimonial updated successfully!" : "Testimonial created successfully!")
        setIsDialogOpen(false)
        resetForm()
        fetchTestimonials()
      } else {
        const error = await response.json()
        toast.error(error.error || "Failed to save testimonial")
      }
    } catch (error) {
      toast.error("Error saving testimonial")
    }
  }

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial)
    setFormData({
      name: testimonial.name,
      university: testimonial.university,
      content: testimonial.content,
      rating: testimonial.rating,
      image: testimonial.image,
      isActive: testimonial.isActive,
      order: testimonial.order,
      language: testimonial.language
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return

    try {
      const response = await fetch(`/api/testimonials/${id}`, {
        method: 'DELETE'
      })
      if (response.ok) {
        toast.success("Testimonial deleted successfully!")
        fetchTestimonials()
      } else {
        toast.error("Failed to delete testimonial")
      }
    } catch (error) {
      toast.error("Error deleting testimonial")
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ))
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">Testimonials</h2>
          <p className="text-muted-foreground text-sm sm:text-base">Manage customer testimonials and reviews</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()} className="w-full sm:w-auto text-sm sm:text-base">
              <Plus className="h-4 w-4 mr-2" />
              Add Testimonial
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-4 sm:p-6">
            <DialogHeader>
              <DialogTitle className="text-lg sm:text-xl">{editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}</DialogTitle>
              <DialogDescription className="text-sm sm:text-base">
                {editingTestimonial ? 'Update testimonial information' : 'Add a new customer testimonial'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="testimonial-name" className="text-sm sm:text-base">Customer Name</Label>
                  <Input
                    id="testimonial-name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Customer name"
                    required
                    className="text-sm sm:text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="testimonial-university" className="text-sm sm:text-base">University</Label>
                  <Input
                    id="testimonial-university"
                    value={formData.university}
                    onChange={(e) => setFormData({...formData, university: e.target.value})}
                    placeholder="University name"
                    required
                    className="text-sm sm:text-base"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="testimonial-content">Testimonial Content</Label>
                <Textarea
                  id="testimonial-content"
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  placeholder="Customer's testimonial text"
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="testimonial-rating">Rating</Label>
                  <Select 
                    value={formData.rating.toString()} 
                    onValueChange={(value) => setFormData({...formData, rating: parseInt(value)})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Star</SelectItem>
                      <SelectItem value="2">2 Stars</SelectItem>
                      <SelectItem value="3">3 Stars</SelectItem>
                      <SelectItem value="4">4 Stars</SelectItem>
                      <SelectItem value="5">5 Stars</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="testimonial-order">Display Order</Label>
                  <Input
                    id="testimonial-order"
                    type="number"
                    value={formData.order}
                    onChange={(e) => {
                      const value = e.target.value;
                      const parsedValue = value === "" ? 0 : parseInt(value) || 0;
                      setFormData({...formData, order: parsedValue})
                    }}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="testimonial-status">Status</Label>
                  <Select 
                    value={formData.isActive ? "true" : "false"} 
                    onValueChange={(value) => setFormData({...formData, isActive: value === "true"})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Active</SelectItem>
                      <SelectItem value="false">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="testimonial-image">Profile Image URL</Label>
                <Input
                  id="testimonial-image"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmit}>
                  {editingTestimonial ? "Update Testimonial" : "Add Testimonial"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <div className="text-muted-foreground">
              <p className="text-lg mb-2">No testimonials yet</p>
              <p className="text-sm">Get started by adding your first testimonial</p>
            </div>
          </div>
        ) : (
          testimonials.map((testimonial) => (
            <Card key={testimonial._id} className="group hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center pb-4">
                <div className="relative mx-auto mb-4">
                  <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full border-4 border-primary/20">
                    <img
                      src={testimonial.image || "/placeholder-user.jpg"}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Badge className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 ${
                    testimonial.isActive ? 'bg-green-500' : 'bg-gray-500'
                  } text-white`}>
                    {testimonial.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                <CardDescription className="text-sm">{testimonial.university}</CardDescription>
                <div className="flex justify-center mt-2">
                  {renderStars(testimonial.rating)}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-muted-foreground line-clamp-3">
                  "{testimonial.content}"
                </div>
                
                <div className="flex justify-center space-x-2 pt-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(testimonial)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(testimonial._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
} 