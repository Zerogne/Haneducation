"use client"

import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Student {
  _id: string
  fullName?: string
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  age?: number
  currentSchool?: string
  currentGrade?: string
  highSchoolGPA?: number
  languageLevel?: string
  studyPlan?: string
  status?: string
  createdAt?: string
}

export default function StudentsPage() {
  const { data: session, status } = useSession()
  const { toast } = useToast()
  const [students, setStudents] = useState<Student[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "loading") return
    if (!session) {
      window.location.href = "/admin/login"
      return
    }
    fetchStudents()
  }, [status, session])

  const fetchStudents = async () => {
    try {
      const response = await fetch("/api/students")
      const data = await response.json()
      if (data.success) {
        setStudents(data.students || [])
      } else {
        console.error("Failed to fetch students:", data.error)
        setStudents([])
      }
    } catch (error) {
      console.error("Error fetching students:", error)
      setStudents([])
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

      const data = await response.json()
      if (data.success) {
        toast({
          title: "Success",
          description: "Student status updated successfully",
        })
        fetchStudents() // Refresh the list
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to update student status",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error updating student status:", error)
      toast({
        title: "Error",
        description: "Failed to update student status",
        variant: "destructive",
      })
    }
  }

  const getStudentName = (student: Student) => {
    if (student.fullName) return student.fullName
    if (student.firstName && student.lastName) return `${student.firstName} ${student.lastName}`
    if (student.firstName) return student.firstName
    if (student.lastName) return student.lastName
    return "N/A"
  }

  const getStatusColors = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "contacted":
        return "bg-blue-100 text-blue-800"
      case "enrolled":
        return "bg-purple-100 text-purple-800"
      case "approved":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 sm:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Student Registrations</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">All Students ({students.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          {students.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No students found
            </div>
          ) : (
            <>
              {/* Mobile Card View */}
              <div className="block lg:hidden space-y-4">
                {students.map((student) => (
                  <Card key={student._id} className="p-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">{getStudentName(student)}</h3>
                          <p className="text-sm text-gray-600">{student.email || "N/A"}</p>
                        </div>
                        <Select
                          value={student.status || "pending"}
                          onValueChange={(value) => updateStudentStatus(student._id, value)}
                        >
                          <SelectTrigger className="w-24 h-8 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="approved">Approved</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="font-medium">Phone:</span> {student.phone || "N/A"}
                        </div>
                        <div>
                          <span className="font-medium">Age:</span> {student.age || "N/A"}
                        </div>
                        <div>
                          <span className="font-medium">School:</span> {student.currentSchool || "N/A"}
                        </div>
                        <div>
                          <span className="font-medium">Grade:</span> {student.currentGrade || "N/A"}
                        </div>
                        <div>
                          <span className="font-medium">GPA:</span> {student.highSchoolGPA || "N/A"}
                        </div>
                        <div>
                          <span className="font-medium">Language:</span> {student.languageLevel || "N/A"}
                        </div>
                      </div>
                      
                      <div className="text-sm">
                        <span className="font-medium">Study Plan:</span> {student.studyPlan || "N/A"}
                      </div>
                      
                      <div className="text-xs text-gray-500">
                        Registered: {student.createdAt
                          ? new Date(student.createdAt).toLocaleDateString()
                          : "N/A"}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Desktop Table View */}
              <div className="hidden lg:block">
                <div className="rounded-lg border">
                  <div className="overflow-x-auto">
                    <Table className="min-w-full">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="text-sm px-4 py-3 whitespace-nowrap bg-gray-50 sticky left-0 z-10">Name</TableHead>
                          <TableHead className="text-sm px-4 py-3 whitespace-nowrap bg-gray-50">Email</TableHead>
                          <TableHead className="text-sm px-4 py-3 whitespace-nowrap bg-gray-50">Phone</TableHead>
                          <TableHead className="text-sm px-4 py-3 whitespace-nowrap bg-gray-50">Age</TableHead>
                          <TableHead className="text-sm px-4 py-3 whitespace-nowrap bg-gray-50">School</TableHead>
                          <TableHead className="text-sm px-4 py-3 whitespace-nowrap bg-gray-50">Grade</TableHead>
                          <TableHead className="text-sm px-4 py-3 whitespace-nowrap bg-gray-50">GPA</TableHead>
                          <TableHead className="text-sm px-4 py-3 whitespace-nowrap bg-gray-50">Language</TableHead>
                          <TableHead className="text-sm px-4 py-3 whitespace-nowrap bg-gray-50">Plan</TableHead>
                          <TableHead className="text-sm px-4 py-3 whitespace-nowrap bg-gray-50">Status</TableHead>
                          <TableHead className="text-sm px-4 py-3 whitespace-nowrap bg-gray-50">Registered</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {students.map((student) => (
                          <TableRow key={student._id} className="hover:bg-gray-50">
                            <TableCell className="font-medium text-sm px-4 py-3 whitespace-nowrap sticky left-0 z-10 bg-white">
                              {getStudentName(student)}
                            </TableCell>
                            <TableCell className="text-sm px-4 py-3 whitespace-nowrap">
                              {student.email || "N/A"}
                            </TableCell>
                            <TableCell className="text-sm px-4 py-3 whitespace-nowrap">
                              {student.phone || "N/A"}
                            </TableCell>
                            <TableCell className="text-sm px-4 py-3 whitespace-nowrap">
                              {student.age || "N/A"}
                            </TableCell>
                            <TableCell className="text-sm px-4 py-3 whitespace-nowrap">
                              {student.currentSchool || "N/A"}
                            </TableCell>
                            <TableCell className="text-sm px-4 py-3 whitespace-nowrap">
                              {student.currentGrade || "N/A"}
                            </TableCell>
                            <TableCell className="text-sm px-4 py-3 whitespace-nowrap">
                              {student.highSchoolGPA || "N/A"}
                            </TableCell>
                            <TableCell className="text-sm px-4 py-3 whitespace-nowrap">
                              {student.languageLevel || "N/A"}
                            </TableCell>
                            <TableCell className="text-sm px-4 py-3 whitespace-nowrap">
                              {student.studyPlan || "N/A"}
                            </TableCell>
                            <TableCell className="text-sm px-4 py-3 whitespace-nowrap">
                              <Select
                                value={student.status || "pending"}
                                onValueChange={(value) => updateStudentStatus(student._id, value)}
                              >
                                <SelectTrigger className="w-24 h-9 text-sm">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pending">Pending</SelectItem>
                                  <SelectItem value="approved">Approved</SelectItem>
                                  <SelectItem value="rejected">Rejected</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                            <TableCell className="text-sm px-4 py-3 whitespace-nowrap">
                              {student.createdAt
                                ? new Date(student.createdAt).toLocaleDateString()
                                : "N/A"}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 