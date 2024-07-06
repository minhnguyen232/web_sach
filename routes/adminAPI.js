const express = require("express");
const AdminController = require("../controllers/AdminController");
const { admin } = require("../middlewares/adminAuth.middleware");
const router = express.Router();

router.get("/users", admin, AdminController.users);
router.get("/orders", admin, AdminController.orders);
router.post("/order/update/:id", admin, AdminController.updateOrder);
router.get("/product/delete/:id", admin, AdminController.deleteProduct);
router.post("/product/update/:id", admin, AdminController.updateProduct);
router.post("/product/add", admin, AdminController.addProduct)
router.post("/user/update/:id", admin, AdminController.updateUser);
router.get("/user/delete/:id", admin, AdminController.deleteUser);
module.exports = router;
