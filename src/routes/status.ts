import { Router } from 'express'

const router = Router()

router.get('/', async (req, res) => {
  try {
    res.status(200).json({ status: 'OK', database: 'OK'})
  } catch (error) {
    if (error instanceof Error) {
      res.status(503).json({ status: 'ERROR', database: error.message })
    } else {
      console.error('Unexpected error type:', error)
      res.status(500).json({ status: 'ERROR', message: 'Unknown error' })
    }
  } finally {
  }
})

export default router