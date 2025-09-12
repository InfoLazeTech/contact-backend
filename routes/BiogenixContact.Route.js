import express from "express";
import {createBiogenixContact} from "../controllers/BiogenixConatct.Controller.js";

const router = express.Router();

router.post("/email", createBiogenixContact);

export default router;