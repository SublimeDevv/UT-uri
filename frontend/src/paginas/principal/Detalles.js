import React from 'react';
import Header from '../../componentes/Header';
import Footer from '../../componentes/Footer';
import styles from '../../estilos/detalles.module.css';
import { Link } from 'react-router-dom';
import Detalle from '../../componentes/Detalle'

function Detalles() {
    return (
        <>
            <Header/>
            <main className={styles.main}>
            <section className={styles.info}>
                <div className={styles.ruta}>
                <Link to={'/categorias'} className={styles.a1}>Categorias</Link>
                <p>»</p>
                <Link to={'/lista'} className={styles.a1}>Listas</Link>
                <p>»</p>
                <Link to={'/detalles'} className={styles.a2}>Detalles</Link>
                </div>
                <Detalle/>
            </section>
            </main>
            <Footer/>
        </>

    );
}
export default Detalles;