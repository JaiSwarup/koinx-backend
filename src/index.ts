import config from './config';
import app from './app';
import connectToDatabase from './config/dbConfig';
import logger from './utils/logger';

const startServer = async () => {
    try {
        console.log(process.env.DATABASE_URL)
        await connectToDatabase()
        app.listen(config.port, () => {
          logger.info(`⚡️[server]: Server is running at http://localhost:${config.port}`);
        })
    } catch (error) {
        logger.error('Fatal Error during server startup:', error);
        process.exit(1)
    }
}

startServer()