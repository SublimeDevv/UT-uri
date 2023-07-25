import React, { useState } from "react";
import styles from "../estilos/vistas.module.css";
import Vsubcategorias from "./Vsubcategorias";
import Msubcategoria from "./Msubcategoria";

export default function Etiquetas() {
  const [cambiar, setCambiar] = useState(true);
  return (
    <>
      {cambiar ? (
        <div className={styles.div}>
          <Vsubcategorias />
          <button className={styles.botonU} onClick={() => setCambiar(false)}>
            <i class="nf nf-fa-plus_circle"></i>
            <p>Agregar Etiqueta</p>
          </button>
        </div>
      ) : (
        <div className={styles.div}>
          <Msubcategoria />
          <button className={styles.botonU} onClick={() => setCambiar(true)}>
            <i class="nf nf-md-keyboard_backspace"></i>
            <p>Volver</p>
          </button>
        </div>
      )}
    </>
  );
}
