import mongoose from 'mongoose';
import config from './';

const MAX_RETRIES = 5;
const RETRY_DELAY = 2000;

// const createTimeSeriesCollection = async () => {
//     try {

//         const collectionName = 'crypto';
//         const db = mongoose.connection.db;

//         if (!db) {
//             throw new Error('MongoDB connection not established.');
//         }
        
//         const collections = await db.listCollections({ name: collectionName }).toArray();
//         if (collections.length === 0) {
//             await db.createCollection(collectionName, {
//                 timeseries: {
//                     timeField: 'timestamp',
//                     metaField: 'coin',
//                     granularity: 'hours',
//                 },
//                 expireAfterSeconds: 60 * 2 * 10,
//             });
//             console.log(`Created time series collection: ${collectionName}`);
//         }
//     } catch (error) {
//         console.error('Error creating time series collection:', error);
//     }
// };

const connectToDatabase = async () => {
  if (mongoose.connection.readyState === 1) {
    console.log('MongoDB already connected.');
    return;
  }

  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      if (!config.dbUri) {
        throw new Error('Missing DATABASE_URI in config');
      }

      await mongoose.connect(config.dbUri);
      await mongoose.connection.db?.admin().ping();
    //   await createTimeSeriesCollection();

      console.log(`🗄️ [database]: Database Connected to ${mongoose.connection.db?.databaseName}`);
      return;
    } catch (error) {
      console.error(`Database connection error (attempt ${i + 1}):`, error);
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
    }
  }

  throw new Error('Failed to connect to database after multiple retries.');
};

export default connectToDatabase;
