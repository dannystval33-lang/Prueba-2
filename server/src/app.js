import express from 'express';
import incidenciaRoutes from "./routes/incidenciaRoute.js";
import empresaRoutes from "./routes/empresaRoute.js";
import authRoutes from "./routes/authRoute.js";

const app = express();

app.use(express.json()); // Middleware traductor de JSON para que el servidor pueda interpretar las solicitudes con contenido JSON
app.use("/api/auth", authRoutes);
app.use("/api/incidencias", incidenciaRoutes);
app.use("/api/empresas", empresaRoutes);

export default app;