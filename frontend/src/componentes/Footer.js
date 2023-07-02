import React from "react";
import style from "../estilos/general.module.css"
function Footer(){
    return(
        <footer className={style.foot}>
            <figure><img src={require('../images/logo.png')} alt="" /></figure>
            <figcaption>
                © 2023 Uturi | Condiciones de uso | Aviso de privacidad
            </figcaption>
        </footer>
    );
}
export default Footer;