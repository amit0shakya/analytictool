// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;
var bcrypt   = require('bcrypt-nodejs');

// expose this function to our app using module.exports
module.exports = function(app,passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // load up the user model
    var User            = require('../app/models/user')(app);

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        new User({'id' : id}).fetch().then(function(user) {
            return done(null, user);
        }, function(error) {
            return done(error);
        });
    });
    
    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with username
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) { // callback with username and password from our form

        // find a user whose username is the same as the forms username
        // we are checking to see if the user trying to login already exists
        console.log(username);
        console.log(password);
        new User({ 'username' :  username }).fetch().then(function(user) {
            if(user === null) {
                 return done(11, false);
            } else {
                user = user.toJSON();
                if(!bcrypt.compareSync(password, user.password)) {
                   return done(12, false);
                } else {
                   return done(null, user);
                }
            }
        }).catch(function(e) {
            console.log(e);
               return done(13, false);
    });

    }));

};