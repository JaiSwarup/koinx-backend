import axios from "axios";

const getAllCoins = async () => {
  try {
    const { data } = await axios.get("https://api.coingecko.com/api/v3/coins/list");
    let coins = [];
    for (const coin of data) {
        coins.push(coin.name);
    }
    console.log(coins)
  } catch (err: any) {
    console.error("Error fetching cryptocurrency data:", err.message);
    return null;
  }
}

getAllCoins();