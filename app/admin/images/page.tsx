"use client"

import { useState, useEffect } from "react"

interface Image {
  _id: string
  publicId: string
  url: string
  secureUrl: string
  width: number
  height: number
  format: string
  resourceType: string
  alt: string
  caption: string
  section: string
  createdAt: string
}

export default function ImagesPage() {
  const [images, setImages] = useState<Image[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedSection, setSelectedSection] = useState("all")

  useEffect(() => {
    fetchImages()
  }, [selectedSection])

  const fetchImages = async () => {
    try {
      setLoading(true)
      const url = selectedSection === "all" 
        ? '/api/images' 
        : `/api/images?section=${selectedSection}`
      const response = await fetch(url)
      if (response.ok) {
        const data = await response.json()
        setImages(data.images || [])
      } else {
        setError("Failed to fetch images")
      }
    } catch (error) {
      setError("Error connecting to database")
    } finally {
      setLoading(false)
    }
  }

  const deleteImage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return

    try {
      const response = await fetch(`/api/images/${id}`, {
        method: 'DELETE'
      })
      if (response.ok) {
        setImages(images.filter(image => image._id !== id))
      } else {
        setError("Failed to delete image")
      }
    } catch (error) {
      setError("Error deleting image")
    }
  }

  const sections = ["all", "logo", "hero", "gallery", "team", "testimonials"]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading images...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Images</h1>
          <p className="text-gray-600">Manage website images</p>
        </div>
        <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
          Upload Image
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Section Filter */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex space-x-2">
          {sections.map((section) => (
            <button
              key={section}
              onClick={() => setSelectedSection(section)}
              className={`px-3 py-1 rounded-md text-sm font-medium ${
                selectedSection === section
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          {images.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No images found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((image) => (
                <div key={image._id} className="border rounded-lg overflow-hidden">
                  <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                    <img
                      src={image.secureUrl || image.url}
                      alt={image.alt}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {image.alt || image.caption}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {image.width} x {image.height} • {image.format.toUpperCase()}
                    </p>
                    <p className="text-xs text-gray-500">
                      Section: {image.section}
                    </p>
                    <div className="mt-3 flex justify-between items-center">
                      <span className="text-xs text-gray-500">
                        {new Date(image.createdAt).toLocaleDateString()}
                      </span>
                      <button
                        onClick={() => deleteImage(image._id)}
                        className="text-red-600 hover:text-red-900 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 