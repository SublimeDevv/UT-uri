import React, { useState } from "react";
import styles from "../estilos/formularios.module.css";
import axios from "axios";
import Swal from "sweetalert2";

export default function MUsuario() {
  const [body, setBody] = useState({
    Correo: "",
    checkbox: false,
  });
  const [menu, setMenu] = useState({
    img: "default_avatar.jpg",
    nombre: "Nombre",
  });
  const [texto, setTexto] = useState({
    Correo: "",
  });
  const [clas, setClas] = useState({
    Correo: `${styles.error} ${styles.ocultar}`,
  });

  const cambioEntrada = ({ target }) => {
    const { name, value } = target;
    setBody({ ...body, [name]: value });
  };

  const check = () => {
    setBody({ ...body, checkbox: !body.checkbox });
  };

  const verificar = async () => {
    setClas({ ...clas, Correo: `${styles.error} ${styles.ocultar}` });

    if (!body.Correo.length) {
      let actualizarClas = { ...clas };
      let actualizarTexto = { ...texto };

      for (let campo in body) {
        if (body[campo].length === 0) {
          actualizarTexto[campo] = "Debe llenar este campo.";
          actualizarClas[campo] = styles.error;
        }
      }

      setClas(actualizarClas);
      setTexto(actualizarTexto);
      return;
    }

    try {
      const verificarCorreo = await axios.post(
        "http://localhost:8081/VerificarCorreo",
        {
          Correo: body.Correo,
        }
      );

      if (
        verificarCorreo.data.Resultado &&
        verificarCorreo.data.Resultado.length > 0
      ) {
        const usuario = verificarCorreo.data.Resultado[0];
        setMenu({
          img: usuario.Avatar,
          nombre: usuario.Nombre,
        });
        setBody((prevBody) => ({
          ...prevBody,
          Id: usuario.Id,
          RolID: usuario.RolID,
        }));
      } else {
        setClas({ ...clas, Correo: styles.error });
        setMenu({
          img: "default_avatar.jpg",
          nombre: "¡Oops!",
        });
        setTexto({ ...texto, Correo: "El correo que ingresaste no existe." });
        setBody((prevBody) => ({
          ...prevBody,
          RolID: 0,
          Id: false,
        }));
      }
    } catch (error) {
      console.error("Error al verificar el correo:", error);
    }
  };

  const cambiar = async () => {
    verificar();

    if (body.checkbox) {
      if (!body.Id) {
        return;
      }
      if (body.RolID === 1) {
        return Swal.fire({
          icon: "error",
          title: "El usuario ya es administrador",
        });
      } else {
        const nuevoRol = 1;
        try {
          await axios.put(
            `http://localhost:8081/CambiarRolUsuario/${body.Id}`,
            {
              nuevoRol: nuevoRol,
            }
          );

          Swal.fire({
            icon: "success",
            title: "Rol cambiado exitosamente",
          });
        } catch (error) {
          setTexto({ ...texto, Correo: "El correo que ingresaste no existe." });
        }
      }
    } else {
      setTexto({
        ...texto,
        Correo:
          "Si quiere convertir el usuario en administrador, debe marcar primero la casilla de checkbox.",
      });
      setClas({ ...clas, Correo: styles.error });
    }
  };

  const borrar = async () => {
    try {
      await axios.delete(`http://localhost:8081/EliminarUsuario/${body.Id}`);
      Swal.fire({
        icon: "success",
        title: "Usuario eliminado exitosamente",
      });
    } catch (error) {
        setTexto({ ...texto, Correo: "El correo que ingresaste no existe." });
    }
  };

  return (
    <>
      <section className={styles.musuario}>
        <figure>
          <img src={require("../images/avatares/" + menu.img)} alt="Avatar" />
          <figcaption>{menu.nombre}</figcaption>
        </figure>
        <p>Correo electrónico</p>
        <span className={styles.submit}>
          <input
            type="email"
            value={body.Correo}
            onChange={cambioEntrada}
            name="Correo"
          />
          <i
            tabIndex="0"
            className={"nf nf-fa-search"}
            id="1"
            onClick={verificar}
          ></i>
        </span>
        <aside className={clas.Correo}>{texto.Correo}</aside>
        <div className={styles.checkbox}>
          <input type="checkbox" checked={body.checkbox} onChange={check} />
          <label>Convertir a administrador</label>
        </div>
        <span className={styles.submit}>
          <input
            type="button"
            className={styles.rojo}
            value="Borrar"
            onClick={borrar}
          />
          <input
            type="button"
            className={styles.verde}
            value="Cambiar Rol"
            onClick={cambiar}
          />
        </span>
      </section>
    </>
  );
}
