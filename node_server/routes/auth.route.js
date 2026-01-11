import express from "express";
import { callBack } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/callback", callBack);

export default router