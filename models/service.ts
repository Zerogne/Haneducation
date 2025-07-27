import mongoose, { Schema } from "mongoose"

const serviceSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true }, // Lucide icon name
  features: [{ type: String }],
  color: { type: String, default: "blue" },
  hoverColor: { type: String, default: "blue" },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
  language: { 
    type: String, 
    default: "en",
    enum: ["en", "mn"]
  },
  metadata: {
    keywords: { type: String, default: "" },
    seoDescription: { type: String, default: "" }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

const Service = mongoose.models.Service || mongoose.model("Service", serviceSchema)

export default Service 