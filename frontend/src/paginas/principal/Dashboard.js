import React, { useState } from "react";
import styles from "../../estilos/dashboard.module.css";

export default function Dashboard(){
    const [imagen,setImagen]=useState("usuario.png");
    return(
        <>
        <aside className={styles.navegacion}>
            <div className={styles.head}>
                <figure>
                    <img src={require('../../images/'+imagen)}/>
                    <figcaption></figcaption>
                </figure>
            </div>
        </aside>
        <main className={styles.pincipal}>

        </main>
        </>
    );
}