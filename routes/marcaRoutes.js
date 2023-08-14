import express from "express";
import { obtenerMarcas, obtenerMarca, crearMarca, actualizarMarca, eliminarMarca } from "../controllers/marcaControllers.js";

const router = express.Router();

router.get("/", obtenerMarcas);
router.get("/:id", obtenerMarca);
router.post("/", crearMarca);
router.put("/:id", actualizarMarca );
router.delete("/:id", eliminarMarca);

export default router;