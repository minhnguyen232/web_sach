const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middlewares");
const PassportController = require("../controllers/PassPortController");
const AdminController = require("../controllers/AdminController");
const { admin } = require("../middlewares/adminAuth.middleware");

router.post("/login", PassportController.login);
router.get("/logout", PassportController.logout);
router.post("/create", PassportController.create);
router.get("/info", auth.isAuth, PassportController.info);
router.post("/changepass", auth.isAuth, PassportController.changePass);

// router.get("/home", auth.isAuth, UserController.home);
module.exports = router;
