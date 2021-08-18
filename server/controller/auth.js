const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('../models/User');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done)=>{
    done(null, user.id);
});

passport.deserializeUser((id, done)=>{
    User.findById(id, (err, user)=>{
        done(err, user)
    })
});

passport.use( new LocalStrategy({ usernameField: "email" }, (email, password, done)=>{

    User.findOne({email: email}).then((user)=>{
        if(!user){
            const newUser = new User({email,password});
            bcrypt.genSalt(7, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash)=>{
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save().then((user)=>{
                        return done(null, user);
                    })
                    .catch(err=>{
                        return done(null, false, {message: `Error - ${err}`})
                    })
                })
            })
        }
        else {
            bcrypt.compare(password, user.password, (err, isValid)=>{
                if(err) throw err;

                if(isValid){
                    return done(null, user);
                }
                else{
                    return done(null, false, {message: `Input correct password`})
                }
            })
        }
    }).catch(err => {
        return done(null, false, {message: err})
    })
}))
const logout = (req, res) => {
    req.logout();
    res.redirect('/');
}
module.exports = logout;

module.exports = passport;