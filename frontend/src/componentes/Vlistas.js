import React, { useEffect, useState } from "react";
import styles from "../estilos/vistas.module.css";
import axios from "axios";

export default function Vlistas() {
    const [listas, setListas] = useState([]);
    const [modifiedRows, setModifiedRows] = useState({});
    const [botones, setBotones] = useState(false);
    const [needsUpdate, setNeedsUpdate] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const respuesta = await axios.get(`http://localhost:8081/Listas`);
                if (respuesta.data.Estatus === "EXITOSO") {
                    setListas(respuesta.data.Resultado);
                    setNeedsUpdate(true);
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
    
    fetchData();
    if (needsUpdate) {
      setNeedsUpdate(false);
      fetchData();
    }
  }, [needsUpdate]);

  const borrar = async (valor) => {
    const categoriaId = valor;
    try {
      const respuesta = await axios.put(
        `http://localhost:8081/OcultarCategoria/${categoriaId}`
      );
      if (respuesta.data.Estatus === "EXITOSO") {
        console.log("Categoria eliminada correctamente");
        setNeedsUpdate(true);
      } else {
        console.log("Error al eliminar la categoria");
      }
    } catch (error) {
      console.log(error);
    }
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
    }
    const enviar = async (valor) => {
        let nombre = document.getElementById("1" + valor);
        let descripcion = document.getElementById("2" + valor);
        nombre.style.border = "none";
        descripcion.style.border = "none";
        const categoriaId = valor;
        const nombreCategoria = nombre.value;
        const descripcionCategoria = descripcion.value;
        const imagenCategoria = null;

    try {
      const respuesta = await axios.put(
        `http://localhost:8081/ActualizarCategoria/${categoriaId}`,
        { nombreCategoria, descripcionCategoria, imagenCategoria }
      );
      if (respuesta.data.Estatus === "EXITOSO") {
        console.log("Se modifico el usuario");
        setNeedsUpdate(true);
      } else {
        console.log("Error al modificar la categoria");
      }
    } catch (error) {
      console.log("No se pudo modificar: "+error);
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
    let imagen = document.getElementById("3" + valor);
    nombre.addEventListener("input", function () {
      const nuevoValor = nombre.value;
      nombre.value = nuevoValor;
    });
    descripcion.addEventListener("input", function () {
      const nuevoValor = descripcion.value;
      descripcion.value = nuevoValor;
    });
    imagen.addEventListener("input", function () {
      const nuevoValor = imagen.value;
      imagen.value = nuevoValor;
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
        <h1>Categorias:</h1>
        <div className={styles.scroll}>
          <table>
            <thead>
              <td>Modificar</td>
              <td>Id</td>
              <td>nombre</td>
              <td>Descripcion</td>
              <td>imagen</td>
              <td>Borrar</td>
            </thead>
            {listas.map((lista, index) => {
              const valor = lista.Id;
              return (
                <>
                  <tr key={lista.Id}>
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
                    <td>
                      <input
                        type="text"
                        id={"3" + lista.Id}
                        disabled={!modifiedRows[valor]}
                        value={lista.Imagen}
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
