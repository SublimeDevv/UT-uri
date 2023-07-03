import React from "react";
import Header from "../../componentes/Header";
import Footer from "../../componentes/Footer";
import styles from "../../estilos/lista.module.css";
import { Link } from "react-router-dom";
import Lista from "../../componentes/Lista";
function Listas() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.info}>
          <div className={styles.ruta}>
            <Link to={"/categorias"} className={styles.a1}>
              Categorias
            </Link>
            <p>»</p>
            <Link href="/lista" className={styles.a2}>
              Lista
            </Link>
          </div>

          <Lista />
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Listas;
