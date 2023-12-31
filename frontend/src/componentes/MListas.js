import React, { useState } from "react";
import styles from "../estilos/formularios.module.css";
import axios from "axios";
import Swal from "sweetalert2";
export default function MListas() {
  const [texto, setTexto] = useState({
    nombre: "Este campo es obligatorio",
    info: "Este campo es obligatorio",
    imagen: "Este campo es obligatorio",
  });
  const [clas, setClas] = useState({
    nombre: `${styles.error} ${styles.ocultar}`,
    info: `${styles.error} ${styles.ocultar}`,
    imagen: `${styles.error} ${styles.ocultar}`,
  });
  const [nArchivo, setNarchivo] = useState("Selecciona una imagen");
  const [body, setBody] = useState({
    nombre: "",
    info: "",
  });
  const [archivo, setArchivo] = useState(null);

  const seleccionar = (e) => {
    if (e.target.files[0]) {
      setArchivo(e.target.files[0]);
      setNarchivo(e.target.files[0].name);
      document.getElementById("img").style.backgroundColor="#84c377"
    } else {
      setNarchivo("Selecciona una imagen");
      document.getElementById("img").style.backgroundColor="#fff"
    }
  };

  const subir = async () => {
    clas.info = `${styles.error} ${styles.ocultar}`;
    clas.nombre = `${styles.error} ${styles.ocultar}`;

    if (body.nombre && body.info) {
      if (nArchivo === "Selecciona una imagen") {
        setClas({ ...clas, imagen: styles.error });
        setTexto({ ...texto, imagen: "Este campo es obligatorio" });
      } else {
        setClas({ ...clas, imagen: `${styles.error} ${styles.ocultar}` });
        const imagen1 = new FormData();
        imagen1.append("image", archivo);
        try {
          const nombreCategoria = body.nombre;
          const descripcionCategoria = body.info;
          const imagenCategoria = nArchivo;
          try {
            await axios.post("http://localhost:8081/api/imagenes/subirImagenes", imagen1);
          } catch (error) {
            console.log("Error al subir la imagen: " + error);
          }

          const respuesta = await axios.post(
            "http://localhost:8081/api/categorias/AgregarCategoria",
            { nombreCategoria, descripcionCategoria, imagenCategoria }
          );

          if (respuesta.data.Estatus === "EXITOSO") {
            console.log("Categoría creada con éxito");
            setNarchivo("Selecciona una imagen");
            setBody({
              nombre: "",
              info: "",
            });
            document.getElementById("img").style.backgroundColor = "#fff";
            document.getElementById("nombre").value = "";
            document.getElementById("info").value = "";
            Swal.fire('Categoría creada con éxito');
          }
        } catch (error) {
          console.error(error);
        }
      }
    } else {
      setClas({
        ...clas,
        nombre: body.nombre.length === 0 ? styles.error : "",
        info: body.info.length === 0 ? styles.error : "",
      });
      setTexto({
        ...texto,
        nombre: body.nombre.length === 0 ? "Este campo es obligatorio" : "",
        info: body.info.length === 0 ? "Este campo es obligatorio" : "",
      });
    }
  };

  const cambioEntrada = ({ target }) => {
    const { name, value } = target;
    setBody({ ...body, [name]: value });
  };
  return (
    <>
      <div className={styles.contenedor}>
        <section className={styles.mlistas}>
          <h1 className={styles.h1}>Agregando categorias</h1>
          <label>Nombre de la categoria:</label>
          <input type="text" id="nombre" name="nombre" onChange={cambioEntrada}></input>
          <aside className={clas.nombre} id="aside">
            {texto.nombre}
          </aside>
          <label>Informacion:</label>
          <textarea name="info" id="info" onChange={cambioEntrada}></textarea>
          <aside className={clas.info} id="aside">
            {texto.info}
          </aside>
          <label htmlFor="input">Sube una imagen:</label>
          <input
            type="file"
            accept=".jpg,.jpeg,.png"
            id="inputarchivo"
            onChange={seleccionar}
          />
          <button>
            <label id="img" for="inputarchivo">Imagen</label>
          </button>
          <div className={styles.aside}>
            <aside className={clas.imagen}>{texto.imagen} </aside>
          </div>
          <div className={styles.submit}>
            <input
              type="submit"
              className={styles.verde}
              value="Subir"
              onClick={subir}
            />
          </div>
        </section>
      </div>
    </>
  );
}
