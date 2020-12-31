const jwt = require("jsonwebtoken");
require("dotenv/config");


module.exports = (req, res, next) => {

    //////////////////////////////////////////////////////
    const token = req.header("auth-token");
    console.log("token is ", token);
    if (token) {
        // res.status(400).send("must have token");
        const verify = jwt.verify(token, process.env.SECRET);

        if (verify) {
            console.log("auth");
            req.auth = true;
        } else {
            req.auth = false;
        }
    }


    next();

}