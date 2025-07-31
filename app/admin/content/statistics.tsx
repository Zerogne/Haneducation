"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

interface ContentState {
  hero: {
    title: string
    subtitle: string
    description: string
    applyNowText: string
    learnMoreText: string
    stats: {
      students: string
      universities: string
      experience: string
    }
    statsLabels: {
      students: string
      universities: string
      experience: string
    }
  }
}

interface StatisticsProps {
  content: {
    hero: {
      title: string
      subtitle: string
      description: string
      applyNowText: string
      learnMoreText: string
      stats: {
        students: string
        universities: string
        experience: string
      }
      statsLabels: {
        students: string
        universities: string
        experience: string
      }
    }
  }
  updateStats: (section: string, stat: string, value: string) => void
  updateStatsLabels: (section: string, stat: string, value: string) => void
  saveContent: (section: string, sectionData: any) => Promise<void>
  saving: boolean
}

export function Statistics({ content, updateStats, updateStatsLabels, saveContent, saving }: StatisticsProps) {
  // Add null checks and default values
  const hero = content?.hero || {}
  const stats = hero.stats || { students: "", universities: "", experience: "" }
  const statsLabels = hero.statsLabels || { students: "", universities: "", experience: "" }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg sm:text-xl">Statistics</CardTitle>
        <CardDescription className="text-sm sm:text-base">Edit the statistics that appear on the homepage. Main content is hardcoded.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="hero-students" className="text-sm sm:text-base">Students Count</Label>
              <Input
                id="hero-students"
                value={stats.students || ""}
                onChange={(e) => updateStats("hero", "students", e.target.value)}
                placeholder="60+"
                className="text-sm sm:text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hero-universities" className="text-sm sm:text-base">Universities Count</Label>
              <Input
                id="hero-universities"
                value={stats.universities || ""}
                onChange={(e) => updateStats("hero", "universities", e.target.value)}
                placeholder="880+"
                className="text-sm sm:text-base"
              />
            </div>
            <div className="space-y-2 sm:col-span-2 lg:col-span-1">
              <Label htmlFor="hero-experience" className="text-sm sm:text-base">Experience Years</Label>
              <Input
                id="hero-experience"
                value={stats.experience || ""}
                onChange={(e) => updateStats("hero", "experience", e.target.value)}
                placeholder="4+"
                className="text-sm sm:text-base"
              />
            </div>
          </div>
        </div>

        <div>
         
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="hero-students-label" className="text-sm sm:text-base">Students Label</Label>
              <Input
                id="hero-students-label"
                value={statsLabels.students || ""}
                onChange={(e) => updateStatsLabels("hero", "students", e.target.value)}
                placeholder="Амжилттай оюутан"
                className="text-sm sm:text-base"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hero-universities-label" className="text-sm sm:text-base">Universities Label</Label>
              <Input
                id="hero-universities-label"
                value={statsLabels.universities || ""}
                onChange={(e) => updateStatsLabels("hero", "universities", e.target.value)}
                placeholder="Хамтрагч их сургууль"
                className="text-sm sm:text-base"
              />
            </div>
            <div className="space-y-2 sm:col-span-2 lg:col-span-1">
              <Label htmlFor="hero-experience-label" className="text-sm sm:text-base">Experience Label</Label>
              <Input
                id="hero-experience-label"
                value={statsLabels.experience || ""}
                onChange={(e) => updateStatsLabels("hero", "experience", e.target.value)}
                placeholder="Жилийн туршлага"
                className="text-sm sm:text-base"
              />
            </div>
          </div>
        </div>

        <Button 
          onClick={() => saveContent("hero", hero)} 
          disabled={saving}
          className="w-full text-sm sm:text-base"
        >
          {saving ? "Saving..." : "Save Statistics"}
        </Button>
      </CardContent>
    </Card>
  )
} 