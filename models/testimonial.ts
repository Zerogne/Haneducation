import mongoose, { Schema } from "mongoose"

const testimonialSchema = new Schema({
  name: { type: String, required: true },
  university: { type: String, required: true },
  content: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  image: { type: String, default: "" },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
  language: { 
    type: String, 
    default: "en",
    enum: ["en", "mn"]
  },
  metadata: {
    graduationYear: { type: String, default: "" },
    program: { type: String, default: "" },
    location: { type: String, default: "" }
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

const Testimonial = mongoose.models.Testimonial || mongoose.model("Testimonial", testimonialSchema)

export default Testimonial 