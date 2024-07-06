const home = (req, res, next) => {
  res.render("index.ejs");
};
module.exports = {
  home: home,
};
