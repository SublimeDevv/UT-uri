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

router.get("/ObtenerLugarSubcategorias/:nombreLugar", (peticion, respuesta) => {
  const nombreLugar = peticion.params.nombreLugar;
  const query = "CALL SP_ObtenerLugarCategorias(?)";
  conexion.query(query, [nombreLugar], (error, resultados) => {
    if (error) {
      console.error("Error al obtener las subcategorías: ", error);
      respuesta.status(500).json({ Error: "Error al obtener las subcategorías del lugar" });
    } else {
      respuesta.json({ Estatus: "EXITOSO", Resultado: resultados[0] });
    }
  });
});

router.get("/Subcategorias", (peticion, respuesta) => {
  const query = "SELECT * FROM VW_Obtener_Etiquetas";
  conexion.query(query, (error, resultados) => {
    if (error) {
      console.error("Error al obtener las subcategorías: ", error);
      respuesta.status(500).json({ Error: "Error al obtener las subcategorías del lugar" });
    } else {
      respuesta.json({ Estatus: "EXITOSO", Resultado: resultados });
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

  router.post("/CrearSubcategoria", (peticion, respuesta) => {
    const { Nombre, Descripcion, CategoriaID } = peticion.body;
    const query = "CALL  SP_CrearSubcategorias(?, ?, ?)";
    conexion.query(query, [Nombre, Descripcion, CategoriaID], (error) => {
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




  router.put("/ModificarSubcategoria/:subcategoriaId", (peticion, respuesta) => {
    const subcategoriaId = peticion.params.subcategoriaId;
    const { Nombre, Descripcion } = peticion.body;
    const query = "CALL SP_Modificar_Subcategoria(?, ?, ?)";  
    conexion.query(query, [subcategoriaId, Nombre, Descripcion], (error) => {
      if (error) {
        console.error("Error al modificar la subcategoría: ", error);
        respuesta.status(500).json({ Error: "Error al modificar la subcategoría" });
      } else {
        respuesta.json({ Estatus: "EXITOSO", Mensaje: "Subcategoría modificada correctamente." });
      }
    });
  });
  router.put("/ModificarSubcategoria/:subcategoriaId", (peticion, respuesta) => {
    const subcategoriaId = peticion.params.subcategoriaId;
    const { Nombre, Descripcion } = peticion.body;
    const query = "CALL SP_Modificar_Subcategoria(?, ?, ?)";  
    conexion.query(query, [subcategoriaId, Nombre, Descripcion], (error) => {
      if (error) {
        console.error("Error al modificar la subcategoría: ", error);
        respuesta.status(500).json({ Error: "Error al modificar la subcategoría" });
      } else {
        respuesta.json({ Estatus: "EXITOSO", Mensaje: "Subcategoría modificada correctamente." });
      }
    });
  });
  
  


export default router;