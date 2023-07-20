import React, { useEffect, useState } from "react";
import styles from "../estilos/dashboards.module.css";
import axios from "axios";
import Vusuarios from "./Vusuarios";
import Vadmins from "./Vadmins";
import Vlistas from "./Vlistas";
import Vproductos from "./Vproductos";
import Usuario from "./Usuario";
import Producto from "./Producto";
import Categorias from "./Categorias";

export default function Dashboards({ components }) {
  const redirigir = (componente) => {
    components(componente);
  };
  const [valores, setValores] = useState({
    usuario: "Numero",
    admin: "Numero",
    lista: "Numero",
    detalles: "Numero",
  });
  const [fecha, setFecha] = useState({
    call: "",
    hora: "",
  });
  function mostrarFecha() {
    const fechaHora = new Date();
    const opcionesFecha = { year: "numeric", month: "long", day: "numeric" };
    const opcionesHora = {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };
    setFecha({
      call: fechaHora.toLocaleDateString("es-ES", opcionesFecha),
      hora: fechaHora.toLocaleTimeString("en-US", opcionesHora),
    });
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const respuesta = await axios.get(
          `http://localhost:8081/obtenerCantidad`
        );
        if (respuesta.data.Estatus === "EXITOSO") {
          setValores({
            usuario: respuesta.data.Resultado[0].usuarios,
            admin: respuesta.data.Resultado[0].administradores,
            lista: respuesta.data.Resultado[0].categorias,
            detalles: respuesta.data.Resultado[0].viajes,
          });
        } else {
          console.log("Error");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    const intervalId = setInterval(mostrarFecha, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return (
    <>
      <section className={styles.componente}>
        <span className={`${styles.hora} ${styles.opcion3}`}>
          <p>
            <i className="nf nf-seti-time_cop"></i> {fecha.hora}
          </p>
          <p>
            <i className="nf nf-fa-calendar"></i> {fecha.call}
          </p>
        </span>
        <span className={`${styles.estadistica} ${styles.opcion3}`}></span>
        <span
          className={`${styles.usuario} ${styles.opcion}`}
          onClick={() => redirigir(<Usuario />)}
        >
          <h3>{valores.usuario} Usuarios</h3>
        </span>
        <span
          className={`${styles.administrador} ${styles.opcion}`}
          onClick={() => redirigir(<Vadmins />)}
        >
          <h3>{valores.admin} Admins</h3>
        </span>
        <span
          className={`${styles.detalles} ${styles.opcion}`}
          onClick={() => redirigir(<Producto />)}
        >
          <h3>{valores.detalles} Lugares</h3>
        </span>
        <span
          className={`${styles.listas} ${styles.opcion}`}
          onClick={() => redirigir(<Categorias />)}
        >
          <h3>{valores.lista} Categorias</h3>
        </span>
      </section>
    </>
  );
}
