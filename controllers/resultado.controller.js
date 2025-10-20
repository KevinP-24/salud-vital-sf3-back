import { ResultadoModel } from '../models/resultadosModel.js'

export const ResultadosController = {
  async getAll(req, res) {
    try {
      const data = await ResultadoModel.getAll()
      res.json(data)
    } catch (err) {
      console.error('❌ Error al obtener resultados:', err)
      res.status(500).json({ error: 'Error al obtener resultados' })
    }
  },

  async getByCita(req, res) {
    try {
      const { cita_id } = req.params
      const data = await ResultadoModel.getByCita(cita_id)
      res.json(data)
    } catch (err) {
      console.error('❌ Error al obtener resultado:', err)
      res.status(500).json({ error: 'Error al obtener resultado' })
    }
  },

  async create(req, res) {
    try {
      const nuevo = await ResultadoModel.create(req.body)
      res.status(201).json(nuevo)
    } catch (err) {
      console.error('❌ Error al crear resultado:', err)
      res.status(500).json({ error: 'Error al crear resultado' })
    }
  }
}
