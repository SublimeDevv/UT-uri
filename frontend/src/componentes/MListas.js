import React, { useEffect, useState } from "react";
import styles from "../estilos/formularios.module.css"
import axios from "axios";
export default function MListas() {
    const [listas, setListas] = useState([]);
    const [texto, setTexto] = useState({
        nombre: "Este campo es obligatorio",
        info: "Este campo es obligatorio",
        imagen: "Este campo es obligatorio",
    });
    const [clas, setClas] = useState({
        nombre: `${styles.error} ${styles.ocultar}`,
        info: `${styles.error} ${styles.ocultar}`,
        imagen: `${styles.error} ${styles.ocultar}`,
    });
    const [nArchivo, setNarchivo] = useState("Selecciona una imagen");
    const [body, setBody] = useState({
        nombre: "",
        info: "",
    });
    const [archivo, setArchivo] = useState(null);

    const seleccionar = (e) => {
        if (e.target.files[0]) {
            setArchivo(e.target.files[0]);
            setNarchivo(e.target.files[0].name);
        } else {
            setNarchivo("Selecciona una imagen");
        }
    };
    const subir = () => {
        clas.info= `${styles.error} ${styles.ocultar}`;
        clas.nombre= `${styles.error} ${styles.ocultar}`;
        if (body.nombre && body.info) {
            if (nArchivo == "Selecciona una imagen") {
                setClas({ ...clas, ["imagen"]: styles.error });
                setTexto({...texto,["imagen"]:"Este campo es obligatorio"});
            } else {
                setClas({ ...clas, ["imagen"]: `${styles.error} ${styles.ocultar}` });
                const imagen1 = new FormData();
                imagen1.append("imagen1", archivo);
                //aqui vas a poner el codigo para enviar los datos a la base de datos
                //a la base de datos vas a enviar el body y nArchivo
                //y al repositorio de imagenes vas a mandar imagen1
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
                <h1 className={styles.h1}>Agregando categorias</h1>
                <label>Nombre de la categoria:</label>
                <input type="text" name="nombre" onChange={cambioEntrada}></input>
                <aside className={clas.nombre} id="aside">{texto.nombre}</aside>
                <label>Informacion:</label>
                <textarea name="info" onChange={cambioEntrada}></textarea>
                <aside className={clas.info} id="aside">{texto.info}</aside>
                <label htmlFor="input">Sube una imagen:</label>
                <input type="file" accept=".jpg,.jpeg,.png" id="inputarchivo" onChange={seleccionar} />
                <button><label for="inputarchivo">{nArchivo}</label></button>
                <div className={styles.aside}><aside className={clas.imagen}>{texto.imagen} </aside></div>
                <div className={styles.submit}>
                    <input type="submit" className={styles.verde} value="Subir" onClick={subir}/>
                </div>
            </section>
        </>
    );
}