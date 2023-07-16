import styles from "../../estilos/lista.module.css";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../../componentes/Header";
import Footer from "../../componentes/Footer";

let estilo = "";
let stylecount = 0;

export default function Productos() {
  const navigate = useNavigate();
  const [listas, setListas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const respuesta = await axios.get(`http://localhost:8081/obtenerProductos`);
        if (respuesta.data.Estatus === "EXITOSO") {
          if (respuesta.data.Resultado.length === 0) {
            navigate('/', { replace: true });
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
  }, [navigate]);

  if (listas.length === 0) {
    return null;
  }
  return (
    <>
    <Header/>
    <main className={styles.main}>
        <section className={styles.info}>
      <h1 className={styles.h1}>Todos Nuestros Productos</h1>
      {listas.map((lista, index) => {
        const obtenerImagenes = JSON.parse(lista.Imagenes)
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
              <div>
                <h2>{lista.NombreLugar}</h2>
                <p>{lista.Informacion}</p>
                <span>
                  <Link to={"/detalles/" + lista.Id}>
                    <button>Detalles y precio</button>
                  </Link>
                </span>
              </div>
              <figure>
                <img src={require("../../images/" + obtenerImagenes[0])} alt="" />
              </figure>
            </div>
          </>
        );
      })}
      </section>
      </main>
      <Footer/>
    </>
  );
}