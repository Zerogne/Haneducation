"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface ContentState {
  contact: {
    title: string
    description: string
    phone: string
    email: string
    getAdviceText: string
  }
}

interface ContactProps {
  content: ContentState
  updateContent: (section: keyof ContentState, field: string, value: string) => void
  saveContent: (section: string, sectionData: any) => Promise<void>
  saving: boolean
}

export function Contact({ content, updateContent, saveContent, saving }: ContactProps) {
  // Add null checks and default values
  const contact = content?.contact || {}

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">Contact Information</CardTitle>
        <CardDescription className="text-sm sm:text-base">Edit the contact information that appear on the homepage.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="contact-phone" className="text-sm sm:text-base">Phone Number</Label>
            <Input
              id="contact-phone"
              value={contact.phone || ""}
              onChange={(e) => updateContent("contact", "phone", e.target.value)}
              placeholder="+976 7777 7777"
              className="text-sm sm:text-base"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-email" className="text-sm sm:text-base">Email Address</Label>
            <Input
              id="contact-email"
              type="email"
              value={contact.email || ""}
              onChange={(e) => updateContent("contact", "email", e.target.value)}
              placeholder="info@haneducation.mn"
              className="text-sm sm:text-base"
            />
          </div>
        </div>



        <Button 
          onClick={() => saveContent("contact", contact)} 
          disabled={saving}
          className="w-full text-sm sm:text-base"
        >
          {saving ? "Saving..." : "Save Contact Information"}
        </Button>
      </CardContent>
    </Card>
  )
} 