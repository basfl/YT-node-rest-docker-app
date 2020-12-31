require("dotenv/config");
const jwt=require("jsonwebtoken");
exports.loginUser = (req, res, next) => {
    if (req.body.user === process.env.USER && req.body.pass === process.env.PASS) {
        const token=jwt.sign({user:req.body.user},process.env.SECRET);
        console.log(token);
        res.header('auth-token',token).send("Success");
      // res.header('auth-token',token).send("****",token);
     
    } else {
        res.status(404).send("WRONG Credential");
    }
}