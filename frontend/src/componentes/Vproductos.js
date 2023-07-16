import React, { useEffect, useState } from "react";
import styles from "../estilos/vistas.module.css";
import axios from "axios";

export default function Vproductos() {
    const [listas, setListas] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const respuesta = await axios.get(`http://localhost:8081/ObtenerProductos`);
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
                <h1>Viajes:</h1>
                <div className={styles.scroll}>
                    <table>
                        <thead>
                            <td>Id</td>
                            <td>nombre</td>
                            <td>Descripcion</td>
                            <td>nombre categorias</td>
                        </thead>
                        {listas.map((lista, index) => {
                            return (
                                <>
                                    <tr>
                                        <td>{lista.Id}</td>
                                        <td>{lista.NombreLugar}</td>
                                        <td>{lista.Descripcion}</td>
                                        <td>{lista.NombreCategoria}</td>
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