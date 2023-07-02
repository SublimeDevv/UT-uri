import React from 'react';
import Header from '../../componentes/Header';
import Footer from '../../componentes/Footer';
import styles from '../../estilos/contactanos.module.css';
function Contactanos() {
    return (
        <>
            <Header/>
            <main className={styles.main}>
                <section className={styles.info}>
                    <figure>
                        <h1>Contactanos</h1>
                        <i className="nf nf-fa-group"></i>
                    </figure>
                    <form action="">
                        <p>Nombre completo</p>
                        <input type="text" name="" id="" />
                        <p>Correo electronico</p>
                        <input type="email" />
                        <p>Asunto</p>
                        <input type="text" />
                        <p>Mensaje</p>
                        <textarea name="" id="" cols="30" rows="10"></textarea>
                        <div>
                            <input type="submit" />
                        </div>
                    </form>
                </section>
            </main>
            <Footer/>
        </>

    );
}
export default Contactanos;