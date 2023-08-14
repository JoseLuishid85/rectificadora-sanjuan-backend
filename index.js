import express from "express";
import cors from 'cors';
import usuarioRoutes from "./routes/usuarioRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import clienteRoutes from "./routes/clienteRoutes.js";
import mecanicoRoutes from "./routes/mecanicoRoutes.js";
import productoRoutes from "./routes/productoRoutes.js";
import marcaRoutes from "./routes/marcaRoutes.js";
import presupuestoRoutes from "./routes/presupuestoRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());


app.use('/api/login', authRoutes);
app.use('/api/usuario', usuarioRoutes);
app.use('/api/cliente', clienteRoutes);
app.use('/api/mecanico', mecanicoRoutes);
app.use('/api/producto', productoRoutes);
app.use('/api/marca', marcaRoutes);
app.use('/api/presupuesto', presupuestoRoutes);

const PORT = process.env.PORT || 4000

const servidor = app.listen(PORT, () =>{
    console.log(`Servidor Corriendo en el puerto ${PORT}`);
})