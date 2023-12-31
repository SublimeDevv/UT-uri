import React, { useEffect, useState } from "react";
import styles from "../estilos/vistas.module.css";
import axios from "axios";
import Swal from "sweetalert2";

export default function Vusuarios() {
  const [needsUpdate, setNeedsUpdate] = useState(false);
  const [listas, setListas] = useState([]);
  const [modifiedRows, setModifiedRows] = useState({});
  const [botones, setBotones] = useState(false);
  const [nArchivo, setNarchivo] = useState("default_avatar.jpg");
  const [archivo, setArchivo] = useState(null);
  const [slider, setSlider] = useState(false);
  const [imagen, setImagen] = useState("");
  const [borroso, setBorroso] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const respuesta = await axios.get(`http://localhost:8081/api/usuarios/Usuarios`);
        if (respuesta.data.Estatus === "EXITOSO") {
          setListas(respuesta.data.Resultado);
        } else {
          console.log("Error");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    if (needsUpdate) {
      setNeedsUpdate(false);
      fetchData();
    }
  }, [needsUpdate]);
  const borrar = async (valor) => {
    const { value: confirmed } = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Se borrará permanentemente",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, estoy seguro",
      cancelButtonText: "Cancelar",
    });

    if (confirmed) {
      const usuarioId = valor;
      try {
        const respuesta = await axios.delete(`http://localhost:8081/api/usuarios/EliminarUsuario/${usuarioId}`);
        if (respuesta.data.Estatus === "EXITOSO") {
          setNeedsUpdate(true);
          Swal.fire("Usuario eliminado correctamente");
        } else {
          console.log("Error al eliminar admin");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const cancelar = (valor) => {
    let nombre = document.getElementById("1" + valor);
    let apellido = document.getElementById("2" + valor);
    let correo = document.getElementById("3" + valor);
    nombre.style.border = "none";
    apellido.style.border = "none";
    correo.style.border = "none";
    setModifiedRows((prevModifiedRows) => ({
      ...prevModifiedRows,
      [valor]: false,
    }));
    setBotones(false);
  };
  const enviar = async (valor) => {
    const { value: confirmed } = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Se modificarán los datos",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, estoy seguro",
      cancelButtonText: "Cancelar",
    });

    if (confirmed) {
      const usuarioId = valor;
      const nombreUsuario = document.getElementById("1" + valor).value;
      const apellidoUsuario = document.getElementById("2" + valor).value;
      const correoUsuario = document.getElementById("3" + valor).value;
      const contraseniaUsuario = null;
      const avatarUsuario = nArchivo === "default_avatar.jpg" ? null : nArchivo;
      const rolId = null;
      const fecha = null;

      if (nArchivo !== "default_avatar.jpg") {
        const imagen = new FormData();
        imagen.append("image", archivo);

        try {
          await axios.post("http://localhost:8081/api/imagenes/subirAvatares", imagen);
          console.log("La foto del usuario se actualizó correctamente.");
        } catch (error) {
          console.log("Error al actualizar la foto del usuario: " + error);
        }
      }

      try {
        const respuesta = await axios.put(`http://localhost:8081/api/usuarios/ActualizarUsuario/${usuarioId}`, {
          nombreUsuario,
          apellidoUsuario,
          correoUsuario,
          contraseniaUsuario,
          avatarUsuario,
          rolId,
          fecha,
        });

        if (respuesta.data.Estatus === "EXITOSO") {
          console.log("Usuario modificado correctamente");
          Swal.fire("Datos actualizados");
          let nombre = document.getElementById("1" + valor);
          let apellido = document.getElementById("2" + valor);
          let correo = document.getElementById("3" + valor);
          nombre.style.border = "none";
          apellido.style.border = "none";
          correo.style.border = "none";
        } else {
          console.log("Error al modificar al usuario");
        }
      } catch (error) {
        console.log(error);
      }

      setModifiedRows((prevModifiedRows) => ({
        ...prevModifiedRows,
        [valor]: false,
      }));
      setBotones(false);
    } else {
      let nombre = document.getElementById("1" + valor);
      let apellido = document.getElementById("2" + valor);
      let correo = document.getElementById("3" + valor);
      nombre.style.border = "none";
      apellido.style.border = "none";
      correo.style.border = "none";
      setModifiedRows((prevModifiedRows) => ({
        ...prevModifiedRows,
        [valor]: false,
      }));
      setBotones(false);
    }
    setTimeout(() => {
      setNeedsUpdate(true);
    }, 1000);
  };

  const modificar = (valor) => {
    let nombre = document.getElementById("1" + valor);
    let apellido = document.getElementById("2" + valor);
    let correo = document.getElementById("3" + valor);
    nombre.style.border = "2px solid #131a22";
    apellido.style.border = "2px solid #131a22";
    correo.style.border = "2px solid #131a22";
    nombre.addEventListener("input", function () {
      const nuevoValor = nombre.value;
      nombre.value = nuevoValor;
    });
    apellido.addEventListener("input", function () {
      const nuevoValor = apellido.value;
      apellido.value = nuevoValor;
    });
    correo.addEventListener("input", function () {
      const nuevoValor = correo.value;
      correo.value = nuevoValor;
    });
    setModifiedRows((prevModifiedRows) => ({
      ...prevModifiedRows,
      [valor]: true,
    }));
    setBotones(true);
  };
  const seleccionar = (e) => {
    if (e.target.files[0]) {
      setArchivo(e.target.files[0]);
      setNarchivo(e.target.files[0].name);
    } else {
      setNarchivo("default_avatar.jpg");
    }
  };
  const cambiar = async (valor) => {
    const { value: confirmed } = await Swal.fire({
      title: "¿Estás seguro?",
      text: "El usuario tendrá los mismos permisos que un administrador.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, estoy seguro",
      cancelButtonText: "Cancelar",
    });

    if (confirmed) {
      const nuevoRol = 1;
      try {
        await axios.put(`http://localhost:8081/api/usuarios/CambiarRolUsuario/${valor}`, {
          nuevoRol: nuevoRol,
        });
        Swal.fire({
          icon: "success",
          title: "Rol cambiado exitosamente",
        });
        setNeedsUpdate(true);
      } catch (error) {}
    }
  };
  const mostrar2 = (image) => {
    setImagen(image);
    setBorroso(true);
    setSlider(true);
  };
  const ocultar2 = () => {
    setBorroso(false);
    setSlider(false);
  };
  return (
    <>
      {borroso && <div onClick={ocultar2} className={styles.borroso}></div>}
      {slider && (
        <article className={styles.slider}>
          <span id="carril" className={styles.carril}>
            <section className="mod">
              <img src={require("../images/avatares/" + imagen)} />
            </section>
          </span>
        </article>
      )}
      <section className={styles.vusuarios}>
        <h1>Usuarios:</h1>
        <div className={styles.scroll}>
          <table>
            <thead>
              <td>Modificar</td>
              <td>nombres</td>
              <td>apellidos</td>
              <td>correo</td>
              <td>avatar</td>
              <td>Fecha de creacion</td>
              <td>Volver admin</td>
              <td>Borrar</td>
            </thead>
            {listas.map((lista, index) => {
              const fecha = lista.Fecha_Creacion.split("T");
              const valor = lista.Id;
              return (
                <>
                  <tr>
                    <td>
                      {!modifiedRows[valor] ? (
                        <button disabled={botones} onClick={() => modificar(valor)}>
                          <i class="nf nf-md-lead_pencil"></i>
                        </button>
                      ) : (
                        <div className={styles.botones}>
                          <button onClick={() => cancelar(valor)}>
                            <i class="nf nf-oct-x"></i>
                          </button>
                          <button onClick={() => enviar(valor)}>
                            <i class="nf nf-cod-check"></i>
                          </button>
                        </div>
                      )}
                    </td>
                    <td>
                      <input type="text" id={"1" + lista.Id} disabled={!modifiedRows[valor]} value={lista.Nombre} />
                    </td>
                    <td>
                      <input type="text" id={"2" + lista.Id} disabled={!modifiedRows[valor]} value={lista.Apellido} />
                    </td>
                    <td>
                      <input type="text" id={"3" + lista.Id} disabled={!modifiedRows[valor]} value={lista.Correo} />
                    </td>
                    <td>
                      {!modifiedRows[valor] ? (
                        <img onClick={() => mostrar2(lista.Avatar)} className={styles.iconos} src={require("../images/avatares/" + lista.Avatar)} />
                      ) : (
                        <div className={styles.subir}>
                          <input type="file" id={"4" + lista.Id} accept=".jpg,.jpeg,.png" onChange={seleccionar} />
                          <button>
                            <label for={"4" + lista.Id}>Imagen</label>
                          </button>
                        </div>
                      )}
                    </td>
                    <td>{fecha[0]}</td>
                    <td>
                      <button
                        disabled={botones}
                        onClick={() => {
                          cambiar(valor);
                        }}
                      >
                        <i class="nf nf-md-transfer_up"></i>
                      </button>
                    </td>
                    <td>
                      <button disabled={botones} onClick={() => borrar(valor)}>
                        <i class="nf nf-cod-trash"></i>
                      </button>
                    </td>
                  </tr>
                </>
              );
            })}
          </table>
        </div>
      </section>
    </>
  );
}
