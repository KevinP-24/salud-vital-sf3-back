import express from 'express';
import cors from 'cors';
import usuariosRoutes from './routes/usuario.routes.js';
import pacientesRoutes from './routes/paciente.routes.js';
import medicosRoutes from './routes/medico.routes.js';
import citasRoutes from './routes/citas.routes.js';
import resultadosRoutes from './routes/resultado.routes.js';

const app = express();

// ====== MIDDLEWARES ======
app.use(cors());
app.use(express.json());

// ====== RUTAS PRINCIPALES ======
app.get('/', (req, res) => {
  res.send('🚀 API VitalApp funcionando correctamente.');
});

// ✅ AGREGA EL PREFIJO /api AQUÍ
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/pacientes', pacientesRoutes);
app.use('/api/medicos', medicosRoutes);
app.use('/api/citas', citasRoutes);
app.use('/api/resultados', resultadosRoutes);

// ====== PUERTO Y ARRANQUE DEL SERVIDOR ======
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en puerto ${PORT}`);
});
