import express from "express";
import {createInfolanzeContact} from "../controllers/InfolanzeContact.Controller.js";

const router = express.Router();

router.post("/Infolanze-contact", createInfolanzeContact);

export default router;
