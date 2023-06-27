import react from 'react';
import Header from '../../componentes/Header';
import Footer from '../../componentes/Footer';
import styles from '../../estilos/detalles.module.css';
import { Link } from 'react-router-dom';
import imagen1 from '../../images/logo2.png'
import imagen2 from '../../images/logo2.png'
import imagen3 from '../../images/logo2.png'
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
                <span className={styles.span}>
                <figure className={styles.figure}>
                    <img
                    src={imagen1}
                    alt=""
                    className={styles.uno}
                    />
                    <img
                    src={imagen2}
                    alt=""
                    className={styles.dos}
                    />
                    <img
                    src={imagen3}
                    alt=""
                    className={styles.tres}
                    />
                </figure>
                <div className={styles.div}>
                    <h1></h1>
                    <p className={styles.p}>
                    
                    </p>
                    <p className={styles.p}></p>
                    <span>
                    <figure className={styles.fig}>
                        <div className={styles.orden}>
                        <i className="nf nf-md-walk"></i>
                        </div>
                        <p className={styles.Personas}></p>
                    </figure>
                    <p className={styles.p2}></p>
                    </span>
                    <section id={styles.boton}>
                    <Link to={'/pago'}>
                    <button>
                        <i className="nf nf-fa-plane"> Ir al pago</i>
                    </button>
                    </Link>
                    
                    </section>
                </div>
                </span>
            </section>
            </main>
            <Footer/>
        </>

    );
}
export default Detalles;