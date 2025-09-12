import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import contactRoutes from "./routes/ConatctUs.Route.js";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello Backend");
});
app.use("/api", contactRoutes);

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on ${PORT}`);
// });

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB Connected....");
  })
  .catch((err) => {
    console.log("MongoDB Connenction Error: ", err);
  });


