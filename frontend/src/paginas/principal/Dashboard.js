import React, { useState } from "react";
import styles from "../../estilos/dashboard.module.css";
import { Link } from "react-router-dom";

export default function Dashboard(){
    const [menu,setMenu]=useState({
        img:"usuario.png",
        nombre:"Nombre",
    });
    return(
        <>
        <aside className={styles.navegacion}>
            <div className={styles.head}>
                <figure>
                    <img src={require('../../images/'+menu.img)}/>
                    <figcaption>{menu.nombre}</figcaption>
                </figure>
                <i className="nf nf-md-home_account" id="1"><p>Dashboard</p></i>
                <i className="nf nf-fae-tools" id="1"><p>Administracion</p></i>
                <p className={styles.opciones}>Usuarios</p>
                <p className={styles.opciones}>Listas</p>
                <p className={styles.opciones2}>Productos</p>
                <p className={styles.opciones2}>Listas</p>
            </div>
            <figure className={styles.figure}><img src={require('../../images/logo.png')}></img></figure>
        </aside>
        <main className={styles.pincipal}>

        </main>
        </>
    );
}