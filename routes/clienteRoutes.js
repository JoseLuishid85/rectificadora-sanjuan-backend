import express from 'express';
import { obtenerCliente, obtenerClientes, crearCliente, modificarCliente, elminarCliente } from '../controllers/clienteControllers.js';

const router = express.Router();


router.get('/', obtenerClientes );
router.get('/:id', obtenerCliente );
router.post('/', crearCliente );
router.put('/:id', modificarCliente );
router.delete('/:id', elminarCliente );

export default router;