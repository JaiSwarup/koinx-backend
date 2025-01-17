import { schedule } from 'node-cron';
import axios from 'axios';
import { Crypto } from '../models/cryptoModel';

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
        /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err : any) {
      console.error("Error fetching cryptocurrency data:", err.message);
    }
};
  
const task = schedule("0 */2 * * *", async () => {
    try {
      await fetchCryptoData();
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      console.error("Error in scheduled job:", err.message);
    }
  }, {
    scheduled: false,
    runOnInit: true,
});
export default task;