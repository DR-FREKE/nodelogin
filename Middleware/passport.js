// //require the model
var User = require("../Model/User.js");
var LocalStrategy = require("passport-local").Strategy;

//passport.js will serve as our middleware for authentication
module.exports = (passport, mongoose) => {
  /** from the model required,
   * call the mUser function and pass mongoose gotten from the app.js
   * add the object to the database
   *  */
  var mUser = User.mUser(mongoose);
  // used to serialize the user for the session
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function (id, done) {
    mUser.findById(id, function (err, user) {
      done(err, user);
    });
  });
  passport.use(
    "signup-local",
    new LocalStrategy(
      {
        usernameField: "email", //replace default username to email
        passwordField: "password",
        passReqToCallback: true, //allows us pass back entire request to callback
      },
      (req, email, password, done) => {
        process.nextTick(() => {
          mUser.findOne({ "local.email": email }, (err, user) => {
            if (err) {
              return done(err);
            }

            if (user) {
              //flash a message
              return done(null, false);
            } else {
              //if no user create a user
              var newUser = new mUser();
              newUser.local.email = email;
              newUser.local.password = password;

              newUser.save((err) => {
                if (err) {
                  throw err;
                }
                return done(null, newUser);
              });
            }
          });
        });
      }
    )
  );
};
