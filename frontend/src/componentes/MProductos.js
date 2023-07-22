import React, { useEffect, useState } from "react";
import styles from "../estilos/formularios.module.css";
import axios from "axios";
import Swal from "sweetalert2";

export default function MProductos() {
  const [texto, setTexto] = useState({
    nombre: "Este campo es obligatorio",
    info: "Este campo es obligatorio",
    imagen1: "Este campo es obligatorio",
    imagen2: "Este campo es obligatorio",
    imagen3: "Este campo es obligatorio",
    x: "Este campo es obligatorio",
    y: "Este campo es obligatorio",
  });
  const [listas, setListas] = useState([]);
  const [clas, setClas] = useState({
    nombre: `${styles.error} ${styles.ocultar}`,
    info: `${styles.error} ${styles.ocultar}`,
    x: `${styles.error} ${styles.ocultar}`,
    y: `${styles.error} ${styles.ocultar}`,
    imagen1: `${styles.error} ${styles.ocultar}`,
    imagen2: `${styles.error} ${styles.imagenes}`,
  });
  const [nArchivo1, setNarchivo1] = useState("Imagen");
  const [nArchivo2, setNarchivo2] = useState("Imagen");
  const [nArchivo3, setNarchivo3] = useState("Imagen");
  const [nArchivo4, setNarchivo4] = useState("Imagen");
  const [body, setBody] = useState({
    id: "1",
    nombre: "",
    info: "",
    x: "",
    y: "",
  });
  const [archivo1, setArchivo1] = useState(null);
  const [archivo2, setArchivo2] = useState(null);
  const [archivo3, setArchivo3] = useState(null);
  const [archivo4, setArchivo4] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const respuesta = await axios.get(
          `http://localhost:8081/ObtenerCategorias`
        );
        if (respuesta.data.Estatus === "EXITOSO") {
          setListas(respuesta.data.Resultado);
        } else {
          console.log("Error");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  });
  const seleccionar1 = (e) => {
    if (e.target.files[0]) {
      setArchivo1(e.target.files[0]);
      setNarchivo1(e.target.files[0].name);
      document.getElementById("img1").style.backgroundColor = "#84c377";
    } else {
      setNarchivo1("Imagen");
      document.getElementById("img1").style.backgroundColor = "#fff";
    }
  };
  const seleccionar2 = (e) => {
    if (e.target.files[0]) {
      setArchivo2(e.target.files[0]);
      setNarchivo2(e.target.files[0].name);
      document.getElementById("img2").style.backgroundColor = "#84c377";
    } else {
      setNarchivo2("Imagen");
      document.getElementById("img2").style.backgroundColor = "#fff";
    }
  };
  const seleccionar3 = (e) => {
    if (e.target.files[0]) {
      setArchivo3(e.target.files[0]);
      setNarchivo3(e.target.files[0].name);
      document.getElementById("img3").style.backgroundColor = "#84c377";
    } else {
      setNarchivo3("Imagen");
      document.getElementById("img3").style.backgroundColor = "#fff";
    }
  };
  const seleccionar4 = (e) => {
    if (e.target.files[0]) {
      setArchivo4(e.target.files[0]);
      setNarchivo4(e.target.files[0].name);
      document.getElementById("img4").style.backgroundColor = "#84c377";
    } else {
      setNarchivo4("Imagen");
      document.getElementById("img3").style.backgroundColor = "#fff";
    }
  };
  const subir = async () => {
    clas.info = `${styles.error} ${styles.ocultar}`;
    clas.nombre = `${styles.error} ${styles.ocultar}`;
    if (body.nombre && body.info) {
      if (
        nArchivo1 !== "Imagen" &&
        nArchivo2 !== "Imagen" &&
        nArchivo3 !== "Imagen" &&
        nArchivo4 !== "Imagen"
      ) {
        setClas({ ...clas, ["imagen1"]: `${styles.error} ${styles.ocultar}` });

        const imagenes = [archivo1, archivo2, archivo3, archivo4];

        try {
          const formData = new FormData();
          imagenes.forEach((imagen, index) => {
            formData.append("imagen", imagen);
          });

          await axios.post("http://localhost:8081/subirVarias", formData);
          console.log("Imágenes subidas correctamente");
          Swal("¡Éxito!", "El producto se agregó correctamente.", "success");
        } catch (error) {
          console.error("Error al subir las imágenes:", error.message);
        }

        const p_Nombre = body.nombre;
        const p_Informacion = body.info;
        const p_Imagenes =
          '["listas/' +
          nArchivo1 +
          '", "listas/' +
          nArchivo2 +
          '", "listas/' +
          nArchivo3 +
          '", "listas/' +
          nArchivo4 +
          '"]';
        const p_CategoriaID = body.id;
        const p_Descripcion = body.info;
        const p_Personas = 5;
        const p_Precio = 500.25;

        try {
          const respuesta = await axios.post(
            `http://localhost:8081/AgregarLugarYDetalle`,
            {
              p_Nombre,
              p_Informacion,
              p_Imagenes,
              p_CategoriaID,
              p_Descripcion,
              p_Personas,
              p_Precio,
            }
          );
          if (respuesta.data.Estatus === "EXITOSO") {
            setNarchivo1("Imagen");
            setNarchivo2("Imagen");
            setNarchivo3("Imagen");
            setNarchivo4("Imagen");
            document.getElementById("img1").style.backgroundColor = "#fff";
            document.getElementById("img2").style.backgroundColor = "#fff";
            document.getElementById("img3").style.backgroundColor = "#fff";
            document.getElementById("img4").style.backgroundColor = "#fff";
            document.getElementById("nombre").value = "";
            document.getElementById("info").value = "";
            document.getElementById("x").value = "";
            document.getElementById("y").value = "";
            Swal.fire("El producto se agrego correctamente", "success");
          }
        } catch (error) {
          console.log("Error al crear el producto: " + error);
        }
      } else {
        setClas({
          ...clas,
          ["imagen1"]: styles.error,
        });
        setTexto({ ...texto, ["imagen1"]: "Estos campos son obligatorios" });
      }
    } else {
      setClas({
        ...clas,
        ["nombre"]: body.nombre.length === 0 ? styles.error : "",
        ["info"]: body.info.length === 0 ? styles.error : "",
        ["x"]: body.x.length === 0 ? styles.error : "",
        ["y"]: body.y.length === 0 ? styles.error : "",
      });
      setTexto({
        ...clas,
        ["nombre"]: body.nombre.length === 0 ? "Este campo es obligatorio" : "",
        ["info"]: body.info.length === 0 ? "Este campo es obligatorio" : "",
        ["x"]: body.x.length === 0 ? "Este campo es obligatorio" : "",
        ["y"]: body.y.length === 0 ? "Este campo es obligatorio" : "",
      });
    }
  };
  const cambioEntrada = ({ target }) => {
    const { name, value } = target;
    setBody({ ...body, [name]: value });
  };
  const seleccion = (e) => {
    setBody({ ...body, ["id"]: e.target.value });
  };
  return (
    <>
      <div className={styles.contenedor}>
        <section className={styles.mlistas}>
          <div className={styles.mlista}>
            <h1 className={styles.h1}>Agregando productos</h1>
            <p>Nombre del producto:</p>
            <input
              type="text"
              id="nombre"
              name="nombre"
              onChange={cambioEntrada}
            ></input>
            <aside className={clas.nombre} id="aside">
              {texto.nombre}
            </aside>
            <p>A que categoria pertence:</p>
            <div className={styles.select}>
              <select>
                {listas.map((lista, index) => {
                  return (
                    <>
                      <option value={lista.Id} onClick={seleccion}>
                        {lista.Nombre}
                      </option>
                    </>
                  );
                })}
              </select>
            </div>

            <p>Informacion:</p>
            <textarea name="info" id="info" onChange={cambioEntrada}></textarea>
            <aside className={clas.info} id="aside">
              {texto.info}
            </aside>
            <p htmlFor="input">Sube una imagen:</p>
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              id="inputarchivo1"
              onChange={seleccionar1}
            />
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              id="inputarchivo2"
              onChange={seleccionar2}
            />
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              id="inputarchivo3"
              onChange={seleccionar3}
            />
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              id="inputarchivo4"
              onChange={seleccionar4}
            />
            <span className={styles.imagenes}>
              <div>
                <button>
                  <label id="img1" for="inputarchivo1">
                    Imagen
                  </label>
                </button>
              </div>
              <div>
                <button>
                  <label id="img2" for="inputarchivo2">
                    Imagen
                  </label>
                </button>
              </div>
              <div>
                <button>
                  <label id="img3" for="inputarchivo3">
                    Imagen
                  </label>
                </button>
              </div>
              <div>
                <button>
                  <label id="img4" for="inputarchivo4">
                    Imagen
                  </label>
                </button>
              </div>
            </span>
            <div className={styles.aside2}>
              <aside className={clas.imagen1}>{texto.imagen1} </aside>
            </div>
            <p>Coordenadas:</p>
            <div className={styles.coordenada}>
              <div className={styles.coordenadas}>
                <input
                  type="number"
                  placeholder="Coordenada X"
                  id="x"
                  name="x"
                  onChange={cambioEntrada}
                ></input>
                <aside className={clas.x} id="aside">
                  {texto.x}
                </aside>
              </div>

              <div className={styles.coordenadas}>
                <input
                  placeholder="Coordenada Y"
                  type="number"
                  name="y" 
                  id="y"
                  onChange={cambioEntrada}
                ></input>
                <aside className={clas.y} id="aside">
                  {texto.y}
                </aside>
              </div>
            </div>

            <div className={styles.submit}>
              <input
                type="submit"
                className={styles.verde}
                value="Subir"
                onClick={subir}
              />
            </div>
          </div>

        </section>
      </div>
    </>
  );
}
