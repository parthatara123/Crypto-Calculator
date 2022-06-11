const axios = require("axios").default;
const { httpStatusCodes, httpErrorMsgs } = require("../util/constant");
const {
  isValidRequestBody,
  isValidProperty,
  isValidQuantity,
  isValidCryptoCurrency,
  isValidFiatCurrency,
} = require("../util/validator");

//Creating crypto currency converter handler function
const cryptoCalculator = async function (req, res) {
  try {
    const requestBody = req.body;
    //Validating input from body
    if (!isValidRequestBody(requestBody)) {
      return res.status(httpStatusCodes.BAD_REQUEST).send({
        status: false,
        message: httpErrorMsgs.INPUT_ERROR_MSG,
      });
    }

    //destructuring request body object
    let { baseCurrency, quoteCurrency, quantity, fiatCurrency } = requestBody;

    //assigning default value to quantity if quantity is not give
    // validating quantity is number or not in else if
    if (quantity === undefined) {
      quantity = 1;
    } else if (!isValidQuantity(quantity)) {
      return res
        .status(httpStatusCodes.BAD_REQUEST)
        .send({ status: false, message: httpErrorMsgs.QUANTITY_ERROR_MSG });
    }

    //assigning default value to fiat currency
    if (fiatCurrency === undefined) {
      fiatCurrency = "usd";
    }

    if (!isValidProperty(fiatCurrency)) {
      return res.status(httpStatusCodes.BAD_REQUEST).send({
        status: false,
        message: httpErrorMsgs.FIAT_CURRENCY_ERROR_MSG,
      });
    }

    //validating fiat currency after converting it to lowercase
    fiatCurrency = fiatCurrency.toLowerCase();
    if (!isValidFiatCurrency(fiatCurrency)) {
      return res.status(httpStatusCodes.BAD_REQUEST).send({
        status: false,
        message: `Fiat currency must be from: usd, inr, eur, cad, aud`,
      });
    }

    //validating inputs
    if (
      !isValidProperty(baseCurrency) ||
      !isValidCryptoCurrency(baseCurrency)
    ) {
      return res.status(httpStatusCodes.BAD_REQUEST).send({
        status: false,
        message: httpErrorMsgs.BASE_CURRENCY_ERROR_MSG,
      });
    }

    if (
      !isValidProperty(quoteCurrency) ||
      !isValidCryptoCurrency(quoteCurrency)
    ) {
      return res.status(httpStatusCodes.BAD_REQUEST).send({
        status: false,
        message: httpErrorMsgs.QUOTE_CURRENCY_ERROR_MSG,
      });
    }

    //converting crypto currency symbols to lowercase
    baseCurrency = baseCurrency.toLowerCase();
    quoteCurrency = quoteCurrency.toLowerCase();

    //Crypto pairs must be different
    if (baseCurrency === quoteCurrency)
      return res.status(httpStatusCodes.BAD_REQUEST).send({
        status: false,
        message: httpErrorMsgs.SAME_INPUT_ERROR_MSG,
      });

    //option object for axios call
    const options = {
      method: "GET",
      url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${fiatCurrency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
    };

    //axios call to get live crypto currency rates from 3rd party API
    let cryptoData = await axios(options);

    //filtering whole data to get base and quote currencies
    let currencyPairDetails = cryptoData.data.filter(
      (element) =>
        element.symbol === baseCurrency || element.symbol === quoteCurrency
    );

    //Getting base and quote currencies current price from filtered array
    let baseCurrencyCurrentPrice;
    let quoteCurrencyCurrentPrice;

    //Assigning values to base and quote currencies
    if (baseCurrency === currencyPairDetails[0]["symbol"]) {
      baseCurrencyCurrentPrice = currencyPairDetails[0]["current_price"];
      quoteCurrencyCurrentPrice = currencyPairDetails[1]["current_price"];
    } else {
      baseCurrencyCurrentPrice = currencyPairDetails[1]["current_price"];
      quoteCurrencyCurrentPrice = currencyPairDetails[0]["current_price"];
    }

    //calculating exchange rate for conversion
    const cryptoExchangeRates =
      quantity * (baseCurrencyCurrentPrice / quoteCurrencyCurrentPrice);

    //sending response

    let cryptoPrice = {};

    cryptoPrice[baseCurrency] = baseCurrencyCurrentPrice;
    cryptoPrice[quoteCurrency] = quoteCurrencyCurrentPrice;
    cryptoPrice["conversionRate"] = cryptoExchangeRates;

    return res
      .status(httpStatusCodes.SUCCESS)
      .send({ status: true, cryptoPrice });
  } catch (err) {
    res.status(httpStatusCodes.INTERNAL_SERVER).send(err.message);
  }
};

//exporting cryptoExchanger
module.exports = { cryptoCalculator };
