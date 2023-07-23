import { Router } from "express";
import conexion from "../dbconfig.js";

const router = new Router();
router.get("/ObtenerCategorias", (peticion, respuesta) => {
  const sql = "SELECT * FROM VW_Obtener_Categorias WHERE Estatus = 1;";
  conexion.query(sql, (error, resultado) => {
    if (error) return respuesta.json([{ Error: "Error en la consulta" }]);
    return respuesta.json({ Estatus: "EXITOSO", Resultado: resultado });
  });
});

router.get("/ObtenerLista", (peticion, respuesta) => {
  const sql = "SELECT Nombre FROM VW_Obtener_Categorias;";
  conexion.query(sql, (error, resultado) => {
    if (error) return respuesta.json([{ Error: "Error en la consulta" }]);
    return respuesta.json({ Estatus: "EXITOSO", Resultado: resultado });
  });
});

router.get("/Listas", (peticion, respuesta) => {
  const sql = "SELECT * FROM VW_Obtener_Categorias WHERE Estatus = 1";
  conexion.query(sql, (error, resultado) => {
    if (error) return respuesta.json([{ Error: "Error en la consulta" }]);
    return respuesta.json({ Estatus: "EXITOSO", Resultado: resultado });
  });
});

router.post("/AgregarCategoria", (peticion, respuesta) => {
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

router.delete("/EliminarCategoria/:categoriaId", (peticion, respuesta) => {
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

router.put("/OcultarCategoria/:categoriaId", (peticion, respuesta) => {
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

router.put("/ActualizarCategoria/:categoriaId", (peticion, respuesta) => {
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

router.get("/AltasCategorias", (peticion, respuesta) => {
  const sql = "SELECT * FROM VW_Obtener_Categorias WHERE Estatus = 0;";
  conexion.query(sql, (error, resultado) => {
    if (error) return respuesta.json([{ Error: "Error en la consulta" }]);
    return respuesta.json({ Estatus: "EXITOSO", Resultado: resultado });
  });
});

router.put("/AltaCategoria/:categoriaId", (peticion, respuesta) => {
  const categoriaId = peticion.params.categoriaId;
  const query = "CALL SP_Alta_Categoria(?)";
  conexion.query(query, [categoriaId], (error) => {
    if (error) {
      respuesta.status(500).json({ Error: "Error al ocultar la categoría" });
    } else {
      respuesta.json({ Estatus: "EXITOSO" });
    }
  });
});

export default router;
