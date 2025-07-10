import express from "express";
import telasRoutes from "./routes/telas.js";


const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/telas", telasRoutes);


app.get("/", (req, res) => {
  res.send("API Tienda Telas funcionando");
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
