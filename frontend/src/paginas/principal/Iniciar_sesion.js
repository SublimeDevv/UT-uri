import React from "react";
import styles from "../../estilos/crear_cuenta.module.css";
import IniciarSesion from "../../componentes/IniciarSesion";
function Iniciar_sesion() {
  return (
    <>
      <IniciarSesion />
      <footer className={styles.foot}>
        <div>
          <p>Condiciones de uso</p>
          <p>Aviso de privacidad</p>
          <p>Ayuda</p>
        </div>
        <p className={styles.refe}>© 2023 Uturi.com, o sus afiliados</p>
      </footer>
    </>
  );
}
export default Iniciar_sesion;
