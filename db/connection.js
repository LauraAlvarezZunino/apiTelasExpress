import mysql from "mysql2/promise";

let connection;

async function connectDB() {
  if (!connection) {
    connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "admin123",
      database: "tienda_telas",
    });
    console.log("Conectado a la base de datos");
  }
  return connection;
}

export default connectDB;
