import express from "express";
import connectDB from "../db/connection.js";

const router = express.Router();

// router permite crear rutas modulares y separadas
router.get("/", async (req, res) => {
  try {
    const connection = await connectDB();
    const [rows] = await connection.execute("SELECT * FROM telas");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Error al consultar telas" });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const connection = await connectDB();
    const [rows] = await connection.execute("SELECT * FROM telas WHERE id = ?", [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: "Tela no encontrada" });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la tela" });
  }
});

router.post("/", async (req, res) => {
  const { nombre, precio_venta, precio_compra, color, largo, descripcion = "", cantidad_disponible } = req.body;
  try {
    const connection = await connectDB();
    const [result] = await connection.execute(
      `INSERT INTO telas 
       (nombre, precio_venta, precio_compra, color, largo, descripcion, cantidad_disponible)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [nombre, precio_venta, precio_compra, color, largo, descripcion, cantidad_disponible]
    );
    res.status(201).json({ id: result.insertId, nombre, precio_venta, precio_compra, color, largo, descripcion, cantidad_disponible });
  } catch (error) {
    res.status(500).json({ error: "Error al crear tela" });
  }
});


router.put("/:id", async (req, res) => {
  const { nombre, precio_venta, precio_compra, color, largo, descripcion = "", cantidad_disponible } = req.body;
  try {
    const connection = await connectDB();
    const [result] = await connection.execute(
      `UPDATE telas 
       SET nombre = ?, precio_venta = ?, precio_compra = ?, color = ?, largo = ?, descripcion = ?, cantidad_disponible = ?
       WHERE id = ?`,
      [nombre, precio_venta, precio_compra, color, largo, descripcion, cantidad_disponible, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: "Tela no encontrada" });
    res.json({ id: parseInt(req.params.id), nombre, precio_venta, precio_compra, color, largo, descripcion, cantidad_disponible });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar tela" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const connection = await connectDB();
    const [result] = await connection.execute("DELETE FROM telas WHERE id = ?", [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: "Tela no encontrada" });
    res.json({ mensaje: "Tela eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar tela" });
  }
});

export default router;