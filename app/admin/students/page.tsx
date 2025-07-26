"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"

interface Student {
  _id: string
  firstName: string
  lastName: string
  age: number
  currentSchool: string
  currentGrade: string
  highSchoolGPA: number
  languageLevel: string
  studyPlan: string
  phone: string
  status: string
  createdAt: string
}

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchStudents()
  }, [])

  const fetchStudents = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await fetch("/api/students", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setStudents(data.students || [])
    } catch (error) {
      console.error("Error fetching students:", error)
      setError("Failed to load students. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const updateStudentStatus = async (studentId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/students/${studentId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      setStudents(prev =>
        prev.map(student =>
          student._id === studentId ? { ...student, status: newStatus } : student
        )
      )
    } catch (error) {
      console.error("Error updating student status:", error)
      alert("Failed to update student status. Please try again.")
    }
  }

  const getStatusBadge = (status: string) => {
    const statusColors = {
      pending: "bg-yellow-100 text-yellow-800",
      contacted: "bg-blue-100 text-blue-800",
      enrolled: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
    }

    return (
      <Badge className={statusColors[status as keyof typeof statusColors] || "bg-gray-100 text-gray-800"}>
        {status}
      </Badge>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex items-center space-x-2">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span>Loading students...</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background p-6">
        <div className="max-w-7xl mx-auto">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-red-600 mb-4">{error}</p>
                <Button onClick={fetchStudents} variant="outline">
                  Try Again
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Students Management</h1>
          <p className="text-muted-foreground">Manage student registrations</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Registered Students</CardTitle>
            <CardDescription>
              Manage all student registrations and their status
            </CardDescription>
          </CardHeader>
          <CardContent>
            {students.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No students registered yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Age</TableHead>
                      <TableHead>School</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>GPA</TableHead>
                      <TableHead>Language Level</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Registration Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {students.map((student) => (
                      <TableRow key={student._id}>
                        <TableCell>
                          {student.firstName} {student.lastName}
                        </TableCell>
                        <TableCell>{student.age}</TableCell>
                        <TableCell>{student.currentSchool}</TableCell>
                        <TableCell>{student.currentGrade}</TableCell>
                        <TableCell>{student.highSchoolGPA}</TableCell>
                        <TableCell>{student.languageLevel}</TableCell>
                        <TableCell>{student.phone}</TableCell>
                        <TableCell>{getStatusBadge(student.status)}</TableCell>
                        <TableCell>{formatDate(student.createdAt)}</TableCell>
                        <TableCell>
                          <Select
                            value={student.status}
                            onValueChange={(value) => updateStudentStatus(student._id, value)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="contacted">Contacted</SelectItem>
                              <SelectItem value="enrolled">Enrolled</SelectItem>
                              <SelectItem value="rejected">Rejected</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 