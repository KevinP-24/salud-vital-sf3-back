import { Router } from 'express'
import { ResultadosController } from '../controllers/resultado.controller.js'

const router = Router()

router.get('/', ResultadosController.getAll)
router.get('/:cita_id', ResultadosController.getByCita)
router.post('/', ResultadosController.create)

export default router
