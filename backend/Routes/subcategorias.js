import { Router } from "express";
import conexion from "../dbconfig.js";

const router = new Router();

router.get("/ObtenerSubcategorias/:lugarId", (peticion, respuesta) => {
  const lugarId = peticion.params.lugarId;
  const query = "CALL SP_ObtenerSubcategorias(?)";
  conexion.query(query, [lugarId], (error, resultados) => {
    if (error) {
      console.error("Error al obtener las subcategorías: ", error);
      respuesta.status(500).json({ Error: "Error al obtener las subcategorías del lugar" });
    } else {
      respuesta.json({ Estatus: "EXITOSO", Resultado: resultados[0] });
    }
  });
});

router.post("/AgregarSubcategoriaLugar", (peticion, respuesta) => {
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


router.delete("/EliminarSubcategoriaLugar/:lugarId/:subcategoriaId", (peticion, respuesta) => {
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

export default router;