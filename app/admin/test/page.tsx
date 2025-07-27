"use client"

import { useSession } from "next-auth/react"

export default function TestPage() {
  const { data: session, status } = useSession()

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-4">Session Test Page</h1>
        
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded">
            <h2 className="font-semibold mb-2">Session Status:</h2>
            <p className="text-lg">{status}</p>
          </div>
          
          <div className="p-4 bg-gray-50 rounded">
            <h2 className="font-semibold mb-2">Session Data:</h2>
            <pre className="text-sm bg-gray-100 p-2 rounded overflow-auto">
              {JSON.stringify(session, null, 2)}
            </pre>
          </div>
          
          <div className="p-4 bg-gray-50 rounded">
            <h2 className="font-semibold mb-2">User Info:</h2>
            {session?.user ? (
              <div>
                <p><strong>Name:</strong> {session.user.name}</p>
                <p><strong>Email:</strong> {session.user.email}</p>
              </div>
            ) : (
              <p className="text-gray-500">No user data</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 