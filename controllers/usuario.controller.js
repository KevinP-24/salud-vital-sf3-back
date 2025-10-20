import { UsuarioModel } from '../models/usuariosModel.js'

export const UsuariosController = {
  // Obtener todos los usuarios
  async getAll(req, res) {
    try {
      const usuarios = await UsuarioModel.getAll()
      res.json(usuarios)
    } catch (err) {
      console.error('❌ Error al obtener usuarios:', err)
      res.status(500).json({ error: 'Error al obtener usuarios' })
    }
  },

  // Obtener usuario por ID
  async getById(req, res) {
    try {
      const { id } = req.params
      const usuario = await UsuarioModel.getById(id)
      if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' })
      res.json(usuario)
    } catch (err) {
      console.error('❌ Error al obtener usuario:', err)
      res.status(500).json({ error: 'Error al obtener usuario' })
    }
  },

  // Crear usuario
  async create(req, res) {
    try {
      const { nombre, correo, password, rol } = req.body
      if (!nombre || !correo || !password)
        return res.status(400).json({ error: 'Faltan campos obligatorios' })

      const nuevo = await UsuarioModel.create({ nombre, correo, password, rol })
      res.status(201).json(nuevo)
    } catch (err) {
      console.error('❌ Error al crear usuario:', err)
      res.status(500).json({ error: 'Error al crear usuario' })
    }
  },

  // Actualizar usuario
  async update(req, res) {
    try {
      const { id } = req.params
      const { nombre, correo, rol } = req.body
      const actualizado = await UsuarioModel.update(id, { nombre, correo, rol })
      res.json(actualizado)
    } catch (err) {
      console.error('❌ Error al actualizar usuario:', err)
      res.status(500).json({ error: 'Error al actualizar usuario' })
    }
  },

  // Eliminar usuario
  async delete(req, res) {
    try {
      const { id } = req.params
      const eliminado = await UsuarioModel.delete(id)
      res.json(eliminado)
    } catch (err) {
      console.error('❌ Error al eliminar usuario:', err)
      res.status(500).json({ error: 'Error al eliminar usuario' })
    }
  }
}
