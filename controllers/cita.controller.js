import { CitaModel } from '../models/citasModel.js'

export const CitasController = {
  async getAll(req, res) {
    try {
      const data = await CitaModel.getAll()
      res.json(data)
    } catch (err) {
      console.error('❌ Error al obtener citas:', err)
      res.status(500).json({ error: 'Error al obtener citas' })
    }
  },

  async getById(req, res) {
    try {
      const { id } = req.params
      const cita = await CitaModel.getById(id)
      if (!cita) return res.status(404).json({ error: 'Cita no encontrada' })
      res.json(cita)
    } catch (err) {
      console.error('❌ Error al obtener cita:', err)
      res.status(500).json({ error: 'Error al obtener cita' })
    }
  },

  async create(req, res) {
    try {
      const nueva = await CitaModel.create(req.body)
      res.status(201).json(nueva)
    } catch (err) {
      console.error('❌ Error al crear cita:', err)
      res.status(500).json({ error: 'Error al crear cita' })
    }
  },

  async updateEstado(req, res) {
    try {
      const { id } = req.params
      const { estado } = req.body
      const actualizada = await CitaModel.updateEstado(id, estado)
      res.json(actualizada)
    } catch (err) {
      console.error('❌ Error al actualizar cita:', err)
      res.status(500).json({ error: 'Error al actualizar cita' })
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params
      const eliminado = await CitaModel.delete(id)
      res.json(eliminado)
    } catch (err) {
      console.error('❌ Error al eliminar cita:', err)
      res.status(500).json({ error: 'Error al eliminar cita' })
    }
  }
}
