/** @format */

const URL = "https://economia.awesomeapi.com.br/json/";
const coinsUrl = `${URL}available/uniq`;

const options = {
  method: "GET",
};

export const getExchangeRates = async (from: string, to: string) => {
  console.log(from, to);
  const coinSelectedUrl = `${URL}last/${from}-${to}`;

  try {
    const response = await fetch(coinSelectedUrl, options);
    const data = await response.json();
    console.log("API Response:", data);

    return data;
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    return null;
  }
};

export const getAvailableCoins = async () => {
  try {
    const response = await fetch(coinsUrl, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getAvailableCombinationsCoins = async () => {
  const combinationsCoinsUrl = `${URL}available`;
  try {
    const response = await fetch(combinationsCoinsUrl, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};
