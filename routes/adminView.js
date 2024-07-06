const express = require("express");
const AdminController = require("../controllers/AdminController");
const { admin } = require("../middlewares/adminAuth.middleware");
const router = express.Router();

router.get("/", admin, AdminController.index);
router.get("/auth", AdminController.Auth);
module.exports = router;
