import { Router } from "express";
import conexion from "../dbconfig.js";

const router = new Router();

router.post("/AgregarRol", (peticion, respuesta) => {
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
  
  router.delete("/EliminarRol/:rolId", (peticion, respuesta) => {
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

export default router;