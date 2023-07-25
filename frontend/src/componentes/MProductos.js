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
    check: "Este campo es obligatorio",
  });
  const [registo, setRegistro] = useState([]);
  const [sub, setSub] = useState([]);
  const [clas, setClas] = useState({
    nombre: `${styles.error} ${styles.ocultar}`,
    info: `${styles.error} ${styles.ocultar}`,
    x: `${styles.error} ${styles.ocultar}`,
    y: `${styles.error} ${styles.ocultar}`,
    imagen1: `${styles.error} ${styles.ocultar}`,
    imagen2: `${styles.error} ${styles.imagenes}`,
    check: `${styles.error} ${styles.ocultar}`,
  });
  const [nArchivo1, setNarchivo1] = useState("Imagen");
  const [nArchivo2, setNarchivo2] = useState("Imagen");
  const [nArchivo3, setNarchivo3] = useState("Imagen");
  const [nArchivo4, setNarchivo4] = useState("Imagen");
  const [etiquetasSeleccionadas, setEtiquetasSeleccionadas] = useState([]);
  const [body, setBody] = useState({
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
        const lugaresRespuesta = await axios.get(
          `http://localhost:8081/api/lugares/ObtenerNumeroRegistros`
        );
        const subRespuesta = await axios.get(
          `http://localhost:8081/api/subcategorias/Subcategorias`
        );



        if (lugaresRespuesta.data.Estatus === "EXITOSO") {
          setRegistro(lugaresRespuesta.data.Resultado[0]);
        } else {
          console.log("Error obteniendo registros de lugares");
        }

        if (subRespuesta.data.Estatus === "EXITOSO") {
          setSub(subRespuesta.data.Resultado);
          console.log(sub);
        } else {
          console.log("Error obteniendo registros de lugares");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
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
    clas.x = `${styles.error} ${styles.ocultar}`;
    clas.y = `${styles.error} ${styles.ocultar}`;
    clas.check = `${styles.error} ${styles.ocultar}`;
    clas.imagen1 = `${styles.error} ${styles.ocultar}`;
    const auxiliar2 = body.x;
    let lat;
    const comprobar2 = /\./;
    if (comprobar2.test(auxiliar2)) {
      lat = body.x.split(".");
      if (lat[0].length > 2 || lat[1].length > 8) {
        if (lat[0].length > 2) {
          setClas({ ...clas, x: styles.error, });
          setTexto({ ...clas, x: "Este campo no puede tener mas de 2 numeros enteros", });
          return
        }
        if (lat[1].length > 8) {
          setClas({ ...clas, x: styles.error, });
          setTexto({ ...clas, x: "Este campo no puede tener mas de 8 numeros decimales", });
          return
        }
      }
    } else {
      lat = [body.x];
      if (lat[0].length > 2) {
        setClas({ ...clas, x: styles.error, });
        setTexto({ ...clas, x: "Este campo no puede tener mas de 2 numeros enteros", });
        return
      }
    }
    if (body.nombre && body.info && body.x && body.y) {
      const auxiliar = body.y;
      let long;
      const comprobar = /\./;
      if (comprobar.test(auxiliar)) {
        long = body.y.split(".");
        if (long[0].length > 2 || long[1].length > 8) {
          if (long[0].length > 2) {
            setClas({ ...clas, y: styles.error, });
            setTexto({ ...clas, y: "Este campo no puede tener mas de 2 numeros enteros", });
            return
          }
          if (long[1].length > 8) {
            setClas({ ...clas, y: styles.error, });
            setTexto({ ...clas, y: "Este campo no puede tener mas de 8 numeros decimales", });
            return
          }
        }
      } else {
        long = [body.y];
        if (long[0].length > 2) {
          setClas({ ...clas, y: styles.error, });
          setTexto({ ...clas, y: "Este campo no puede tener mas de 2 numeros enteros", });
          return
        }
      }
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      const etiquetas = [];
      checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
          etiquetas.push(checkbox.value);
        }
      })
      if (etiquetas.length) {
        if (
          nArchivo1 !== "Imagen" ||
          nArchivo2 !== "Imagen" ||
          nArchivo3 !== "Imagen" ||
          nArchivo4 !== "Imagen"
        ) {
          setClas({ ...clas, imagen1: `${styles.error} ${styles.ocultar}` });

          const imageness = [archivo1, archivo2, archivo3, archivo4];
          const imagenes = imageness.filter(Boolean);

          try {
            const formData = new FormData();
            imagenes.forEach((imagen, index) => {
              formData.append("imagen", imagen);
            });

            await axios.post("http://localhost:8081/api/imagenes/subirVarias", formData);
            console.log("Imágenes subidas correctamente");
            Swal("¡Éxito!", "El producto se agregó correctamente.", "success");
          } catch (error) {
            console.error("Error al subir las imágenes:", error.message);
          }
          const p_Nombre = body.nombre;
          const p_Informacion = body.info;
          const p_Imageness = [
            nArchivo1 !== "Imagen" ? "listas/" + nArchivo1 : null,
            nArchivo2 !== "Imagen" ? "listas/" + nArchivo2 : null,
            nArchivo3 !== "Imagen" ? "listas/" + nArchivo3 : null,
            nArchivo4 !== "Imagen" ? "listas/" + nArchivo4 : null,
          ].filter((element) => element !== null);

          const p_Imagenes = JSON.stringify(p_Imageness);
          const p_Descripcion = body.info;
          const p_Personas = 5;
          const p_Precio = 500.25;
          const p_Latitud = body.x;
          const p_Longitud = body.y;
          const lugarId = registo.ids + 1;

          try {
            const respuesta = await axios.post(
              `http://localhost:8081/api/lugares/AgregarLugarYDetalle`,
              {
                p_Nombre,
                p_Informacion,
                p_Imagenes,
                p_Descripcion,
                p_Personas,
                p_Precio,
                p_Latitud,
                p_Longitud
              }
            );
            etiquetas.forEach((etiqueta) => {
              axios.post(
                `http://localhost:8081/api/subcategorias/AgregarSubcategoriaLugar`,
                { lugarId, subcategoriaId: etiqueta }
              );
            });
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
              checkboxes.forEach((checkbox) => {
                checkbox.checked = false;
              });
              Swal.fire("El producto se agrego correctamente");
            }
          } catch (error) {
            console.log("Error al crear el producto: " + error);
            console.log(p_Nombre,
              p_Informacion,
              p_Imagenes,
              p_Descripcion,
              p_Personas,
              p_Precio,
              p_Latitud,
              p_Longitud)
          }
        } else {
          setClas({
            ...clas,
            imagen1: styles.error,
          });
          setTexto({ ...texto, imagen1: "Debe agregar almenos una imagen" });
        }
      } else {
        setClas({ ...clas, check: styles.error });
        setTexto({ ...clas, check: "Debe seleccionar almenos uno" });
      }
    } else {
      setClas({
        ...clas,
        nombre: body.nombre.length === 0 ? styles.error : "",
        info: body.info.length === 0 ? styles.error : "",
        x: body.x.length === 0 ? styles.error : "",
        y: body.y.length === 0 ? styles.error : "",
      });
      setTexto({
        ...clas,
        nombre: body.nombre.length === 0 ? "Este campo es obligatorio" : "",
        info: body.info.length === 0 ? "Este campo es obligatorio" : "",
        x: body.x.length === 0 ? "Este campo es obligatorio" : "",
        y: body.y.length === 0 ? "Este campo es obligatorio" : "",
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
          <div className={styles.mlista}>
            <h1 className={styles.h1}> Agregando productos</h1>
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

            <p>Informacion:</p>
            <textarea name="info" id="info" onChange={cambioEntrada}></textarea>
            <aside className={clas.info} id="aside">
              {texto.info}
            </aside>
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
            <p>Escoge sus etiquetas:</p>
            <div className={styles.etiquetas}>
              {sub.map((subcategorias, index) => {
                return (
                  <>
                    <div className={styles.check}>
                      <input type="checkbox" value={subcategorias.Id} />
                      <p>{subcategorias.Nombre}</p>
                    </div>
                  </>
                )
              })}
            </div>
            <br></br>
            <aside className={clas.check} id="aside">
              {texto.check}
            </aside>
            <p htmlFor="input">Sube las imagenes:</p>
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