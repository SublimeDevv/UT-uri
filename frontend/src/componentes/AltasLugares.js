import React, { useEffect, useState } from "react";
import styles from "../estilos/vistas.module.css";
import axios from "axios";

export default function AltasLugares() {
    const [listas, setListas] = useState([]);
    const [modifiedRows, setModifiedRows] = useState({});
    const [needsUpdate, setNeedsUpdate] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const respuesta = await axios.get(`http://localhost:8081/AltasProductos`);
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
        const categoriaId = valor;
        try {
            const respuesta = await axios.put(`http://localhost:8081/AltaProductos/${categoriaId}`);
            if (respuesta.data.Estatus === "EXITOSO") {
                setNeedsUpdate(true);
            } else {
                console.log("Error")
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
          <section className={styles.vusuarios}>
            <h1>Viajes dados de baja:</h1>
            <div className={styles.scroll}>
              <table>
                <thead>
                  <td>Id</td>
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
                        <td>{lista.Id}</td>
                        <td>{lista.NombreLugar}</td>
                        <td>{lista.Informacion}</td>
                        <td>{lista.NombreCategoria}</td>
                        <td><button onClick={()=>{enviar(valor)}}><i class="nf nf-md-transfer_up"></i></button></td>
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