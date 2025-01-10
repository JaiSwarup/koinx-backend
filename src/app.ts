import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';

import * as middlewares from './middlewares';
import task from './jobs/cryptoJob';
import routes from './routes';
import status from './routes/status';
import MessageResponse from './interfaces/MessageResponse';

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

task.start();

app.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'Hello From the API 🚀',
    data: 'The API is available at /api/v1',
  });
});
app.use('/status', status)
app.use('/api/v1', routes);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;