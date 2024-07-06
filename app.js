const express = require("express");
const bodyParser = require("body-parser");
const viewEngine = require("./config/viewEngine");
const configApp = require("./config/configApp");  
const initRouters = require("./routes/web");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const createError = require("http-errors");

require("dotenv").config();

const app = express();
const expiryDate = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hour
//config app

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.raw({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// 404

// app.use(function (req, res, next) {
//   next(createError(404));
// });

//use sessions for tracking logins
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true,
      httpOnly: true,
      expires: expiryDate,
    },
  })
);

viewEngine(app);
const config = configApp.config();

initRouters(app);

let app_url = config.app_url;

const PORT = config.port || 3000;

app.listen(PORT, () => {
  console.log("App run listening at: " + app_url + ":" + PORT);
});
