import React, { useEffect, useState } from "react";
import styles from "../estilos/vistas.module.css";
import axios from "axios";
import Swal from "sweetalert2";

export default function AltasEtiquetas() {
  const [listas, setListas] = useState([]);
  const [modifiedRows, setModifiedRows] = useState({});
  const [botones, setBotones] = useState(false);
  const [needsUpdate, setNeedsUpdate] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const respuesta = await axios.get(
          `http://localhost:8081/api/subcategorias/ObtenerSubcategoriaBaja`
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
      text: 'Se activará la etiqueta',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, estoy seguro',
      cancelButtonText: 'Cancelar',
    });

    if (confirmed) {
      const subcategoriaId = valor;
      try {
        const response = await axios.put(
          `http://localhost:8081/api/subcategorias/MostrarSubcategoria/${subcategoriaId}`
        );
        if (response.data.Estatus === "EXITOSO") {
          console.log("Viaje ocultado correctamente");
          Swal.fire(
            'Etiqueta activada correctamente'
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
  return (
    <>
      <section className={styles.vusuarios}>
        <h1>Etiquetas dadas de baja:</h1>
        <div className={styles.scroll}>
          <table>
            <thead>
              <td>Id</td>
              <td>nombre</td>
              <td>Descripcion</td>
              <td>Categoria ID</td>
              <td>Dar de Alta</td>
            </thead>
            {listas.map((lista, index) => {
              const valor = lista.Id;
              return (
                <>
                  <tr>
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
                      <button disabled={botones} onClick={()=>borrar(valor)}>
                        <i class="nf nf-md-transfer_up"></i>
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
