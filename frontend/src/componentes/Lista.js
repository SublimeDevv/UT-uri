import styles from "../estilos/lista.module.css";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

let estilo = "";
let stylecount = 0;

function Lista() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listas, setListas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try { 
        const respuesta = await axios.get(`http://localhost:8081/api/lugares/ObtenerViajes/${id}`);
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
  }, [id]);

  if (listas.length === 0) {
    return null;
  }

  return (
    <>
      <h1 className={styles.h1}>{listas[0].NombreCategoria}</h1>
      <div className={styles.introduccion}>
        <p>{listas[0].Descripcion}</p>
        <img
          src={require("../images/categorias/" + listas[0].Imagen)}
          alt="Sin imagen"
        />
      </div>
      {listas.map((lista, index) => {
        const obtenerImagenes = JSON.parse(lista.Imagenes)
        console.log(obtenerImagenes[0])
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
                <span className={styles.span}>
                  <Link to={"/centroturistico/detalles/" + lista.Id+"/"+(lista.NombreLugar.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, ""))}>
                    <button>Detalles</button>
                  </Link>
                </span>
              </div>
              <figure>
                <img src={require("../images/"+ obtenerImagenes[0])} alt="Sin imagen" />
              </figure>
            </div>
          </>
        );
        
      })}
    </>
  );
}
export default Lista;
