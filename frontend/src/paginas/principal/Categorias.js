import React from 'react';
import Header from '../../componentes/Header';
import Footer from '../../componentes/Footer';
import styles from '../../estilos/categorias.module.css'
import { Link } from 'react-router-dom';
function Categorias() {
    return (
        <>
            <Header/>
            <main className={styles.main}>
                <section className={styles.info}>
                    <div className={styles.imagen}>
                        <img src={require('../../images/logo.png')} alt="" />
                        <p>La puerta a tus sueños viajeros en Mexico</p>
                    </div>
                    <section className={styles.caribe}>
                        <img src={require('../../images/categorias/Principal.jpeg')} alt="" />
                        <div>
                            <h3>EL CARIBE MEXICANO</h3>
                            <p>
                                El Caribe Mexicano es un paraíso conformado por playas, zonas
                                arqueológicas, selvas, cenotes y ríos subterráneos que enmarcan
                                los mejores destinos de México El Caribe Mexicano se ubica en el
                                sur de México, abarca el estado de Quintana Roo y el sureste de la
                                Península de Yucatán. Desde Cancún hasta la Costa Maya y las
                                encantadoras islas del Caribe Mexicano, son visitados por miles de
                                turistas de todo el orbe cada año, gracias a su completa
                                infraestructura hotelera, servicios de turismo de primera,
                                gastronomía y entretenimiento.
                            </p>
                        </div>
                    </section>
                    <h2>Categorias</h2>
                    <section className={styles.naturaleza}>
                        <div>
                            <h3>TOURS DE NATURALEZA</h3>
                            <p>
                                El estado de Quintana Roo es una de las regiones más bellas del
                                mundo; por algo es el estado mexicano más atractivo para el
                                turismo nacional e internacional y marco de Cancún, uno de los
                                sitios más visitados en todo el planeta. Esta ha deslumbrado por
                                su riqueza natural y la belleza de sus playas, lagos y lagunas.
                            </p>
                            <Link to={'/lista/Naturales'}><button>VER LUGARES</button></Link>
                        </div>
                        <img src={require('../../images/categorias/t_Naturaleza.png')} alt="" />
                    </section>
                    <section className={styles.aventura}>
                        <div className={styles.img}>
                            <img src={require('../../images/categorias/t_Aventura.jpg')} alt="" />
                        </div>
                        <div className={styles.text}>
                            <h3>TOURS DE AVENTURA</h3>
                            <p>
                                El turismo de aventura es una actividad, que desafía las
                                capacidades físicas y mentales de las personas que buscan una
                                dosis de adrenalina en lugares rodeados de naturaleza. México es
                                un país rico en biodiversidad, una de las ciudades más populares
                                para realizar este tipo de turismo es Cancún, Quintana Roo.
                            </p>
                            <Link to={'/lista/Aventura'}><button>VER LUGARES</button></Link>
                        </div>
                    </section>
                    <section className={styles.historicos}>
                        <div>
                            <h3>TOURS HISTORICOS</h3>
                            <p>
                                Los sitios arqueológicos de la Riviera Maya ocupan un lugar
                                privilegiado en los tours culturales, pero no son los únicos
                                lugares de interés donde los turistas sedientos de conocimiento se
                                deleitan con el arte y la historia. Los tours culturales son una
                                excelente manera de aprender más sobre esta magnífica región cuya
                                historia es tan rica como fascinante, tan antigua como
                                contemporánea.
                            </p>
                            <Link to={'/lista/Historicos'}><button>VER LUGARES</button></Link>
                        </div>
                        <img src={require('../../images/categorias/t_Historiaa.jpg')} alt="" className={styles.bajo} />
                    </section>
                </section>
            </main>
            <Footer />
        </>
    );
}
export default Categorias;