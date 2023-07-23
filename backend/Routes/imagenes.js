import { Router } from "express";
import multer from "multer";
import path from "path";

const router = new Router();
const storage1 = multer.diskStorage({
  destination: "../frontend/src/images/categorias/",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const storage2 = multer.diskStorage({
  destination: "../frontend/src/images/listas/",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const storage3 = multer.diskStorage({
  destination: "../frontend/src/images/avatares/",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const uploadCategorias = multer({ storage: storage1 });
const uploadListas = multer({ storage: storage2 });
const uploudAvatares = multer({ storage: storage3 });

router.post("/subirImagenes", uploadCategorias.single("image"), (peticion, respuesta) => {
  if (!peticion.file) {
    return respuesta.status(400).json({ error: "No se ha proporcionado ninguna imagen" });
  }
  return respuesta.json({ message: "Imagen subida correctamente" });
});

router.post("/subirAvatares", uploudAvatares.single("image"), (peticion, respuesta) => {
  if (!peticion.file) {
    return respuesta.status(400).json({ error: "No se ha proporcionado ninguna imagen" });
  }
  return respuesta.json({ message: "Imagen subida correctamente" });
});

router.post("/subirVarias", uploadListas.array("imagen"), (peticion, respuesta) => {
  if (!peticion.files || peticion.files.length === 0) {
    return respuesta.status(400).json({ error: "No se han proporcionado imágenes" });
  }
  return respuesta.json({ message: "Imágenes subidas correctamente" });
});

export default router;
