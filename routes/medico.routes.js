import { Router } from 'express'
import { MedicosController } from '../controllers/medico.controller.js'

const router = Router()

router.get('/', MedicosController.getAll)
router.get('/:id', MedicosController.getById)
router.post('/', MedicosController.create)
router.delete('/:id', MedicosController.delete)

export default router
