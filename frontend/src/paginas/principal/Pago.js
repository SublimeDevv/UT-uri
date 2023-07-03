import React from "react";
import Header from "../../componentes/Header";
import Footer from "../../componentes/Footer";
import styles from "../../estilos/pago.module.css";
import { Link } from "react-router-dom";
function Pago() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.info}>
          <div className={styles.ruta}>
            <Link href="categorias.html" className={styles.a1}>
              Categorias
            </Link>
            <p>»</p>
            <Link href="natural.html" className={styles.a1}>
              Listas
            </Link>
            <p>»</p>
            <Link href="detalles.html" className={styles.a1}>
              Detalles
            </Link>
            <p>»</p>
            <Link href="#" className={styles.a2}>
              Pago
            </Link>
          </div>
          <div className={styles.form}>
            <div className={styles.tarjetas}>
              <img src={require("../../images/visa.png")} alt="" />
              <img src={require("../../images/mastercard.png")} alt="" />
            </div>
            <form action="" className={styles.for}>
              <p>N° Tarjeta</p>
              <input type="number" className={styles.num} />
              <span>
                <i className="nf nf-md-calendar_month_outline"></i>
                <input type="number" className={styles.fecha} />
                <input type="number" className={styles.fecha} />
                <p className={styles.uno}>Fecha de caducidad</p>
              </span>
              <span>
                <i className="nf nf-seti-lock"></i>
                <input type="password" className={styles.contra} />
                <p className={styles.uno}>Codigo de seguridad</p>
              </span>
              <p>Nombre del titular</p>
              <input type="text" />
              <div className={styles.boton}>
                <Link to={"/"}>
                  <input type="submit" value="Pagar" />
                </Link>
              </div>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
export default Pago;
