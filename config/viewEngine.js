const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const configViewEngine = (app) => {
    app.use(express.static("./public"));
    app.use(expressLayouts);
    app.set('layout', './index');
    app.set("views", "./views");
    app.set("view engine", "ejs");
}

module.exports = configViewEngine;