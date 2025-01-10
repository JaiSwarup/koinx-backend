import { RequestHandler, Router } from 'express';
import cryptoController from '../controllers/cryptoController';

const router = Router();

router.get('/stats', cryptoController.getStats as RequestHandler);


export default router;
