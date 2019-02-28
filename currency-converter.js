// real time curreny converter
// USD, CAD, 20
// output: 20USD is worth 26 CAD and you can spend these in the following counrtries:

// http://data.fixer.io/api/latest?access_key=a0a9a3147be0b6d902cffe33599f92ac
// https://restcountries.eu/rest/v2/currency/CAD
const axios = require('axios');

// const getExchangeRate = (from, to) => {
//   return axios.get('http://data.fixer.io/api/latest?access_key=a0a9a3147be0b6d902cffe33599f92ac')
//   .then((response)=>{
//     const euro = 1 / response.data.rates[from];
//     const rate = euro * response.data.rates[to];
//     return rate;
//   });
// };

const getExchangeRate = async (from, to) => {
  // inside async function, the await either resolves or throws the error
  try {
    const response = await axios.get('http://data.fixer.io/api/latest?access_key=a0a9a3147be0b6d902cffe33599f92ac');
    const euro = 1 / response.data.rates[from];
    const rate = euro * response.data.rates[to];

    if(isNaN(rate)) {
      throw new Error();
    }

    return rate;
  } catch (e) {
    throw new Error(`Unable to get exchance rate for ${from} and ${to}`)
  } finally {

  }
};

const getCountries = async (currency) => {
  try {
    const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currency}`)
    return response.data.map((country)=>country.name);
  } catch (e) {
    throw new Error(`Unable to get countries that use ${currency}`)
  } finally {

  }
};

const convertCurrrency = async (from, to, amount) => {
  const rate = await getExchangeRate(from, to);
  const convertedAmount = (rate * amount).toFixed(2);// 2 decimal places
  const countries = await getCountries(to);
  return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend it in the followin countries: ${countries.join(', ')} `;
};

convertCurrrency('EUR', 'EUR', 5000)
.then((result)=>console.log(result))
.catch((e)=>console.log(e.message));

const add = async (a,b) => a+b+c;

const doWork = async () =>{
  try {
    const result = await add(12,13)
    return result;
  } catch (e) {
    return 10;
  } finally {

  }
}

doWork().then((data)=>{
  console.log(data);
})
.catch((e)=>{
  console.log('Something went wrong');
})
