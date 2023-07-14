import React, { useState } from "react";
import styles from "../../estilos/dashboard.module.css";
import { Link } from "react-router-dom";
import Dashboards from "../../componentes/Dashboards";
import MUsuario from "../../componentes/MUsuario";
import MAdministradores from "../../componentes/MAdministradores";
import MProductos from "../../componentes/MProductos";
import MListas from "../../componentes/MListas";

export default function Dashboard() {
    const [menu, setMenu] = useState({
        img: "usuario.png",
        nombre: "Nombre",
    });
    const [clases,setClases]=useState({menu:`${styles.navegacion} ${styles.ocultar}`,});
    const [componentes, setComponentes]=useState(<Dashboards/>);
    const mostrar=()=>{setClases({...clases,["menu"]:`${styles.navegacion} ${styles.mostrar}`});}
    const ocultar=()=>{setClases({...clases,["menu"]:`${styles.navegacion} ${styles.ocultar}`});}
    const components = (componente) =>{setComponentes(componente); ocultar();}
    return (
        <>
            <main className={styles.principal}>
                <aside className={clases.menu}>
                    <div className={styles.head}>
                        <figure>
                            <img src={require('../../images/' + menu.img)} />
                            <figcaption>{menu.nombre}</figcaption>
                        </figure>
                        <i className="nf nf-md-home_account" id={styles.puntero}><p onClick={()=>components(<Dashboards/>)}>Dashboard</p></i>
                        <i className="nf nf-fae-tools"><p>Administracion</p></i>
                        <p className={styles.opciones}>Usuarios</p>
                        <p className={styles.opciones2} onClick={()=>components(<MUsuario/>)}>Usuarios</p>
                        <p className={styles.opciones2} onClick={()=>components(<MAdministradores/>)}>Administradores</p>
                        <p className={styles.opciones}>Listas</p>
                        <p className={styles.opciones2} onClick={()=>components(<MProductos/>)}>Productos</p>
                        <p className={styles.opciones2} onClick={()=>components(<MListas/>)}>Listas</p>
                    </div>
                    <figure className={styles.figure}><img src={require('../../images/logo.png')}></img></figure>
                </aside>
                <i className="nf nf-cod-menu" id={styles.mostrar} onClick={mostrar}></i>
                <section className={styles.contenedores} onClick={ocultar}>
                    <div className={styles.titulo}>
                        <h1>¡Bienvenido {menu.nombre}!</h1>
                    </div>
                    <div className={styles.dashboard}>
                        {componentes}
                    </div>
                </section>
            </main>
        </>
    );
}