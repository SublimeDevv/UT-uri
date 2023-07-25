import React, { useEffect, useState, useContext } from "react";
import styles from "../estilos/vistas.module.css";
import axios from "axios";
import Swal from "sweetalert2";
import { UserContext } from "../UserContext";

export default function Vadmins() {
  const { usuario, obtenerUsuarioActual } = useContext(UserContext);
  const [needsUpdate, setNeedsUpdate] = useState(false);
  const [listas, setListas] = useState([]);
  const [modifiedRows, setModifiedRows] = useState({});
  const [botones, setBotones] = useState(false);
  const [nArchivo, setNarchivo] = useState("default_avatar.jpg");
  const [archivo, setArchivo] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const respuesta = await axios.get(
          `http://localhost:8081/api/usuarios/ObtenerAdministradores`
        );
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

  const borrar = async (adminId) => {
    if (usuario.Id === adminId)
    return Swal.fire({
      icon: "error",
      title: "No puedes eliminarte a ti mismo.",
    });
    const { value: confirmed } = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Se borrará permanentemente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, estoy seguro',
      cancelButtonText: 'Cancelar',
    });

    if (confirmed) {
      try {
        const respuesta = await axios.put(
          `http://localhost:8081/api/usuarios/EliminarAdministrador/${adminId}`
        );
        if (respuesta.data.Estatus === "EXITOSO") {
          Swal.fire(
            'Administrador eliminado',
            'success'
          );
          setNeedsUpdate(true);
          console.log("Administrador eliminado");
        }
      } catch (error) {
        console.log("Error: " + error);
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
      title: '¿Estás seguro?',
      text: 'Los datos se modificaran',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, estoy seguro',
      cancelButtonText: 'Cancelar',
    });

    if (confirmed) {
      let nombre = document.getElementById("1" + valor);
      let apellido = document.getElementById("2" + valor);
      let correo = document.getElementById("3" + valor);
      nombre.style.border = "none";
      apellido.style.border = "none";
      correo.style.border = "none";
      const usuarioId = valor;
      const nombreUsuario = nombre.value;
      const apellidoUsuario = apellido.value;
      const correoUsuario = correo.value;
      const contraseniaUsuario = null;
      const avatarUsuario = nArchivo ===   "default_avatar.jpg" ? null : nArchivo;;
      const rolId = null;
      const fecha = null;
      if (nArchivo !== "default_avatar.jpg") {
        const imagen = new FormData();
        imagen.append("image", archivo);
        try {
          await axios.post("http://localhost:8081/api/imagenes/subirAvatares", imagen);
          console.log("La foto del usuario se actualizo correctamente.")
          if (usuario.Id === usuarioId) {
            const storedData = localStorage.getItem("usuario");
            const datosUsuario = JSON.parse(storedData) || {};
            datosUsuario.Avatar = nArchivo;
            localStorage.setItem("usuario", JSON.stringify(datosUsuario));
          }
        } catch (error) {
          console.log("Error al actualizar la foto del usuarrio: "+ error)
        }
      }
      try {
        const respuesta = await axios.put(
          `http://localhost:8081/api/usuarios/ActualizarUsuario/${usuarioId}`,
          {
            nombreUsuario,
            apellidoUsuario,
            correoUsuario,
            contraseniaUsuario,
            avatarUsuario,
            rolId,
            fecha,
          }
        );
        if (respuesta.data.Estatus === "EXITOSO") {
          console.log("Usuario modificado correctamente");
          Swal.fire(
            'Datos Actualizados'
          );
          setNeedsUpdate(true);
          setTimeout(() => {
            obtenerUsuarioActual()
          }, 1500);
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
    }else {
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
      console.log("entreaqui")
      setArchivo(e.target.files[0]);
      setNarchivo(e.target.files[0].name);
    } else {
      setNarchivo("default_avatar.jpg");
    }
  };
  const cambiar = async (valor) => {
    if (valor === usuario.Id ) return Swal.fire({title: "¡No puedes bajarte de rango a ti mismo!", icon: "warning"})
    const { value: confirmed } = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'El administrador se volvera un usuario',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, estoy seguro',
      cancelButtonText: 'Cancelar',
    });

    if (confirmed) {
      const nuevoRol = 2;
      try {
        await axios.put(
          `http://localhost:8081/api/usuarios/CambiarRolUsuario/${valor}`,
          {
            nuevoRol: nuevoRol,
          }
        );
        Swal.fire({
          icon: 'success',
          title: 'Rol cambiado exitosamente',
        });
        setNeedsUpdate(true);
      } catch (error) {
      }
    }
  };
  return (
    <>
      <section className={styles.vusuarios}>
        <h1>Administradores:</h1>
        <div className={styles.scroll}>
          <table>
            <thead>
              <td>Modificar</td>
              <td>id</td>
              <td>nombres</td>
              <td>apellidos</td>
              <td>correo</td>
              <td>avatar</td>
              <td>Fecha de creacion</td>
              <td>Volver usuario</td>
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
                        <button
                          disabled={botones}
                          onClick={() => modificar(valor)}
                        >
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
                    <td>{lista.Id}</td>
                    <td>
                      <input
                        type="text"
                        id={"1" + lista.Id}
                        disabled={!modifiedRows[valor]}
                        value={lista.Nombre}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        id={"2" + lista.Id}
                        disabled={!modifiedRows[valor]}
                        value={lista.Apellido}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        id={"3" + lista.Id}
                        disabled={!modifiedRows[valor]}
                        value={lista.Correo}
                      />
                    </td>
                    <td>
                      {!modifiedRows[valor] ? (
                        <input
                          type="text"
                          id={"4" + lista.Id}
                          disabled={!modifiedRows[valor]}
                          value={lista.Avatar}
                        />
                      ) : (
                        <div className={styles.subir}>
                          <input
                            type="file"
                            id={"4" + lista.Id}
                            accept=".jpg,.jpeg,.png"
                            onChange={seleccionar}
                          />
                          <button>
                            <label for={"4" + lista.Id}>Imagen</label>
                          </button>
                        </div>
                      )}
                    </td>
                    <td>{fecha[0]}</td>
                    <td><button disabled={botones} onClick={() => { cambiar(valor) }}><i class="nf nf-md-transfer_down"></i></button></td>
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