import { connection } from "../config/db.js";

const obtenerMarcas = async (req, res) => {
    try {
        const [marca] = await connection.query('SELECT * from marca');
        res.json(marca);
    } catch (error) {
        console.error('Error en la consulta:', error);
        res.status(500).json({
            msg: "Error al Procesar datos"
        });
    }
}

const obtenerMarca = async (req, res) => {
    const { id } = req.params;

    try {
        //Comprobar si existe la marca
        const [marca] = await connection.query("SELECT * FROM marca WHERE id=?", [id]);
        if (marca.length === 0) {
            return res.status(404).json({
                msg: 'El ID de la marca no existe en la base de datos'
            });
        }

        res.json(marca);
    } catch (error) {
        console.error('Error en la consulta:', error);
        res.status(500).json({
            msg: "Error al Procesar datos"
        });
    }
}

const crearMarca = async (req, res) => {

    let estado = "Activo"

    try {
        const [results] = await connection.query("INSERT INTO marca(nombre,estado) VALUES(?, ?)", [
            req.body.nombre,
            estado
        ]);

        res.json({
            id: results.insertId,
            ...req.body
        });

    } catch (error) {
        console.error('Error en la consulta:', error);
        res.status(500).json({
            msg: "Error al Procesar datos"
        });
    }
}

const actualizarMarca = async (req, res) => {
    const { id } = req.params;
    //Comprobar si existe la marca
    const [marca] = await connection.query("SELECT * FROM marca WHERE id=?", [id]);
    if (marca.length === 0) {
        return res.status(404).json({
            msg: 'El ID de la marca no existe en la base de datos'
        });
    }

    const { nombre } = req.body;

    try {
        const [rows] = await connection.query('UPDATE marca SET nombre = ? WHERE id = ?', [
            nombre,
            id
        ]);
        res.json({
            id: id,
            ...req.body
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Error al Procesar datos"
        });
    }
}

const eliminarMarca = async (req, res) => {
    const { id } = req.params;
    //Comprobar si existe la marca
    const [marca] = await connection.query("SELECT * FROM marca WHERE id=?", [id]);
    if (marca.length === 0) {
        return res.status(404).json({
            msg: 'El ID de la marca no existe en la base de datos'
        });
    }

    try {
        await connection.query('DELETE FROM marca WHERE id=?', [id]);
        res.json({
            msg: 'La marca fue eliminado de la base de datos'
        });
    } catch (error) {
        console.error('Error en la consulta:', error);
        res.status(500).json({
            msg: "Error al Procesar datos"
        });
    }
}

export {
    obtenerMarcas,
    obtenerMarca,
    crearMarca,
    actualizarMarca,
    eliminarMarca
}