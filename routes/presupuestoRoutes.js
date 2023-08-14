import express from "express";
import { crearPresupuesto } from "../controllers/presupuestoControllers.js";

const router = express.Router();

//router.get("/", obtenerPresupuestos);
//router.get("/:id", obtenerPresupuesto);
router.post("/", crearPresupuesto);
//router.put("/:id", actualizarPresupuesto );

export default router;