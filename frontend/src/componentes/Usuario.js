import React, { useState } from "react";
import Vusuarios from "./Vusuarios";
import MUsuario from "./MUsuario";
import styles from "../estilos/vistas.module.css";

export default function Usuario() {
    const [cambiar, setCambiar] = useState(true);
    return (
        <>
            {cambiar ? (
                <div className={styles.div}>
                    <Vusuarios />
                    <button className={styles.botonU} onClick={() => setCambiar(false)}><i class="nf nf-fa-plus_circle"></i></button>
                </div>
            ) : (
                <div className={styles.div}>
                    <MUsuario />
                    <button className={styles.botonU} onClick={() => setCambiar(true)}><i class="nf nf-md-keyboard_backspace"></i></button>
                </div>
            )}
        </>
    );
}