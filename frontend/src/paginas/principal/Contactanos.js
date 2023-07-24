import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Header from "../../componentes/Header";
import Footer from "../../componentes/Footer";
import styles from "../../estilos/contactanos.module.css";

function Contactanos() {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [asunto, setAsunto] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [errores, setErrores] = useState({
    nombre: "",
    correo: "",
    asunto: "",
    mensaje: "",
  });
  const [formularioEnviado, setFormularioEnviado] = useState(false);

  const enviarFormulario = async (e) => {
    e.preventDefault();
    
    if (formularioEnviado) {
      Swal.fire({
        icon: "error",
        title: "¡Espere!",
        text: "Debe esperar al menos 1 minuto para enviar otro correo",
      });
      return;
    }

    if (!nombre || !correo || !asunto || !mensaje) {
      setErrores({
        nombre: nombre ? "" : "El nombre es requerido.",
        correo: correo ? "" : "El correo es requerido.",
        asunto: asunto ? "" : "El asunto es requerido.",
        mensaje: mensaje ? "" : "El mensaje es requerido.",
      });
      return;
    }
    setFormularioEnviado(true);
    setTimeout(() => {
      setFormularioEnviado(false);
    }, 60000);
    try {
      const response = await axios.post(
        "http://localhost:8081/api/formulario/FormularioContacto",
        {
          nombre,
          correo,
          asunto,
          mensaje,
        }
      );

      if (response.status === 200) {
        setNombre("");
        setCorreo("");
        setAsunto("");
        setMensaje("");
        setErrores({
          nombre: "",
          correo: "",
          asunto: "",
          mensaje: "",
        });

        Swal.fire({
          icon: "success",
          title: "¡Formulario enviado!",
          text: "Tu mensaje ha sido enviado correctamente.",
        });
      } else {
        console.log("Error al enviar el formulario");
        setFormularioEnviado(false);
      }
    } catch (error) {
      console.log("Error al enviar el formulario:", error);
      setFormularioEnviado(false);
    }
  };

  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.info}>
          <figure>
            <h1>Contactanos</h1>
            <i className="nf nf-fa-group"></i>
          </figure>
          <form onSubmit={enviarFormulario}>
            <p>Nombre completo</p>
            <input
              type="text"
              name="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            {errores.nombre && <p className={styles.error}>{errores.nombre}</p>}

            <p>Correo electrónico</p>
            <input
              type="email"
              name="correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
            {errores.correo && <p className={styles.error}>{errores.correo}</p>}

            <p>Asunto</p>
            <input
              type="text"
              name="asunto"
              value={asunto}
              onChange={(e) => setAsunto(e.target.value)}
            />
            {errores.asunto && <p className={styles.error}>{errores.asunto}</p>}

            <p>Mensaje</p>
            <textarea
              name="mensaje"
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              cols="30"
              rows="10"
            ></textarea>
            {errores.mensaje && (
              <p className={styles.error}>{errores.mensaje}</p>
            )}

            <div>
              <input id="boton" type="submit" value="Enviar" />
            </div>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Contactanos;

