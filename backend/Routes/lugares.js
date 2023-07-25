import { Router } from "express";
import conexion from "../dbconfig.js";

const router = new Router();

router.post("/AgregarLugar", (peticion, respuesta) => {
  const { nombreLugar, informacionLugar, imagenesLugar } = peticion.body;
  const query = "CALL SP_Agregar_Lugar(?, ?, ?)";
  conexion.query(query, [nombreLugar, informacionLugar, imagenesLugar], (error) => {
    if (error) {
      respuesta.status(500).json({ Error: "Error al agregar el lugar" });
    } else {
      respuesta.json({ Estatus: "EXITOSO" });
    }
  });
});

router.delete("/EliminarLugar/:lugarId", (peticion, respuesta) => {
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

router.put("/OcultarLugar/:lugarId", (peticion, respuesta) => {
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

router.get("/ObtenerProductos", (peticion, respuesta) => {
  const sql = "SELECT * from VW_Obtener_Relacion WHERE Estatus = 1 group by Id";
  conexion.query(sql, (error, resultado) => {
    if (error) return respuesta.json([{ Error: "Error en la consulta" }]);
    return respuesta.json({ Estatus: "EXITOSO", Resultado: resultado });
  });
});

router.get("/ObtenerViajes/:id", (peticion, respuesta) => {
  const id = peticion.params.id;
  const sql = "SELECT Id, CategoriaDescripcion as Descripcion, Informacion, CategoriaImagen as Imagen, Imagenes, CategoriasNombre as NombreCategoria, Nombre as NombreLugar FROM VW_Obtener_Relacion WHERE CategoriasNombre = ? AND Estatus = 1 group by Id";
  conexion.query(sql, [id], (error, resultado) => {
    if (error) return respuesta.status(500).json([{ Error: "Error en la consulta" }]);
    return respuesta.json({ Estatus: "EXITOSO", Resultado: resultado });
  });
});

router.get("/ObtenerDetalles/:id", (peticion, respuesta) => {
  const id = peticion.params.id;
  const sql = "select Id, Nombre, Informacion as Descripcion, Imagenes, Estatus, Latitud, Longitud, CategoriasNombre as CategoriaNombre from VW_Obtener_Relacion where id = ? AND Estatus = 1 group by Id";
  conexion.query(sql, [id], (error, resultado) => {
    if (error) return respuesta.status(500).json([{ Error: "Error en la consulta" }]);
    return respuesta.json({ Estatus: "EXITOSO", Resultado: resultado });
  });
});

router.get("/ObtenerSubcategorias/:id", (peticion, respuesta) => {
  const id = peticion.params.id;
  const sql = "Select SubcategoriasNombre, SubcategoriaID from VW_Obtener_Relacion where LugarID = ? and SubcategoriasEstatus = 1 ";
  conexion.query(sql,[id], (error, resultado) => {
    if (error) return respuesta.json([{ Error: "Error en la consulta" }]);
    return respuesta.json({ Estatus: "EXITOSO", Resultado: resultado });
  });
});

router.get("/ObtenerCategorias/:id", (peticion, respuesta) => {
  const id = peticion.params.id;
  const sql = "select CategoriasId as Id, CategoriasNombre as Nombre from VW_Obtener_Relacion where Id = ? and CategoriaEstatus = 1 group by CategoriasNombre";
  conexion.query(sql,[id], (error, resultado) => {
    if (error) return respuesta.json([{ Error: "Error en la consulta" }]);
    return respuesta.json({ Estatus: "EXITOSO", Resultado: resultado });
  });
});

router.get("/Subcategorias/:id", (peticion, respuesta) => {
  const id = peticion.params.id;
  const sql = "Select * from VW_Obtener_Relacion where SubcategoriasId = ? and SubcategoriasEstatus = 1";
  conexion.query(sql,[id], (error, resultado) => {
    if (error) return respuesta.json([{ Error: "Error en la consulta" }]);
    return respuesta.json({ Estatus: "EXITOSO", Resultado: resultado });
  });
});

router.get("/ObtenerNumeroRegistros", (peticion, respuesta) => {
  const sql = "SELECT count(*) AS ids from lugares group by @@identity";
  conexion.query(sql,(error, resultado) => {
    if (error) return respuesta.json([{ Error: "Error en la consulta" }]);
    return respuesta.json({ Estatus: "EXITOSO", Resultado: resultado });
  });
});

router.post("/AgregarDetalle", (peticion, respuesta) => {
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

router.delete("/EliminarDetalle/:detalleId", (peticion, respuesta) => {
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

router.post("/AgregarLugarYDetalle", (peticion, respuesta) => {
  const { p_Nombre, p_Informacion, p_Imagenes, p_Descripcion, p_Personas, p_Precio, p_Latitud, p_Longitud } = peticion.body;
  const query = "CALL SP_Crear_Lugar_Detalle(?, ?, ?, ?, ?, ?, ?, ?)";
  conexion.query(query, [p_Nombre, p_Informacion, p_Imagenes, p_Descripcion, p_Personas, p_Precio, p_Latitud, p_Longitud], (error) => {
    if (error) {
      respuesta.status(500).json({ Error: "Error al agregar el lugar y detalle" });
    } else {
      respuesta.json({ Estatus: "EXITOSO" });
    }
  });
});

router.get("/AltasProductos", (peticion, respuesta) => {
  const sql = "SELECT * from VW_Obtener_Relacion WHERE Estatus = 0";
  conexion.query(sql, (error, resultado) => {
    if (error) return respuesta.json([{ Error: "Error en la consulta" }]);
    return respuesta.json({ Estatus: "EXITOSO", Resultado: resultado });
  });
});

router.put("/AltaProductos/:categoriaId", (peticion, respuesta) => {
  const categoriaId = peticion.params.categoriaId;
  const query = "CALL SP_Alta_Lugar(?)";
  conexion.query(query, [categoriaId], (error) => {
    if (error) {
      respuesta.status(500).json({ Error: "Error al ocultar la categoría" });
    } else {
      respuesta.json({ Estatus: "EXITOSO" });
    }
  });
});

router.put("/ActualizarLugar/:lugarId", (peticion, respuesta) => {
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

router.put("/ActualizarDetalle/:detalleId", (peticion, respuesta) => {
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

export default router;
