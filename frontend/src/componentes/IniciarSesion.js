import React, { useState, useEffect, useContext } from "react";
import styles from "../estilos/crear_cuenta.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";

export default function IniciarSesion() {
  const navigate = useNavigate();
  const [body, setBody] = useState({
    Correo: "",
    Contrasenia: ""
  });
  const [ocultar, setOcultar] = useState(true);
  const [errores, setErrores] = useState({
    Correo: "",
    Contrasenia: ""
  });

  const { usuario, obtenerUsuarioActual } = useContext(UserContext);

  useEffect(() => {
    const verificarSesion = localStorage.getItem("token");
    if (verificarSesion && !usuario) {
      navigate("/")
    }
  }, [usuario]);

  const cambioEntrada = (e) => {
    setBody({ ...body, [e.target.name]: e.target.value });
    setErrores({ ...errores, [e.target.name]: "" });
  };

  const Enviar = async () => {
    setErrores({ Correo: "", Contrasenia: "" });

    if (!body.Correo || !body.Contrasenia) {
      setErrores((prevenirErrores) => ({
        ...prevenirErrores,
        Correo: body.Correo ? "" : "Debe llenar todos los campos.",
        Contrasenia: body.Contrasenia ? "" : "Debe llenar todos los campos."
      }));
      return;
    }

    try {
    const verificarCorreo = await axios.post("http://localhost:8081/VerificarCorreo", { Correo: body.Correo });
    if (verificarCorreo.data.Estatus !== 'EXITOSO') return setErrores({ Correo: "El usuario que ingresaste no existe." });
    const verificarUsuario = await axios.post("http://localhost:8081/IniciarSesion", body);
    if (verificarUsuario.data.Estatus === "EXITOSO") {
      localStorage.setItem("token", verificarUsuario.data.token);
      localStorage.setItem("correo",body.Correo);
      navigate("/");
      await obtenerUsuarioActual();
    } else {
      setErrores({ Contrasenia: "Contraseña incorrecta." });
    }

  } catch (error) {
    console.log("Se produjo un error: ", error);
  }
  };

  const toggleMostrarContrasenia = () => {
    setOcultar(!ocultar);
  };

  return (
    <main className={styles.man}>
      <section className={styles.sec}>
        <Link to={"/"} className={styles.img}>
          <img src={require("../images/logo2.png")} alt="" />
        </Link>
        <p>Correo electrónico</p>
        <input
          type="email"
          value={body.Correo}
          onChange={cambioEntrada}
          name="Correo"
        />
        {errores.Correo && <aside className={styles.error}>{errores.Correo}</aside>}
        <p>Contraseña</p>
        <span className={styles.submit}>
          <input
            type={ocultar ? "password" : "text"}
            placeholder="Debe tener al menos 8 caracteres"
            value={body.Contrasenia}
            onChange={cambioEntrada}
            name="Contrasenia"
          />
          <i
            className={`nf ${ocultar ? "nf-md-eye" : "nf-md-eye_off"}`}
            onClick={toggleMostrarContrasenia}
          ></i>
        </span>
        {errores.Contrasenia && (
          <aside className={styles.error}>{errores.Contrasenia}</aside>
        )}
        <Link className={styles.olvidar}>¿Olvidaste tu contraseña?</Link>
        <span className={styles.submit}>
          <input type="submit" value="Iniciar sesión" onClick={Enviar} />
        </span>
        <p className={styles.p}>
          Si no tienes una cuenta, <Link to={"/crear"}>haz clic aquí</Link>
        </p>
      </section>
    </main>
  );
}