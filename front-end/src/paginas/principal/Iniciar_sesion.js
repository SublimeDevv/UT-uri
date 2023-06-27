import react from 'react';
import styles from '../../estilos/crear_cuenta.module.css'
import { Link } from 'react-router-dom';
function Iniciar_sesion() {
    return (
        <>
            <main className={styles.man}>
                <section className={styles.sec}>
                    <Link to={'/'}><img src={require('../../images/logo2.png')} alt="" /></Link>
                    <p>Nombre de usuario o correo electrónico</p>
                    <input type="email" />
                    <p>Contraseña</p>
                    <input type="password" placeholder="Debe tener almenos 8 caracteres" />
                    <Link className={styles.olvidar}>¿Olvidaste tu contraseña?</Link>
                    <span>
                        <input type="submit" value="Iniciar sesion" />
                    </span>
                    <p className={styles.p}>
                        Si no tienes una cuenta, <Link to={'/crear'}>click aqui</Link>
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
export default Iniciar_sesion;