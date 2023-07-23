import React, { useState } from "react";
import styles from "../estilos/crear_cuenta.module.css";
import axios from "axios";
import Swal from "sweetalert2";

export default function MUsuario() {
  const [body, setBody] = useState({
    Nombre: "",
    Apellido: "",
    Correo: "",
    Contrasenia: "",
    ConfirmarContrasenia: "",
  });
  const [ocultar, setOcultar] = useState({
    uno: "password",
    dos: "password",
  });
  const [texto, setTexto] = useState({
    Nombre: "",
    Apellido: "",
    Correo: "",
    Contrasenia: "",
    ConfirmarContrasenia: "",
  });
  const [clas, setClas] = useState({
    Nombre: `${styles.error} ${styles.ocultar}`,
    Apellido: `${styles.error} ${styles.ocultar}`,
    Correo: `${styles.error} ${styles.ocultar}`,
    Contrasenia: `${styles.error} ${styles.ocultar}`,
    ConfirmarContrasenia: `${styles.error} ${styles.ocultar}`,
  });

  const cambioEntrada = ({ target }) => {
    const { name, value } = target;
    setBody({ ...body, [name]: value });
  };

  const Enviar = async () => {
    for (let clases in clas) {
      clas[clases] = `${styles.error} ${styles.ocultar}`;
    }
    if (
      !body.Nombre.length ||
      !body.Apellido.length ||
      !body.Correo.length ||
      !body.Contrasenia ||
      !body.ConfirmarContrasenia.length
    ) {
      let actualizarClas = { ...clas };
      let actualizarTexto = { ...texto };
      for (let cuerpo in body) {
        if (body[cuerpo].length === 0) {
          actualizarTexto[cuerpo] = "Debe llenar todos los campos.";
          actualizarClas[cuerpo] = styles.error;
        }
      }
      setClas(actualizarClas);
      setTexto(actualizarTexto);
      return;
    }

    const verificarCorreo = await axios.post(
      "http://localhost:8081/api/usuarios/VerificarCorreo",
      {
        Correo: body.Correo,
      }
    );

    if (verificarCorreo.data.Estatus === 'EXITOSO') {
      setTexto({ ...texto, Correo: "El correo que ingresaste ya existe." });
      setClas({ ...clas, Correo: styles.error });
      return;
    }

    const correoRegex = /^[\w.-]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,6})+$/;
    const filtrarCaracteres = correoRegex.test(body.Correo);
    if (!filtrarCaracteres) {
      setTexto({...texto, Correo: "El correo que ingresaste no debe contener caracteres especiales y espacios en blancos."});
      setClas({ ...clas, Correo: styles.error });
      return;
    }
    const contraseniaRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const comprobarContrasenia = contraseniaRegex.test(body.Contrasenia);
    if (!comprobarContrasenia) {
      setTexto({
        ...texto,
        Contrasenia:
          "La contraseña debe tener mínimo 8 caracteres, mayúsculas y minúsculas, dígitos y al menos un caracter especial(?=.*[@$!%*#?&])",
      });
      
      setClas({ ...clas, Contrasenia: styles.error });
      return;
    }

    if (body.Contrasenia !== body.ConfirmarContrasenia) {
      setTexto( {...texto, ConfirmarContrasenia: "Las contraseñas deben coincidir." });
      setClas({ ...clas, ConfirmarContrasenia: styles.error });      
      return;
    }

    try {
      await axios.post(
        "http://localhost:8081/api/usuarios/RegistrarUsuario",
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
      Swal.fire(
        'Usuario Registrado'
      );
      setBody({
        Nombre: "",
        Apellido: "",
        Correo: "",
        Contrasenia: "",
        ConfirmarContrasenia: "",
      });
    } catch (error) {
      console.log("Error al registrar el usuario: " + error);
    }
  };

  const cambiar = (e) => {
    const elemento = e.target.id;
    if (e.target.classList.contains("nf-md-eye")) {
      e.target.classList.remove("nf-md-eye");
      e.target.classList.add("nf-md-eye_off");
      elemento === 1
        ? setOcultar({ ...ocultar, uno: "text" })
        : setOcultar({ ...ocultar, dos: "text" });
    } else {
      e.target.classList.remove("nf-md-eye_off");
      e.target.classList.add("nf-md-eye");
      elemento === 1
        ? setOcultar({ ...ocultar, uno: "password" })
        : setOcultar({ ...ocultar, dos: "password" });
    }
  };
  
  return (
    <>
      <main className={styles.man2}>
        <section className={styles.sec2}>
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
              <aside className={clas.Nombre}>{texto.Nombre}</aside>
            </span>
            <span>
              <input
                type="text"
                value={body.Apellido}
                onChange={cambioEntrada}
                name="Apellido"
              />
              <aside className={clas.Apellido}>{texto.Apellido}</aside>
            </span>
          </div>
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
            />
            <i className={"nf nf-md-eye"} id="1" onClick={cambiar}></i>
          </span>
          <aside className={clas.Contrasenia}>{texto.Contrasenia}</aside>
          <p>Confirmar contraseña</p>
          <span className={styles.submit}>
            <input
              type={ocultar.dos}
              value={body.ConfirmarContrasenia}
              onChange={cambioEntrada}
              name="ConfirmarContrasenia"
            />
            <i className={"nf nf-md-eye"} id="2" onClick={cambiar}></i>
          </span>
          <aside className={clas.ConfirmarContrasenia}>
            {texto.ConfirmarContrasenia}
          </aside>
          <span className={styles.submit}>
            <input type="submit" value="Crear cuenta" onClick={Enviar} />
          </span>
        </section>
      </main>
    </>
  );
}
