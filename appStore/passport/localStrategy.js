const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user.model');

  const strategy = (passport) => {
    passport.use(new LocalStrategy(
      function(email, password, done) {
        User.findOne({ email: email }, function (err, user) {
          if (err) { return done(err); }
          if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
          }
          if (!user.validPassword(password)) {
            return done(null, false, { message: 'Incorrect password.' });
          }
          return done(null, user);
        });
      }
    ))
  };

module.exports = strategy;