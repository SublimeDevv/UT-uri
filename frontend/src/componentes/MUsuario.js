import React, { useEffect, useState } from "react";
import styles from "../estilos/formularios.module.css"
import axios from "axios";
export default function MUsuario() {
    const [body, setBody] = useState({
        Correo: "",
        checkbox: false,
    });
    const [menu, setMenu] = useState({
        img: "usuario.png",
        nombre: "Nombre",
    });
    const [texto, setTexto] = useState({
        Correo: "",
    });
    const [clas, setClas] = useState({
        Correo: `${styles.error} ${styles.ocultar}`,
    });

    const cambioEntrada = ({ target }) => {
        const { name, value } = target;
        setBody({ ...body, [name]: value });
    };
    const check = () => {
        if (!body.checkbox) setBody({ ...body, ["checkbox"]: true });
        else setBody({ ...body, ["checkbox"]: false });
    }
    const verificar = async () => {
        clas["Correo"]=`${styles.error} ${styles.ocultar}`;
        if (!body.Correo.length) {
            let actualizarClas = { ...clas }; let actualizarTexto = { ...texto };
            for (let cuerpo in body) {
                if (body[cuerpo].length === 0) {
                    actualizarTexto[cuerpo] = "Debe llenar este campo.";
                    actualizarClas[cuerpo] = styles.error;
                }
            }
            setClas(actualizarClas); setTexto(actualizarTexto);
            return;
        }
        const verificarCorreo = await axios.post("http://localhost:8081/verificar", {
            Correo: body.Correo
        });

        if (!verificarCorreo.data.Resultado[0]) {
            setTexto({ ...texto, ["Correo"]: "El correo que ingresaste no existe." });
            setClas({ ...clas, ["Correo"]: styles.error });
            setMenu({
                img: "usuario.png",
                nombre:"Error",
            });
            return;
        }
        
        setMenu({
            img: verificarCorreo.data.Resultado[0].img,
            nombre:verificarCorreo.data.Resultado[0].NombreUsuario,
        });
    }
    const cambiar = () => {
        verificar();
        if(body.checkbox){
            //Aqui vas a poner el codigo para actualizar al usuario
        }else{
            setTexto({ ...texto, ["Correo"]: "Si quiere convertir el usuario en administrador debe conformarlo primero con el checkbox." });
            setClas({ ...clas, ["Correo"]: styles.error });
        }
    }
    const borrar =()=>{
        //aqui pondras el codigo para borrar el usuario, lo haras mediante su correo
    }
    return (
        <>
            <section className={styles.musuario}>
                <figure>
                    <img src={require('../images/' + menu.img)} />
                    <figcaption>{menu.nombre}</figcaption>
                </figure>
                <p>Correo electrónico</p>
                <span className={styles.submit}>
                    <input
                        type="email"
                        value={body.Correo}
                        onChange={cambioEntrada}
                        name="Correo"
                    />
                    <i tabIndex="0" className={"nf nf-fa-search"} id="1" onClick={verificar}></i>
                </span>
                <aside className={clas.Correo}>{texto.Correo}</aside>
                <div className={styles.checkbox}><input type="checkbox" onClick={check} /><label>Convertir a administrador</label></div>
                <span className={styles.submit}>
                    <input type="submit" className={styles.rojo} value="Borrar" onClick={borrar}/>
                    <input type="submit" className={styles.verde} value="Cambiar Rol" onClick={cambiar}/>
                </span>
            </section >
        </>
    );
}