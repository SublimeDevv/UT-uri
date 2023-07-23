import React, { useEffect, useState, useContext } from "react";
import style from "../estilos/general.module.css";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import Swal from "sweetalert2";
import axios from "axios";

function Header() {
  const { usuario, setUsuario } = useContext(UserContext);

  const [borroso, setBorroso] = useState(false);
  const [EstadoUsuario, setEstadoUsuario] = useState(false);
  const [interfaz, setInterfaz] = useState(false);
  const [ocultarojo, setOcultarojo] = useState(true);
  const [ocultarojo2, setOcultarojo2] = useState(true);

  const [text, setText] = useState(
    <Link className={style.a} to={"/iniciar"}>
      Iniciar Sesion
    </Link>
  );
  const navigate = useNavigate();
  const [body, setBody] = useState({
    nombre: "",
    apellido: "",
    contrasenia: "",
    contrasenia2: "",
  });
  const [informacion, setInfromacion] = useState({
    nombre: usuario.Nombre,
    apellido: usuario.Apellido,
    contraseña: "Contraseña",
    contraseña2: "Confirma contraseña",
  });
  const [opcion, setOpcion] = useState("");
  const [nArchivo, setNarchivo] = useState(usuario.Avatar);
  const [archivo, setArchivo] = useState(null);
  const [clas, setClas] = useState(`${style.interfaz} ${style.ocultar}`);
  const [clas2, setClas2] = useState({
    nombre: "",
    apellido: "",
    contrasenia: "",
    contrasenia2: "",
  });
  const mostrar = () => {
    setClas(style.interfaz);
    setBorroso(true);
  };
  const ocultar = () => {
    setClas(`${style.interfaz} ${style.ocultar}`);
    setBorroso(false);
  };
  const seleccionar = (e) => {
    if (e.target.files[0]) {
      setArchivo(e.target.files[0]);
      setNarchivo(e.target.files[0].name);
      document.getElementById("img").style.backgroundColor = "#84c377";
    } else {
      setNarchivo(usuario.Avatar);
      document.getElementById("img").style.backgroundColor = "#fff";
    }
  };
  const moverse = (e) => {
    const seleccionado = e.target.value;
    setOpcion(seleccionado);
    if (seleccionado === "categorias") {
      navigate("/categorias");
    } else if (seleccionado === "productos") {
      navigate("/productos");
    }
  };
  const cambioEntrada = (e) => {
    setBody({ ...body, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    const verificarSesion = localStorage.getItem("token");
    if (verificarSesion) {
      setEstadoUsuario(true);
      setInterfaz(true);
    }
  }, []);
  const enviar = async () => {
    if (body.nombre.length > 0 || body.apellido.length > 0 || body.contrasenia.length > 0 || body.contrasenia2.length > 0 || nArchivo !== usuario.Avatar) {
      setClas2({
        nombre: "",
        apellido: "",
        contrasenia: "",
        contrasenia2: "",
      });
      setInfromacion({
        nombre: usuario.Nombre,
        apellido: usuario.Apellido,
        contraseña: "Contraseña",
        contraseña2: "Confirma contraseña",
      });
      if (body.contrasenia.length > 0) {
        const { value: textoIngresado } = await Swal.fire({
          title: "Introduce la contraseña antigua",
          input: "text",
          inputPlaceholder: "Contraseña",
          showCancelButton: true,
          confirmButtonText: "Aceptar",
          cancelButtonText: "Cancelar",
        });

        if (textoIngresado) {
          const verificarUsuario = await axios.post("http://localhost:8081/IniciarSesion", {
            Correo: usuario.Correo,
            Contrasenia: textoIngresado,
          });
          if (verificarUsuario.data.Estatus === "EXITOSO") {
          } else {
            Swal.fire("Contraseña incorrecta");
            return;
          }
        } else {
          return;
        }
      }
      if (body.contrasenia == body.contrasenia2) {
        const { value: confirmed } = await Swal.fire({
          title: "¿Estás seguro?",
          text: "Se modificaran los datos",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Sí, estoy seguro",
          cancelButtonText: "Cancelar",
        });

        if (confirmed) {
          const usuarioId = usuario.Id;
          const nombreUsuario = body.nombre.length > 0 ? body.nombre : null;
          const apellidoUsuario = body.apellido.length > 0 ? body.apellido : null;
          const correoUsuario = null;
          const contraseniaUsuario = body.contrasenia.length > 0 ? body.contrasenia : null;
          const avatarUsuario = nArchivo;
          const rolId = null;
          const fecha = null;
          if (nArchivo !== usuario.Avatar) {
            const imagen = new FormData();
            imagen.append("image", archivo);
            try {
              await axios.post("http://localhost:8081/api/imagenes/subirAvatares", imagen);
              console.log("La foto del usuario se actualizo correctamente.");
            } catch (error) {
              console.log("Error al actualizar la foto del usuarrio: " + error);
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
              const storedData = localStorage.getItem("usuario");
              const datosUsuario = JSON.parse(storedData) || {};
              datosUsuario.Nombre = body.nombre === "" ? usuario.Nombre : body.nombre;
              datosUsuario.Apellido = body.apellido === "" ? usuario.Apellido : body.apellido;
              datosUsuario.Avatar = nArchivo;
              localStorage.setItem("usuario", JSON.stringify(datosUsuario));
              
              const datosModificados = {
                ...usuario,
                Nombre: body.nombre === "" ? usuario.Nombre : body.nombre,
                Apellido: body.apellido === "" ? usuario.Apellido : body.apellido,
                Avatar: nArchivo,
              };
              console.log("Usuario modificado correctamente");

              Swal.fire("Usuario modificado correctamente");
              setBody({
                nombre: "",
                apellido: "",
                contrasenia: "",
                contrasenia2: "",
              });
              setNarchivo(usuario.Avatar);
              document.getElementById("img").style.backgroundColor = "#fff";
              setTimeout(async () => {
                await setUsuario(datosModificados);
              }, 1000 );              
            } else {
              console.log("Error al modificar al usuario");
            }
          } catch (error) {
            console.log(error);
          }
        } else {
        }
      } else {
        setBody({ ...body, ["contrasenia2"]: "" });
        setClas2({ contrasenia2: style.ocultar2 });
        setInfromacion({ contraseña2: "Las contraseñas deben ser iguales" });
      }
    } else {
      Swal.fire("Debe cambiar almenos un valor");
      setClas2({
        nombre: "",
        apellido: "",
        contrasenia: "",
        contrasenia2: "",
      });
      setInfromacion({
        nombre: usuario.Nombre,
        apellido: usuario.Apellido,
        contraseña: "Contraseña",
        contraseña2: "Confirma contraseña",
      });
    }
  };
  const toggleMostrarContrasenia = () => {
    setOcultarojo(!ocultarojo);
  };
  const toggleMostrarContrasenia2 = () => {
    setOcultarojo2(!ocultarojo2);
  };
  return (
    <>
      {borroso && <div onClick={ocultar} className={style.borroso}></div>}
      <header id="encabezado" className={style.head}>
        <figure className={style.logo}>
          <Link className={style.a} to={"/"}>
            <img src={require("../images/logo.png")} alt="" />
          </Link>
        </figure>
        <span className={style.usuario}>
          {EstadoUsuario && (
            <figure>
              <img src={require("../images/avatares/" + usuario.Avatar)} alt="" id={style.imgUsuario} onClick={mostrar} />
            </figure>
          )}
          <figcaption id={style.nomUsuario}>
            {interfaz ? (
              <div className={clas}>
                <p className={style.cuenta}>Mi cuenta</p>
                <div className={style.contenido}>
                  <div className={style.banner}></div>
                  <div className={style.usuario}>
                    <figure>
                      <img src={require("../images/avatares/" + usuario.Avatar)} alt="" id={style.imgUsuario} />
                    </figure>
                    <p className={style.p1}>
                      {usuario.Nombre} {usuario.Apellido}
                    </p>
                    <p className={style.p2}>{usuario.Correo}</p>
                  </div>
                  <div className={style.modificaciones}>
                    <p className={style.p3}>Editar perfil</p>
                    <p>Nombres</p>
                    <input className={clas2.nombre} type="text" placeholder={usuario.Nombre} value={body.nombre} onChange={cambioEntrada} name="nombre" />
                    <p>Apellidos</p>
                    <input className={clas2.apellido} type="text" placeholder={usuario.Apellido} value={body.apellido} onChange={cambioEntrada} name="apellido" />
                    <p>Contraseña</p>
                    <span className={style.submit}>
                      <input
                        type={ocultarojo ? "password" : "text"}
                        className={clas2.contrasenia}
                        placeholder={informacion.contraseña}
                        value={body.contrasenia}
                        onChange={cambioEntrada}
                        name="contrasenia"
                      />
                      <i className={`nf ${ocultarojo ? "nf-md-eye" : "nf-md-eye_off"}`} onClick={toggleMostrarContrasenia}></i>
                    </span>
                    <p>Confirma contraseña</p>
                    <span className={style.submit}>
                      <input
                        type={ocultarojo2 ? "password" : "text"}
                        className={clas2.contrasenia2}
                        placeholder={informacion.contraseña2}
                        value={body.contrasenia2}
                        onChange={cambioEntrada}
                        name="contrasenia2"
                      />
                      <i className={`nf ${ocultarojo2 ? "nf-md-eye" : "nf-md-eye_off"}`} onClick={toggleMostrarContrasenia2}></i>
                    </span>
                    <p>Imagen de perfil</p>
                    <input type="file" id="documento" accept=".jpg,.jpeg,.png" onChange={seleccionar} />
                    <button className={style.archivo} id="img">
                      <label for="documento">Selecciona una imagen</label>
                    </button>
                    <span>
                      <button onClick={enviar}>Editar Perfil</button>
                    </span>
                  </div>
                  <Link
                    className={style.a}
                    to={"/"}
                    onClick={() => {
                      setBorroso(false);
                      localStorage.clear("token");
                      setEstadoUsuario(false);
                      setInterfaz(false);
                    }}
                  >
                    Cerrar sesion
                  </Link>
                </div>
              </div>
            ) : (
              <Link className={style.a} to={"/iniciar"}>
                Iniciar Sesion
              </Link>
            )}
          </figcaption>
        </span>
        <nav className={style.menu}>
          <Link className={style.a} to={"/"}>
            Inicio
          </Link>
          <select className={style.a} onChange={moverse}>
            <option value="explorar">Explorar</option>
            <option value="categorias">Categorías</option>
            <option value="productos">Productos</option>
          </select>
          <Link className={style.a} to={"/quienes_somos"}>
            Quiénes somos
          </Link>
          <Link className={style.a} to={"/contactanos"}>
            Contacto
          </Link>
        </nav>
      </header>
    </>
  );
}

export default Header;
