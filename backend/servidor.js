import express from "express";
import mysql from "mysql";
import cors from "cors";
import jwt from 'jsonwebtoken'

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

app.listen(8081, () => {
  console.log("Servidor iniciado");
});

app.get("/lista/:id", (peticion, respuesta) => {
  const id = peticion.params.id;
  const sql = "SELECT * FROM VW_Obtener_Listas WHERE nombre_cat = ?";
  conexion.query(sql, [id], (error, resultado) => {
    if (error) return respuesta.json([{ Error: "Error en la consulta" }]);
    return respuesta.json({ Estatus: "EXITOSO", Resultado: resultado });
  });
});

app.get("/detalles/:id", (peticion, respuesta) => {
  const id = peticion.params.id;
  const sql = "SELECT * FROM VW_Obtener_Detalles WHERE idlugar = ?";
  conexion.query(sql, [id], (error, resultado) => {
    if (error) return respuesta.json([{ Error: "Error en la consulta" }]);
    return respuesta.json({ Estatus: "EXITOSO", Resultado: resultado });
  });
});

app.post("/login", (peticion, respuesta) => {
  const { Correo, Contrasenia } = peticion.body;
  const arrValores = [Correo, Contrasenia];
  const sql =
    "SELECT * FROM VW_Obtener_Usuarios WHERE CorreoUsuario = ? AND Contrasenia = ?";
  conexion.query(sql, arrValores, (error, resultado) => {
    if (error) return respuesta.json({ Error: "Error en la consulta" });
    const token = jwt.sign({ correo: Correo }, "secreto");
    return respuesta.json({ Estatus: "EXITOSO", Resultado: resultado, token });
  });
});

app.post("/verificar", (peticion, respuesta) => {
    const { Correo } = peticion.body;
    const arrValores = [Correo];
    const sql =
      "SELECT * FROM VW_Obtener_Usuarios WHERE CorreoUsuario = ?";
    conexion.query(sql, arrValores, (error, resultado) => {
      if (error) return respuesta.json({ Error: "Error en la consulta" });
      const token = jwt.sign({ correo: Correo }, "secreto");
      return respuesta.json({ Estatus: "EXITOSO", Resultado: resultado,token });
    });
  });

app.post("/registrarUsuario", (peticion, respuesta) => {
    const { Nombre, Apellido, Correo, Contrasenia } = peticion.body;
    const query = "CALL SP_RegistrarUsuario(?, ?, ?, ?)";
    conexion.query(query, [Nombre, Apellido, Correo, Contrasenia], (error, resultado) => {
      if (error) {
        console.error("Error al registrar el usuario:", error);
        respuesta.status(500).json({ Error: "No se pudo añadir al usuario" });
      } else {
        respuesta.json({ Estatus: "EXITOSO", Resultado: resultado });
      }
  });
});


// CRUD
app.post('/registrarUsuario', (req, res) => {
  const { Nombre, Apellido, Correo, Contrasenia } = req.body;
  const query = 'CALL SP_RegistrarUsuario(?, ?, ?, ?)';
  conexion.query(query, [Nombre, Apellido, Correo, Contrasenia], (error, resultado) => {
    if (error) {
      console.error('Error al registrar el usuario:', error);
      res.status(500).json({ Error: 'No se pudo añadir al usuario' });
    } else {
      res.json({ Estatus: 'EXITOSO', Resultado: resultado });
    }
  });
});

app.post('/eliminarViaje', (req, res) => {
  const { id } = req.body;
  const query = 'CALL SP_EliminarViaje(?)';
  conexion.query(query, [id], (error, resultado) => {
    if (error) {
      console.error('Error al eliminar el viaje:', error);
      res.status(500).json({ Error: 'No se pudo eliminar el viaje' });
    } else {
      res.json({ Estatus: 'EXITOSO', Resultado: resultado });
    }
  });
});

app.post('/eliminarUsuario', (req, res) => {
  const { id } = req.body;
  const query = 'CALL SP_EliminarUsuario(?)';
  conexion.query(query, [id], (error, resultado) => {
    if (error) {
      console.error('Error al eliminar el usuario:', error);
      res.status(500).json({ Error: 'No se pudo eliminar el usuario' });
    } else {
      res.json({ Estatus: 'EXITOSO', Resultado: resultado });
    }
  });
});

app.post('/modificarUsuario', (req, res) => {
  const { Nombre, Apellido, Correo, Contrasenia, idUsuario } = req.body;
  const query = 'CALL SP_ModificarUsuario(?, ?, ?, ?, ?)';
  conexion.query(query, [Nombre, Apellido, Correo, Contrasenia, idUsuario], (error, resultado) => {
    if (error) {
      console.error('Error al modificar el usuario:', error);
      res.status(500).json({ Error: 'No se pudo modificar el usuario' });
    } else {
      res.json({ Estatus: 'EXITOSO', Resultado: resultado });
    }
  });
});

app.post('/modificarViaje', (req, res) => {
  const { nombre, descripcion, personas, precio, imgUno, imgDos, imgTres, id } = req.body;
  const query = 'CALL SP_ModificarViaje(?, ?, ?, ?, ?, ?, ?, ?)';
  conexion.query(query, [nombre, descripcion, personas, precio, imgUno, imgDos, imgTres, id], (error, resultado) => {
    if (error) {
      console.error('Error al modificar el viaje:', error);
      res.status(500).json({ Error: 'No se pudo modificar el viaje' });
    } else {
      res.json({ Estatus: 'EXITOSO', Resultado: resultado });
    }
  });
});
