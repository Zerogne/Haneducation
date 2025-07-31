import mongoose, { Schema } from "mongoose"

const contentSchema = new Schema({
  section: { 
    type: String, 
    required: true,
    enum: ["hero", "about", "about-listings", "about-blocks", "services", "testimonials", "team", "partners", "contact", "footer", "why-china"]
  },
  title: { type: String, default: "" }, // Make title optional
  subtitle: { type: String, default: "" },
  content: { type: String, required: true }, // This will store JSON stringified data
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
  }
}, {
  timestamps: true // This will automatically add createdAt and updatedAt
})

// Create a simple index for section
contentSchema.index({ section: 1 })

const Content = mongoose.models.Content || mongoose.model("Content", contentSchema)

export default Content
