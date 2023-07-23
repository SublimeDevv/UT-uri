import styles from "../estilos/detalles.module.css";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Detalle() {
  const { id } = useParams();
  const [detalles, setDetalle] = useState([]);
  const navigate = useNavigate();

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
  return (
    <>
      {detalles.map((detalle, index) => {
        const obtenerImagenes = JSON.parse(detalle.Imagenes)
        return (
          <>
            <span className={styles.span}>
              <article id="borrar" className={styles.borroso}>
                
              </article>
              <aside>
                <figure className={styles.figure}>
                  <img
                    src={require("../images/" + obtenerImagenes[1])}
                    alt=""
                    className={styles.uno}
                  />
                </figure>
                <div className={styles.contenedor}>
                  <span className={styles.mapa}>

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
