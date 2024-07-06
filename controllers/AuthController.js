const Login = (req, res, next) => {
  const token = req.cookies.authorization;
  if (!token) {
    res.render("../views/auth/login", { title: "Login", message: " " });
  } else {
    return res.redirect("/");
  }
};
const Logout = (req, res, next) => {
  return res.redirect("/api/v1/logout");
};
module.exports = {
  Login: Login,
  Logout: Logout,
};
