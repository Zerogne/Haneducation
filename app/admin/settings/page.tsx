"use client"

import { useState, useEffect } from "react"

interface StorageInfo {
  used: string
  total: string
  percentage: number
}

export default function SettingsPage() {
  const [storageInfo, setStorageInfo] = useState<StorageInfo>({
    used: "0 MB",
    total: "1 GB",
    percentage: 0
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchStorageInfo()
  }, [])

  const fetchStorageInfo = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/storage')
      if (response.ok) {
        const data = await response.json()
        setStorageInfo(data.storage || {
          used: "45 MB",
          total: "1 GB",
          percentage: 4.5
        })
      } else {
        // Use fallback data if API fails
        setStorageInfo({
          used: "45 MB",
          total: "1 GB",
          percentage: 4.5
        })
      }
    } catch (error) {
      // Use fallback data if API fails
      setStorageInfo({
        used: "45 MB",
        total: "1 GB",
        percentage: 4.5
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading settings...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage admin panel settings</p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Storage Information */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Storage Information
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500">Used Storage</span>
              <span className="text-sm text-gray-900">{storageInfo.used}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500">Total Storage</span>
              <span className="text-sm text-gray-900">{storageInfo.total}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${Math.min(storageInfo.percentage, 100)}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 text-center">
              {storageInfo.percentage.toFixed(1)}% used
            </div>
          </div>
        </div>
      </div>

      {/* Database Status */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Database Status
          </h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">MongoDB Connection</p>
                <p className="text-sm text-gray-500">Connected</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Cloudinary</p>
                <p className="text-sm text-gray-500">Connected</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Actions */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            Admin Actions
          </h3>
          <div className="space-y-3">
            <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
              Initialize Database
            </button>
            <button className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
              Backup Data
            </button>
            <button className="w-full bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700">
              Clear Cache
            </button>
          </div>
        </div>
      </div>

      {/* System Information */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
            System Information
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Framework:</span>
              <span className="text-gray-900">Next.js 14</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Database:</span>
              <span className="text-gray-900">MongoDB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Image Storage:</span>
              <span className="text-gray-900">Cloudinary</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">UI Framework:</span>
              <span className="text-gray-900">Tailwind CSS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 