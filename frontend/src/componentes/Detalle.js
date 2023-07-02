import styles from "../estilos/detalles.module.css";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Detalle() {
  const { id } = useParams();
  const [detalles, setDetalle] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const respuesta = await axios.get(
          `http://localhost:8081/detalles/${id}`
        );
        if (respuesta.data.Estatus === "EXITOSO") {
          setDetalle(respuesta.data.Resultado);
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
      {detalles.map((detalle, index) => {
        //console.log(detalle.imgUno)
        return (
          <>
            <span className={styles.span}>
              <figure className={styles.figure}>
                <img src={require('../images/detalles/'+detalle.imgUno)} alt="" className={styles.uno} />
                <img src={require('../images/detalles/'+detalle.imgDos)} alt="" className={styles.dos} />
                <img src={require('../images/detalles/'+detalle.imgTres)} alt="" className={styles.tres} />
              </figure>
              <div className={styles.div}>
                <h1>{detalle.nombre}</h1>
                <p className={styles.p}>{detalle.descripcion}</p>
                <p className={styles.p}></p>
                <span>
                  <figure className={styles.fig}>
                    <div className={styles.orden}>
                      <i className="nf nf-md-walk">{detalle.personas}</i>
                    </div>
                    <p className={styles.Personas}>Personas</p>
                  </figure>
                  <p className={styles.p2}>$ {detalle.precio}</p>
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
