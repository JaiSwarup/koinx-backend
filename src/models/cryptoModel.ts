import mongoose, {Schema} from "mongoose";

const cryptoSchema = new Schema({
    coin: { type: String, required: true }, // 'bitcoin', 'ethereum', 'matic-network'
    price: { type: Number, required: true },
    marketCap: { type: Number, required: true },
    change24h: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
}, { collection: 'crypto' });
  
export const Crypto = mongoose.model('Crypto', cryptoSchema);