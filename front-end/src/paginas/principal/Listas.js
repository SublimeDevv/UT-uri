import React from 'react';
import Header from '../../componentes/Header';
import Footer from '../../componentes/Footer';
import styles from '../../estilos/lista.module.css';
import { Link } from 'react-router-dom';
import imagen1 from '../../images/logo.png';
import imagen2 from '../../images/logo.png';
import imagen3 from '../../images/logo.png';
import imagen4 from '../../images/logo.png';
import imagen5 from '../../images/logo.png';
import imagen6 from '../../images/logo.png';

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
                    <div className={styles.seccion}>
                        <div>
                            <h2></h2>
                            <p>
                                
                            </p>
                            <span>
                            <Link to={'/detalles'}>
                                <button>Detalles y precio</button>
                            </Link>
                            </span>
                        </div>
                        <figure>
                            <img src={imagen2} alt="" />
                        </figure>
                    </div>
                    <div className={`${styles.seccion} ${styles.azul}`}>
                        <div className={styles.uno}>
                            <h2></h2>
                            <p>
                                
                            </p>
                            <span>
                            <Link to={'/detalles'}>
                                <button>Detalles y precio</button>
                            </Link>
                            </span>
                        </div>
                        <figure className={styles.dos}>
                            <img src={imagen3} alt="" />
                        </figure>
                    </div>
                    <div className={styles.seccion}>
                        <div>
                            <h2></h2>
                            <p>

                            </p>
                            <span>
                            <Link to={'/detalles'}>
                                <button>Detalles y precio</button>
                            </Link>
                            </span>
                        </div>
                        <figure>
                            <img src={imagen4} alt="" />
                        </figure>
                    </div>
                    <div className={`${styles.seccion} ${styles.azul}`}>
                        <div className={styles.uno}>
                            <h2></h2>
                            <p>
                                
                            </p>
                            <span>
                            <Link to={'/detalles'}>
                                <button>Detalles y precio</button>
                            </Link>
                            </span>
                        </div>
                        <figure className={styles.dos}>
                            <img src={imagen5} alt="" />
                        </figure>
                    </div>
                    <div className={styles.seccion}>
                        <div>
                            <h2></h2>
                            <p>
                                
                            </p>
                            <span>
                            <Link to={'/detalles'}>
                                <button>Detalles y precio</button>
                            </Link>
                            </span>
                        </div>
                        <figure>
                            <img src={imagen6} alt="" />
                        </figure>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}

export default Listas;