import { connection } from "../config/db.js";

const obtenerCliente = async (req, res) => {
    
    const { id } = req.params;
    //Comprobar si existe el cliente
    const [existeCliente] = await connection.query("SELECT COUNT(*) FROM cliente WHERE id=?", [id]);
    if (existeCliente[0]["COUNT(*)"] === 0) {
        return res.status(404).json({
            msg: 'El ID del cliente no existe en la base de datos'
        });
    }

    try {
        const [rows] = await connection.query('SELECT * FROM cliente WHERE id=?', [id]);
        res.json(rows);
    } catch (error) {
        console.error('Error en la consulta:', error);
        res.status(500).json({
            msg: "Error al Procesar datos"
        });
    }
}

const obtenerClientes = async (req, res) => {
    try {
        const [rows] = await connection.query('SELECT * FROM cliente');
        res.json(rows);
    } catch (error) {
        console.error('Error en la consulta:', error);
        res.status(500).json({
            msg: "Error al Procesar datos"
        });
    }
}

const crearCliente = async (req, res) => { 

    try {
        const [results] = await connection.query("INSERT INTO cliente(nombre,telefono,direccion) VALUES(?, ?, ?)", [
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

const modificarCliente = async (req, res) => {
    const { id } = req.params;
    //Comprobar si existe el cliente
    const [existeCliente] = await connection.query("SELECT COUNT(*) FROM cliente WHERE id=?", [id]);
    if (existeCliente[0]["COUNT(*)"] === 0) {
        return res.status(404).json({
            msg: 'El ID del cliente no existe en la base de datos'
        });
    }

    const { nombre, telefono, direccion } = req.body;

    try {
        const [rows] = await connection.query('UPDATE cliente SET nombre = ?, telefono = ?, direccion = ? WHERE id = ?', [
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

const elminarCliente = async (req, res) => {
    const { id } = req.params;
    //Comprobar si existe el cliente
    const [existeCliente] = await connection.query("SELECT COUNT(*) FROM cliente WHERE id=?", [id]);
    if (existeCliente[0]["COUNT(*)"] === 0) {
        return res.status(404).json({
            msg: 'El ID del cliente no existe en la base de datos'
        });
    }

    try {
        await connection.query('DELETE FROM cliente WHERE id=?',[id]);
        res.json({
            msg: 'El cliente fue eliminado de la base de datos'
        });
    } catch (error) {
        console.error('Error en la consulta:', error);
        res.status(500).json({
            msg: "Error al Procesar datos"
        });
    }
}

export {
    obtenerCliente,
    obtenerClientes,
    crearCliente,
    modificarCliente,
    elminarCliente
}