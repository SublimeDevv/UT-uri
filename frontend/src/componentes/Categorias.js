import React, { useState } from "react";
import styles from "../estilos/vistas.module.css";
import Vlistas from "./Vlistas";
import MListas from "./MListas";

export default function Categorias() {
    const [cambiar, setCambiar] = useState(true);
    return (
        <>
            {cambiar ? (
                <div className={styles.div}>
                    <Vlistas/>
                    <button className={styles.botonU} onClick={() => setCambiar(false)}><i class="nf nf-fa-plus_circle"></i></button>
                </div>
            ) : (
                <div className={styles.div}>
                    <MListas/>
                    <button className={styles.botonU} onClick={() => setCambiar(true)}><i class="nf nf-md-keyboard_backspace"></i></button>
                </div>
            )}
        </>
    );
}