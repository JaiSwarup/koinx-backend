import { schedule } from 'node-cron';
import axios from 'axios';
import { Crypto } from '../models/cryptoModel';
import connectToDatabase from '../config/dbConfig';

export const fetchCryptoData = async () => {
    try {
        const { data } = await axios.get("https://api.coingecko.com/api/v3/simple/price", {
          params: {
            ids: "bitcoin,matic-network,ethereum",
            vs_currencies: "usd",
            include_market_cap: true,
            include_24hr_change: true,
          },
        });
        console.log(data);
        const coins = ["bitcoin", "matic-network", "ethereum"];
        for (const coin of coins) {
            const record = new Crypto({
                coin,
                price: data[coin].usd,
                marketCap: data[coin].usd_market_cap,
                change24h: data[coin].usd_24h_change,
            });
            await record.save();
        }
    } catch (err : any) {
      console.error("Error fetching cryptocurrency data:", err.message);
    }
};
  
const task = schedule("* */2 * * *", async () => {
    try {
      await fetchCryptoData();
    } catch (err: any) {
      console.error("Error in scheduled job:", err.message);
    }
  }, {
    scheduled: false,
});
export default task;