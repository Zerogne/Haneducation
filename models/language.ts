import mongoose, { Schema } from "mongoose"

// Define the Language schema
const languageSchema = new Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  nativeName: { type: String, required: true },
  flag: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  isDefault: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

// Create the model if it doesn't exist already
const Language = mongoose.models.Language || mongoose.model("Language", languageSchema)

export default Language
