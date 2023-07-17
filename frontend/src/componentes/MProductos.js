import React, { useEffect, useState } from "react";
import styles from "../estilos/formularios.module.css";
import axios from "axios";

export default function MProductos() {
    const [texto, setTexto] = useState({
        nombre: "Este campo es obligatorio",
        info: "Este campo es obligatorio",
        imagen1: "Este campo es obligatorio",
        imagen2: "Este campo es obligatorio",
        imagen3: "Este campo es obligatorio",
    });
    const [listas, setListas] = useState([]);
    const [clas, setClas] = useState({
        nombre: `${styles.error} ${styles.ocultar}`,
        info: `${styles.error} ${styles.ocultar}`,
        imagen1: `${styles.error} ${styles.ocultar}`,
        imagen2: `${styles.error} ${styles.imagenes}`,
    });
    const [nArchivo1, setNarchivo1] = useState("Imagen");
    const [nArchivo2, setNarchivo2] = useState("Imagen");
    const [nArchivo3, setNarchivo3] = useState("Imagen");
    const [body, setBody] = useState({
        nombre: "",
        info: "",
    });
    const [archivo1, setArchivo1] = useState(null);
    const [archivo2, setArchivo2] = useState(null);
    const [archivo3, setArchivo3] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const respuesta = await axios.get(`http://localhost:8081/obtenerLista`);
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
    });
    const seleccionar1 = (e) => {
        if (e.target.files[0]) {
            setArchivo1(e.target.files[0]);
            setNarchivo1(e.target.files[0].name);
        } else {
            setNarchivo1("Imagen");
        }
    };
    const seleccionar2 = (e) => {
        if (e.target.files[0]) {
            setArchivo2(e.target.files[0]);
            setNarchivo2(e.target.files[0].name);
        } else {
            setNarchivo2("Imagen");
        }
    };
    const seleccionar3 = (e) => {
        if (e.target.files[0]) {
            setArchivo3(e.target.files[0]);
            setNarchivo3(e.target.files[0].name);
        } else {
            setNarchivo3("Imagen");
        }
    };
    const subir = () => {
        clas.info = `${styles.error} ${styles.ocultar}`;
        clas.nombre = `${styles.error} ${styles.ocultar}`;
        if (body.nombre && body.info) {
            if (nArchivo1 !== "Imagen" && nArchivo2 !== "Imagen" && nArchivo3 !== "Imagen") {
                setClas({ ...clas, ["imagen1"]: `${styles.error} ${styles.ocultar}` });
                const imagen1 = new FormData();
                imagen1.append("imagen1", archivo1);
                const imagen2 = new FormData();
                imagen2.append("imagen2", archivo2);
                const imagen3 = new FormData();
                imagen3.append("imagen1", archivo3);
                //aqui vas a poner el codigo para enviar los datos a la base de datos
                //a la base de datos vas a enviar el body y nArchivo 1 2 y 3
                //y al repositorio de imagenes vas a mandar imagen1 2 y 3
            } else {
                setClas({
                    ...clas, ["imagen1"]: styles.error
                });
                setTexto({ ...texto, ["imagen1"]: "Estos campos son obligatorios" });
            }
        } else {
            setClas({
                ...clas,
                ["nombre"]: body.nombre.length === 0 ? styles.error : "",
                ["info"]: body.info.length === 0 ? styles.error : "",
            });
            setTexto({
                ...clas,
                ["nombre"]: body.nombre.length === 0 ? "Este campo es obligatorio" : "",
                ["info"]: body.info.length === 0 ? "Este campo es obligatorio" : "",
            });
        }
    }
    const cambioEntrada = ({ target }) => {
        const { name, value } = target;
        setBody({ ...body, [name]: value });
    };
    return (
        <>
            <section className={styles.mlistas}>
                <h1 className={styles.h1}>Agregando productos</h1>
                <label>Nombre del producto:</label>
                <input type="text" name="nombre" onChange={cambioEntrada}></input>
                <aside className={clas.nombre} id="aside">{texto.nombre}</aside>
                <label>A que categoria pertence:</label>
                <select>
                    {listas.map((lista, index) => {
                        return (
                            <>
                                <option value={lista.Nombre}>{lista.Nombre}</option>
                            </>

                        );
                    })}
                </select>
                <label>Informacion:</label>
                <textarea name="inategorias
Nombre de la categoriafo" onChange={cambioEntrada}></textarea>
                <aside className={clas.info} id="aside">{texto.info}</aside>
                <label htmlFor="input">Sube una imagen:</label>
                <input type="file" accept=".jpg,.jpeg,.png" id="inputarchivo1" onChange={seleccionar1} />
                <input type="file" accept=".jpg,.jpeg,.png" id="inputarchivo2" onChange={seleccionar2} />
                <input type="file" accept=".jpg,.jpeg,.png" id="inputarchivo3" onChange={seleccionar3} />
                <span className={styles.imagenes}>
                    <div>
                        <button><label for="inputarchivo1">{nArchivo1}</label></button>
                    </div>
                    <div>
                        <button><label for="inputarchivo2">{nArchivo2}</label></button>
                    </div>
                    <div>
                        <button><label for="inputarchivo3">{nArchivo3}</label></button>
                    </div>
                </span>
                <div className={styles.aside2}><aside className={clas.imagen1}>{texto.imagen1} </aside></div>
                <div className={styles.submit}>
                    <input type="submit" className={styles.rojo} value="Borrar" />
                    <input type="submit" className={styles.verde} value="Subir" onClick={subir} />
                </div>
            </section>
        </>
    );
}