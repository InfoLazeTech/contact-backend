import express from "express";
import contactRoutes from "./ConatctUs.Route.js";
import biogenixRoutes from "./BiogenixContact.Route.js";
import infolanzeRoutes from "./InfolanzeContact.Route.js";

const router = express.Router();

router.use("/contact", contactRoutes);
router.use("/biogenixcontact", biogenixRoutes);
router.use("/contact", infolanzeRoutes);

export default router;
