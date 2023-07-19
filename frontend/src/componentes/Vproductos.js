import React, { useEffect, useState } from "react";
import styles from "../estilos/vistas.module.css";
import axios from "axios";

export default function Vproductos() {
  const [listas, setListas] = useState([]);
  const [modifiedRows, setModifiedRows] = useState({});
  const [botones, setBotones] = useState(false);
  const [needsUpdate, setNeedsUpdate] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const respuesta = await axios.get(
          `http://localhost:8081/ObtenerProductos/`
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
    try {
      const response = await axios.put(
        `http://localhost:8081/OcultarLugar/${valor}`
      );
      if (response.data.Estatus === "EXITOSO") {
        console.log("Viaje ocultado correctamente");
        setNeedsUpdate(true);
      } else {
        console.log("Hubo un error al tratar de oculta");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cancelar = (valor) => {
    setModifiedRows((prevModifiedRows) => ({
      ...prevModifiedRows,
      [valor]: false,
    }));
    setBotones(false);
  };
  const enviar = async (valor) => {
    let nombre = document.getElementById("1" + valor);
    let descripcion = document.getElementById("2" + valor);
    const lugarId = valor;
    const nombreLugar = nombre.value;
    const informacionLugar = descripcion.value;
    const imagenesLugar = null;

    try {
      const respuesta = await axios.put(
        `http://localhost:8081/ActualizarLugar/${lugarId}`,
        { nombreLugar, informacionLugar, imagenesLugar }
      );
      if (respuesta.data.Estatus === "EXITOSO") {
        console.log("Se modifico el lugar con exito");
        setNeedsUpdate(true);
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
  };
  const modificar = (valor) => {
    let nombre = document.getElementById("1" + valor);
    let descripcion = document.getElementById("2" + valor);
    let categoria = document.getElementById("3" + valor);
    nombre.addEventListener("input", function () {
      const nuevoValor = nombre.value;
      nombre.value = nuevoValor;
    });
    descripcion.addEventListener("input", function () {
      const nuevoValor = descripcion.value;
      descripcion.value = nuevoValor;
    });
    categoria.addEventListener("input", function () {
      const nuevoValor = categoria.value;
      categoria.value = nuevoValor;
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
        <h1>Viajes:</h1>
        <div className={styles.scroll}>
          <table>
            <thead>
              <td>Modificar</td>
              <td>Id</td>
              <td>nombre</td>
              <td>Descripcion</td>
              <td>nombre categorias</td>
              <td>Borrar</td>
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
                          <i class="nf nf-fa-pencil"></i>
                        </button>
                      ) : (
                        <div className={styles.botones}>
                          <button onClick={() => cancelar(valor)}>
                            <i class="nf nf-oct-x"></i>
                          </button>
                          <button onClick={() => enviar(valor)}>
                            <i class="nf nf-fa-paper_plane"></i>
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
                        value={lista.NombreLugar}
                      />
                    </td>
                    <td>
                      <textarea
                        id={"2" + lista.Id}
                        disabled={!modifiedRows[valor]}
                        value={lista.Descripcion}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        id={"3" + lista.Id}
                        disabled={!modifiedRows[valor]}
                        value={lista.NombreCategoria}
                      />
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
