import React from "react";
import Header from "../../componentes/Header";
import Footer from "../../componentes/Footer";
import styles from "../../estilos/detalles.module.css";
import { Link } from "react-router-dom";
import Detalle from "../../componentes/Detalle";

function Detalles() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.info}>
          <Detalle />
        </section>
      </main>
      <Footer />
    </>
  );
}
export default Detalles;
