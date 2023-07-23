import Header from "../../componentes/Header";
import Footer from "../../componentes/Footer";
import styles from "../../estilos/categorias.module.css";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
let estilo = "";
let stylecount = 0;
function Categorias() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listas, setListas] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const respuesta = await axios.get(
          `http://localhost:8081/api/categorias/ObtenerCategorias`
        );
        if (respuesta.data.Estatus === "EXITOSO") {
          if (respuesta.data.Resultado.length === 0) {
            navigate("/", { replace: true });
            return;
          }
          setListas(respuesta.data.Resultado);
        } else {
          console.log("Error");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);
  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.info}>
          <div className={styles.imagen}>
            <img src={require("../../images/logo.png")} alt="" />
            <p>La puerta a tus sueños viajeros en Mexico</p>
          </div>
          <section className={styles.caribe}>
            <img
              src={require("../../images/categorias/Principal.jpeg")}
              alt=""
            />
            <div>
              <h3>EL CARIBE MEXICANO</h3>
              <p>
                El Caribe Mexicano es un paraíso conformado por playas, zonas
                arqueológicas, selvas, cenotes y ríos subterráneos que enmarcan
                los mejores destinos de México El Caribe Mexicano se ubica en el
                sur de México, abarca el estado de Quintana Roo y el sureste de
                la Península de Yucatán. Desde Cancún hasta la Costa Maya y las
                encantadoras islas del Caribe Mexicano, son visitados por miles
                de turistas de todo el orbe cada año, gracias a su completa
                infraestructura hotelera, servicios de turismo de primera,
                gastronomía y entretenimiento.
              </p>
            </div>
          </section>
          <h2>Categorias</h2>
          {listas.map((lista, index) => {
            if (stylecount === 0) {
              stylecount = 1;
              estilo = styles.seccion;
            } else {
              estilo = `${styles.seccion} ${styles.azul}`;
              stylecount = 0;
            }
            return (
              <>
                <div key={index} className={estilo}>
                  <figure>
                    <img
                      src={require("../../images/categorias/" + lista.Imagen)}
                      alt="Sin imagen"
                    />
                  </figure>
                  <div>
                    <h2>Tours {lista.Nombre}</h2>
                    <p>{lista.Descripcion}</p>
                    <span>
                      <Link to={"/lista/" + lista.Nombre}>
                        <button>Ver Lugares</button>
                      </Link>
                    </span>
                  </div>
                </div>
              </>
            );
          })}
        </section>
      </main>
      <Footer />
    </>
  );
}
export default Categorias;
