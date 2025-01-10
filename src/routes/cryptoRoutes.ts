import { RequestHandler, Router } from 'express';
import cryptoController from '../controllers/cryptoController';
import { deviationValidator, statsValidator } from '../validators/queryValidator';

const router = Router();

router.get('/stats', statsValidator,  cryptoController.getStats as RequestHandler)
.get('/deviation', deviationValidator, cryptoController.getStandardDeviation as RequestHandler);


export default router;
