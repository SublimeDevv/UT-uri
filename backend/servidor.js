import express from "express";
import mysql from "mysql";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: '../frontend/src/images/categorias/',
  filename: function (req, file, cb) {
    cb(null, file.originalname); 
  },
})

const upload = multer({ storage });

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

app.use(express.urlencoded({ extended: true }));

app.post('/subirImagenes', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No se ha proporcionado ninguna imagen' });
  }
  return res.json({ message: 'Imagen subida correctamente' });
});

  const autenticarUsuario = (peticion, respuesta, siguiente) => {
    const token = peticion.header("Authorization");
    if (!token) {
      return respuesta.status(401).json({ Error: "Acceso no autorizado" });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT);
      peticion.user = decoded; 
      siguiente();
    } catch (error) {
      return respuesta.status(401).json({ Error: "Acceso no autorizado" });
    }
  };

  app.get("/UsuarioActual", autenticarUsuario, (peticion, respuesta) => {
    const { correo } = peticion.user;
    const query = "SELECT * FROM VW_Obtener_Usuarios WHERE Correo = ?";
    conexion.query(query, [correo], (error, resultados) => {
      if (error) {
        return respuesta.status(500).json({ Error: "Error en la consulta" });
      } else {
        if (resultados.length > 0) {
          const usuario = resultados[0];
          return respuesta.json({ Estatus: "EXITOSO", Resultado: usuario });
        } else {
          return respuesta.status(404).json({ Error: "Usuario no encontrado" });
        }
      }
    });
  });

app.get("/ObtenerViajes/:id", (peticion, respuesta) => {
  const id = peticion.params.id;
  const sql = "SELECT * FROM VW_Obtener_Viajes WHERE NombreCategoria = ? AND Estado = 1";
  conexion.query(sql, [id], (error, resultado) => {
    if (error) return respuesta.status(500).json([{ Error: "Error en la consulta" }]);
    return respuesta.json({ Estatus: "EXITOSO", Resultado: resultado });
  });
});

app.get("/ObtenerDetalles/:id", (peticion, respuesta) => {
  const id = peticion.params.id;
  const sql = "SELECT * FROM VW_Obtener_Lugares_Detalles WHERE LugarID = ? AND Estado = 1";
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

app.get("/ObtenerProductos", (peticion, respuesta) => {
  const sql = "SELECT * FROM VW_Obtener_Viajes WHERE Estado = 1";
  conexion.query(sql, (error, resultado) => {
    if (error) return respuesta.json([{ Error: "Error en la consulta" }]);
    return respuesta.json({ Estatus: "EXITOSO", Resultado: resultado });
  });
});

app.get("/ObtenerUsuarios", (peticion, respuesta) => {
  const sql = "SELECT * FROM VW_Obtener_Usuarios where RolID = 1";
  conexion.query(sql, (error, resultado) => {
    if (error) return respuesta.json([{ Error: "Error en la consulta" }]);
    return respuesta.json({ Estatus: "EXITOSO", Resultado: resultado });
  });
});
app.get("/obtenerCantidad", (peticion, respuesta) => {
  const sql = "SELECT * FROM VW_Cantidad";
  conexion.query(sql, (error, resultado) => {
    if (error) return respuesta.json([{ Error: "Error en la consulta" }]);
    return respuesta.json({ Estatus: "EXITOSO", Resultado: resultado });
  });
});
app.get("/obtenerLista", (peticion, respuesta) => {
  const sql = "SELECT Nombre FROM VW_Obtener_Categorias;";
  conexion.query(sql, (error, resultado) => {
    if (error) return respuesta.json([{ Error: "Error en la consulta" }]);
    return respuesta.json({ Estatus: "EXITOSO", Resultado: resultado });
  });
});
app.get("/ObtenerCategorias", (peticion, respuesta) => {
  const sql = "SELECT * FROM VW_Obtener_Categorias WHERE Estatus = 1;";
  conexion.query(sql, (error, resultado) => {
    if (error) return respuesta.json([{ Error: "Error en la consulta" }]);
    return respuesta.json({ Estatus: "EXITOSO", Resultado: resultado });
  });
});
app.get("/Usuarios", (peticion, respuesta) => {
  const sql = "SELECT * FROM VW_Obtener_Usuarios WHERE RolID = 2";
  conexion.query(sql, (error, resultado) => {
    if (error) return respuesta.json([{ Error: "Error en la consulta" }]);
    return respuesta.json({ Estatus: "EXITOSO", Resultado: resultado });
  });
});
app.get("/Listas", (peticion, respuesta) => {
  const sql = "SELECT * FROM VW_Obtener_Categorias WHERE Estatus = 1";
  conexion.query(sql, (error, resultado) => {
    if (error) return respuesta.json([{ Error: "Error en la consulta" }]);
    return respuesta.json({ Estatus: "EXITOSO", Resultado: resultado });
  });
});

app.put("/CambiarRolUsuario/:id", (peticion, respuesta) => {
  const usuarioId = peticion.params.id;
  const nuevoRol = peticion.body.nuevoRol;
  const query = "CALL CambiarRolUsuario(?, ?)";
  conexion.query(query, [usuarioId, nuevoRol], (error) => {
    if (error) {
      respuesta.status(500).json({ Error: "Error al cambiar el rol del usuario" });
    } else {
      respuesta.json({ Estatus: "EXITOSO" });
    }
  });
});

app.delete("/EliminarUsuario/:id", (peticion, respuesta) => {
  const usuarioId = peticion.params.id;
  const query = "CALL EliminarUsuario(?)";
  conexion.query(query, [usuarioId], (error) => {
    if (error) {
      respuesta.status(500).json({ Error: "Error al eliminar el usuario" });
    } else {
      respuesta.json({ Estatus: "EXITOSO" });
    }
  });
});

app.post('/FormularioContacto', (peticion, respuesta) => {
  const { nombre, correo, asunto, mensaje } = peticion.body;
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: 'uturiproject@gmail.com',
      pass: process.env.PASSWORD_EMAIL,
    },
  });
  const datos = {
    from: correo,
    to: 'uturiproject@gmail.com',
    subject: asunto,
    text: `Nombre:del usuario ${nombre}\n Correo: ${correo}\n Mensaje: ${mensaje}`,
  };
  transporter.sendMail(datos, (error, info) => {
    if (error) {
      respuesta.status(500).send('Error al enviar el correo');
    } else {
      respuesta.send('Correo enviado');
    }
  });
});

app.post("/AgregarCategoria", (peticion, respuesta) => {
  const { nombreCategoria, descripcionCategoria, imagenCategoria, imagen1 } = peticion.body;
  const query = "CALL SP_Agregar_Categoria(?, ?, ?)";
  conexion.query(query, [nombreCategoria, descripcionCategoria, imagenCategoria], (error) => {
    if (error) {
      respuesta.status(500).json({ Error: "Error al agregar la categoría" });
    } else {
      respuesta.json({ Estatus: "EXITOSO" });
    }
  });
});

app.delete("/EliminarCategoria/:categoriaId", (peticion, respuesta) => {
  const categoriaId = peticion.params.categoriaId;
  const query = "CALL SP_Eliminar_Categoria(?)";
  conexion.query(query, [categoriaId], (error) => {
    if (error) {
      respuesta.status(500).json({ Error: "Error al eliminar la categoría" });
    } else {
      respuesta.json({ Estatus: "EXITOSO" });
    }
  });
});

app.put("/OcultarCategoria/:categoriaId", (peticion, respuesta) => {
  const categoriaId = peticion.params.categoriaId;
  const query = "CALL SP_Ocultar_Categoria(?)";
  conexion.query(query, [categoriaId], (error) => {
    if (error) {
      respuesta.status(500).json({ Error: "Error al ocultar la categoría" });
    } else {
      respuesta.json({ Estatus: "EXITOSO" });
    }
  });
});

app.post("/AgregarLugar", (peticion, respuesta) => {
  const { nombreLugar, informacionLugar, imagenesLugar, categoriaId } = peticion.body;
  const query = "CALL SP_Agregar_Lugar(?, ?, ?, ?)";
  conexion.query(query, [nombreLugar, informacionLugar, imagenesLugar, categoriaId], (error) => {
    if (error) {
      respuesta.status(500).json({ Error: "Error al agregar el lugar" });
    } else {
      respuesta.json({ Estatus: "EXITOSO" });
    }
  });
});

app.delete("/EliminarLugar/:lugarId", (peticion, respuesta) => {
  const lugarId = peticion.params.lugarId;
  const query = "CALL SP_Eliminar_Lugar(?)";
  conexion.query(query, [lugarId], (error) => {
    if (error) {
      respuesta.status(500).json({ Error: "Error al eliminar el lugar" });
    } else {
      respuesta.json({ Estatus: "EXITOSO" });
    }
  });
});

app.put("/OcultarLugar/:lugarId", (peticion, respuesta) => {
  const lugarId = peticion.params.lugarId;
  const query = "CALL SP_Ocultar_Lugar(?)";
  conexion.query(query, [lugarId], (error) => {
    if (error) {
      respuesta.status(500).json({ Error: "Error al tratar de ocultar el lugar" });
    } else {
      respuesta.json({ Estatus: "EXITOSO" });
    }
  });
});

app.post("/AgregarSubcategoriaLugar", (peticion, respuesta) => {
  const { lugarId, subcategoriaId } = peticion.body;
  const query = "CALL SP_Agregar_Lugar_Subcategoria(?, ?)";
  conexion.query(query, [lugarId, subcategoriaId], (error) => {
    if (error) {
      respuesta.status(500).json({ Error: "Error al agregar la subcategoría al lugar" });
    } else {
      respuesta.json({ Estatus: "EXITOSO" });
    }
  });
});

app.delete("/EliminarSubcategoriaLugar/:lugarId/:subcategoriaId", (peticion, respuesta) => {
  const lugarId = peticion.params.lugarId;
  const subcategoriaId = peticion.params.subcategoriaId;
  const query = "CALL SP_Eliminar_Lugar_Subcategoria(?, ?)";
  conexion.query(query, [lugarId, subcategoriaId], (error) => {
    if (error) {
      respuesta.status(500).json({ Error: "Error al eliminar la subcategoría del lugar" });
    } else {
      respuesta.json({ Estatus: "EXITOSO" });
    }
  });
});

app.post("/AgregarDetalle", (peticion, respuesta) => {
  const { descripcionDetalle, personasDetalle, precioDetalle, lugarId } = peticion.body;
  const query = "CALL SP_Agregar_Detalle(?, ?, ?, ?)";
  conexion.query(query, [descripcionDetalle, personasDetalle, precioDetalle, lugarId], (error) => {
    if (error) {
      respuesta.status(500).json({ Error: "Error al agregar el detalle" });
    } else {
      respuesta.json({ Estatus: "EXITOSO" });
    }
  });
});

app.delete("/EliminarDetalle/:detalleId", (peticion, respuesta) => {
  const detalleId = peticion.params.detalleId;
  const query = "CALL SP_Eliminar_Detalle(?)";
  conexion.query(query, [detalleId], (error) => {
    if (error) {
      respuesta.status(500).json({ Error: "Error al eliminar el detalle" });
    } else {
      respuesta.json({ Estatus: "EXITOSO" });
    }
  });
});

app.post("/AgregarRol", (peticion, respuesta) => {
  const { nombreRol, descripcionRol } = peticion.body;
  const query = "CALL SP_Agregar_Rol(?, ?)";
  conexion.query(query, [nombreRol, descripcionRol], (error) => {
    if (error) {
      respuesta.status(500).json({ Error: "Error al agregar el rol" });
    } else {
      respuesta.json({ Estatus: "EXITOSO" });
    }
  });
});

app.delete("/EliminarRol/:rolId", (peticion, respuesta) => {
  const rolId = peticion.params.rolId;
  const query = "CALL SP_Eliminar_Rol(?)";
  conexion.query(query, [rolId], (error) => {
    if (error) {
      respuesta.status(500).json({ Error: "Error al eliminar el rol" });
    } else {
      respuesta.json({ Estatus: "EXITOSO" });
    }
  });
});

app.delete("/EliminarUsuario/:usuarioId", (peticion, respuesta) => {
  const usuarioId = peticion.params.usuarioId;
  const query = "CALL SP_Eliminar_Usuario(?)";
  conexion.query(query, [usuarioId], (error) => {
    if (error) {
      respuesta.status(500).json({ Error: "Error al eliminar el usuario" });
    } else {
      respuesta.json({ Estatus: "EXITOSO" });
    }
  });
});

app.put("/ActualizarReserva/:reservaId", (peticion, respuesta) => {
  const reservaId = peticion.params.reservaId;
  const { usuarioId, detallesId, fechaReserva } = peticion.body;
  const query = "CALL SP_Actualizar_Reserva(?, ?, ?)";
  conexion.query(query, [reservaId, usuarioId, detallesId, fechaReserva], (error) => {
    if (error) {
      respuesta.status(500).json({ Error: "Error al actualizar la reserva" });
    } else {
      respuesta.json({ Estatus: "EXITOSO" });
    }
  });
});

app.delete("/EliminarReserva/:reservaId", (peticion, respuesta) => {
  const reservaId = peticion.params.reservaId;
  const query = "CALL SP_Eliminar_Reserva(?)";
  conexion.query(query, [reservaId], (error) => {
    if (error) {
      respuesta.status(500).json({ Error: "Error al eliminar la reserva" });
    } else {
      respuesta.json({ Estatus: "EXITOSO" });
    }
  });
});

app.put("/ActualizarCategoria/:categoriaId", (peticion, respuesta) => {
  const categoriaId = peticion.params.categoriaId;
  const { nombreCategoria, descripcionCategoria, imagenCategoria } = peticion.body;
  const query = "CALL SP_Actualizar_Categoria(?, ?, ?, ?)";
  conexion.query(query, [categoriaId, nombreCategoria, descripcionCategoria, imagenCategoria], (error) => {
    if (error) {
      respuesta.status(500).json({ Error: "Error al actualizar la categoría" });
    } else {
      respuesta.json({ Estatus: "EXITOSO" });
    }
  });
});

app.put("/ActualizarLugar/:lugarId", (peticion, respuesta) => {
  const lugarId = peticion.params.lugarId;
  const { nombreLugar, informacionLugar, imagenesLugar } = peticion.body;
  const query = "CALL SP_Actualizar_Lugar(?, ?, ?, ?)";
  conexion.query(query, [lugarId, nombreLugar, informacionLugar, imagenesLugar], (error) => {
    if (error) {
      respuesta.status(500).json({ Error: "Error al actualizar el lugar" });
    } else {
      respuesta.json({ Estatus: "EXITOSO" });
    }
  });
});

app.put("/ActualizarDetalle/:detalleId", (peticion, respuesta) => {
  const detalleId = peticion.params.detalleId;
  const { descripcionDetalle, personasDetalle, precioDetalle, lugarId } = peticion.body;
  const query = "CALL SP_Actualizar_Detalle(?, ?, ?, ?, ?)";
  conexion.query(query, [detalleId, descripcionDetalle, personasDetalle, precioDetalle, lugarId], (error) => {
    if (error) {
      respuesta.status(500).json({ Error: "Error al actualizar el detalle" });
    } else {
      respuesta.json({ Estatus: "EXITOSO" });
    }
  });
});

app.put("/ActualizarRol/:rolId", (peticion, respuesta) => {
  const rolId = peticion.params.rolId;
  const { nombreRol, descripcionRol } = peticion.body;
  const query = "CALL SP_Actualizar_Rol(?, ?, ?)";
  conexion.query(query, [rolId, nombreRol, descripcionRol], (error) => {
    if (error) {
      respuesta.status(500).json({ Error: "Error al actualizar el rol" });
    } else {
      respuesta.json({ Estatus: "EXITOSO" });
    }
  });
});

app.put("/ActualizarUsuario/:usuarioId", (peticion, respuesta) => {
  const usuarioId = peticion.params.usuarioId;
  const { nombreUsuario, apellidoUsuario, correoUsuario, contraseniaUsuario, avatarUsuario, rolId, fecha } = peticion.body;
  const query = "CALL SP_Actualizar_Usuario(?, ?, ?, ?, ?, ?, ?, ?)";
  conexion.query(query, [usuarioId, nombreUsuario, apellidoUsuario, correoUsuario, contraseniaUsuario, avatarUsuario, rolId, fecha], (error) => {
    if (error) {
      respuesta.status(500).json({ Error: "Error al actualizar el usuario" });
    } else {
      respuesta.json({ Estatus: "EXITOSO" });
    }
  });
});

app.put("/ActualizarReserva/:reservaId", (peticion, respuesta) => {
  const reservaId = peticion.params.reservaId;
  const { usuarioId, detallesId, fechaReserva } = peticion.body;
  const query = "CALL SP_Actualizar_Reserva(?, ?, ?, ?)";
  conexion.query(query, [reservaId, usuarioId, detallesId, fechaReserva], (error) => {
    if (error) {
      respuesta.status(500).json({ Error: "Error al actualizar la reserva" });
    } else {
      respuesta.json({ Estatus: "EXITOSO" });
    }
  });
});

app.put("/EliminarAdministrador/:adminId", (peticion, respuesta) => {
  const adminId = peticion.params.adminId;
  const query = "CALL SP_Eliminar_Administrador(?)";
  conexion.query(query, [adminId], (error) => {
    if (error) {
      respuesta.status(500).json({ Error: "Error al eliminar al administrador" });
    } else {
      respuesta.json({ Estatus: "EXITOSO" });
    }
  });
});