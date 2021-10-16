const express = require('express');
const mongoose = require('mongoose');
const passport = require("passport");
const findOrCreate = require("mongoose-findorcreate");
const bodyParser = require('body-parser');
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

const userSchema = new mongoose.Schema({
    username: {type: String, require: true, lowercase: true},
    email: {type: String, require: true, lowercase: true, index: {unique: true}},
    isAdmin: {type: Boolean, default: false},
    orderId: {type: Array, require: false},
    hash: {type: String, require: true},
    salt: {type: String, require: true},
    dateCreate: {type: Date, default: new Date().getTime(), require: true},
  });


userSchema.plugin(findOrCreate);
// taking off the warnings
mongoose.set('useFindAndModify', false);
mongoose.set("useCreateIndex", true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);

const User = new mongoose.model("User", userSchema);


passport.use(new GoogleStrategy({
    clientID: '337624496879-ucdmgd6jmp1j07gba4q2vog74hmf0ts4.apps.googleusercontent.com',
    clientSecret: 'dYJDofNuW56nGdli7oAdPPoR',
    callbackURL: "https://lisboa-store.herokuapp.com/users/auth/google/appstore",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  (accessToken, refreshToken, profile, cb) => {
    User.findOrCreate({ googleId: profile.id }, (err, user) => {

        return cb(err, user);
    });
  }
));

// passport.use(new FacebookStrategy({
//     clientID: process.env.FACEBOOK_APP_ID,
//     clientSecret: process.env.FACEBOOK_APP_SECRET,
//     callbackURL: "http://localhost:3000/auth/facebook/appstore",
//     enableProof: true
//   },
//   function(accessToken, refreshToken, profile, done) {
//     User.findOrCreate({facebookId: profile.id}, function(err, user) {
//       if (err) { return done(err); }
//       else {done(null, profile);}
//     });
//   }
// ));

module.exports = User;