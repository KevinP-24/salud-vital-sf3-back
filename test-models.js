import { UsuarioModel } from './models/usuariosModel.js'

const probarModelos = async () => {
  console.log('🔍 Probando modelo Usuario...')
  const usuarios = await UsuarioModel.getAll()
  console.log('✅ Usuarios encontrados:', usuarios)
}

probarModelos()
  .then(() => console.log('🟢 Test finalizado'))
  .catch(err => console.error('❌ Error en test:', err))
