const configApp = require("../config/configApp");
const db = require("../models/index");
const Home = async (req, res, next) => {
  return res.redirect("/product");
};
const Cart = async (req, res, next) => {
  return res.render("../views/cart/index.ejs", {
    layout: "../views/index.ejs"
  });
}
const Profile = async (req, res, next) => {
  return res.render("../views/auth/profile.ejs", {
    layout: "../views/index.ejs"
  });
}
const News = async (req, res, next) => {
  return res.render("../views/guest/news.ejs", {
    layout: "../views/index.ejs"
  });
}
const Recruit = async (req, res, next) => {
  return res.render("../views/guest/recruit.ejs", {
    layout: "../views/index.ejs"
  });
}
const About = async (req, res, next) => {
  return res.render("../views/guest/about.ejs", {
    layout: "../views/index.ejs"
  });
}
const Contact = async (req, res, next) => {
  return res.render("../views/guest/contact.ejs", {
    layout: "../views/index.ejs"
  });
}
module.exports = {
  Home,
  Cart,
  Profile,
  News,
  Recruit,
  About,
  Contact
};
