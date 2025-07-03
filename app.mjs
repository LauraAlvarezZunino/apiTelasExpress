import express from 'express';
import mysql from "mysql2/promise";

const app = express();
const PORT = 3000;

app.use(express.json());

let connection;

try{
  connection= await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin123",
    database: "tienda_telas",
  });
    console.log("Conectado a la base de datos");
} catch (error) {
  console.error("Error de conexión a la base de datos:", error);
}

// GET todas las telas
app.get("/telas", async (req, res) => {
  if (!connection) return res.status(500).json({ error: "Sin conexión a base de datos" });
  try {
    const [rows] = await connection.execute("SELECT * FROM telas");
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: "Error al consultar telas" });
  }
});


app.get('/telas/:id',async(req,res)=>{
  try {
    const [rows] = await connection.execute("SELECT * FROM telas WHERE id = ?", [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: "Tela no encontrada" });
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la tela" });
  }
});

app.post('/telas',async (req, res) => {
    const { nombre, descripcion = "", precioPorMetro, cantidadDisponible } = req.body;
  try {
    const [result] = await connection.execute(
      "INSERT INTO telas (nombre, descripcion, precio_venta, cantidad_disponible) VALUES (?, ?, ?, ?)",
      [nombre, descripcion, precioPorMetro, cantidadDisponible]
    );
    res.status(201).json({ id: result.insertId, nombre, descripcion, precio_venta: precioPorMetro, cantidad_disponible: cantidadDisponible });
  } catch (error) {
    res.status(500).json({ error: "Error al crear tela" });
  }
});

app.put('/telas/:id',async (req, res) => {
 const { nombre, descripcion = "", precioPorMetro, cantidadDisponible } = req.body;
  try {
    const [result] = await connection.execute(
      "UPDATE telas SET nombre = ?, descripcion = ?, precio_venta = ?, cantidad_disponible = ? WHERE id = ?",
      [nombre, descripcion, precioPorMetro, cantidadDisponible, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: "Tela no encontrada" });
    res.status(200).json({ id: parseInt(req.params.id), nombre, descripcion, precio_venta: precioPorMetro, cantidad_disponible: cantidadDisponible });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar tela" });
  }
});

app.delete('/telas/:id',async (req, res) => {
  try {
    const [result] = await connection.execute("DELETE FROM telas WHERE id = ?", [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: "Tela no encontrada" });
    res.status(200).json({ mensaje: "Tela eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar tela" });
  }
});

// Iniciar servidor
app.get("/", (req, res) => {
  res.status(200).send("API de Telas funcionando 🧵");
});

app.listen(PORT, "127.0.0.1", () => {
  console.log("Servidor escuchando en http://127.0.0.1:3000");
});