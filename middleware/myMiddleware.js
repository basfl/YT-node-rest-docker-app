const { request } = require("express");

require("dotenv/config");
module.exports = ("/posts", (req, res, next) => {
    // console.log("env",process.env.STRIPE_KEY);
    // console.log("I am inside my middleware");
    req.session.isAuth = true
    next();
})