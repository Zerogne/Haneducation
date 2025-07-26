import mongoose, { Schema } from "mongoose"

// Define the Team Member schema
const teamSchema = new Schema({
  name: {
    mn: { type: String, required: true },
    en: { type: String, required: true },
    zh: { type: String, required: true },
  },
  role: {
    mn: { type: String, required: true },
    en: { type: String, required: true },
    zh: { type: String, required: true },
  },
  description: {
    mn: { type: String, required: true },
    en: { type: String, required: true },
    zh: { type: String, required: true },
  },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  image: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

// Create the model if it doesn't exist already
const Team = mongoose.models.Team || mongoose.model("Team", teamSchema)

export default Team
