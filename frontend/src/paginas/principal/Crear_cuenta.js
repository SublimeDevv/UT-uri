import React from "react";
import styles from "../../estilos/crear_cuenta.module.css";
import CrearUsuario from "../../componentes/CrearUsuario";
function CrearCuenta() {
  return (
    <>
      <CrearUsuario />
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
export default CrearCuenta;
