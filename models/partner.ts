import mongoose, { Schema } from "mongoose"

const partnerSchema = new Schema({
  name: { type: String, required: true },
  logo: { type: String, required: true },
  website: { type: String, default: "" },
  description: { type: String, default: "" },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
  type: { 
    type: String, 
    default: "university",
    enum: ["university", "organization", "government"]
  },
  location: { type: String, default: "" },
  partnershipLevel: { 
    type: String, 
    default: "standard",
    enum: ["standard", "premium", "exclusive"]
  },
  metadata: {
    establishedYear: { type: String, default: "" },
    studentCapacity: { type: String, default: "" },
    programs: [{ type: String }]
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

const Partner = mongoose.models.Partner || mongoose.model("Partner", partnerSchema)

export default Partner 