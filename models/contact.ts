import mongoose, { Schema } from "mongoose"

const contactSchema = new Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true 
  },
  phone: { 
    type: String, 
    required: true 
  },
  message: { 
    type: String, 
    required: true 
  },
  subject: { 
    type: String, 
    default: "Contact Form Submission" 
  },
  status: { 
    type: String, 
    enum: ["new", "read", "replied", "archived"],
    default: "new"
  },
  source: { 
    type: String, 
    enum: ["contact_form", "phone", "email", "social_media"],
    default: "contact_form"
  },
  language: { 
    type: String, 
    default: "mn",
    enum: ["en", "mn"]
  },
  metadata: {
    userAgent: { type: String, default: "" },
    ipAddress: { type: String, default: "" },
    referrer: { type: String, default: "" }
  }
}, {
  timestamps: true
})

// Create indexes for better query performance
contactSchema.index({ status: 1, createdAt: -1 })
contactSchema.index({ email: 1 })
contactSchema.index({ createdAt: -1 })

const Contact = mongoose.models.Contact || mongoose.model("Contact", contactSchema)

export default Contact 