import React, { useEffect, useState } from "react";
import styles from "../estilos/vistas.module.css";
import axios from "axios";

export default function Vproductos() {
    const [listas, setListas] = useState([]);
    const [modifiedRows, setModifiedRows] = useState({});
    const [botones, setBotones] = useState(false);
    const [needsUpdate, setNeedsUpdate] = useState(false);
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
        if (needsUpdate) {
            setNeedsUpdate(false);
            fetchData();
        }
    }, [needsUpdate]);

    const borrar = async (valor) => {
        const lugarId = valor;
        try {
            const respuesta = await axios.delete(`http://localhost:8081/EliminarLugar/${lugarId}`);
            if (respuesta.data.Estatus === "EXITOSO") {
                console.log("Categoria eliminada correctamente");
                setNeedsUpdate(true);
            } else {
                console.log("Error al eliminar la categoria")
            }
        } catch (error) {
            console.log(error)
        }
    }
    const cancelar = (valor) => {
        let nombre = document.getElementById("1" + valor);
        let descripcion = document.getElementById("2" + valor);
        nombre.style.border = "none";
        descripcion.style.border = "none";
        setModifiedRows((prevModifiedRows) => ({
            ...prevModifiedRows,
            [valor]: false,
        }));
        setBotones(false);
    }
    const enviar = async (valor) => {
        let nombre = document.getElementById("1" + valor);
        let descripcion = document.getElementById("2" + valor);
        nombre.style.border = "none";
        descripcion.style.border = "none";
        const lugarId = valor;
        const nombreLugar = nombre.value;
        const informacionLugar = descripcion.value;
        const categoriaId = null;
        try {
            const respuesta = await axios.put(`http://localhost:8081/ActualizarLugar/${lugarId}`, {nombreLugar, informacionLugar, categoriaId })
            console.log(respuesta.data)
            if (respuesta.data.Estatus === "EXITOSO") {
                console.log("Se modifico el usuario");
                setNeedsUpdate(true);
            } else {
                console.log("Error al modificar al usuario")
            }
        } catch (error) {
            console.log("Error del usuario")
        }
        setModifiedRows((prevModifiedRows) => ({
            ...prevModifiedRows,
            [valor]: false,
        }));
        setBotones(false);
    }
    const modificar = (valor) => {
        let nombre = document.getElementById("1" + valor);
        let descripcion = document.getElementById("2" + valor);
        nombre.style.border = "2px solid #131a22";
        descripcion.style.border = "2px solid #131a22";
        nombre.addEventListener('input', function () {
            const nuevoValor = nombre.value;
            nombre.value = nuevoValor;
        });
        descripcion.addEventListener('input', function () {
            const nuevoValor = descripcion.value;
            descripcion.value = nuevoValor;
        });
        setModifiedRows((prevModifiedRows) => ({
            ...prevModifiedRows,
            [valor]: true,
        }));
        setBotones(true);
    }
    return (
        <>
            <section className={styles.vusuarios}>
                <h1>Viajes:</h1>
                <div className={styles.scroll}>
                    <table>
                        <thead>
                            <td>Modificar</td>
                            <td>Id</td>
                            <td>nombre</td>
                            <td>Descripcion</td>
                            <td>nombre categorias</td>
                            <td>Borrar</td>
                        </thead>
                        {listas.map((lista, index) => {
                            const valor = lista.Id;
                            return (
                                <>
                                    <tr>
                                        <td>
                                            {!modifiedRows[valor] ? (
                                                <button disabled={botones} onClick={() => modificar(valor)}><i class="nf nf-md-lead_pencil"></i></button>
                                            ) : (
                                                <div className={styles.botones}>
                                                    <button onClick={() => cancelar(valor)}><i class="nf nf-oct-x"></i></button>
                                                    <button onClick={() => enviar(valor)}><i class="nf nf-cod-check"></i></button>
                                                </div>
                                            )}
                                        </td>
                                        <td>{lista.Id}</td>
                                        <td><input type="text" id={"1" + lista.Id} disabled={!modifiedRows[valor]} value={lista.NombreLugar} /></td>
                                        <td><textarea id={"2" + lista.Id} disabled={!modifiedRows[valor]} value={lista.Descripcion} /></td>
                                        <td>{lista.NombreCategoria}</td>
                                        <td><button disabled={botones} onClick={() => borrar(valor)}><i class="nf nf-cod-trash"></i></button></td>
                                    </tr>
                                </>
                            );
                        })}
                    </table>
                </div>
            </section>
        </>
    );
}