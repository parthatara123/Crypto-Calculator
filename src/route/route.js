const express = require("express");
const router = express.Router();
const CryptoController = require("../controller/cryptoController");

//test API
router.get("/test", function (req, res) {
  return res.send("Test API is working fine");
});

//API for crypto converter
router.get("/crypto-pair", CryptoController.cryptoCalculator);

//Exporting router
module.exports = router;
