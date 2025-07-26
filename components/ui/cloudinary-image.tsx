"use client"

import Image from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface CloudinaryImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  quality?: number
  transformation?: string
}

export function CloudinaryImage({
  src,
  alt,
  width = 400,
  height = 300,
  className,
  priority = false,
  quality = 75,
  transformation = "f_auto,q_auto"
}: CloudinaryImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  // Parse Cloudinary URL and add transformations
  const getOptimizedUrl = (url: string) => {
    if (!url.includes('cloudinary.com')) return url
    
    // If URL already has transformations, add to them
    if (url.includes('/upload/')) {
      const parts = url.split('/upload/')
      if (parts.length === 2) {
        const existingTransformations = parts[1].split('/')[0]
        const newTransformations = `${transformation},w_${width},h_${height},c_fill`
        return `${parts[0]}/upload/${newTransformations}/${parts[1].split('/').slice(1).join('/')}`
      }
    }
    
    return url
  }

  const optimizedSrc = getOptimizedUrl(src)

  if (error) {
    return (
      <div 
        className={cn(
          "bg-muted flex items-center justify-center text-muted-foreground",
          className
        )}
        style={{ width, height }}
      >
        <div className="text-center">
          <div className="text-2xl mb-2">🖼️</div>
          <div className="text-sm">Image not available</div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={optimizedSrc}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          "transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100"
        )}
        priority={priority}
        quality={quality}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setError(true)
          setIsLoading(false)
        }}
      />
      {isLoading && (
        <div 
          className="absolute inset-0 bg-muted animate-pulse"
          style={{ width, height }}
        />
      )}
    </div>
  )
} 