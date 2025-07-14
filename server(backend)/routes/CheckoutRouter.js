const express = require("express");
const CheckoutController=require("../controller/CheckoutController")
const CheckoutRouter = express.Router();

CheckoutRouter.post("/check-out", CheckoutController.checkout);

module.exports=CheckoutRouter