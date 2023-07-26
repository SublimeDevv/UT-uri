import styles from "../estilos/detalles.module.css";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import ObtenerMapa from "./ObtenerMapa";

export default function Detalle() {
  const { id } = useParams();
  const [detalles, setDetalle] = useState([]);
  const [sub, setSub] = useState([]);
  const [cat, setCat] = useState([]);
  const navigate = useNavigate();
  const [borroso, setBorroso] = useState(false);
  const [slider, setSlider] = useState(false);
  const [tamaño, setTamaño] = useState(false);
  const [contadores, setContadores] = useState(0);
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
          console.log(detalles);
        } else {
          console.log("Error");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id, navigate]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const respuesta = await axios.get(
          `http://localhost:8081/api/lugares/ObtenerSubcategorias/${id}`
        );
        const respuesta2 = await axios.get(
          `http://localhost:8081/api/lugares/ObtenerCategorias/${id}`
        );
        if (respuesta.data.Estatus === "EXITOSO") {
          setSub(respuesta.data.Resultado);
        } else {
          console.log("Error");
        }
        if (respuesta2.data.Estatus === "EXITOSO") {
          setCat(respuesta2.data.Resultado);
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
  const izquierda = () => {
    if (boton) {
      contador--;
      if (contador < 0) {
        contador = tamaño - 1;
      }
      operacion = contador * (100 / tamaño);
      document.getElementById("carril").style.transform = `translate(-${operacion}%)`;
      document.getElementById("carril").style.transition = "all ease 0.75s";
      boton = false;
      setTimeout(habilitar, 750);
    }
  };

  const derecha = () => {
    if (boton) {
      contador++;
      if (contador >= tamaño) {
        contador = 0;
      }
      operacion = contador * (100 / tamaño);
      document.getElementById("carril").style.transform = `translate(-${operacion}%)`;
      document.getElementById("carril").style.transition = "all ease 0.75s";
      boton = false;
      setTimeout(habilitar, 750);
    }
  };

  const definir = (tamaños) => {
    let tamaño2 = tamaños * 100;
    document.getElementById("carril").style.width = `${tamaño2}%`;
    const secciones = document.querySelectorAll(".mod");
    secciones.forEach((seccion) => {
      seccion.style.width = `calc(100% / ${tamaños})`;
    });
    setTamaño(tamaños);
  };
  return (
    <>
      {detalles.map((detalle, index) => {
        const obtenerImagenes = JSON.parse(detalle.Imagenes)
        console.log(obtenerImagenes.length);
        return (
          <>
            <div className={styles.ruta}>
              <Link to={"/categorias"} className={styles.a1}>
                Categorias
              </Link>
              <p>»</p>
              <Link to={"/centroturistico/" + detalle.CategoriaNombre} className={styles.a1}>
                Productos
              </Link>
              <p>»</p>
              <Link to={"/detalles"} className={styles.a2}>
                {detalle.Nombre}
              </Link>
            </div>
            <span className={styles.span}>
              {borroso && <div onClick={() => { ocultar(); setContadores(contador); }} className={styles.borroso}></div>}
              {slider && <article className={styles.slider}>
                <div onClick={izquierda} className={styles.izquierda}><i className="nf nf-cod-chevron_left"></i></div>
                <span id="carril" className={styles.carril}>
                  {obtenerImagenes.map((imagen, index) => (
                    <section key={index} className="mod">
                      <img
                        src={require("../images/" + imagen)}
                        alt={`Imagen ${index + 1}`}
                        onLoad={() => { definir(obtenerImagenes.length) }}
                      />
                    </section>
                  ))}
                </span>
                <div onClick={derecha} className={styles.derecha}><i className="nf nf-cod-chevron_right"></i></div>
              </article>}
              <aside>
                <div className={styles.contenedor}>
                  <span className={styles.mapa}>
                    <ObtenerMapa x={detalle.Latitud} y={detalle.Longitud} />
                  </span>
                </div>
              </aside>

              <div key={index} className={styles.div}>
                <h1>{detalle.Nombre}</h1>
                <p className={styles.p}>{detalle.Descripcion}</p>
                <div className={styles.imagen}>
                  <figure tabIndex="0" className={styles.figure}>
                    <img
                      onClick={mostrar}
                      src={require("../images/" + obtenerImagenes[contadores])}
                      alt=""
                      className={styles.uno}
                    />
                  </figure>
                </div>
                <div className={styles.categorias}>
                  <p className={styles.cat1}>Categorias</p>
                  <div className={styles.contenido}>
                    {cat.map((categoria, index) => {
                      return <Link to={"/centroturistico/" + categoria.Nombre} className={styles.etiqueta} key={index}>{categoria.Nombre}</Link>;
                    })}
                  </div>
                </div>
                <div className={styles.categorias}>
                  <p>Etiquetas</p>
                  <div className={styles.contenido}>
                    {sub.map((subcategoria, index) => {
                      return <Link to={"/etiquetas/" + subcategoria.SubcategoriaID + "/" + (subcategoria.SubcategoriasNombre.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, ""))} className={styles.etiqueta} key={index}>{subcategoria.SubcategoriasNombre}</Link>;
                    })}
                  </div>
                </div>
              </div>
            </span>

          </>
        );
      })}
    </>
  );
}
