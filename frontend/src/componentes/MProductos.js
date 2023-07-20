import React, { useEffect, useState } from "react";
import styles from "../estilos/formularios.module.css";
import axios from "axios";
import swal from "sweetalert";

export default function MProductos() {
  const [texto, setTexto] = useState({
    nombre: "Este campo es obligatorio",
    info: "Este campo es obligatorio",
    imagen1: "Este campo es obligatorio",
    imagen2: "Este campo es obligatorio",
    imagen3: "Este campo es obligatorio",
  });
  const [listas, setListas] = useState([]);
  const [clas, setClas] = useState({
    nombre: `${styles.error} ${styles.ocultar}`,
    info: `${styles.error} ${styles.ocultar}`,
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
    } else {
      setNarchivo1("Imagen");
    }
  };
  const seleccionar2 = (e) => {
    if (e.target.files[0]) {
      setArchivo2(e.target.files[0]);
      setNarchivo2(e.target.files[0].name);
    } else {
      setNarchivo2("Imagen");
    }
  };
  const seleccionar3 = (e) => {
    if (e.target.files[0]) {
      setArchivo3(e.target.files[0]);
      setNarchivo3(e.target.files[0].name);
    } else {
      setNarchivo3("Imagen");
    }
  };
  const seleccionar4 = (e) => {
    if (e.target.files[0]) {
      setArchivo4(e.target.files[0]);
      setNarchivo4(e.target.files[0].name);
    } else {
      setNarchivo4("Imagen");
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
          swal("¡Éxito!", "El producto se agregó correctamente.", "success");
        } catch (error) {
          console.error("Error al subir las imágenes:", error.message);
        }
      
        const p_Nombre = body.nombre;
        const p_Informacion = body.info;
        const p_Imagenes = '["listas/'+nArchivo1+'", "listas/'+nArchivo2+'", "listas/'+nArchivo3+'", "listas/'+nArchivo4+'"]';
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
            console.log("El producto se agrego correctamente");
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
      });
      setTexto({
        ...clas,
        ["nombre"]: body.nombre.length === 0 ? "Este campo es obligatorio" : "",
        ["info"]: body.info.length === 0 ? "Este campo es obligatorio" : "",
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
      <section className={styles.mlistas}>
        <h1 className={styles.h1}>Agregando productos</h1>
        <label>Nombre del producto:</label>
        <input type="text" name="nombre" onChange={cambioEntrada}></input>
        <aside className={clas.nombre} id="aside">
          {texto.nombre}
        </aside>
        <label>A que categoria pertence:</label>
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
        <label>Informacion:</label>
        <textarea name="info" onChange={cambioEntrada}></textarea>
        <aside className={clas.info} id="aside">
          {texto.info}
        </aside>
        <label htmlFor="input">Sube una imagen:</label>
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
              <label for="inputarchivo1">{nArchivo1}</label>
            </button>
          </div>
          <div>
            <button>
              <label for="inputarchivo2">{nArchivo2}</label>
            </button>
          </div>
          <div>
            <button>
              <label for="inputarchivo3">{nArchivo3}</label>
            </button>
          </div>
          <div>
            <button>
              <label for="inputarchivo4">{nArchivo4}</label>
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
      </section>
    </>
  );
}
