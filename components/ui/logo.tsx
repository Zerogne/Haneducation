"use client"

import { useState, useEffect } from "react"
import { CloudinaryImage } from "@/components/ui/cloudinary-image"

interface LogoProps {
  className?: string
  width?: number
  height?: number
}

export function Logo({ className, width = 40, height = 40 }: LogoProps) {
  const [logoUrl, setLogoUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Skip API call for now and use fallback directly
    // This prevents the 500 error until MongoDB is properly configured
    setIsLoading(false)
  }, [])

  // Use the new logo image from public folder
  const fallbackUrl = "/image-removebg-preview.png"

  if (isLoading) {
    return (
      <div 
        className={`bg-muted animate-pulse rounded-lg ${className}`}
        style={{ width, height }}
      />
    )
  }

  return (
    <CloudinaryImage
      src={logoUrl || fallbackUrl}
      alt="HAN Education Logo"
      width={width}
      height={height}
      className={`rounded-lg ${className}`}
      priority
    />
  )
} 