import React, { useState, useEffect } from "react";
import styles from "../estilos/crear_cuenta.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function CrearUsuario() {
  const navigate = useNavigate();
  const [eCorreo, setECorreo] = useState("");
  const [eNombre, setENombre] = useState("");
  const [eApellido, setEApellido] = useState("");
  const [eContra, setEContra] = useState("");
  const [eContra2, setEContra2] = useState("");
  const [clas1, setClas1] = useState(`${styles.error} ${styles.ocultar}`);
  const [clas2, setClas2] = useState(`${styles.error} ${styles.ocultar}`);
  const [clas3, setClas3] = useState(`${styles.error} ${styles.ocultar}`);
  const [clas4, setClas4] = useState(`${styles.error} ${styles.ocultar}`);
  const [clas5, setClas5] = useState(`${styles.error} ${styles.ocultar}`);

  useEffect(() => {
    const verificarSesion = localStorage.getItem("autenticado");
    if (verificarSesion) {
      navigate("/");
    }
  }, [navigate]);

  const [body, setBody] = useState({
    Nombre: "",
    Apellido: "",
    Correo: "",
    Contrasenia: "",
    ConfirmarContrasenia: "",
  });

  const cambioEntrada = ({ target }) => {
    const { name, value } = target;
    setBody({ ...body, [name]: value });
  };

  const Enviar = async () => {
    setClas1(`${styles.error} ${styles.ocultar}`);
    setClas2(`${styles.error} ${styles.ocultar}`);
    setClas3(`${styles.error} ${styles.ocultar}`);
    setClas4(`${styles.error} ${styles.ocultar}`);
    setClas5(`${styles.error} ${styles.ocultar}`);
    if (!body.Nombre.length || !body.Apellido.length || !body.Correo.length || !body.Contrasenia || !body.ConfirmarContrasenia.length) {
      if (body.Nombre.length===0) { setENombre("Debe llenar todos los campos."); setClas1(styles.error); }
      if (body.Apellido.length===0) { setEApellido("Debe llenar todos los campos."); setClas2(styles.error); }
      if (body.Correo.length===0) { setECorreo("Debe llenar todos los campos."); setClas3(styles.error); }
      if (body.Contrasenia.length===0) { setEContra("Debe llenar todos los campos."); setClas4(styles.error); }
      if (body.ConfirmarContrasenia.length===0) { setEContra2("Debe llenar todos los campos."); setClas5(styles.error); }
      return;
    }

    const verificarCorreo = await axios.post("http://localhost:8081/verificar", {
      Correo: body.Correo
    });

    if (verificarCorreo.data.Resultado[0]) {
      setECorreo("El correo que ingresaste ya existe.");
      setClas3(styles.error);
      return;
    }

    const correoRegex = /^[\w.-]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,6})+$/;
    const filtrarCaracteres = correoRegex.test(body.Correo);
    if (!filtrarCaracteres){
      setECorreo("El correo que ingresaste no debe contener caracteres especiales y espacios en blancos.");
      setClas3(styles.error);
      return;
    }
    const contraseniaRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const comprobarContrasenia = contraseniaRegex.test(body.Contrasenia);
    if (!comprobarContrasenia) {
      setEContra("La contraseña debe tener mínimo 8 caracteres, mayúsculas y minúsculas, digitos y al menos un caracter especial(?=.*[@$!%*#?&])");
      setClas4(styles.error);
      return;
    }

    if (body.Contrasenia !== body.ConfirmarContrasenia) {
      setEContra2("Las contraseñas deben coincidir.");
      setClas5(styles.error);
      return;
    }
    try {
      await axios.post(
        "http://localhost:8081/registrarUsuario",
        {
          Nombre: body.Nombre,
          Apellido: body.Apellido,
          Correo: body.Correo,
          Contrasenia: body.Contrasenia,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      navigate("/");
      localStorage.setItem("autenticado", true);
    } catch (error) {
      console.log("Error en registrar el usuario: " + error);
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
    <>
      <main className={styles.man}>
        <section className={styles.sec}>
          <Link to={"/"} className={styles.img}>
            <img src={require("../images/logo2.png")} alt="" />
          </Link>
          <div>
            <p>Nombre</p>
            <p>Apellidos</p>
          </div>
          <div>
            <span>
              <input
                type="text"
                value={body.Nombre}
                onChange={cambioEntrada}
                name="Nombre"
              />
              <aside className={clas1}>{eNombre}</aside>
            </span>
            <span>
              <input
                type="text"
                value={body.Apellido}
                onChange={cambioEntrada}
                name="Apellido"
              />
              <aside className={clas2}>{eApellido}</aside>
            </span>
          </div>
          <p>Correo electrónico</p>
          <input
            type="email"
            value={body.Correo}
            onChange={cambioEntrada}
            name="Correo"
          />
          <aside className={clas3}>{eCorreo}</aside>
          <p>Contraseña</p>
          <span className={styles.submit}>
            <input
              type="password"
              placeholder="Debe tener almenos 8 caracteres"
              value={body.Contrasenia}
              onChange={cambioEntrada}
              name="Contrasenia"
              id="contra1"
            />
            <i className="nf nf-md-eye" id="1" onClick={cambiar}></i>
          </span>
          <aside className={clas4}>{eContra}</aside>
          <p>Confirmar contraseña</p>
          <span className={styles.submit}>
            <input
              type="password"
              value={body.ConfirmarContrasenia}
              onChange={cambioEntrada}
              id="contra2"
              name="ConfirmarContrasenia"
            />
            <i className="nf nf-md-eye" id="2" onClick={cambiar}></i>
          </span>
          <aside className={clas5}>{eContra2}</aside>
          <span className={styles.submit}>
            <input type="submit" value="Crear cuenta" onClick={Enviar} />
          </span>
          <p className={styles.p}>
            Si tienes una cuenta, <Link to={"/iniciar"}>clic aqui</Link>
          </p>
        </section>
      </main>
    </>
  );
}