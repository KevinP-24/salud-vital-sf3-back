import { pool } from '../db.js'

export const UsuarioModel = {
  async getAll() {
    const { rows } = await pool.query('SELECT * FROM usuarios ORDER BY id')
    return rows
  },

  async getById(id) {
    const { rows } = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id])
    return rows[0]
  },

  async create({ nombre, correo, password, rol = 'paciente' }) {
    const { rows } = await pool.query(
      `INSERT INTO usuarios (nombre, correo, password, rol)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [nombre, correo, password, rol]
    )
    return rows[0]
  },

  async update(id, { nombre, correo, rol }) {
    const { rows } = await pool.query(
      `UPDATE usuarios 
       SET nombre=$1, correo=$2, rol=$3
       WHERE id=$4
       RETURNING *`,
      [nombre, correo, rol, id]
    )
    return rows[0]
  },

  async delete(id) {
    await pool.query('DELETE FROM usuarios WHERE id=$1', [id])
    return { message: 'Usuario eliminado correctamente' }
  }
}
