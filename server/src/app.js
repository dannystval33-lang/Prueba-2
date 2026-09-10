import express from 'express'; // Importación del framework Express para crear el servidor y manejar las rutas
import incidenciaRoutes from "./routes/incidenciaRoute.js";
import empresaRoutes from "./routes/empresaRoute.js";
import authRoutes from "./routes/authRoute.js";
import cors from 'cors'; // Middleware para permitir solicitudes desde diferentes dominios

const app = express();

app.use(cors({ 
    origin: 'https://localhost:5173', // Permitir solicitudes desde el dominio especificado
    credentials: true
})); 

app.use(express.json()); // Middleware traductor de JSON para que el servidor pueda interpretar las solicitudes con contenido JSON
app.use("/api/auth", authRoutes);
app.use("/api/incidencias", incidenciaRoutes);
app.use("/api/empresas", empresaRoutes);

export default app;