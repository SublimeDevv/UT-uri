import React, { useState, useEffect } from "react";
import styles from "../estilos/crear_cuenta.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import sw from "sweetalert";

export default function IniciarSesion() {
    const navigate = useNavigate();
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
    if (!body.Correo.length || !body.Contrasenia) {
        return sw({ icon: 'warning', title: '¡Oops!', text: 'Debes rellenar todos los campos.' })  
    }

    const verificarCorreo = await axios.post("http://localhost:8081/verificar", {
        Correo: body.Correo
    });

    const passcor = verificarCorreo.data.Resultado[0];
    if (passcor && passcor.Contrasenia !== body.Contrasenia) return sw({ icon: 'error', title: 'Error', text: 'Contraseña incorrecta.' });

    try {
      const response = await axios.post("http://localhost:8081/login", body);
      const resultado = response.data.Resultado;

      if (resultado.length > 0) {
        navigate("/");
        localStorage.setItem("autenticado", true);
      } else {
        sw({ icon: 'error', title: 'Error', text: 'El usuario que ingresaste no existe...' })  
      }
    } catch (error) {
      console.log("Error en el inicio de sesión: " + error);
    }
  };

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
        <p>Contraseña</p>
        <input
          type="password"
          placeholder="Debe tener al menos 8 caracteres"
          value={body.Contrasenia}
          onChange={cambioEntrada}
          name="Contrasenia"
        />
        <Link className={styles.olvidar}>¿Olvidaste tu contraseña?</Link>
        <span>
          <input type="submit" value="Iniciar sesión" onClick={Enviar} />
        </span>
        <p className={styles.p}>
          Si no tienes una cuenta, <Link to={"/crear"}>haz clic aquí</Link>
        </p>
      </section>
    </main>
  );
}