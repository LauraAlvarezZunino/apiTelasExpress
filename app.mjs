import express from 'express';
const app = express();
const PORT = 3000;

app.use(express.json());

// Arreglo en memoria
let telas = [];
let nextId = 1;

app.get('/telas', (req, res) => {
  res.json(telas);
});

app.get('/telas/:id',(req,res)=>{
  const tela = telas.find(t => t.id === parseInt(req.params.id));
  if (!tela) return res.status(404).json({ error: 'Tela no encontrada' });
  res.json(tela);
});

app.post('/telas', (req, res) => {
  const nuevaTela = {
    id: nextId++,
    nombre: req.body.nombre,
    descripcion: req.body.descripcion || '',
    precio_venta: req.body.precioPorMetro,
    cantidad_disponible: req.body.cantidadDisponible
  };

  telas.push(nuevaTela);
  res.status(201).json(nuevaTela);
});

app.put('/telas/:id', (req, res) => {
  const tela = telas.find(t => t.id === parseInt(req.params.id));
  if (!tela) return res.status(404).json({ error: 'Tela no encontrada' });
  tela.nombre = req.body.nombre;
  tela.descripcion = req.body.descripcion || '';
  tela.precio_venta = req.body.precioPorMetro;
  tela.cantidad_disponible = req.body.cantidadDisponible;

  res.json(tela);
});

app.delete('/telas/:id', (req, res) => {
  const index = telas.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Tela no encontrada' });

  const eliminada = telas.splice(index, 1);
  res.json({ mensaje: 'Tela eliminada', tela: eliminada[0] });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`API corriendo en http://localhost:${PORT}`);
});