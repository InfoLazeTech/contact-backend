import express from "express";
import contactRoutes from "./ConatctUs.Route.js";
import biogenixRoutes from "./BiogenixContact.Route.js";

const router = express.Router();

router.use("/contact", contactRoutes);
router.use("/biogenixcontact", biogenixRoutes);

export default router;
