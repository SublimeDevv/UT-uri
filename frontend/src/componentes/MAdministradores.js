import React, { useState } from "react";
import styles from "../estilos/formularios.module.css";

export default function MAdministradores(){
    const [boton,setBoton]=useState(<button>Hola</button>);
    return(
        <>
        <section className={styles.madmin}>
            
            {boton}
        </section>
        </>
    );
}