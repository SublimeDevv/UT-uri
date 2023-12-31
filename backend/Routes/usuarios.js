import { Router } from "express";
import conexion from "../dbconfig.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

const router = new Router();

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

router.get("/UsuarioActual", autenticarUsuario, (peticion, respuesta) => {
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

router.get("/ObtenerAdministradores", (peticion, respuesta) => {
  const sql = "SELECT * FROM VW_Obtener_Usuarios where RolID = 1";
  conexion.query(sql, (error, resultado) => {
    if (error) return respuesta.json([{ Error: "Error en la consulta" }]);
    return respuesta.json({ Estatus: "EXITOSO", Resultado: resultado });
  });
});

router.put("/EliminarAdministrador/:adminId", (peticion, respuesta) => {
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

router.get("/Usuarios", (peticion, respuesta) => {
  const sql = "SELECT * FROM VW_Obtener_Usuarios WHERE RolID = 2";
  conexion.query(sql, (error, resultado) => {
    if (error) return respuesta.json([{ Error: "Error en la consulta" }]);
    return respuesta.json({ Estatus: "EXITOSO", Resultado: resultado });
  });
});

router.put("/CambiarRolUsuario/:id", (peticion, respuesta) => {
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

router.delete("/EliminarUsuario/:id", (peticion, respuesta) => {
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

router.put("/ActualizarUsuario/:usuarioId", async (peticion, respuesta) => {
  const usuarioId = peticion.params.usuarioId;
  const { nombreUsuario, apellidoUsuario, correoUsuario, contraseniaUsuario, avatarUsuario, rolId, fecha } = peticion.body;
  var hash = null;
  if(contraseniaUsuario !== null) var hash = await bcrypt.hash(contraseniaUsuario, 10);
  const query = "CALL SP_Actualizar_Usuario(?, ?, ?, ?, ?, ?, ?, ?)";
  conexion.query(query, [usuarioId, nombreUsuario, apellidoUsuario, correoUsuario, hash, avatarUsuario, rolId, fecha], (error) => {
    if (error) {
      respuesta.status(500).json({ Error: "Error al actualizar el usuario" });
    } else {
      respuesta.json({ Estatus: "EXITOSO" });
    }
  });
});

router.get("/obtenerCantidad", (peticion, respuesta) => {
  const sql = "SELECT * FROM VW_Cantidad";
  conexion.query(sql, (error, resultado) => {
    if (error) return respuesta.json([{ Error: "Error en la consulta" }]);
    return respuesta.json({ Estatus: "EXITOSO", Resultado: resultado });
  });
});

// Login
router.post("/RegistrarUsuario", async (peticion, respuesta) => {
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

router.post("/IniciarSesion", (peticion, respuesta) => {
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

router.post("/VerificarCorreo", (peticion, respuesta) => {
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

export default router;
