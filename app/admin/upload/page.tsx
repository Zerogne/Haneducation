"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Upload, 
  Image, 
  X, 
  CheckCircle, 
  AlertCircle,
  FileImage,
  Trash2
} from "lucide-react"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { toast } from "sonner"
import { useDropzone } from "react-dropzone"

interface UploadedImage {
  url: string
  publicId: string
  width: number
  height: number
  format: string
  size: number
  title: string
  section: string
}

export default function UploadPage() {
  const { data: session, status } = useSession()
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [selectedSection, setSelectedSection] = useState("general")
  const [imageTitle, setImageTitle] = useState("")

  if (status === "loading") {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  if (!session) {
    redirect("/admin/login")
  }

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return

    setUploading(true)
    setUploadProgress(0)

    const uploadPromises = acceptedFiles.map(async (file, index) => {
      try {
        const formData = new FormData()
        formData.append("file", file)
        formData.append("section", selectedSection)
        formData.append("title", imageTitle || file.name)

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })

        if (!response.ok) {
          throw new Error(`Upload failed for ${file.name}`)
        }

        const result = await response.json()
        
        // Update progress
        setUploadProgress(((index + 1) / acceptedFiles.length) * 100)
        
        return result.image
      } catch (error) {
        console.error(`Error uploading ${file.name}:`, error)
        toast.error(`Failed to upload ${file.name}`)
        return null
      }
    })

    const results = await Promise.all(uploadPromises)
    const successfulUploads = results.filter(result => result !== null)

    if (successfulUploads.length > 0) {
      setUploadedImages(prev => [...prev, ...successfulUploads])
      toast.success(`Successfully uploaded ${successfulUploads.length} image(s)`)
    }

    setUploading(false)
    setUploadProgress(0)
    setImageTitle("")
  }, [selectedSection, imageTitle])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    multiple: true
  })

  const removeImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const sectionOptions = [
    { value: "hero", label: "Hero Section" },
    { value: "about", label: "About Section" },
    { value: "services", label: "Services Section" },
    { value: "testimonials", label: "Testimonials Section" },
    { value: "team", label: "Team Section" },
    { value: "partners", label: "Partners Section" },
    { value: "contact", label: "Contact Section" },
    { value: "gallery", label: "Gallery" },
    { value: "general", label: "General" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Image Upload</h1>
          <p className="text-gray-600 mt-2">
            Upload images to Cloudinary and manage your website media
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Upload className="h-5 w-5 mr-2" />
                Upload Images
              </CardTitle>
              <CardDescription>
                Drag and drop images here or click to select files
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Upload Settings */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="section">Section</Label>
                  <Select value={selectedSection} onValueChange={setSelectedSection}>
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
                  <Label htmlFor="title">Image Title (Optional)</Label>
                  <Input
                    id="title"
                    value={imageTitle}
                    onChange={(e) => setImageTitle(e.target.value)}
                    placeholder="Enter image title"
                  />
                </div>
              </div>

              {/* Dropzone */}
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  isDragActive
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <input {...getInputProps()} />
                <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                {isDragActive ? (
                  <p className="text-blue-600">Drop the images here...</p>
                ) : (
                  <div>
                    <p className="text-gray-600 mb-2">
                      Drag & drop images here, or click to select files
                    </p>
                    <p className="text-sm text-gray-500">
                      Supports: JPG, PNG, GIF, WebP (Max 10MB each)
                    </p>
                  </div>
                )}
              </div>

              {/* Upload Progress */}
              {uploading && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Uploading...</span>
                    <span>{Math.round(uploadProgress)}%</span>
                  </div>
                  <Progress value={uploadProgress} className="w-full" />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Uploaded Images */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Image className="h-5 w-5 mr-2" />
                Uploaded Images
              </CardTitle>
              <CardDescription>
                Recently uploaded images ({uploadedImages.length})
              </CardDescription>
            </CardHeader>
            <CardContent>
              {uploadedImages.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <FileImage className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No images uploaded yet</p>
                  <p className="text-sm">Upload some images to see them here</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {uploadedImages.map((image, index) => (
                    <div key={index} className="flex items-center space-x-4 p-3 border rounded-lg">
                      <div className="flex-shrink-0">
                        <img
                          src={image.url}
                          alt={image.title}
                          className="w-16 h-16 object-cover rounded"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {image.title}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {image.section}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {image.format.toUpperCase()}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {image.width}×{image.height}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatFileSize(image.size)}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => removeImage(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Instructions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Upload Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Supported Formats</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• JPEG (.jpg, .jpeg)</li>
                  <li>• PNG (.png)</li>
                  <li>• GIF (.gif)</li>
                  <li>• WebP (.webp)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">File Requirements</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Maximum file size: 10MB</li>
                  <li>• Images are automatically optimized</li>
                  <li>• Multiple files can be uploaded at once</li>
                  <li>• Images are stored securely on Cloudinary</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 