import mongoose, { Schema } from "mongoose"

// Define the Student schema
const studentSchema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, required: true },
  currentSchool: { type: String, required: true },
  currentGrade: { type: String, required: true },
  highSchoolGPA: { type: Number, required: true },
  languageLevel: { type: String, required: true },
  studyPlan: { type: String, required: true },
  phone: { type: String, required: true },
  status: { type: String, default: "pending", enum: ["pending", "contacted", "enrolled", "approved", "rejected"] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

// Create the model if it doesn't exist already
const Student = mongoose.models.Student || mongoose.model("Student", studentSchema)

export default Student 