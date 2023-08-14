import { connection } from "../config/db.js";
import { formatiarFecha } from "../helpers/formatiar_fecha.js";


const crearPresupuesto = async (req, res) => {

    let estado = "Activo";
    const { num, id_marca, motor, cliente, telefono, items } = req.body;
    const fecha = new Date(req.body.fecha);
    const fechaFormateada = formatiarFecha(fecha); 

    try {
        let sql = "INSERT INTO presupuesto(num,fecha,id_marca,motor,cliente,telefono,estado) VALUES(?, ?, ?, ?, ?, ?, ?)";
        const [results] = await connection.query(sql, [ num, fechaFormateada, id_marca, motor, cliente, telefono, estado ]);
        let id_presupuesto = results.insertId;

        for (const item of items) {
            const [detalle] = await connection.query("INSERT INTO detalle_presupuesto(id_presupuesto, id_producto, precio, estado) VALUES (?, ?, ?, ?)", [ 
                id_presupuesto,
                item.id_producto,
                item.precio,
                estado 
            ]);
        }

        res.json({
            id: results.insertId,
            items
        });

    } catch (error) {
        console.error('Error en la consulta:', error);
        res.status(500).json({
            msg: "Error al Procesar datos"
        });
    }
}

export {
    crearPresupuesto,
}