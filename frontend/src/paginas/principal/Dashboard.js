import React, { useContext, useEffect, useState } from "react";
import styles from "../../estilos/dashboard.module.css";
import Dashboards from "../../componentes/Dashboards";
import MUsuario from "../../componentes/MUsuario";
import MAdministradores from "../../componentes/MAdministradores";
import MProductos from "../../componentes/MProductos";
import MListas from "../../componentes/MListas";
import Vusuarios from "../../componentes/Vusuarios";
import Vadmins from "../../componentes/Vadmins";
import Vlistas from "../../componentes/Vlistas";
import Vproductos from "../../componentes/Vproductos";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import AltasCategorias from "../../componentes/AltasCategorias";
import AltasLugares from "../../componentes/AltasLugares";
import Usuario from "../../componentes/Usuario";
import Categorias from "../../componentes/Categorias";
import Producto from "../../componentes/Producto";

function Dashboard() {
  const { usuario } = useContext(UserContext);
  const navigate = useNavigate();
  const [menu, setMenu] = useState({
    img: "default_avatar.jpg",
    nombre: "Nombre",
  });
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
    const fetchData = async () => {
      try {
        const verificarCorreo = await axios.post(
          "http://localhost:8081/VerificarCorreo",
          {
            Correo: localStorage.getItem("correo"),
          }
        );
        if (verificarCorreo.data.Estatus === "EXITOSO") {
          setMenu({
            img: verificarCorreo.data.Resultado[0].Avatar,
            nombre: verificarCorreo.data.Resultado[0].Nombre,
          });
        } else {
          console.log("Error");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
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
      ["menu"]: `${styles.navegacion} ${styles.mostrar}`,
    });
  };
  const ocultar = () => {
    setClases({
      ...clases,
      ["menu"]: `${styles.navegacion} ${styles.ocultar}`,
    });
  };

  return (
    <>
      <main className={styles.principal}>
        <aside className={clases.menu}>
          <div className={styles.head}>
            <figure>
              <img src={require("../../images/avatares/" + usuario.Avatar)} />
              <figcaption>{usuario.Nombre}</figcaption>
            </figure>
            <i className="nf nf-md-home_account" id={styles.puntero}>
              <p
                onClick={() =>
                  components(<Dashboards components={components} />)
                }
              >
                Dashboard
              </p>
            </i>
            <i className="nf nf-fae-tools">
              <p>Administracion</p>
            </i>
            <p className={styles.opciones}><i class="nf nf-fa-user_o"></i> Personas</p>
            <p
              className={styles.opciones2}
              onClick={() => components(<Usuario />)}
            >
              Usuarios
            </p>
            <p
              className={styles.opciones2}
              onClick={() => components(<Vadmins />)}
            >
              Administradores
            </p>
            <p className={styles.opciones}><i class="nf nf-md-format_list_bulleted"></i> Listas</p>
            <p
              className={styles.opciones2}
              onClick={() => components(<Categorias />)}
            >
              Categorias
            </p>
            <p
              className={styles.opciones2}
              onClick={() => components(<Producto />)}
            >
              Productos
            </p>
            <p className={styles.opciones}><i class="nf nf-md-transfer_up"></i> Altas</p>
            <p
              className={styles.opciones2}
              onClick={() => components(<AltasCategorias />)}
            >
              Categorias
            </p>
            <p
              className={styles.opciones2}
              onClick={() => components(<AltasLugares />)}
            >
              Productos
            </p>
          </div>
          <figure className={styles.figure}>
            <img src={require("../../images/logo.png")}></img>
          </figure>
        </aside>
        <i className="nf nf-cod-menu" id={styles.mostrar} onClick={mostrar}></i>
        <section className={styles.contenedores} onClick={ocultar}>
          <div className={styles.titulo}>
            <h1>¡Bienvenido {usuario.Nombre}!</h1>
          </div>
          <div className={styles.dashboard}>{componentes}</div>
        </section>
      </main>
    </>
  );
}

export default Dashboard;
