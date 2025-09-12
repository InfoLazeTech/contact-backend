import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import routes from "./routes/index.js";

const app = express();
app.use(express.json());
app.use(cors());

// all routes under /api
app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("Hello Backend");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

mongoose
  .connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 30000 })
  .then(() => console.log("MongoDB Connected...."))
  .catch((err) => console.log("MongoDB Connection Error: ", err));
