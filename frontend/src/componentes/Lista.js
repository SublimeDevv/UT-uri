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
        const respuesta = await axios.get(`http://localhost:8081/lista/${id}`);
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
      <h1 className={styles.h1}>{listas[0].nombre_cat}</h1>
      <div className={styles.introduccion}>
        <p>{listas[0].descripcion}</p>
        <img
          src={require("../images/categorias/" + listas[0].CategoriaImg)}
          alt=""
        />
      </div>
      {listas.map((lista, index) => {
        if (stylecount === 0) {
          stylecount = 1;
          estilo = styles.seccion;
        } else {
          estilo = `${styles.seccion} ${styles.azul}`;
          stylecount = 0;
        }
        const list = lista.info.split(".");
        return (
          <>
            <div key={index} className={estilo}>
              <div>
                <h2>{lista.nombre_lug}</h2>
                <p>{list[0]+"."+list[1]+"."}</p>
                <span>
                  <Link to={"/detalles/" + lista.id}>
                    <button>Detalles y precio</button>
                  </Link>
                </span>
              </div>
              <figure>
                <img src={require("../images/" + lista.img)} alt="" />
              </figure>
            </div>
          </>
        );
      })}
    </>
  );
}
export default Lista;
