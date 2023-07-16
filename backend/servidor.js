import express from "express";
import mysql from "mysql";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

import "dotenv/config";

const app = express();
app.use(cors());
app.use(express.json());

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

app.listen(process.env.PORT, () => {
  console.log("Servidor iniciado");
});

app.get("/ObtenerViajes/:id", (peticion, respuesta) => {
  const id = peticion.params.id;
  const sql = "SELECT * FROM VW_Obtener_Viajes WHERE NombreCategoria = ?";
  conexion.query(sql, [id], (error, resultado) => {
    if (error) return respuesta.status(500).json([{ Error: "Error en la consulta" }]);
    return respuesta.json({ Estatus: "EXITOSO", Resultado: resultado });
  });
});

app.get("/ObtenerDetalles/:id", (peticion, respuesta) => {
  const id = peticion.params.id;
  const sql = "SELECT * FROM VW_Obtener_Lugares_Detalles WHERE LugarID = ?";
  conexion.query(sql, [id], (error, resultado) => {
    if (error) return respuesta.status(500).json([{ Error: "Error en la consulta" }]);
    return respuesta.json({ Estatus: "EXITOSO", Resultado: resultado });
  });
});

app.post("/RegistrarUsuario", async (peticion, respuesta) => {
  const { Nombre, Apellido, Correo, Contrasenia } = peticion.body;
  try {
    const hash = await bcrypt.hash(Contrasenia, 10);
    const query = "CALL SP_Registrar_Usuario(?, ?, ?, ?)";
    conexion.query(query, [Nombre, Apellido, Correo, hash], (error) => {
      if (error) {
        respuesta.status(500).json({ Error: "¡Oops! No se pudo registrar al usuario" });
      } else {
        const token = jwt.sign({ correo: Correo }, "secreto");
        respuesta.json({ Estatus: "EXITOSO", Token: token });
      }
    });
  } catch (error) {
    respuesta.status(500).json({ Error: "¡Oops! No se pudo registrar al usuario" });
  }
});

app.post("/IniciarSesion", (peticion, respuesta) => {
  const { Correo, Contrasenia } = peticion.body;
  const query = "SELECT Contrasenia FROM VW_Obtener_Usuarios WHERE Correo = ?";
  conexion.query(query, [Correo], (error, resultados) => {
    if (error) return respuesta.json({ Error: "Error en la consulta." });
    if (resultados.length === 0) return respuesta.json({ Error: "Error en la consulta" });
    const usuario = resultados[0];
    const match = bcrypt.compareSync(Contrasenia, usuario.Contrasenia);
    if (match) {
      const token = jwt.sign({ correo: Correo }, "secreto");
      return respuesta.json({ Estatus: "EXITOSO", Resultado: usuario, token });
    } else {
      return respuesta.json({ Error: "Error en las credenciales del usuario" });
    }
  });
});

app.post("/VerificarCorreo", (peticion, respuesta) => {
  const { Correo } = peticion.body;
  const query = "SELECT * FROM VW_Obtener_Usuarios WHERE Correo = ?";
  conexion.query(query, [Correo], (error, resultados) => {
    if (error) {
      return respuesta.json({ Error: "Error en la consulta" });
    } else {
      if (resultados.length > 0) {
        return respuesta.json({ Estatus: "EXITOSO", Resultado: resultados });
      } else {
        return respuesta.json({ Error: "El usuario no existe" });
      }
    }
  });
});
