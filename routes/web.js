const express = require("express");
const router = express.Router();
const apiAuthRoute = require("./apiAuthRoute");
const ViewRoutes = require("./viewRoutes");
const productRoute = require("./productRoute");
const apiProduct = require("./apiProduct");
const userRoute = require("./userRoute");
const adminView = require("./adminView");
const adminAPI = require("./adminAPI");
let initRouters = (app) => {
  app.use("/", router);
  app.use(ViewRoutes, productRoute);
  app.use("/admin", adminView);
  app.use("/api/v1", apiAuthRoute, apiProduct, userRoute, adminAPI);
};
module.exports = initRouters;
