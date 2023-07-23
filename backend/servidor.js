import express from "express";
import cors from "cors";
import "./dbconfig.js";
import * as routes from "./Routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("puerto", process.env.PORT || 8081);

//Rutas
Object.entries(routes).forEach(([url, router]) => {
  app.use(`/api/${url}`, router);
});

app.listen(app.get("puerto"), () => {
  console.log(`Servidor iniciado correctamente en el puerto: ${app.get("puerto")}`);
});