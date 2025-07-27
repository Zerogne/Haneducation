import mongoose, { Schema } from "mongoose"

const teamSchema = new Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  image: { type: String, default: "" },
  linkedin: { type: String, default: "" },
  bio: { type: String, default: "" },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
  department: { 
    type: String, 
    default: "general",
    enum: ["management", "admissions", "consulting", "support", "general"]
  },
  metadata: {
    experience: { type: String, default: "" },
    education: { type: String, default: "" },
    languages: [{ type: String }],
    specializations: [{ type: String }]
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

const Team = mongoose.models.Team || mongoose.model("Team", teamSchema)

export default Team
