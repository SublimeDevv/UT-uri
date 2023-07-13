import React, { useState } from "react";
import styles from "../../estilos/dashboard.module.css";
import { Link } from "react-router-dom";
import Dashboards from "../../componentes/Dashboards";

export default function Dashboard() {
    const [menu, setMenu] = useState({
        img: "usuario.png",
        nombre: "Nombre",
    });
    const [componentes, setComponentes]=useState({
        nombre:"<Dashboards/>",
    });
    return (
        <>
            <main className={styles.principal}>
                <aside className={styles.navegacion}>
                    <div className={styles.head}>
                        <figure>
                            <img src={require('../../images/' + menu.img)} />
                            <figcaption>{menu.nombre}</figcaption>
                        </figure>
                        <i className="nf nf-md-home_account" id="1"><p>Dashboard</p></i>
                        <i className="nf nf-fae-tools" id="1"><p>Administracion</p></i>
                        <p className={styles.opciones}>Usuarios</p>
                        <p className={styles.opciones2}>Usuarios</p>
                        <p className={styles.opciones2}>Administradores</p>
                        <p className={styles.opciones}>Listas</p>
                        <p className={styles.opciones2}>Productos</p>
                        <p className={styles.opciones2}>Listas</p>
                    </div>
                    <figure className={styles.figure}><img src={require('../../images/logo.png')}></img></figure>
                </aside>
                <section className={styles.contenedores}>
                    <div className={styles.titulo}>
                        <h1>Bienvenido {menu.nombre}</h1>
                    </div>
                    
                </section>
            </main>
        </>
    );
}