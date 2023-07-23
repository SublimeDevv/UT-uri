import { Router } from "express";
import nodemailer from "nodemailer";

const router = new Router();

router.post("/FormularioContacto", (peticion, respuesta) => {
  const { nombre, correo, asunto, mensaje } = peticion.body;
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: "uturiproject@gmail.com",
      pass: process.env.PASSWORD_EMAIL,
    },
  });
  const datos = {
    from: correo,
    to: "uturiproject@gmail.com",
    subject: asunto,
    text: `Nombre:del usuario ${nombre}\n Correo: ${correo}\n Mensaje: ${mensaje}`,
  };
  transporter.sendMail(datos, (error, info) => {
    if (error) {
      respuesta.status(500).send("Error al enviar el correo");
    } else {
      respuesta.send("Correo enviado");
    }
  });
});

export default router;
