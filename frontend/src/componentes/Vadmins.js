import React, { useEffect, useState } from "react";
import styles from "../estilos/vistas.module.css";
import axios from "axios";

export default function Vadmins() {
    const [needsUpdate, setNeedsUpdate] = useState(false);
    
    const [listas, setListas] = useState([]);
    const [body, setBody] = useState({
        id: 1,
        nombre: "",
        apellido: "",
        correo: "",
        avatar: "",
    });
    const [modifiedRows, setModifiedRows] = useState({});
    const [botones, setBotones] = useState(false);
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
        if (needsUpdate) {
            setNeedsUpdate(false);
            fetchData();
        }
    }, [needsUpdate]);

    const borrar = (valor) => {
        //aqui agregas el axios para borrar, le envias el valor para borrar por id
    }
    const cancelar = (valor) => {
        setModifiedRows((prevModifiedRows) => ({
            ...prevModifiedRows,
            [valor]: false,
        }));
        setBotones(false);
    }
    const enviar = async (valor) => {
        let nombre = document.getElementById("1" + valor);
        let apellido = document.getElementById("2" + valor);
        let correo = document.getElementById("3" + valor);
        let avatar = document.getElementById("4" + valor);
        const usuarioId = valor;
        const nombreUsuario = nombre.value;
        const apellidoUsuario = apellido.value;
        const correoUsuario = correo.value;
        const contraseniaUsuario = null;
        const avatarUsuario = avatar.value;
        const rolId = null;
        const fecha = null;
        try {
            const respuesta = await axios.put(`http://localhost:8081/ActualizarUsuario/${usuarioId}`, {nombreUsuario, apellidoUsuario, correoUsuario, contraseniaUsuario, avatarUsuario, rolId, fecha});
            if (respuesta.data.Estatus === "EXITOSO") {
                console.log("Usuario modificado correctamente");
                setNeedsUpdate(true);
            } else {
                console.log("Error al modificar al usuario")
            }
        } catch (error) {
            console.log(error)
        }
        setModifiedRows((prevModifiedRows) => ({
            ...prevModifiedRows,
            [valor]: false,
        }));
        setBotones(false);
    }
    const modificar = (valor) => {
        let nombre = document.getElementById("1" + valor);
        let apellido = document.getElementById("2" + valor);
        let correo = document.getElementById("3" + valor);
        let avatar = document.getElementById("4" + valor);
        nombre.addEventListener('input', function () {
            const nuevoValor = nombre.value;
            nombre.value = nuevoValor;
        });
        apellido.addEventListener('input', function () {
            const nuevoValor = apellido.value;
            apellido.value = nuevoValor;
        });
        correo.addEventListener('input', function () {
            const nuevoValor = correo.value;
            correo.value = nuevoValor;
        });
        avatar.addEventListener('input', function () {
            const nuevoValor = avatar.value;
            avatar.value = nuevoValor;
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
                <h1>Administradores:</h1>
                <div className={styles.scroll}>
                    <table>
                        <thead>
                            <td>Modificar</td>
                            <td>id</td>
                            <td>nombres</td>
                            <td>apellidos</td>
                            <td>correo</td>
                            <td>avatar</td>
                            <td>Fecha de creacion</td>
                            <td>Borrar</td>
                        </thead>
                        {listas.map((lista, index) => {
                            const fecha = lista.Fecha_Creacion.split("T");
                            const valor = lista.Id;
                            return (
                                <>
                                    <tr>
                                        <td>
                                            {!modifiedRows[valor] ? (
                                                <button disabled={botones} onClick={() => modificar(valor)}><i class="nf nf-fa-pencil"></i></button>
                                            ) : (
                                                <div className={styles.botones}>
                                                    <button onClick={() => cancelar(valor)}><i class="nf nf-oct-x"></i></button>
                                                    <button onClick={() => enviar(valor)}><i class="nf nf-fa-paper_plane"></i></button>
                                                </div>
                                            )}
                                        </td>
                                        <td>{lista.Id}</td>
                                        <td><input type="text" id={"1" + lista.Id} disabled={!modifiedRows[valor]} value={lista.Nombre} /></td>
                                        <td><input type="text" id={"2" + lista.Id} disabled={!modifiedRows[valor]} value={lista.Apellido} /></td>
                                        <td><input type="text" id={"3" + lista.Id} disabled={!modifiedRows[valor]} value={lista.Correo} /></td>
                                        <td><input type="text" id={"4" + lista.Id} disabled={!modifiedRows[valor]} value={lista.Avatar} /></td>
                                        <td>{fecha[0]}</td>
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