import React, { useEffect, useState } from "react";
import styles from "../estilos/formularios.module.css";
import axios from "axios";

export default function MAdministradores() {
  const [id, setID] = useState(7);
  const [needsUpdate, setNeedsUpdate] = useState(false);
  const [listas, setListas] = useState([]);
  const [boton, setBoton] = useState(
    <button disabled>Borrar Administrador</button>
  );
  const seleccionar = (id, event) => {
    setID(id);
    setBoton(<button onClick={()=>{borrar()}}>Borrar Administrador</button>);
  };
  const borrar = async () => {
    const usuarioId = { id };
    try {
      const respuesta = await axios.delete(`http://localhost:8081/EliminarUsuario/${usuarioId}`);
      if (respuesta.data.Estatus === "EXITOSO") {
        console.log("Admin eliminado correctamente");
        setNeedsUpdate(true);
      } else {
        console.log("Error al eliminar admin")
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleClickOutside = (event) => {
    if (!event.target.closest("span")) {
      setBoton(<button disabled>Borrar Administrador</button>);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const respuesta = await axios.get(
          `http://localhost:8081/ObtenerUsuarios`
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
    if (needsUpdate) {
      setNeedsUpdate(false);
      fetchData();
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [needsUpdate]);
  return (
    <>
      <section className={styles.madmin}>
        <h2>Administradores:</h2>
        <div className={styles.administradores}>
          {listas.map((lista, index) => {
            return (
              <>
                <span
                  tabIndex="0"
                  className={styles.contAdmin}
                  id={lista.id}
                  onClick={(event) => {
                    seleccionar(lista.id, event);
                  }}
                >
                  <img
                    src={require("../images/avatares/" + lista.Avatar)}
                    alt="Imagen de administrador"
                  />
                  <p className={styles.p}>{lista.Nombre}</p>
                  <p className={styles.p}>{lista.Apellido}</p>
                </span>
              </>
            );
          })}
        </div>
        {boton}
      </section>
    </>
  );
}
