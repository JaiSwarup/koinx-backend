import { Request, Response, NextFunction } from 'express';
import cryptoService from '../services/cryptoService';

class CryptoController {
  async getStats(req: Request, res: Response) {
    try {
      const { coin } = req.query;
      if (!coin) {
        return res.status(400).json({ error: 'Coin query parameter is required' });
      }
      const stats = await cryptoService.getStats(coin as string);
      if (!stats) {
        return res.status(404).json({ error: 'Data not found' });
      }
      res.json(stats);
    } catch (error: any) {
      console.error('Error in getStats:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default new CryptoController();
