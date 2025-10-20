import { MedicoModel } from '../models/medicosModel.js'

export const MedicosController = {
  async getAll(req, res) {
    try {
      const data = await MedicoModel.getAll()
      res.json(data)
    } catch (err) {
      console.error('❌ Error al obtener médicos:', err)
      res.status(500).json({ error: 'Error al obtener médicos' })
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params
      const medico = await MedicoModel.getById(id)
      if (!medico) return res.status(404).json({ error: 'Médico no encontrado' })
      res.json(medico)
    } catch (err) {
      console.error('❌ Error al obtener médico:', err)
      res.status(500).json({ error: 'Error al obtener médico' })
    }
  },

  async create(req, res) {
    try {
      const nuevo = await MedicoModel.create(req.body)
      res.status(201).json(nuevo)
    } catch (err) {
      console.error('❌ Error al crear médico:', err)
      res.status(500).json({ error: 'Error al crear médico' })
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params
      const eliminado = await MedicoModel.delete(id)
      res.json(eliminado)
    } catch (err) {
      console.error('❌ Error al eliminar médico:', err)
      res.status(500).json({ error: 'Error al eliminar médico' })
    }
  }
}
