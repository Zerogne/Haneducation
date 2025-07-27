import mongoose, { Schema } from "mongoose"

const contentSchema = new Schema({
  section: { 
    type: String, 
    required: true,
    enum: ["hero", "about", "services", "testimonials", "team", "partners", "contact", "footer"]
  },
  title: { type: String, required: true },
  subtitle: { type: String, default: "" },
  content: { type: String, required: true },
  description: { type: String, default: "" },
  language: { 
    type: String, 
    default: "en",
    enum: ["en", "mn"]
  },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
  metadata: {
    keywords: { type: String, default: "" },
    ogTitle: { type: String, default: "" },
    ogDescription: { type: String, default: "" },
    ogImage: { type: String, default: "" }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

const Content = mongoose.models.Content || mongoose.model("Content", contentSchema)

export default Content
