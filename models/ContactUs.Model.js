import mongoose from "mongoose";

const ContactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      match: [/.+\@.+\..+/, "Please enter a valid email address"], // simple email validation
    },
    phone: {
      type: String,
      required: true,
      match: [/^[0-9]{7,15}$/, "Please enter a valid phone number"],
    },
    subject: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
); // optional: adds createdAt and updatedAt fields

export const ContactModel = mongoose.model("Contact", ContactSchema);
