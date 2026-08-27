import express from "express";
import libroRoutes from "./routes/libro.routes";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ mensaje: "API de Libros lista" });
});

app.use("/api/libros", libroRoutes);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});