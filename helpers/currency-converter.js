const axios = require('axios');

const convertCurrency = async (fromCurrency, toCurrency, amount)  => {
  try {
    const response = await axios.get('http://data.fixer.io/api/latest?access_key=3aedf21d939a2f383299adb483dbc874&format=1');

    const rate = response.data.rates;
    const euro = 1 / rate[fromCurrency]; //cuando vale una unidad de fromCurrency en euros
    console.log('euro: ', euro);

    const exchangeRate = euro * rate[toCurrency]; //esa unidad en euros la multiplico por el valor de toCurrency en base al euro
    console.log('exchangeRate: ', exchangeRate);

    const convertedAmount = (amount * exchangeRate).toFixed(2); //finalmente obtengo la conversion

    return convertedAmount;

  } catch (error) {
    throw new Error(`Unable to get currency ${fromCurrency} and  ${toCurrency}`);
  }
};

module.exports = {
  convertCurrency
}