import mysql from "mysql";
import "dotenv/config";

const conexion = mysql.createConnection({
  host: process.env.SERVER,
  user: process.env.USER_DB,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

conexion.connect((error) => {
  if (error) {
    console.log("No fue posible la conexión:", error);
    return;
  }
  console.log("¡Conectado correctamente de la base de datos!");

  conexion.query("SELECT VERSION() AS version, DATABASE() AS database_name", (error, result) => {
    if (error) {
      console.error("Error al obtener información del servidor:", error);
      return;
    }
    console.log("Versión del servidor de la base de datos:", result[0].version);
    console.log("Base de datos actual:", result[0].database_name);

    conexion.query("SHOW STATUS LIKE 'Threads_connected'", (error, stats) => {
      if (error) {
        console.error("Error al obtener estadísticas:", error);
        return;
      }
      console.log("Conexiones activas:", stats[0].Value);
    });
  });
});

export default conexion;