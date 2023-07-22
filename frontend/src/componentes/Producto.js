import React, { useState } from "react";
import styles from "../estilos/vistas.module.css";
import Vproductos from "./Vproductos";
import MProductos from "./MProductos";

export default function Producto() {
    const [cambiar, setCambiar] = useState(true);
    return (
        <>
            {cambiar ? (
                <div className={styles.div}>
                    <Vproductos/>
                    <button className={styles.botonU} onClick={() => setCambiar(false)}><i class="nf nf-fa-plus_circle"></i><p>Agregar Producto</p></button>
                </div>
            ) : (
                <div className={styles.div}>
                    <MProductos/>
                    <button className={styles.botonU} onClick={() => setCambiar(true)}><i class="nf nf-md-keyboard_backspace"></i> <p>Volver</p></button>
                </div>
            )}
        </>
    );
}