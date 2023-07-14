import React, { useEffect, useState } from "react";
import styles from "../estilos/formularios.module.css"
export default function MUsuario() {
    const [body, setBody] = useState({
        Correo: "",
        checkbox: false,
    });
    const [menu, setMenu] = useState({
        img: "usuario.png",
        nombre: "Nombre",
    });
    const [texto, setTexto] = useState({
        Correo: "",
    });
    const [clas, setClas] = useState({
        Correo: `${styles.error} ${styles.ocultar}`,
    });

    const cambioEntrada = ({ target }) => {
        const { name, value } = target;
        setBody({ ...body, [name]: value });
    };
    const check = () => {
        if (!body.checkbox) setBody({ ...body, ["checkbox"]: true });
        else setBody({ ...body, ["checkbox"]: false });
    }
    return (
        <>
            <section className={styles.musuario}>
                <figure>
                    <img src={require('../images/' + menu.img)} />
                    <figcaption>{menu.nombre}</figcaption>
                </figure>
                <p>Correo electrónico</p>
                <input
                    type="email"
                    value={body.Correo}
                    onChange={cambioEntrada}
                    name="Correo"
                />
                <div className={styles.checkbox}><input type="checkbox" onClick={check} /><label>Convertir a administrador</label></div>
                <aside className={clas.Correo}>{texto.Correo}</aside>
                <span className={styles.submit}>
                    <input type="submit" className={styles.rojo} value="Borrar" />
                    <input type="submit" className={styles.verde} value="Cambiar Rol" />
                </span>
            </section>
        </>
    );
}