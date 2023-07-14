import React, { useEffect, useState } from "react";
import styles from "../estilos/dashboards.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Dashboards() {
    const [valores,setValores]=useState({
        usuario:"",
    });
    const [fecha,setFecha] = useState({
        call:"",
        hora:"",
    });
    function mostrarFecha() {
        const fechaHora = new Date();
        const opcionesFecha = { year: 'numeric', month: 'long', day: 'numeric' };
        const opcionesHora = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
        setFecha({
          call: fechaHora.toLocaleDateString('es-ES', opcionesFecha),
          hora: fechaHora.toLocaleTimeString('en-US', opcionesHora),
        });
      }
    useEffect(() => {
        const intervalId = setInterval(mostrarFecha, 1000);      
        return () => {
          clearInterval(intervalId);
        };
      }, []);
    return (
        <>
            <section className={styles.componente}>
                <span className={`${styles.hora} ${styles.opcion}`}>
                    <p><i className="nf nf-seti-time_cop"></i> {fecha.hora}</p>
                    <p><i className="nf nf-fa-calendar"></i> {fecha.call}</p>
                </span>
                <span className={`${styles.estadistica} ${styles.opcion}`}>
                    
                </span>
                <span className={`${styles.usuario} ${styles.opcion}`}>
                    <p>Numero de Usuarios:</p>
                    <h3>{valores.usuario}</h3>
                </span>
                <span className={`${styles.administrador} ${styles.opcion}`}>
                    <p></p>
                    <h3></h3>
                </span>
                <span className={`${styles.detalles} ${styles.opcion}`}>
                    <p></p>
                    <h3></h3>
                </span>
                <span className={`${styles.listas} ${styles.opcion}`}>
                    <p></p>
                    <h3></h3>
                </span>
            </section>
        </>
    );
}