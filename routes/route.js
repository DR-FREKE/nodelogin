//import controller files here
var cookSoup = require("../Controller/loginController");

module.exports.mRoute = (app, passport) => {
  app.get("/flash", function (req, res) {
    // Set a flash message by passing the key, followed by the value, to req.flash().
    req.flash("info", "Flash is back!");
    res.redirect("/");
  });

  app.get("/", function (req, res) {
    // Get an array of flash messages by passing the key to req.flash()
    res.render("index");
    // var todo = new cookSoup();
  });

  app.get("/login", (req, res) => {
    res.render("login", { message: "login" });
  });

  app.get("/register", (req, res) => {
    res.render("register", { message: req.flash("signup") });
  });

  app.post("/register", passport.authenticate("signup-local"), (req, res) => {
    res.json({ message: "good to go" });
  });
  // app.post("/register", function (req, res, next) {
  //   passport.authenticate("signup-local", function (err, user, info) {
  //     if (err) {
  //       return next(err);
  //     }
  //
  //     if (!user) {
  //       res.redirect("/");
  //     }
  //   });
  // });
};

// function isLoggedIn(req, res, next){
//     if(req.isAuthenticated()){
//         return next();
//     }else{
//         res.redirect('/login')
//     }
// }
