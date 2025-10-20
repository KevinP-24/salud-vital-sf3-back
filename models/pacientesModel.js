import { pool } from '../db.js'

export const PacienteModel = {
  async getAll() {
    const { rows } = await pool.query('SELECT * FROM pacientes ORDER BY id')
    return rows
  },

  async getById(id) {
    const { rows } = await pool.query('SELECT * FROM pacientes WHERE id = $1', [id])
    return rows[0]
  },

  async create(data) {
    const { usuario_id, documento, telefono, direccion, fecha_nacimiento, genero } = data
    const { rows } = await pool.query(
      `INSERT INTO pacientes (usuario_id, documento, telefono, direccion, fecha_nacimiento, genero)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [usuario_id, documento, telefono, direccion, fecha_nacimiento, genero]
    )
    return rows[0]
  },

  async delete(id) {
    await pool.query('DELETE FROM pacientes WHERE id = $1', [id])
    return { message: 'Paciente eliminado correctamente' }
  },


    async getByDocumento(documento) {
    const { rows } = await pool.query('SELECT * FROM pacientes WHERE documento = $1', [documento])
    return rows[0]
  },
}
