import React, { useEffect, useState } from "react";
import styles from "../estilos/vistas.module.css";
import axios from "axios";
import Swal from "sweetalert2";

export default function Vsubcategorias() {
  const [listas, setListas] = useState([]);
  const [modifiedRows, setModifiedRows] = useState({});
  const [botones, setBotones] = useState(false);
  const [needsUpdate, setNeedsUpdate] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const respuesta = await axios.get(
          `http://localhost:8081/api/subcategorias/ObtenerSubcategoria`
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

  const borrar = async (valor) => {
    const { value: confirmed } = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Se desactivará la etiqueta',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, estoy seguro',
      cancelButtonText: 'Cancelar',
    });

    if (confirmed) {
      let nombre = document.getElementById("1" + valor);
      let descripcion = document.getElementById("2" + valor);
      nombre.style.border = "none";
      descripcion.style.border = "none";
      const subcategoriaId = valor;
      try {
        const response = await axios.put(
          `http://localhost:8081/api/subcategorias/OcultarSubcategoria/${subcategoriaId}`
        );
        if (response.data.Estatus === "EXITOSO") {
          console.log("Viaje ocultado correctamente");
          Swal.fire(
            'Etiqueta ocultada correctamente'
          );
          setNeedsUpdate(true);
        } else {
          console.log("Hubo un error al tratar de oculta");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const cancelar = (valor) => {
    let nombre = document.getElementById("1" + valor);
    let descripcion = document.getElementById("2" + valor);
    nombre.style.border = "none";
    descripcion.style.border = "none";
    setModifiedRows((prevModifiedRows) => ({
      ...prevModifiedRows,
      [valor]: false,
    }));
    setBotones(false);
  };
  const enviar = async (valor) => {
    const { value: confirmed } = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Se modificaran los datos',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, estoy seguro',
      cancelButtonText: 'Cancelar',
    });

    if (confirmed) {
      let nombre = document.getElementById("1" + valor);
      let descripcion = document.getElementById("2" + valor);
      const subcategoriaId = valor;
      const Nombre = nombre.value;
      const Descripcion = descripcion.value;

      nombre.style.border = "none";
      descripcion.style.border = "none";
      try {
        const respuesta = await axios.put(
          `http://localhost:8081/api/subcategorias/ModificarSubcategoria/${subcategoriaId}`,
          { Nombre, Descripcion}
        );
        if (respuesta.data.Estatus === "EXITOSO") {
          console.log("Se modifico el lugar con exito");
          setNeedsUpdate(true);
          Swal.fire(
            'Se modificaron los datos'
          );
        } else {
          console.log("Error al modificar al el lugar");
        }
      } catch (error) {
        console.log("Error: " + error);
      }
      setModifiedRows((prevModifiedRows) => ({
        ...prevModifiedRows,
        [valor]: false,
      }));
      setBotones(false);
    }else {
      let nombre = document.getElementById("1" + valor);
      let apellido = document.getElementById("2" + valor);
      nombre.style.border = "none";
      apellido.style.border = "none";
      setModifiedRows((prevModifiedRows) => ({
        ...prevModifiedRows,
        [valor]: false,
      }));
      setBotones(false);
    }
  };
  const modificar = (valor) => {
    let nombre = document.getElementById("1" + valor);
    let descripcion = document.getElementById("2" + valor);
    nombre.style.border = "2px solid #131a22";
    descripcion.style.border = "2px solid #131a22";
    nombre.addEventListener("input", function () {
      const nuevoValor = nombre.value;
      nombre.value = nuevoValor;
    });
    descripcion.addEventListener("input", function () {
      const nuevoValor = descripcion.value;
      descripcion.value = nuevoValor;
    });
    setModifiedRows((prevModifiedRows) => ({
      ...prevModifiedRows,
      [valor]: true,
    }));
    setBotones(true);
  };
  return (
    <>
      <section className={styles.vusuarios}>
        <h1>Etiquetas:</h1>
        <div className={styles.scroll}>
          <table>
            <thead>
              <td>Modificar</td>
              <td>Id</td>
              <td>nombre</td>
              <td>Descripcion</td>
              <td>Categoria ID</td>
              <td>Dar de baja</td>
            </thead>
            {listas.map((lista, index) => {
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
                      <textarea
                        id={"2" + lista.Id}
                        disabled={!modifiedRows[valor]}
                        value={lista.Descripcion}
                      />
                    </td>
                    <td>{lista.CategoriaID}</td>
                    <td>
                      <button disabled={botones} onClick={() => borrar(valor)}>
                        <i class="nf nf-md-transfer_down"></i>
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
