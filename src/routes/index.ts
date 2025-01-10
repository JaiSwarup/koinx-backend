import { Router } from 'express'
import MessageResponse from '../interfaces/MessageResponse'

const router = Router()

router.get<{}, MessageResponse>('/', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.json({ message: 'Hello from the API - 👋🌎🌍🌏' });
});


export default router;