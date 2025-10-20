import { Router } from 'express'
import { PacientesController } from '../controllers/paciente.controller.js'

const router = Router()

router.get('/', PacientesController.getAll)
router.get('/:id', PacientesController.getById)
router.post('/', PacientesController.create)
router.delete('/:id', PacientesController.delete)

export default router
