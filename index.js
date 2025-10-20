import express from 'express'
import cors from 'cors'
import usuariosRoutes from './routes/usuario.routes.js'
import pacientesRoutes from './routes/paciente.routes.js'
import medicosRoutes from './routes/medico.routes.js'
import citasRoutes from './routes/citas.routes.js'
import resultadosRoutes from './routes/resultado.routes.js'
const app = express()

// ====== MIDDLEWARES ======
app.use(cors())                // permite solicitudes desde el frontend
app.use(express.json())        // permite recibir JSON en las peticiones

// ====== RUTAS PRINCIPALES ======
app.get('/', (req, res) => {
  res.send('🚀 API VitalApp funcionando correctamente.')
})

// Rutas para usuarios
app.use('/usuarios', usuariosRoutes)
app.use('/pacientes', pacientesRoutes)
app.use('/medicos', medicosRoutes)
app.use('/citas', citasRoutes)
app.use('/resultados', resultadosRoutes)

// ====== PUERTO Y ARRANQUE DEL SERVIDOR ======
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en puerto ${PORT}`)
})
