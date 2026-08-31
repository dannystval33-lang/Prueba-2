import express from 'express';
import incidenciaRoutes from "./routes/incidenciaRoute.js";
import empresaRoutes from "./routes/empresaRoute.js";

const app = express();

app.use(express.json());

app.use("/api/incidencias", incidenciaRoutes);
app.use("/api/empresas", empresaRoutes);

export default app;