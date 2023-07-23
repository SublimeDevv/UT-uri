import React, { useEffect, useState, useContext } from "react";
import styles from "../estilos/formularios.module.css";
import axios from "axios";
import { UserContext } from "../UserContext";
import Swal from "sweetalert2";

export default function MAdministradores() {
  const { usuario } = useContext(UserContext)
  const [id, setID] = useState(7);
  const [needsUpdate, setNeedsUpdate] = useState(false);
  const [listas, setListas] = useState([]);
  const [boton, setBoton] = useState(
    <button disabled>Borrar Administrador</button>
  );

  const seleccionar = (id, event) => {
    setID(id);
    setBoton(<button onClick={() => borrar(id)}>Borrar Administrador</button>);
  };

  const borrar = async (adminId) => {
    if (usuario.Id === adminId) return Swal.fire({
      icon: "error",
      title: "No puedes eliminarte a ti mismo.",
    });
    try {
      const respuesta = await axios.put(
        `http://localhost:8081/api/usuarios/EliminarAdministrador/${adminId}`
      );
      if (respuesta.data.Estatus === "EXITOSO") {
        console.log("Administrador eliminado");
        fetchData(); 
      }
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  const handleClickOutside = (event) => {
    if (!event.target.closest("span")) {
      setBoton(<button disabled>Borrar Administrador</button>);
    }
  };

  const fetchData = async () => {
    try {
      const respuesta = await axios.get(
        "http://localhost:8081/api/usuarios/ObtenerAdministradores"
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

  useEffect(() => {
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
              <span
                key={lista.Id}
                tabIndex="0"
                className={styles.contAdmin}
                onClick={(event) => {
                  seleccionar(lista.Id, event);
                }}
              >
                <img
                  src={require(`../images/avatares/${lista.Avatar}`)}
                  alt="Imagen de administrador"
                />
                <p className={styles.p}>{lista.Nombre}</p>
                <p className={styles.p}>{lista.Apellido}</p>
              </span>
            );
          })}
        </div>
        {boton}
      </section>
    </>
  );
}
