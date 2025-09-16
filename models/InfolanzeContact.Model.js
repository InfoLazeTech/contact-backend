import mongoose from "mongoose";

const InfolanzeContactSchema = new mongoose.Schema(
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
    description: { type: String, required: true },
  },
  { timestamps: true }
); 

export const InfolanzeContactModel = mongoose.model("InfolanzeContact", InfolanzeContactSchema);
