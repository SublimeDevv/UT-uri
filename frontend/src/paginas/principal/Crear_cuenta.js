import React from 'react';
import styles from '../../estilos/crear_cuenta.module.css'
import { Link } from 'react-router-dom';
function CrearCuenta() {
    return (
        <>
            <main className={styles.man}>
                <section className={styles.sec}>
                    <Link to={'/'}><img src={require('../../images/logo2.png')} alt="" /></Link>
                    <div>
                        <p>Nombre</p>
                        <p>Apellidos</p>
                    </div>
                    <div><input type="text" /><input type="text" /></div>
                    <p>Correo electrónico</p>
                    <input type="email" />
                    <p>Contraseña</p>
                    <input type="password" placeholder="Debe tener almenos 8 caracteres" />
                    <p>Confirmar contraseña</p>
                    <input type="password" />
                    <span>
                        <input type="submit" value="Crear cuenta" />
                    </span>
                    <p className={styles.p}>
                        Si tienes una cuenta, <Link to={'/iniciar'}>click aqui</Link>
                    </p>
                </section>
            </main>
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