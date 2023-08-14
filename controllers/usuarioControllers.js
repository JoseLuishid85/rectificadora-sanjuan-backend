import { connection } from "../config/db.js";
import bcrypt from "bcryptjs";

const crearUsuario = async(req,res) => {

    const { usuario, password, nombre } = req.body;
    const estado = "Activo";

    //Comprobar si existe el usuario
    const [existeUsuario] = await connection.query("SELECT COUNT(*) FROM usuario WHERE usuario=?", [usuario]);
    if (existeUsuario[0]["COUNT(*)"] !== 0) {
        return res.status(404).json({
            msg: 'El Usuario existe en la base de datos'
        });
    }

    //Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    const password2 = bcrypt.hashSync(password,salt);

    try {
        const [results] = await connection.query("INSERT INTO usuario(usuario,password,nombre,estado) VALUES(?, ?, ?, ?)", [
            usuario,
            password2,
            nombre,
            estado
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

export{
    crearUsuario
}