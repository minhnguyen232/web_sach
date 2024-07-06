const express = require("express");
const ProductController = require("../controllers/ProductController");
const { admin } = require("../middlewares/adminAuth.middleware");
const router = express.Router();

router.get("/product/detail/:id", ProductController.dataDetail);
router.get("/product", ProductController.data);

// router.get("/home", auth.isAuth, UserController.home);
module.exports = router;
