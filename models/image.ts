import mongoose, { Schema } from "mongoose"

// Define the Image schema
const imageSchema = new Schema({
  publicId: { type: String, required: true },
  url: { type: String, required: true },
  secureUrl: { type: String, required: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  format: { type: String, required: true },
  resourceType: { type: String, required: true },
  alt: { type: String, default: "" },
  caption: { type: String, default: "" },
  section: { type: String, default: "general" },
  createdAt: { type: Date, default: Date.now },
})

// Create the model if it doesn't exist already
const Image = mongoose.models.Image || mongoose.model("Image", imageSchema)

export default Image
