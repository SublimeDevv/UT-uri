import React, { useEffect, useState } from "react";
import styles from "../estilos/vistas.module.css";
import axios from "axios";

export default function Vadmins() {
    const [listas, setListas] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const respuesta = await axios.get(`http://localhost:8081/ObtenerUsuarios`);
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
    }, []);
    return (
        <>
            <section className={styles.vusuarios}>
                <h1>Administradores:</h1>
                <div className={styles.scroll}>
                    <table>
                        <thead>
                            <td>id</td>
                            <td>nombres</td>
                            <td>apellidos</td>
                            <td>correo</td>
                            <td>avatar</td>
                            <td>Fecha de creacion</td>
                        </thead>
                        {listas.map((lista, index) => {
                            const fecha = lista.Fecha_Creacion.split("T");
                            return (
                                <>
                                    <tr>
                                        <td>{lista.Id}</td>
                                        <td>{lista.Nombre}</td>
                                        <td>{lista.Apellido}</td>
                                        <td>{lista.Correo}</td>
                                        <td>{lista.Avatar}</td>
                                        <td>{fecha[0]}</td>
                                    </tr>
                                </>
                            );
                        })}
                    </table>
                </div>
                <div className={styles.boton}><button>Añadir</button></div>
            </section>
        </>
    );
}