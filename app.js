const express = require("express");
var app = express();
var port = process.env.PORT || 3000;
var mongoose = require("mongoose");
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var passport = require("passport");
const flash = require("connect-flash");
var routes = require("./routes/route.js");
const authRoute = require("./routes/Oauth-route.js");
var database = require("./config/database.js");

mongoose
  .connect(database.url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log("oops!!! database cannot connect at this moment");
  });
var middleware = require("./Middleware/passport.js");
middleware(passport, mongoose);

app.set("view engine", "ejs");

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/Assets", express.static("Assets"));
app.use("/auth", authRoute);

//needed for passport
app.use(
  session({ secret: "solagbaby96", resave: true, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

routes.mRoute(app, passport);

app.listen(port, function () {
  console.log(`app is listening at port ${port}`);
});
