import React, { useEffect, useState } from "react";
import styles from "../estilos/formularios.module.css";
import axios from "axios";

export default function MAdministradores() {
    const [id, setID] = useState(7);
    const [listas, setListas] = useState([]);
    const [boton, setBoton] = useState(<button disabled>Borrar Administrador</button>);
    const seleccionar = (id,event) => {
        setID(id);
        setBoton(<button onClick={borrar}>Borrar Administrador</button>);
    }
    const borrar = () => {
        //aqui pones el post para borrar usas la variable id para enviar el admin a eliminar lo haras mediante el id
    }
    const handleClickOutside = (event) => {
        if (!event.target.closest('span')) {
            setBoton(<button disabled>Borrar Administrador</button>);
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const respuesta = await axios.get(`http://localhost:8081/ObtenerUsuarios`);
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
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);
    return (
        <>
            <section className={styles.madmin}>
                <h2>Administradores:</h2>
                <div className={styles.administradores}>
                    {listas.map((lista, index) => {
                        return (
                            <>
                                <span tabIndex="0" className={styles.contAdmin} id={lista.Id} onClick={(event) => { seleccionar(lista.Id,event); }} >
                                    <img src={require('../images/' + lista.Avatar)} alt="Imagen de administrador"/>
                                    <p className={styles.p}>{lista.Nombre}</p>
                                    <p className={styles.p}>{lista.Apellido}</p>
                                </span>
                            </>

                        );
                    })}
                </div>
                {boton}
            </section>
        </>
    );
}