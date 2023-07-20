import React, { useEffect, useState, useContext } from "react";
import style from "../estilos/general.module.css";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

function Header() {
  const { usuario } = useContext(UserContext)
  
  const [EstadoUsuario, setEstadoUsuario] = useState(false);
  const [text, setText] = useState(
    <Link className={style.a} to={"/iniciar"}>
      Iniciar Sesion
    </Link>
  );

  useEffect(() => {
    const verificarSesion = localStorage.getItem("token");
    if (verificarSesion) {
      setEstadoUsuario(true);
      setText(
        
        <Link
          className={style.a}
          to={"/"}
          onClick={() => {
            localStorage.clear("token");
            setEstadoUsuario(false);
            setText(
              <Link className={style.a} to={"/iniciar"}>
                Iniciar Sesion
              </Link>
            );
          }}
        >
          Cerrar sesion
        </Link>
      );
    }
  }, []);

  return (
    <>
      <header className={style.head}>
        <figure className={style.logo}>
          <Link className={style.a} to={"/"}>
            <img src={require("../images/logo.png")} alt="" />
          </Link>
        </figure>
        <span className={style.usuario}>
          {EstadoUsuario && (
            <figure>
              <img
                src={require("../images/avatares/"+ usuario.Avatar)}
                alt=""
                id={style.imgUsuario}
              />
            </figure>
          )}
          <figcaption id={style.nomUsuario}>{text}</figcaption>
        </span>
        <nav className={style.menu}>
          <Link className={style.a} to={"/"}>
            Inicio
          </Link>
          <Link className={style.a} to={"/categorias"}>
            Categorías
          </Link>
          <Link className={style.a} to={"/quienes_somos"}>
            Quiénes somos
          </Link>
          <Link className={style.a} to={"/contactanos"}>
            Contacto
          </Link>
          <Link className={style.a} to={"/productos"}>
            Productos
          </Link>
        </nav>
      </header>
    </>
  );
}

export default Header;