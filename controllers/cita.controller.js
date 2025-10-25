import { CitaModel } from '../models/citasModel.js'
import { sendEmail } from '../services/emailService.js'
import { pool } from '../db.js'

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

      // === Correos automáticos (se obtienen desde BD) ===
      try {
        const { rows } = await pool.query(
          `SELECT
             COALESCE(p.email, p.correo) AS paciente_correo,
             COALESCE(m.email, m.correo) AS medico_correo
           FROM citas c
           JOIN pacientes p ON p.id = c.paciente_id
           JOIN medicos   m ON m.id = c.medico_id
           WHERE c.id = $1`,
          [nueva.id]
        )

        const to = [rows[0]?.paciente_correo, rows[0]?.medico_correo].filter(Boolean)

        if (to.length) {
          await sendEmail({
            to,
            subject: '🩺 Nueva cita agendada',
            title: 'Tu cita ha sido registrada exitosamente',
            text:
`Notifica: VitalApp
Paciente ID: ${nueva.paciente_id}
Médico ID: ${nueva.medico_id}
Fecha: ${new Date(nueva.fecha_cita).toLocaleString()}`,
            accent: '#2c7be5'
          })
          console.log('📧 Notificación de cita enviada a:', to.join(', '))
        } else {
          console.log('ℹ️ Cita creada, pero no se encontraron correos para notificar.')
        }
      } catch (e) {
        console.error('⚠️ Error al enviar notificación de cita:', e)
      }
      // ================================================

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
