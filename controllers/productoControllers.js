import { connection } from "../config/db.js";

const obtenerProductos = async (req, res) => {
    try {
        const [producto] = await connection.query('SELECT * from producto');
        res.json(producto);
    } catch (error) {
        console.error('Error en la consulta:', error);
        res.status(500).json({
            msg: "Error al Procesar datos"
        });
    }
}

const obtenerProducto = async (req, res) => {
    const { id } = req.params;

    try {
        //Comprobar si existe el producto
        const [producto] = await connection.query("SELECT * FROM producto WHERE id=?", [id]);
        if (producto.length === 0) {
            return res.status(404).json({
                msg: 'El ID del producto no existe en la base de datos'
            });
        }

        res.json(producto);
    } catch (error) {
        console.error('Error en la consulta:', error);
        res.status(500).json({
            msg: "Error al Procesar datos"
        });
    }
}

const crearProducto = async (req, res) => {

    let estado = "Activo"

    try {
        const [results] = await connection.query("INSERT INTO producto(nombre,precio,estado) VALUES(?, ?, ?)", [
            req.body.nombre,
            req.body.precio,
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

const actualizarProducto = async (req, res) => {
    const { id } = req.params;
    //Comprobar si existe el producto
    const [producto] = await connection.query("SELECT * FROM producto WHERE id=?", [id]);
    if (producto.length === 0) {
        return res.status(404).json({
            msg: 'El ID del producto no existe en la base de datos'
        });
    }

    const { nombre, precio } = req.body;

    try {
        const [rows] = await connection.query('UPDATE producto SET nombre = ?, precio = ? WHERE id = ?', [
            nombre,
            precio,
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

const eliminarProducto = async (req, res) => {
    const { id } = req.params;
    //Comprobar si existe el cliente
    const [producto] = await connection.query("SELECT * FROM producto WHERE id=?", [id]);
    if (producto.length === 0) {
        return res.status(404).json({
            msg: 'El ID del producto no existe en la base de datos'
        });
    }

    try {
        await connection.query('DELETE FROM producto WHERE id=?', [id]);
        res.json({
            msg: 'El producto fue eliminado de la base de datos'
        });
    } catch (error) {
        console.error('Error en la consulta:', error);
        res.status(500).json({
            msg: "Error al Procesar datos"
        });
    }
}

export {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    eliminarProducto
}