import mongoose, { Schema } from "mongoose"

// Define the Content schema
const contentSchema = new Schema({
  key: { type: String, required: true, unique: true },
  translations: {
    mn: { type: String, required: true },
    en: { type: String, required: true },
    zh: { type: String, required: true },
  },
  section: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

// Create the model if it doesn't exist already
const Content = mongoose.models.Content || mongoose.model("Content", contentSchema)

export default Content
