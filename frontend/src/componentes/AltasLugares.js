import React, { useEffect, useState } from "react";
import styles from "../estilos/vistas.module.css";
import axios from "axios";
import Swal from "sweetalert2";

export default function AltasLugares() {
  const [listas, setListas] = useState([]);
  const [modifiedRows, setModifiedRows] = useState({});
  const [needsUpdate, setNeedsUpdate] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const respuesta = await axios.get(`http://localhost:8081/api/lugares/AltasProductos`);
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
  const enviar = async (valor) => {
    const { value: confirmed } = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Se activará la etiqueta',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, estoy seguro',
      cancelButtonText: 'Cancelar',
    });

    if (confirmed) {
      const categoriaId = valor;
      try {
        const respuesta = await axios.put(`http://localhost:8081/api/lugares/AltaProductos/${categoriaId}`);
        if (respuesta.data.Estatus === "EXITOSO") {
          setNeedsUpdate(true);
        } else {
          console.log("Error");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      <section className={styles.vusuarios}>
        <h1>Viajes dados de baja:</h1>
        <div className={styles.scroll}>
          <table>
            <thead>
              <td>nombre</td>
              <td>Descripcion</td>
              <td>nombre categorias</td>
              <td>Dar de alta</td>
            </thead>
            {listas.map((lista, index) => {
              const valor = lista.Id;
              return (
                <>
                  <tr>
                    <td>{lista.Nombre}</td>
                    <td><textarea disabled="true">{lista.Informacion}</textarea></td>
                    <td>{lista.CategoriasNombre}</td>
                    <td>
                      <button
                        onClick={() => {
                          enviar(valor);
                        }}
                      >
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
