import { Crypto } from "../models/cryptoModel";
import axios from "axios";

class CryptoService {
    async getStats(coin : string) {
        try {
            if (!coin) {
                throw new Error("Coin is required");
            }
            const { data } = await axios.get("https://api.coingecko.com/api/v3/simple/price", {
              params: {
                ids: coin,
                vs_currencies: "usd",
                include_market_cap: true,
                include_24hr_change: true,
              },
            });
            return {
                price: data[coin].usd,
                marketCap: data[coin].usd_market_cap,
                "24hChange": data[coin].usd_24h_change,
            };
        } catch (err : any) {
          console.error("Error fetching cryptocurrency data:", err.message);
          return null
        }
    }
}

export default new CryptoService();