import { PacienteModel } from '../models/pacientesModel.js'

export const PacientesController = {
  // Obtener todos los pacientes
  async getAll(req, res) {
    try {
      const data = await PacienteModel.getAll()
      res.json(data)
    } catch (err) {
      console.error('❌ Error al obtener pacientes:', err)
      res.status(500).json({ error: 'Error al obtener pacientes' })
    }
  },

  // Obtener un paciente por ID
  async getById(req, res) {
    try {
      const { id } = req.params
      const paciente = await PacienteModel.getById(id)
      if (!paciente) return res.status(404).json({ error: 'Paciente no encontrado' })
      res.json(paciente)
    } catch (err) {
      console.error('❌ Error al obtener paciente:', err)
      res.status(500).json({ error: 'Error al obtener paciente' })
    }
  },

  // Crear paciente con validaciones
  async create(req, res) {
    try {
      const { usuario_id, documento, telefono, direccion, fecha_nacimiento, genero } = req.body

      // 🔹 Validar campos obligatorios
      if (!usuario_id || !documento) {
        return res.status(400).json({
          error: 'Campos obligatorios faltantes: usuario_id y documento son requeridos.'
        })
      }

      // 🔹 Validar duplicado antes de insertar
      const existe = await PacienteModel.getByDocumento(documento)
      if (existe) {
        return res.status(409).json({
          error: `El documento ${documento} ya está registrado en el sistema.`
        })
      }

      // 🔹 Crear el paciente si todo está bien
      const nuevo = await PacienteModel.create({
        usuario_id,
        documento,
        telefono,
        direccion,
        fecha_nacimiento,
        genero
      })

      res.status(201).json(nuevo)
    } catch (err) {
      console.error('❌ Error al crear paciente:', err)
      res.status(500).json({ error: 'Error al crear paciente' })
    }
  },

  // Eliminar paciente
  async delete(req, res) {
    try {
      const { id } = req.params
      const eliminado = await PacienteModel.delete(id)
      res.json(eliminado)
    } catch (err) {
      console.error('❌ Error al eliminar paciente:', err)
      res.status(500).json({ error: 'Error al eliminar paciente' })
    }
  }
}
