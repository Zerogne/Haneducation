import mongoose, { Schema } from "mongoose"

const imageSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  section: { 
    type: String, 
    required: true,
    enum: ["hero", "about", "services", "testimonials", "team", "partners", "contact", "gallery"]
  },
  format: { type: String, default: "jpg" },
  width: { type: Number, default: 400 },
  height: { type: Number, default: 300 },
  size: { type: Number, default: 0 }, // in bytes
  alt: { type: String, default: "" },
  description: { type: String, default: "" },
  cloudinaryId: { type: String, default: "" },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

const Image = mongoose.models.Image || mongoose.model("Image", imageSchema)

export default Image
