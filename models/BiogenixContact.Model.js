import mongoose from "mongoose";

const BiogenixContactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      match: [/.+\@.+\..+/, "Please enter a valid email address"], // simple email validation
    },
    description: { type: String, required: true },
  },
  { timestamps: true }
); // optional: adds createdAt and updatedAt fields

export const BiogenixContactModel = mongoose.model("Contact", BiogenixContactSchema);
