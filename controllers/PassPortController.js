const db = require("../models/index");
const Passport = require("../services/auth/PassportService");
const authMethods = require("../services/auth/auth.methods");
const login = async (req, res) => {
  const message = await Passport.loginPassPort(req.body);
  if (message.code === 200) {
    req.session.secret = message.accessToken;
  } else {
    // return res.redirect("/login");
    return res.json(message);
  }
  const user = message.user;
  if (user.status == 1) {
    return res.json({
      code: 403,
      message: 'Account banned'
    });
  }
  res.setHeader("x_authorization", message.accessToken);
  res.setHeader("secret", message.accessToken);
  res.cookie("authorization", message.accessToken);
  res.cookie("user", message.user);
  return res.json({
    code: 200,
    user: message.user,
    message: "Login successful"
  });
  // return res.redirect("/");
};
const create = async (req, res) => {
  let message = await Passport.createNewUser(req.body);
  return res.json(message);
};
const logout = async (req, res) => {
  res.clearCookie("authorization");
  res.clearCookie("user");
  // res.redirect("/login");
  return res.json({
    code: 200,
    message: "Logout successfully"
  });
};
const info = async (req, res, next) => {
  return res.json(req.user)
}
const changePass = async (req, res, next) => {
  const data = req.body;
  const user = req.user;
  const { oldPass, password } = data;
  const checkOldPassword = await Passport.CheckPassword(oldPass, user.id);
  const hasNewPassword = await Passport.HashUserPassword(password);
  if (!checkOldPassword) {
    return res.json({
      code: 402,
      message: "Old password is incorrect"
    })
  } else {
    db.User.update({ password: hasNewPassword }, {
      where: { id: user.id },
    })
      .then(([rowsUpdated]) => {
        if (rowsUpdated >= 1) {
          return res.json({
            code: 200,
            message: "Update success"
          })
        } else {
          return res.json({
            code: 503,
            message: "Update error"
          })
        }
      })
      .catch((error) => {
        return res.json({
          code: 503,
          message: "Update error"
        })
      });
  }


}
module.exports = {
  login,
  create,
  info,
  logout,
  changePass,
};
