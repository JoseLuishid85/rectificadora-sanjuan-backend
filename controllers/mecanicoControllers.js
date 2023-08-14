import { connection } from "../config/db.js";

const obternerMecanicos = async (req, res) =>{
    try {
        const [rows] = await connection.query('SELECT * FROM mecanico');
        res.json(rows);
    } catch (error) {
        console.error('Error en la consulta:', error);
        res.status(500).json({
            msg: "Error al Procesar datos"
        });
    }
}

const obternerMecanico = async (req, res) =>{
    const { id } = req.params;
    //Comprobar si existe el cliente
    const [existeMecanico] = await connection.query("SELECT COUNT(*) FROM mecanico WHERE id=?", [id]);
    if (existeMecanico[0]["COUNT(*)"] === 0) {
        return res.status(404).json({
            msg: 'El ID del Mecanico no existe en la base de datos'
        });
    }

    try {
        const [rows] = await connection.query('SELECT * FROM mecanico WHERE id=?', [id]);
        res.json(rows);
    } catch (error) {
        console.error('Error en la consulta:', error);
        res.status(500).json({
            msg: "Error al Procesar datos"
        });
    }
}

const crearMecanico = async (req, res) =>{
    try {
        const [results] = await connection.query("INSERT INTO mecanico(nombre,telefono,direccion) VALUES(?, ?, ?)", [
            req.body.nombre,
            req.body.telefono,
            req.body.direccion,
        ]);

        res.json({
            id: results.insertId,
            ...req.body
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al Procesar datos"
        });
    }
}

const actualizarMecanico = async (req, res) =>{
    const { id } = req.params;
    //Comprobar si existe el cliente
    const [existeMecanico] = await connection.query("SELECT COUNT(*) FROM mecanico WHERE id=?", [id]);
    if (existeMecanico[0]["COUNT(*)"] === 0) {
        return res.status(404).json({
            msg: 'El ID del mecanico no existe en la base de datos'
        });
    }

    const { nombre, telefono, direccion } = req.body;

    try {
        const [rows] = await connection.query('UPDATE mecanico SET nombre = ?, telefono = ?, direccion = ? WHERE id = ?', [
            nombre,
            telefono,
            direccion,
            id
        ]);
        res.json(rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al Procesar datos"
        });
    }
}

const eliminarMecanico = async (req, res) =>{
    const { id } = req.params;
    //Comprobar si existe el cliente
    const [existeMecanico] = await connection.query("SELECT COUNT(*) FROM mecanico WHERE id=?", [id]);
    if (existeMecanico[0]["COUNT(*)"] === 0) {
        return res.status(404).json({
            msg: 'El ID del mecanico no existe en la base de datos'
        });
    }

    try {
        await connection.query('DELETE FROM mecanico WHERE id=?',[id]);
        res.json({
            msg: 'El mecanico fue eliminado de la base de datos'
        });
    } catch (error) {
        console.error('Error en la consulta:', error);
        res.status(500).json({
            msg: "Error al Procesar datos"
        });
    }
}

export {
    obternerMecanicos,
    obternerMecanico,
    crearMecanico,
    actualizarMecanico,
    eliminarMecanico
}