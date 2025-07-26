import mongoose, { Schema } from "mongoose"

// Define the User schema
const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, enum: ["admin", "editor"], default: "editor" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

// Create the model if it doesn't exist already
const User = mongoose.models.User || mongoose.model("User", userSchema)

export default User
