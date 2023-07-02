import express from "express";
import mysql from "mysql";
import cors from 'cors'

import 'dotenv/config'

const app = express();
app.use(cors())

const conexion = mysql.createConnection({
    server: process.env.SERVER,
    user: process.env.USER_DB,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

conexion.connect((error) => {
    if (error) console.log("No fue posible la conexión");
    else console.log("¡Conectado al servidor!");
});

app.listen(8081, () => { console.log("Servidor iniciado") });

app.get('/lista/:id', (peticion, respuesta) => {
    const id = peticion.params.id;
    const sql = 'SELECT * FROM VW_Obtener_Listas WHERE nombre_cat = ?';
    conexion.query(sql, [id], (error, resultado) => {
        if (error) return respuesta.json([{ Error: "Error en la consulta"}]);
        return respuesta.json({Estatus: "EXITOSO", Resultado: resultado});
    })
})

app.get('/detalles/:id', (peticion, respuesta) => {
    const id = peticion.params.id;
    const sql = 'SELECT * FROM VW_Obtener_Detalles WHERE idlugar = ?';
    conexion.query(sql, [id], (error, resultado) => {
        if (error) return respuesta.json([{ Error: "Error en la consulta"}]);
        return respuesta.json({Estatus: "EXITOSO", Resultado: resultado});
    })
})