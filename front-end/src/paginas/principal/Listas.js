import React from 'react';
import Header from '../../componentes/Header';
import Footer from '../../componentes/Footer';
import styles from '../../estilos/lista.module.css';
import { Link } from 'react-router-dom';
import imagen1 from '../../images/logo.png';
import Lista from '../../componentes/Lista';
function Listas() {
    return (
        <>
            <Header />
            <main className={styles.main}>
                <section className={styles.info}>
                    <div className={styles.ruta}>
                        <Link to={'/categorias'} className={styles.a1}>Categorias</Link>
                        <p>»</p>
                        <Link href="/lista" className={styles.a2}></Link>
                    </div>
                    <h1></h1>
                    <div className={styles.introduccion}>
                        <p>
                            
                        </p>
                        <img src={imagen1} alt="" />
                    </div>
                    <Lista/>
                </section>
            </main>
            <Footer />
        </>
    );
}

export default Listas;