import React, { useState, useEffect } from "react";
import styles from "../estilos/crear_cuenta.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function IniciarSesion() {
  const navigate = useNavigate();
  const [body, setBody] = useState({
    Correo: "",
    Contrasenia: ""
  });
  const [ocultar,setOcultar]=useState({
    uno:"password",
    dos:"password",
  });
  const [clas, setClas]=useState({
    Correo:`${styles.error} ${styles.ocultar}`,
    Contrasenia:`${styles.error} ${styles.ocultar}`,
  });
  const [texto,setTexto]=useState({
    Correo: "",
    Contrasenia: "",
  });

  useEffect(() => {
    const verificarSesion = localStorage.getItem("token");
    if (verificarSesion) {
      navigate("/");
    }
  }, [navigate]);

  const cambioEntrada = ({ target }) => {
    const { name, value } = target;
    setBody({ ...body, [name]: value });
  };

  const Enviar = async () => {
    for (let clases in clas){
      clas[clases]=`${styles.error} ${styles.ocultar}`;
    }
    if (!body.Correo.length || !body.Contrasenia) {
      let actualizarClas={...clas}; let actualizarTexto={...texto};
      for (let cuerpo in body){
        if(body[cuerpo].length===0){
          actualizarTexto[cuerpo]="Debe llenar todos los campos.";
          actualizarClas[cuerpo]=styles.error;
        }
      }
      setClas(actualizarClas); setTexto(actualizarTexto);
      return;
    }

    const verificarCorreo = await axios.post("http://localhost:8081/verificar", {
      Correo: body.Correo
    });

    const passcor = verificarCorreo.data.Resultado[0];
    if (passcor && passcor.Contrasenia !== body.Contrasenia) {
      setTexto({...texto,["Contrasenia"]:"Contraseña incorrecta."})
      setClas({...clas,["Contrasenia"]:styles.error});
      return;
    }

    try {
      const response = await axios.post("http://localhost:8081/login", body);
      const resultado = response.data.Resultado;

      if (resultado.length > 0) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("correo",response.data.Resultado[0].CorreoUsuario);
        localStorage.setItem("nivel", response.data.Resultado[0].nivel);
        navigate("/dashboard");
      } else {
        setTexto({...texto,["Correo"]:"El usuario que ingresaste no existe."})
        setClas({...clas,["Correo"]:styles.error});
      }
    } catch (error) {
      console.log("Error en el inicio de sesión: " + error);
    }
  };

  const cambiar = (e) => {
    const elemento = e.target.id;
    if (e.target.classList.contains("nf-md-eye")) {
      e.target.classList.remove("nf-md-eye");
      e.target.classList.add("nf-md-eye_off");
      (elemento==1) ? setOcultar({...ocultar,["uno"]:"text"}) : setOcultar({...ocultar,["dos"]:"text"})
    } else {
      e.target.classList.remove("nf-md-eye_off");
      e.target.classList.add("nf-md-eye");
      (elemento==1) ? setOcultar({...ocultar,["uno"]:"password"}) : setOcultar({...ocultar,["dos"]:"password"})
    }
  }

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
        <aside className={clas.Correo}>{texto.Correo}</aside>
        <p>Contraseña</p>
        <span className={styles.submit}>
          <input
            type={ocultar.uno}
            placeholder="Debe tener al menos 8 caracteres"
            value={body.Contrasenia}
            onChange={cambioEntrada}
            name="Contrasenia"
            id="contra1"
          />
          <i className="nf nf-md-eye" id="1" onClick={cambiar}></i>
        </span>
        <aside className={clas.Contrasenia}>{texto.Contrasenia}</aside>
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