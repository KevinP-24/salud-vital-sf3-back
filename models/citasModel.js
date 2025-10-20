import { pool } from '../db.js'

export const CitaModel = {
  async getAll() {
    const { rows } = await pool.query(
      `SELECT * FROM vw_citas_detalle ORDER BY fecha_cita DESC`
    )
    return rows
  },

  async getById(id) {
    const { rows } = await pool.query('SELECT * FROM citas WHERE id = $1', [id])
    return rows[0]
  },

  async create({ paciente_id, medico_id, fecha_cita, motivo }) {
    const { rows } = await pool.query(
      `INSERT INTO citas (paciente_id, medico_id, fecha_cita, motivo)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [paciente_id, medico_id, fecha_cita, motivo]
    )
    return rows[0]
  },

  async updateEstado(id, estado) {
    const { rows } = await pool.query(
      `UPDATE citas SET estado = $1 WHERE id = $2 RETURNING *`,
      [estado, id]
    )
    return rows[0]
  },

  async delete(id) {
    await pool.query('DELETE FROM citas WHERE id = $1', [id])
    return { message: 'Cita eliminada correctamente' }
  }
}
