import { pool } from '../db.js'

export const ResultadoModel = {
  async getAll() {
    const { rows } = await pool.query('SELECT * FROM resultados ORDER BY fecha_resultado DESC')
    return rows
  },

  async getByCita(cita_id) {
    const { rows } = await pool.query('SELECT * FROM resultados WHERE cita_id = $1', [cita_id])
    return rows
  },

  async create({ cita_id, descripcion, archivo_url }) {
    const { rows } = await pool.query(
      `INSERT INTO resultados (cita_id, descripcion, archivo_url)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [cita_id, descripcion, archivo_url]
    )
    return rows[0]
  }
}
