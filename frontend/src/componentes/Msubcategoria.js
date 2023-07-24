import React, { useState } from "react";
import styles from "../estilos/formularios.module.css";
import axios from "axios";
import Swal from "sweetalert2";
export default function Msubcategoria() {
    const [texto, setTexto] = useState({
        nombre: "Este campo es obligatorio",
        info: "Este campo es obligatorio",
    });
    const [clas, setClas] = useState({
        nombre: `${styles.error} ${styles.ocultar}`,
        info: `${styles.error} ${styles.ocultar}`,
    });
    const [body, setBody] = useState({
        nombre: "",
        info: "",
    });

    const subir = async () => {
        clas.info = `${styles.error} ${styles.ocultar}`;
        clas.nombre = `${styles.error} ${styles.ocultar}`;
        if (body.nombre && body.info) {
            const Nombre = body.nombre;
            const Descripcion = body.info;
            try {
                const respuesta = await axios.post(
                    "http://localhost:8081/api/subcategorias/CrearSubcategoria",
                    { Nombre, Descripcion }
                );

                if (respuesta.data.Estatus === "EXITOSO") {
                    console.log("Categoría creada con éxito")
                    setBody({
                        nombre: "",
                        info: "",
                    });
                    document.getElementById("nombre").value = "";
                    document.getElementById("info").value = "";
                    Swal.fire(
                        'Etiqueta creada con éxito',
                        'success'
                    );
                }
            } catch (error) {
                console.error(error);
            }
        } else {
            setClas({
                ...clas,
                nombre: body.nombre.length === 0 ? styles.error : "",
                info: body.info.length === 0 ? styles.error : "",
            });
            setTexto({
                ...texto,
                nombre: body.nombre.length === 0 ? "Este campo es obligatorio" : "",
                info: body.info.length === 0 ? "Este campo es obligatorio" : "",
            });
        }
    };

    const cambioEntrada = ({ target }) => {
        const { name, value } = target;
        setBody({ ...body, [name]: value });
    };
    return (
        <>
            <div className={styles.contenedor}>
                <section className={styles.mlistas}>
                    <h1 className={styles.h1}>Agregando etiquetas</h1>
                    <label>Nombre de la etiqueta:</label>
                    <input type="text" id="nombre" name="nombre" onChange={cambioEntrada}></input>
                    <aside className={clas.nombre} id="aside">
                        {texto.nombre}
                    </aside>
                    <label>Descripcion:</label>
                    <textarea className={styles.textarea} name="info" id="info" onChange={cambioEntrada}></textarea>
                    <aside className={clas.info} id="aside">
                        {texto.info}
                    </aside>
                    <div className={styles.submit}>
                        <input
                            type="submit"
                            className={styles.verde}
                            value="Subir"
                            onClick={subir}
                        />
                    </div>
                </section>
            </div>
        </>
    );
}
