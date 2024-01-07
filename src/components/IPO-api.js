import axios from 'axios';

const apiKey = ""; // Replace with your API Key

export async function upcomingIpo(query) {
  try {
    const url = `https://api.iex.cloud/v1/data/CORE/UPCOMING_IPOS/market?token=${apiKey}`;
    const response = await axios.get(url);
    const data = response.data;
    console.log("IPO result ------", data);
    return data;
  } catch (err) {
    console.log("An error has occurred:", err);
  }
}

export async function exchangeIpo(query) {
  try {
    const url = `https://api.iex.cloud/v1/fx/latest?symbols=USDCAD,GBPUSD,USDJPY&token=${apiKey}`;
    const response = await axios.get(url);
    const data = response.data;
    console.log("IPO exchange result ------", data);
    return data;
  } catch (err) {
    console.log("An error has occurred:", err);
  }
}
