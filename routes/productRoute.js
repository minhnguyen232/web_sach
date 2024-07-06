const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");


router.get("/product", ProductController.index);
router.get("/product/detail/:id", ProductController.detail);
router.get("/product/create", ProductController.create);
module.exports = router;
