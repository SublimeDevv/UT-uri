import React from 'react';
import styles from '../estilos/lista.module.css';
import { Link } from 'react-router-dom';
import imagen2 from '../images/logo.png';
const blanco = styles.seccion;
const azul = `${styles.seccion} ${styles.azul}`;
function Lista() {
    return (
        <>
            <div className={blanco}>
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
        </>
    );
}
export default Lista;