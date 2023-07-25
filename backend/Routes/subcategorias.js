import { Router } from "express";
import conexion from "../dbconfig.js";

const router = new Router();

router.get("/ObtenerSubcategorias/:lugarId", (peticion, respuesta) => {
  const lugarId = peticion.params.lugarId;
  const query = "Select SubcategoriasNombre from VW_Obtener_Relacion where LugarID = ? and SubcategoriasEstatus = 1 ";
  conexion.query(query, [lugarId], (error, resultados) => {
    if (error) {
      console.error("Error al obtener las subcategorías: ", error);
      respuesta.status(500).json({ Error: "Error al obtener las subcategorías del lugar" });
    } else {
      respuesta.json({ Estatus: "EXITOSO", Resultado: resultados[0] });
    }
  });
});

router.get("/ObtenerSubcategoria", (peticion, respuesta) => {
  const query = "Select * from VW_Obtener_Etiquetas where Estatus = 1";
  conexion.query(query, (error, resultados) => {
    if (error) {
      console.error("Error al obtener las subcategorías: ", error);
      respuesta.status(500).json({ Error: "Error al obtener las subcategorías del lugar" });
    } else {
      respuesta.json({ Estatus: "EXITOSO", Resultado: resultados });
    }
  });
});

router.get("/ObtenerSubcategoriaBaja", (peticion, respuesta) => {
  const query = "Select * from VW_Obtener_Etiquetas where Estatus = 0";
  conexion.query(query, (error, resultados) => {
    if (error) {
      console.error("Error al obtener las subcategorías: ", error);
      respuesta.status(500).json({ Error: "Error al obtener las subcategorías del lugar" });
    } else {
      respuesta.json({ Estatus: "EXITOSO", Resultado: resultados });
    }
  });
});

router.get("/Subcategorias", (peticion, respuesta) => {
  const query = "SELECT * FROM VW_Obtener_Etiquetas where Estatus = 1";
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

  router.put("/OcultarSubcategoria/:subcategoriaId", (peticion, respuesta) => {
    const subcategoriaId = peticion.params.subcategoriaId;
    const query = "CALL SP_OcultarSubcategoria(?)";
    conexion.query(query, [subcategoriaId], (error) => {
      if (error) {
        console.error("Error al ocultar la subcategoría: ", error);
        respuesta.status(500).json({ Error: "Error al ocultar la subcategoría" });
      } else {
        respuesta.json({ Estatus: "EXITOSO", Mensaje: "Subcategoría ocultada correctamente." });
      }
    });
  });

  router.put("/MostrarSubcategoria/:subcategoriaId", (peticion, respuesta) => {
    const subcategoriaId = peticion.params.subcategoriaId;
    const query = "CALL SP_MostrarSubcategoria(?)";
    conexion.query(query, [subcategoriaId], (error) => {
      if (error) {
        console.error("Error al ocultar la subcategoría: ", error);
        respuesta.status(500).json({ Error: "Error al ocultar la subcategoría" });
      } else {
        respuesta.json({ Estatus: "EXITOSO", Mensaje: "Subcategoría ocultada correctamente." });
      }
    });
  });

export default router;