import React from 'react';
import Header from '../../componentes/Header';
import Footer from '../../componentes/Footer';
import styles from '../../estilos/quienes_somos.module.css';
function QuienesSomos() {
    return (
        <>
            <Header/>
            <main className={styles.main}>
                <section className={styles.info}>
                    <div>
                        <p>Una empresa que busca lo mejor para ti...</p>
                    </div>
                    <section className={styles.sac}>
                        <h3>Nuestro propósito</h3>
                        <span>
                            <p>
                                En UTURI, nos apasiona brindar experiencias de viaje inolvidables
                                y descubrir nuevos destinos junto a nuestros clientes. Somos un
                                equipo de entusiastas viajeros y guías expertos que estamos
                                comprometidos en proporcionar los mejores tours y servicios de
                                calidad. <br />
                                <br />
                                Nuestro objetivo es ofrecer itinerarios cuidadosamente diseñados
                                que capturen la esencia y la belleza de cada destino. Nos
                                esforzamos por superar las expectativas de nuestros viajeros,
                                brindándoles aventuras auténticas, fascinantes y llenas de
                                descubrimientos.
                            </p>
                            <img src={require('../../images/quienes_somos/proposito.jpg')} alt="" />
                        </span>
                    </section>
                    <aside>
                        <h3>Mas detalles acerca de nosotros</h3>
                        <article>
                            <figure>
                                <img src={require('../../images/quienes_somos/vision2.jpg')} alt="" />
                                <figcaption>Mision y vision</figcaption>
                            </figure>
                            <figure>
                                <img src={require('../../images/quienes_somos/cliente.jpg')} alt="" />
                                <figcaption>Atencion al cliente</figcaption>
                            </figure>
                            <figure>
                                <img src={require('../../images/quienes_somos/equipo.jpg')} alt="" />
                                <figcaption>Nuestro equipo de trabajo</figcaption>
                            </figure>
                        </article>
                    </aside>
                </section>
            </main>
            <Footer/>
        </>

    );
}
export default QuienesSomos;