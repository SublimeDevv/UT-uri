import react from 'react';
import Header from '../../componentes/Header';
import Footer from '../../componentes/Footer';
import styles from '../../estilos/index.module.css';
function Index() {
    return (
        <>
            <Header />
            <main className={styles.main}>
                <section className={styles.des}>
                    <figure className={styles.imagen}>
                        <img className={styles.slide} src={require('../../images/wall.jpg')} />
                        <img className={styles.slide} src={require('../../images/wall2.jpg')} />
                        <img className={styles.slide} src={require('../../images/wall3.jpg')} />
                    </figure>
                </section>
                <section className={styles.info}>
                    <span>
                        <h1>¡Bienvenido a UTURI!</h1>
                        <p>
                            En UTuri, sabemos que cada viaje es único, y nos emociona ser parte
                            de su historia de viaje. Ya sea que estén buscando explorar una
                            ciudad vibrante, sumergirse en la naturaleza exuberante o sumarse a
                            una emocionante expedición, estamos aquí para hacer que cada momento
                            sea especial y memorable. <br />
                            <br />
                            A través de nuestro sitio web, podrán descubrir nuestras opciones de
                            tours, conocer a nuestro equipo de guías expertos y explorar los
                            destinos que hemos seleccionado con atención. Además, estamos
                            siempre a su disposición para responder sus preguntas, personalizar
                            itinerarios según sus preferencias y ayudarles en cada paso del
                            camino. <br />
                            <br />
                            Ya sea que viajes solo, en pareja, en familia o con amigos, nuestro
                            compromiso es proporcionarte un servicio de excelencia y hacer que
                            tu viaje sea lo más cómodo y enriquecedor posible. Nos esforzamos
                            por superar tus expectativas y crear una experiencia inolvidable que
                            te inspire a descubrir el mundo con una nueva perspectiva. <br />
                            <br />
                            Así que adelante, echa un vistazo a nuestros emocionantes lugares,
                            encuentra tu destino soñado y déjanos encargarnos de todos los
                            detalles. ¡Prepárate para sumergirte en una aventura inolvidable y
                            descubrir lo extraordinario en cada rincón de nuestro México!
                        </p>
                    </span>
                    <aside>
                        <div>
                            <h2>Lugares más visitados</h2>
                            <ul>
                                <li>Tulum</li>
                                <li>Playa norte</li>
                                <li>Playa delfines</li>
                                <li>Punta sur</li>
                                <li>Cancún</li>
                            </ul>
                        </div>

                        <figure>
                            <img src={require('../../images/PROMOS.jpg')} alt="" />
                        </figure>
                    </aside>
                </section>
            </main>
            <Footer />
        </>

    );
}
export default Index;