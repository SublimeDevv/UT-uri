import styles from "../estilos/detalles.module.css";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import ObtenerMapa from "./ObtenerMapa";

export default function Detalle() {
  const { id } = useParams();
  const [detalles, setDetalle] = useState([]);
  const navigate = useNavigate();
  const [borroso, setBorroso] = useState(false);
  const [slider, setSlider] = useState(false);
  var operacion = 0, contador = 0, boton = true;
  function habilitar() {
    boton = true;
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const respuesta = await axios.get(
          `http://localhost:8081/api/lugares/ObtenerDetalles/${id}`
        );
        if (respuesta.data.Estatus === "EXITOSO") {
          if (respuesta.data.Resultado.length === 0) {
            navigate("/", { replace: true });
            return;
          }
          setDetalle(respuesta.data.Resultado);
        } else {
          console.log("Error");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id, navigate]);
  const ocultar = () => {
    setBorroso(false);
    setSlider(false);
  };
  const mostrar = () => {
    setBorroso(true);
    setSlider(true)
  };
  const derecha = () => {
    if (boton) {
      contador++;
      operacion = operacion + 25;
      if (contador >= 4) {
        contador = 0;
        operacion = 0;
      }
      document.getElementById("carril").style.transform = `translate(-${operacion}%)`;
      document.getElementById("carril").style.transition = "all ease 0.75s";
      boton = false;
      setTimeout(habilitar, 750);
    }
  }
  const izquierda = () => {
    if (boton) {
      contador--;
      operacion = operacion - 25;
      if (contador < 0) {
        contador = 3;
        operacion = 75;
      }
      document.getElementById("carril").style.transform = `translate(-${operacion}%)`;
      document.getElementById("carril").style.transition = "all ease 0.75s";
      boton = false;
      setTimeout(habilitar, 750);
    }
  }
  return (
    <>
      {detalles.map((detalle, index) => {
        const obtenerImagenes = JSON.parse(detalle.Imagenes)
        return (
          <>
            <span className={styles.span}>
              {borroso && <div onClick={ocultar} className={styles.borroso}></div>}
              {slider && <article className={styles.slider}>
                <div onClick={izquierda} className={styles.izquierda}><i className="nf nf-cod-chevron_left"></i></div>
                <span id="carril" className={styles.carril}>
                  <section>
                    <img src={require("../images/" + obtenerImagenes[0])}></img>
                  </section>
                  <section>
                    <img src={require("../images/" + obtenerImagenes[1])}></img>
                  </section>
                  <section>
                    <img src={require("../images/" + obtenerImagenes[2])}></img>
                  </section>
                  <section>
                    <img src={require("../images/" + obtenerImagenes[3])}></img>
                  </section>
                </span>
                <div onClick={derecha} className={styles.derecha}><i className="nf nf-cod-chevron_right"></i></div>
              </article>}
              <aside>
                <figure tabIndex="0" className={styles.figure}>
                  <img
                    onClick={mostrar}
                    src={require("../images/" + obtenerImagenes[0])}
                    alt=""
                    className={styles.uno}
                  />
                </figure>
                <div className={styles.contenedor}>
                  <span className={styles.mapa}>
                    <ObtenerMapa />
                  </span>
                </div>
              </aside>

              <div key={index} className={styles.div}>
                <h1>{detalle.Nombre}</h1>
                <p className={styles.p}>{detalle.Descripcion}</p>
                <span>
                  <figure className={styles.fig}>
                    <div className={styles.orden}>
                      <i className="nf nf-md-walk">{detalle.Personas}</i>
                    </div>
                    <p className={styles.Personas}>Personas</p>
                  </figure>
                  <p className={styles.p2}>$ {detalle.Precio}</p>
                </span>
                <section id={styles.boton}>
                  <Link to={"/pago"}>
                    <button>
                      <i className="nf nf-fa-plane"> Ir al pago</i>
                    </button>
                  </Link>
                </section>
              </div>
            </span>
          </>
        );
      })}
    </>
  );
}
