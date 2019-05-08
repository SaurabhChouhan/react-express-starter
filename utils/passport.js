import passport from 'passport'
import User from '../models/userModel'
import config from '../config'

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    LocalStrategy = require('passport-local').Strategy;

    
  passport.use(new LocalStrategy(User.authenticate()))
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
  

passport.use(new JwtStrategy({
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.get('auth.passportSecret')

}, function(jwt_payload, done) {
    console.log("inside passport jwt with jwt_payload as ", jwt_payload)
    User.findOne({_id: jwt_payload.id}, function(err, user) {
        console.log("find ", err, user)
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));  
