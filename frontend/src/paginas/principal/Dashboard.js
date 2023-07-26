import React, { useContext, useEffect, useState } from "react";
import styles from "../../estilos/dashboard.module.css";
import Dashboards from "../../componentes/Dashboards";
import Vadmins from "../../componentes/Vadmins";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import AltasCategorias from "../../componentes/AltasCategorias";
import AltasLugares from "../../componentes/AltasLugares";
import Usuario from "../../componentes/Usuario";
import Categorias from "../../componentes/Categorias";
import Producto from "../../componentes/Producto";
import Msubcategoria from "../../componentes/Msubcategoria";
import Etiquetas from "../../componentes/Etiquetas";
import AltasEtiquetas from "../../componentes/AltasEtiquetas";

function Dashboard() {
  const { usuario } = useContext(UserContext);
  const navigate = useNavigate();
  const [menu, setMenu] = useState(""); 
  const [borroso, setBorroso] = useState(false);
  const [slider, setSlider] = useState(false);
  const [imagen, setImagen]=useState("")
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
    let saludo = "¡Hola " + usuario.Nombre + "!";
    let hola = saludo.split("");
    let saludo2 = "";
    function escribir(i) {
      if (i < hola.length) {
        saludo2 += hola[i];
        setMenu(saludo2);
        i++;
        setTimeout(function () {
          escribir(i);
        }, 175);
      }
    }
    escribir(0);
  }, []);

  const components = (componente) => {
    setComponentes(componente);
    ocultar();
  };
  const [clases, setClases] = useState({
    menu: `${styles.navegacion} ${styles.ocultar}`,
  });
  const [componentes, setComponentes] = useState(
    <Dashboards components={components} />
  );
  const mostrar = () => {
    setClases({
      ...clases,
      menu: `${styles.navegacion} ${styles.mostrar}`,
    });
  };
  const ocultar = () => {
    setClases({
      ...clases,
      menu: `${styles.navegacion} ${styles.ocultar}`,
    });
  };
  const mostrar2 = (image) => {
    setImagen(image)
    setBorroso(true);
    setSlider(true)
  };
  const ocultar2 = () => {
    setBorroso(false);
    setSlider(false)
  };
  return (
    <>
      {borroso && <div onClick={ocultar2} className={styles.borroso}></div>}
      {slider && <article className={styles.slider}>
        <span id="carril" className={styles.carril}>
            <section className="mod">
              <img
                src={require("../../images/avatares/" + imagen)}
              />
            </section>
        </span>
      </article>}
      <main className={styles.principal}>
        <aside className={clases.menu}>
          <div className={styles.head}>
            <figure>
              <img onClick={()=>mostrar2(usuario.Avatar)} src={require("../../images/avatares/" + usuario.Avatar)} />
              <figcaption>{usuario.Nombre}</figcaption>
            </figure>
            <div className={styles.contenido}>
              <span onClick={() => components(<Dashboards components={components} />)}>
                <i className="nf nf-md-home_account" id={styles.puntero}></i>
                <p className={styles.opciones2}> Dashboard </p>
                <div className={styles.triangleleft}></div>
              </span>
              <span onClick={() => components(<Usuario />)}>
                <i className="nf nf-oct-person" id={styles.puntero}></i>
                <p className={styles.opciones2}> Usuarios</p>
                <div className={styles.triangleleft}></div>
              </span>
              <span onClick={() => components(<Vadmins />)}>
                <i className="nf nf-md-account_arrow_up" id={styles.puntero}></i>
                <p className={styles.opciones2}>Admin</p>
                <div className={styles.triangleleft}></div>
              </span>
              <hr></hr>
              <span onClick={() => components(<Categorias />)}>
                <i className="nf nf-cod-list_unordered" id={styles.puntero}></i>
                <p className={styles.opciones2}>Categorias</p>
                <div className={styles.triangleleft}></div>
              </span>
              <span onClick={() => components(<Producto />)}>
                <i className="nf nf-md-palm_tree" id={styles.puntero}></i>
                <p className={styles.opciones2}>Productos</p>
                <div className={styles.triangleleft}></div>
              </span>
              <span onClick={() => components(<Etiquetas />)}>
                <i className="nf nf-md-label_variant" id={styles.puntero}></i>
                <p className={styles.opciones2}>Etiquetas</p>
                <div className={styles.triangleleft}></div>
              </span>
              <hr></hr>
              <span onClick={() => components(<AltasCategorias />)}>
                <i className="nf nf-cod-fold_down" id={styles.puntero}></i>
                <p className={styles.opciones2}>Categorias</p>
                <div className={styles.triangleleft}></div>
              </span>
              <span onClick={() => components(<AltasLugares />)}>
                <i className="nf nf-cod-fold_down" id={styles.puntero}></i>
                <p className={styles.opciones2}>Productos</p>
                <div className={styles.triangleleft}></div>
              </span>
              <span onClick={() => components(<AltasEtiquetas />)}>
                <i className="nf nf-cod-fold_down" id={styles.puntero}></i>
                <p className={styles.opciones2}>Etiquetas</p>
                <div className={styles.triangleleft}></div>
              </span>

            </div>
          </div>
        </aside>
        <i className="nf nf-cod-menu" id={styles.mostrar} onClick={mostrar}></i>
        <section className={styles.contenedores} onClick={ocultar}>
          <div className={styles.titulo}>
            <h1>{menu}</h1>
          </div>
          <div className={styles.dashboard}>{componentes}</div>
        </section>
      </main>
    </>
  );
}

export default Dashboard;