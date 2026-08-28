import express from 'express';
import incidenciaRoutes from "./routes/incidenciaRoutes.js";

const app = express();

app.use(express.json());

app.use("/api/incidencias", incidenciaRoutes);

export default app;