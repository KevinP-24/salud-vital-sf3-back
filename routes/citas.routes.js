import { Router } from 'express'
import { CitasController } from '../controllers/cita.controller.js'

const router = Router()

router.get('/', CitasController.getAll)
router.get('/:id', CitasController.getById)
router.post('/', CitasController.create)
router.put('/:id', CitasController.updateEstado)
router.delete('/:id', CitasController.delete)

export default router
