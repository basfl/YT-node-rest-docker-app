const express = require('express');
const fs = require("fs");
const bodyParser = require('body-parser');
const morgan = require("morgan");
const path = require("path");
const session = require('express-session')
const mongoose = require('mongoose');
require("dotenv/config");
const myRoutes = require('./routes/myRoutes');
const myRegisterRoutes = require('./routes/register');
const myMiddleware = require("./middleware/myMiddleware");
const app = express();

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3600000, secure: false, httpOnly: true }
  })
  );
  app.use(myMiddleware);
const accessLogStream = fs.WriteStream(path.join(__dirname, "log", "access.log"), { flags: "a" });
//app.use(morgan('combined', { stream: accessLogStream }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(myRoutes);
app.use(myRegisterRoutes);

const option = {
    useUnifiedTopology: true,
    useNewUrlParser: true
}
mongoose.connect(process.env.MONGODB_CONNECTION, option).then(result => {

    app.listen(process.env.PORT || 3000, () => {
        console.log("server started on ... ");
    });

}).catch(err => {
    console.log("error", err);
})



