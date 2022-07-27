const express = require("express");
const router = express.Router();
const productCtrl = require("../controllers/product.controller")
router.get("/:id", productCtrl.getProduct);
router.get("/:id", productCtrl.getProductById);
module.exports = router;
