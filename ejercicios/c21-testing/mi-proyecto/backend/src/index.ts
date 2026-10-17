import dotenv from "dotenv";
dotenv.config(); // <-- ESTA LÍNEA CARGA EL .ENV ANTES DE CUALQUIER OTRA COSA

import app from "./app";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});