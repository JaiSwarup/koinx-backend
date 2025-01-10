import { Router } from 'express'
import cryptoRoutes from './cryptoRoutes'

const router = Router()

router.use('/', cryptoRoutes)



export default router;