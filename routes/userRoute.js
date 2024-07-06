const express = require("express");
const OrderController = require("../controllers/OrderController");
const { isAuth } = require("../middlewares/auth.middlewares");
const router = express.Router();

router.get("/order", isAuth, OrderController.data);
router.post("/order/create", isAuth, OrderController.create);

// router.get("/home", auth.isAuth, UserController.home);
module.exports = router;
