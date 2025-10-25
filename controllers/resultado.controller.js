import { ResultadoModel } from '../models/resultadosModel.js'
import { sendEmail } from '../services/emailService.js'
import { pool } from '../db.js'

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

      // === Correos automáticos (se obtienen desde BD por cita_id) ===
      try {
        const { rows } = await pool.query(
          `SELECT
             COALESCE(p.email, p.correo) AS paciente_correo,
             COALESCE(m.email, m.correo) AS medico_correo
           FROM citas c
           JOIN pacientes p ON p.id = c.paciente_id
           JOIN medicos   m ON m.id = c.medico_id
           WHERE c.id = $1`,
          [nuevo.cita_id]
        )

        const to = [rows[0]?.paciente_correo, rows[0]?.medico_correo].filter(Boolean)

        if (to.length) {
          await sendEmail({
            to,
            subject: '🧾 Resultado disponible',
            title: 'Resultado disponible',
            text:
`Notifica: VitalApp
Cita ID: ${nuevo.cita_id}
Resultado ID: ${nuevo.id}
Descripción: ${nuevo.descripcion ?? '(sin descripción)'}`,
            accent: '#22c55e'
          })
          console.log('📧 Notificación de resultado enviada a:', to.join(', '))
        } else {
          console.log('ℹ️ Resultado creado, pero no se encontraron correos para notificar.')
        }
      } catch (e) {
        console.error('⚠️ Error al enviar notificación de resultado:', e)
      }
      // =============================================================

      res.status(201).json(nuevo)
    } catch (err) {
      console.error('❌ Error al crear resultado:', err)
      res.status(500).json({ error: 'Error al crear resultado' })
    }
  }
}
