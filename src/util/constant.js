const httpStatusCodes = {
  SUCCESS: 200,
  BAD_REQUEST: 400,
  INTERNAL_SERVER: 500,
};

const httpErrorMsgs = {
  INPUT_ERROR_MSG: "Crypto data is required for conversion",
  QUANTITY_ERROR_MSG: "Quantity must be a positive number",
  FIAT_CURRENCY_ERROR_MSG: `Fiat currency must be from: usd, inr, eur, cad, aud`,
  BASE_CURRENCY_ERROR_MSG:
    "Base currency is required and should be from: btc, eth, ltc, bnb, sol",
  QUOTE_CURRENCY_ERROR_MSG:
    "Quote currency is required and should be from:  btc, eth, ltc, bnb, sol ",
  SAME_INPUT_ERROR_MSG: "Pair must contain different currencies",
};

module.exports = { httpStatusCodes, httpErrorMsgs };
