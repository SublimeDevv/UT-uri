import react from 'react';
import Header from '../../componentes/Header';
import Footer from '../../componentes/Footer';
import styles from '../../estilos/lista.module.css';
function Listas() {
    return (
        <>
            <Header />
            <main class="main">
                <section class="info">
                    <div class="ruta">
                        <a href="/src/html/principal/categorias.html" class="a1">Categorias</a>
                        <p>»</p>
                        <a href="aventura.html" class="a2">Aventura</a>
                    </div>
                    <h1>LUGARES DE AVENTURA EN QUINTANA ROO:</h1>
                    <div class="introduccion">
                        <p>
                            El Caribe Mexicano es un paraíso natural y un destino como pocos en
                            el mundo, si de aventura se trata, ya que cuenta con todo tipo de
                            escenarios naturales en donde podrás olvidarte de la rutina. Tus
                            aventuras pueden ser tan extremas o tranquilas como desees. <br />
                            Quintana Roo cuenta con importantes características naturales y
                            destinos turísticos importantes para el desarrollo de actividades de
                            turismo de aventura incluyendo en la Zona Maya y Riviera Maya. Sus
                            hermosas playas, selvas, arrecifes coralinos, innumerables cenotes,
                            centros arqueológicos hacen de Quintana Roo un estado obligado para
                            vivir muchas aventuras. <br />
                            ¡Las actividades de turismo de aventura en la Riviera Maya merecen
                            atención! Acuáticas, terrestres e incluso subterráneas. Ya sea que
                            prefieras el aire libre y los parques recreativos, hay multitud de
                            experiencias para disfrutar en pareja, con amigos o en familia.
                            <br />
                            Existen muchas opciones de tours y actividades en la Riviera Maya
                            para que descubras las maravillas del Caribe añadiendo un poco de
                            adrenalina y emoción. <br />
                        </p>
                        <img src="/src/images/lista_aventura/principal.jpg" alt="" />
                    </div>
                    <div class="seccion">
                        <div>
                            <h2>BUCEAR EN CENOTES:</h2>
                            <p>
                                Es bien sabido que el estado está rodeado de formaciones de agua
                                llamadas “cenotes', las cuales además de su belleza, ofrecen a los
                                buzos la oportunidad de sumergirse en las entrañas de la Tierra,
                                explorar un mundo diferente, flotar en cavernas llenas de agua
                                transparente, decoración y efectos de la luz del sol.
                            </p>
                            <span
                            ><a href="/src/html/detalles/buceo_cenote.html"
                            ><button>Detalles y precio</button></a
                                ></span
                            >
                        </div>
                        <figure>
                            <img src="/src/images/lista_aventura/bucear.jpeg" alt="" />
                        </figure>
                    </div>
                    <div class="seccion azul">
                        <div class="uno">
                            <h2>BICICLETA DE AVENTURA EN MEDIO DE LA SELVA:</h2>
                            <p>
                                Estamos seguros que te encantará realizar esta actividad, donde
                                además de disfrutar de un rato de adrenalina también podrás
                                limpiar tus pulmones respirando el aire puro de la selva.
                            </p>
                            <span
                            ><a href="/src/html/detalles/bicicleta.html"
                            ><button>Detalles y precio</button></a
                                ></span
                            >
                        </div>
                        <figure class="dos">
                            <img src="/src/images/lista_aventura/pasear_bici.jpeg" alt="" />
                        </figure>
                    </div>
                    <div class="seccion">
                        <div>
                            <h2>NADO CON TIBURÓN TORO EN PLAYA DEL CARMEN:</h2>
                            <p>
                                Descubre la grandeza de estos animales marinos buceando sin jaula
                                y a unos escasos metros de ellos.
                            </p>
                            <span
                            ><a href="/src/html/detalles/nado_tiburones.html"
                            ><button>Detalles y precio</button></a
                                ></span
                            >
                        </div>
                        <figure>
                            <img src="/src/images/lista_aventura/nado_tiburones.jpeg" alt="" />
                        </figure>
                    </div>
                    <div class="seccion azul">
                        <div class="uno">
                            <h2>HACER KAYAK EN MUYIL:</h2>
                            <p>
                                Localizada dentro de la Biósfera de Sian Ka'an a 20 minutos de
                                Tulum, se encuentra un pequeño poblado llamado Muyil donde la
                                exuberante selva se mezcla con la belleza de la laguna del mismo
                                nombre que son el escenario perfecto para hacer kayak.
                            </p>
                            <span
                            ><a href="/src/html/detalles/kayak.html"><button>Detalles y precio</button></a></span
                            >
                        </div>
                        <figure class="dos">
                            <img src="/src/images/lista_aventura/kayac.jpeg" alt="" />
                        </figure>
                    </div>
                    <div class="seccion">
                        <div>
                            <h2>MANEJAR COCHES ANFIBIO EN MEDIO DE LA SELVA:</h2>
                            <p>
                                A 15 minutos de Playa del Carmen se localiza Xplor, un parque de
                                aventura donde podrás manejar estos singulares coches anfibios y
                                con ellos adentrarte al corazón de la selva, admirar la naturaleza
                                y disfrutar de mucha diversión.
                            </p>
                            <span
                            ><a href="/src/html/detalles/manejar.html"
                            ><button>Detalles y precio</button></a
                                ></span
                            >
                        </div>
                        <figure>
                            <img src="/src/images/lista_aventura/manejar_selva.jpg" alt="" />
                        </figure>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
export default Listas;