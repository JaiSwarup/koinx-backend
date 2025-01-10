import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';

import * as middlewares from './middlewares';
import routes from './routes';
import MessageResponse from './interfaces/MessageResponse';


const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: '🦄🌈✨👋🌎🌍🌏✨🌈🦄',
  });
});

app.use('/api/v1', routes);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;