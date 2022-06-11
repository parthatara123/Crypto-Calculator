```yaml

Project's Title: "CRYPTO CURRENCY CONVERTOR AND CALCULATOR"

Project's Description: In this project i have created a crypto calculator with a single API. This project is created to get live price of crypto currency pair in various fiat currencies and to get exchange rate of a crypto pair.

In this project, i am using "coingecko" API for getting live prices of cryptos in various fiat currencies. For fetching data from third party server, i am using "axios" library.


!!!Project's_Details

In this project user can get live price of these cryptos:  "btc", "eth", "ltc", "bnb", "sol"
Prices could be converted in these fiat currencies: "usd", "inr", "eur", "cad", "aud"


request-body-sample:
{
    "baseCurrency" : "eth",
    "quoteCurrency" : "btc",
    "quantity" : 1.3,
    "fiatCurrency" : "inr"
}

Approach:

--I have created an index file, in which I have imported express framework, body-parser for parsing request body and dotenv for securing important keys.
--I have used express routing to create a mini-app, named route, in which i have imported crypto controller.
--Crypto controller has one handler where business logic is kept. User can enter a crypto pair in form of baseCurrency and quoteCurrency to get the live exchange rate. By default we will consider the quantity as "1" but user can also integrate the quantity.
--User can opt for fiat currencies as per his need to get the live price of base and quote currencies. In this project, i am handling 5 famous fiat currencies.
--To validate each field of request body, i have imported validator functions from validator module of util directory. Util directory also have constant.js module which consist all HTTP status codes and error messages.
--After validating each field, i used "axios" library to get live crypto currency prices from "coingecko" api.
--For calculating exchange rates, i have used simple math and sends response as below.

response-success-sample:
{
    "status": true,
    "cryptoPrice": {
        "eth": 122661,
        "btc": 2244990,
        "conversionRate": 0.07102895781272968
    }
}

response-error-sample:
{
    "status": false,
    "message": "Quote currency is required and should be from:  btc, eth, ltc, bnb, sol "
}


postman collection:

you can import postman collection from this link -
https://w...content-available-to-author-only...n.com/collections/e7bf2aecd78134e41336



```
