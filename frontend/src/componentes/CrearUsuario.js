import React, { useState, useEffect } from "react";
import styles from "../estilos/crear_cuenta.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import sw from "sweetalert";

export default function CrearUsuario() {
    const navigate = useNavigate();

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

    if (!body.Nombre.length || !body.Apellido.length || !body.Correo.length || !body.ConfirmarContrasenia.length) {
        return sw({ icon: 'warning', title: '¡Oops!', text: 'Debes rellenar todos los campos.' })  
    }

    const verificarCorreo = await axios.post("http://localhost:8081/verificar", {
        Correo: body.Correo
    });

    if (verificarCorreo.data.Resultado[0]) return sw({ icon: 'error', title: '¡Oops!', text: 'El correo que ingresaste ya existe.' })

    const correoRegex = /^[\w.-]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,6})+$/;
    const filtrarCaracteres = correoRegex.test(body.Correo);
    if(!filtrarCaracteres) return sw({ icon: 'error', title: '¡Oops!', text: 'El correo que ingresaste no debe contener caracteres especiales y espacios en blancos.' })

    const contraseniaRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    const comprobarContrasenia = contraseniaRegex.test(body.Contrasenia);
    if (!comprobarContrasenia) return sw({ icon: 'error', title: '¡Oops!', text: 'La contraseña debe tener mínimo 8 caracteres, mayúsculas y minúsculas, digitos y al menos un caracter especial(?=.*[@$!%*#?&])' })

    if (body.Contrasenia !== body.ConfirmarContrasenia) return sw({ icon: 'error', title: '¡Oops!', text: 'Las contraseñas deben coincidir.' }) 
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
    return (
        <>
         <main className={styles.man}>
        <section className={styles.sec}>
          <Link to={"/"}>
            <img src={require("../images/logo2.png")} alt="" />
          </Link>
          <div>
            <p>Nombre</p>
            <p>Apellidos</p>
          </div>
          <div>
            <input
              type="text"
              value={body.Nombre}
              onChange={cambioEntrada}
              name="Nombre"
            />
            <input
              type="text"
              value={body.Apellido}
              onChange={cambioEntrada}
              name="Apellido"
            />
          </div>
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
            placeholder="Debe tener almenos 8 caracteres"
            value={body.Contrasenia}
            onChange={cambioEntrada}
            name="Contrasenia"
          />
          <p>Confirmar contraseña</p>
          <input
            type="password"
            value={body.ConfirmarContrasenia}
            onChange={cambioEntrada}
            name="ConfirmarContrasenia"
          />
          <span>
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