const cryptoCurrenciesOptions = ["btc", "eth", "ltc", "bnb", "sol"];
const fiatCurrencyOptions = ["usd", "inr", "eur", "cad", "aud"];

//Validating request body
const isValidRequestBody = (value) => {
  if (Object.keys(value).length > 0) return true;
};

const isValidProperty = (value) => {
  // if(typeof value === 'undefined' || value === null) return false
  if (typeof value === "string" && value.trim().length > 0) return true;
};

const isValidQuantity = (value) => {
  let regEx = /^[0-9]\d*(\.\d+)?$/;
  if (typeof value === "number" && regEx.test(value)) return true;
};

const isValidCryptoCurrency = (value) => {
  if (cryptoCurrenciesOptions.includes(value)) {
    return true;
  }
};

const isValidFiatCurrency = (value) => {
  if (fiatCurrencyOptions.includes(value)) {
    return true;
  }
};

module.exports = {
  isValidRequestBody,
  isValidProperty,
  isValidQuantity,
  isValidCryptoCurrency,
  isValidFiatCurrency,
};
