import { Request, Response } from 'express';
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
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (error: any) {
      console.error('Error in getStats:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getStandardDeviation(req: Request, res: Response) {
    try {
      const { coin } = req.query;
      if (!coin) {
        return res.status(400).json({ error: 'Coin query parameter is required' });
      }
      const deviation = await cryptoService.getStandardDeviation(coin as string);
      if (!deviation || deviation.length === 0) {
        return res.status(404).json({ error: 'Data not found' });
      }
      res.json({ deviation: deviation[0]?.standardDeviation.toFixed(2) });
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (error: any) {
      console.error('Error in getStandardDeviation:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default new CryptoController();
