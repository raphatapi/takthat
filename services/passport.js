const passport = require('passport')(passport);
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    User.findById(id)
    .then(user => {
        done(null, user);
    })
})

passport.use(new GoogleStrategy({
    clientID: "1068602310947-ro8qahfdaj8cau0v56tjj6kde5kljclr.apps.googleusercontent.com",
    clientSecret: "mVjRIAmzFZa4cPlIC-kL6RQh",
    callbackURL: '/auth/google/callback',
}, 
(accessToken, refreshToken, profile, done) => {
    User.findOne({googleId: profile.id})
    .then((existingUser) => {
        if (existingUser) {
            done(null, existingUser);
        } else {
            new User({googleId: profile.id}).save()
            .then(user => done(null, user));
        }
    })
    
    }
  )
);

