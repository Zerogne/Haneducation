import mongoose, { Schema } from "mongoose"

const statisticsSchema = new Schema({
  type: { 
    type: String, 
    required: true,
    enum: ["page_view", "contact_form", "student_registration", "download", "social_click", "phone_call", "email_click"]
  },
  page: { 
    type: String, 
    default: "" 
  },
  section: { 
    type: String, 
    default: "" 
  },
  action: { 
    type: String, 
    default: "" 
  },
  value: { 
    type: String, 
    default: "" 
  },
  count: { 
    type: Number, 
    default: 1 
  },
  date: { 
    type: Date, 
    default: Date.now 
  },
  metadata: {
    userAgent: { type: String, default: "" },
    ipAddress: { type: String, default: "" },
    referrer: { type: String, default: "" },
    device: { type: String, default: "" },
    browser: { type: String, default: "" },
    os: { type: String, default: "" }
  }
}, {
  timestamps: true
})

// Create indexes for better query performance
statisticsSchema.index({ type: 1, date: -1 })
statisticsSchema.index({ page: 1, date: -1 })
statisticsSchema.index({ date: -1 })

const Statistics = mongoose.models.Statistics || mongoose.model("Statistics", statisticsSchema)

export default Statistics 