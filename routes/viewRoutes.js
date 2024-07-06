const express = require("express");
const router = express.Router();
const HomeController = require("../controllers/HomeController");
const AuthController = require("../controllers/AuthController");
const auth = require("../middlewares/auth.middlewares");
const PassPortController = require("../controllers/PassPortController");

router.get("/", HomeController.Home);
router.get("/login", AuthController.Login);
router.get("/logout", AuthController.Logout);
router.get("/cart", HomeController.Cart);
router.get("/profile", HomeController.Profile);
router.get("/news", HomeController.News);
router.get("/recruit", HomeController.Recruit);
router.get("/about", HomeController.About);
router.get("/contact", HomeController.Contact);
module.exports = router;
