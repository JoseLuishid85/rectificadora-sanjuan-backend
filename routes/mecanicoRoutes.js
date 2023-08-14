import express from "express";
import { actualizarMecanico, crearMecanico, eliminarMecanico, obternerMecanico, obternerMecanicos } from "../controllers/mecanicoControllers.js";

const router = express.Router();

router.get('/', obternerMecanicos);
router.get('/:id', obternerMecanico);
router.post('/', crearMecanico);
router.put('/:id', actualizarMecanico);
router.delete('/:id', eliminarMecanico);

export default router;