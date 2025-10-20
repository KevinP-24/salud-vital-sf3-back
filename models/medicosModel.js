import { pool } from '../db.js'

export const MedicoModel = {
  async getAll() {
    const { rows } = await pool.query('SELECT * FROM medicos ORDER BY id')
    return rows
  },

  async getById(id) {
    const { rows } = await pool.query('SELECT * FROM medicos WHERE id = $1', [id])
    return rows[0]
  },

  async create(data) {
    const { usuario_id, especialidad, numero_licencia, telefono } = data
    const { rows } = await pool.query(
      `INSERT INTO medicos (usuario_id, especialidad, numero_licencia, telefono)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [usuario_id, especialidad, numero_licencia, telefono]
    )
    return rows[0]
  },

  async delete(id) {
    await pool.query('DELETE FROM medicos WHERE id = $1', [id])
    return { message: 'Médico eliminado correctamente' }
  }
}
