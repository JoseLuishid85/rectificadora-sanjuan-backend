import { connection } from "../config/db.js";
import bcrypt from "bcryptjs";
import generarJWT from "../helpers/genera_JWT.js";

const autenticar = async (req, res) => {

    const { usuario, password } = req.body;

    //Comprobar si existe el usuario
    const [existeUsuario] = await connection.query("SELECT * FROM usuario WHERE usuario=?", [usuario]);
    if (existeUsuario.length === 0) {
        return res.status(404).json({
            msg: 'El Usuario no existe en la base de datos'
        });
    }

    //Verificar Contraseña
    const validPassword = bcrypt.compareSync(password, existeUsuario[0].password);
    if (!validPassword) {
        return res.status(400).json({
            msg: 'Contraseña no Valida'
        });
    }

    try {
        //Generar el Token - JWT
        const token = await generarJWT(existeUsuario[0].id);

        res.json({
            token: token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el Administrsdor del sistema'
        })
    }
}

export {
    autenticar
}