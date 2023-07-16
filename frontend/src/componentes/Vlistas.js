import React, { useEffect, useState } from "react";
import styles from "../estilos/vistas.module.css";
import axios from "axios";

export default function Vlistas() {
    const [listas, setListas] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const respuesta = await axios.get(`http://localhost:8081/Listas`);
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
                <h1>Categorias:</h1>
                <div className={styles.scroll}>
                    <table>
                        <thead>
                            <td>Id</td>
                            <td>nombre</td>
                            <td>Descripcion</td>
                            <td>imagen</td>
                        </thead>
                        {listas.map((lista, index) => {
                            return (
                                <>
                                    <tr>
                                        <td>{lista.Id}</td>
                                        <td>{lista.Nombre}</td>
                                        <td>{lista.Descripcion}</td>
                                        <td>{lista.Imagen}</td>
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