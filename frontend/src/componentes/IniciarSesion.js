import React, { useState, useEffect } from "react";
import styles from "../estilos/crear_cuenta.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function IniciarSesion() {
  const navigate = useNavigate();
  const [eCorreo, setECorreo] = useState("");
  const [eContra, setEContra] = useState("");
  const [clas1, setClas1] = useState(`${styles.error} ${styles.ocultar}`);
  const [clas2, setClas2] = useState(`${styles.error} ${styles.ocultar}`);
  useEffect(() => {
    const verificarSesion = localStorage.getItem("autenticado");
    if (verificarSesion) {
      navigate("/");
    } 
  }, [navigate]);

  const [body, setBody] = useState({
    Correo: "",
    Contrasenia: ""
  });

  const cambioEntrada = ({ target }) => {
    const { name, value } = target;
    setBody({ ...body, [name]: value });
  };

  const Enviar = async () => {
    setClas1(`${styles.error} ${styles.ocultar}`);
    setClas2(`${styles.error} ${styles.ocultar}`);
    if (!body.Correo.length || !body.Contrasenia) {
      if (body.Correo.length===0) { setECorreo("Debe llenar todos los campos."); setClas1(styles.error); }
      if (body.Contrasenia.length===0) { setEContra("Debe llenar todos los campos."); setClas2(styles.error); }
      return;
    }

    const verificarCorreo = await axios.post("http://localhost:8081/verificar", {
      Correo: body.Correo
    });

    const passcor = verificarCorreo.data.Resultado[0];
    if (passcor && passcor.Contrasenia !== body.Contrasenia) {
      setEContra("Contraseña incorrecta."); 
      setClas2(styles.error);
      return;
    }

    try {
      const response = await axios.post("http://localhost:8081/login", body);
      const resultado = response.data.Resultado;

      if (resultado.length > 0) {
        navigate("/");
        localStorage.setItem("autenticado", true);
      } else {
        setECorreo("El usuario que ingresaste no existe."); 
        setClas1(styles.error);  
      }
    } catch (error) {
      console.log("Error en el inicio de sesión: " + error);
    }
  };

  const cambiar = (e) => {
    const elemento = e.target.id;
    const input = document.getElementById("contra" + elemento);
    if (e.target.classList.contains("nf-md-eye")) {
      e.target.classList.remove("nf-md-eye");
      e.target.classList.add("nf-md-eye_off");
      input.type = "text";
    } else {
      e.target.classList.remove("nf-md-eye_off");
      e.target.classList.add("nf-md-eye");
      input.type = "password";
    }
  }

  return (
    <main className={styles.man}>
      <section className={styles.sec}>
        <Link to={"/"}>
          <img src={require("../images/logo2.png")} alt="" />
        </Link>
        <p>Correo electrónico</p>
        <input
          type="email"
          value={body.Correo}
          onChange={cambioEntrada}
          name="Correo"
        />
        <aside className={clas1}>{eCorreo}</aside>
        <p>Contraseña</p>
        <span className={styles.submit}>
          <input
            type="password"
            placeholder="Debe tener al menos 8 caracteres"
            value={body.Contrasenia}
            onChange={cambioEntrada}
            name="Contrasenia"
            id="contra1"
          />
          <i className="nf nf-md-eye" id="1" onClick={cambiar}></i>
        </span>
        <aside className={"error " + clas2}>{eContra}</aside>
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