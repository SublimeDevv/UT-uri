import { Router } from "express";
import conexion from "../dbconfig.js";

const router = new Router();

router.put("/ActualizarReserva/:reservaId", (peticion, respuesta) => {
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

  router.delete("/EliminarReserva/:reservaId", (peticion, respuesta) => {
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
export default router;