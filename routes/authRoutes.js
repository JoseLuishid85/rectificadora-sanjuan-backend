import express from "express";
import { autenticar } from "../controllers/authControllers.js";

const router = express.Router();

router.post('/',autenticar)

export default router;