// local authentication

var LocalStrategy = require('passport-local').Strategy;


// ---------------- Facebook authentication -------------------//
var FacebookStrategy = require('passport-facebook').Strategy; 

// function facebook() {
//   var FacebookStrategy = require('passport-facebook').Strategy;
//   var keys = require("../faceKeys.js");
//   var face = new FacebookStrategy(keys);
// };

var FACEBOOK_APP_ID = "<Insert Your Key Here>"
var FACEBOOK_APP_SECRET = "<Insert Your Secret Key Here>";
// // ---------------- / Facebook authentication / -------------------//


// // --------------- Twitter authentication ----------------------//
var TwitterStrategy = require('passport-twitter').Strategy;
// function twitter() {
//   var TwitterStrategy = require('passport-twitter').Strategy;
//   var keys2 = require("../twitKeys.js");
//   var twit = new TwitterStrategy(keys2);
// };
var TWITTER_CONSUMER_KEY = "<Insert Your Key Here>";
var TWITTER_CONSUMER_SECRET = "<Insert Your Secret Key Here>";
// // --------------- / Twitter authentication / ----------------------//


// // ----------------- Google authentication -----------------------//
var GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;
// function google() {
//     var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
//     var keys3 = require("../gooKeys.js");
//     var goog = new GoogleStretegy(keys3);
// };

var GOOGLE_CONSUMER_KEY = "<Insert Your Key Here>";
var GOOGLE_CONSUMER_SECRET = "<Insert Your Secret Key Here>";

//------------------ / Google authentication / -----------------------//


var User = require('../models/user');

module.exports = function(passport) {

    // Maintaining persistent login sessions
    // serialized  authenticated user to the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // deserialized when subsequent requests are made
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    passport.use('login', new LocalStrategy({
        usernameField : 'email',
        passReqToCallback : true 
    },
    
    function(req, email, password, done) {
       process.nextTick(function() {
            User.findOne({ 'user.email' :  email }, function(err, user) {
                if (err){ return done(err);}
                if (!user)
                    return done(null, false, req.flash('error', 'User does not exist.'));

                if (!user.verifyPassword(password))
                    return done(null, false, req.flash('error', 'Enter correct password'));
               else
                    return done(null, user);
            });
        });

    }
    ));

    passport.use('signup', new LocalStrategy({
        usernameField : 'email',
        passReqToCallback : true 
    },
    
    function(req, email, password, done) {

        process.nextTick(function() {
       
            if (!req.user) {
                User.findOne({ 'user.email' :  email }, function(err, user) {
            	    if (err){ return done(err);}
                    if (user) {
                        return done(null, false, req.flash('signuperror', 'User already exists'));
                    } else {
                        var newUser = new User();
			            newUser.user.firstName = req.body.firstName;
                        newUser.user.lastName = req.body.lastName;
                        newUser.user.familyName = req.body.familyName;
                        newUser.user.email = req.body.email;
                        newUser.user.phone = req.body.phone;
                        newUser.user.password = newUser.generateHash(password);
			            // newUser.user.name	= ''
			            // newUser.user.address	= ''
                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    };

                });
            } else {
                var user = req.user;
		        user.user.firstName = req.body.firstName;
                user.user.email = email;
                user.user.password = user.generateHash(password);
			    // user.user.name	= ''
			    // user.user.address	= ''

                user.save(function(err) {
                    if (err){
                        throw err;
                    
                	} else {
    					var user = req.user;
    					user.user.firstName = req.body.firstName;
    					user.user.email = email;
    					user.user.password = user.generateHash(password);
    					// user.user.name	= ''
    					// user.user.address	= ''

                    	user.save(function(err) {
                        if (err)
                            throw err;
                            return done(null, user);
                        });
                    };
                
            });
        };
    });
    }    
    ));    


// Use the FacebookStrategy within Passport.
// Strategies in Passport require a `verify` function, which accept
// credentials (in this case, an accessToken, refreshToken, and Facebook
// profile), and invoke a callback with a user object.
	passport.use(new FacebookStrategy({
            // var keys = require("../faceKeys.js");
    		clientID: FACEBOOK_APP_ID,
    		clientSecret: FACEBOOK_APP_SECRET,
    		callbackURL: "http://localhost:8080/auth/facebook/callback"
  		},
  		function(req, accessToken, refreshToken, profile, done) {
    		// asynchronous verification, for effect...

			process.nextTick(function () {
        		if (!req.user) {
				    User.findOne({ 'user.email' :  profile.emails[0].value }, 
                        function(err, user) {
                	        if (err){ return done(err);}
                        		if (user) {
                            	   return done(null, user);
                        		} else {
                            		var newUser = new User();
        						    newUser.user.firstName = profile.displayName;
                            		newUser.user.email = profile.emails[0].value;
        						    newUser.user.name = ''
        						    newUser.user.address = ''

                            		newUser.save(function(err) {
                                		if (err)
                                    	throw err;
                                		return done(null, newUser);
                            		});
                        		}

                    	   });
                        } else {
        				   var user = req.user;
        				   user.user.firstName = profile.displayName;
                    	   user.user.email    = profile.emails[0].value;
        				   user.user.name	= ''
        				   user.user.address	= ''

                    	   user.save(function(err) {
                            if (err)
                            throw err;
                        	return done(null, user);
                    		});
        		}
			});
  		}
	));

// Use the TwitterStrategy within Passport.
// Strategies in passport require a `verify` function, which accept
// credentials (in this case, a token, tokenSecret, and Twitter profile), and
// invoke a callback with a user object.
	passport.use(new TwitterStrategy({
		consumerKey: TWITTER_CONSUMER_KEY,
		consumerSecret: TWITTER_CONSUMER_SECRET,
		callbackURL: "http://192.168.1.101:8080/auth/twitter/callback"
  	},
  	function(req,token, tokenSecret, profile, done) {
    // asynchronous verification, for effect...
		process.nextTick(function () {
      
     		if (!req.user) {
 				User.findOne({ 'user.username' :  profile.displayName }, function(err, user) {
    				if (err){ return done(err);}
    				if (user) {
        				return done(null, user);
    				} else {
                        var newUser = new User();
						newUser.user.firstName = profile.displayName;
					    newUser.user.name = ''
					    newUser.user.address = ''

        				newUser.save(function(err) {
            					if (err)
                					throw err;
            				return done(null, newUser);
        				});
                    }

                });
                } else {
					var user = req.user;
					user.user.firstName = profile.displayName;
					user.user.name= ''
					user.user.address = ''

        			user.save(function(err) {
            				if (err)
                				throw err;
            			return done(null, user);
        			});
            	}
    	});
  	}
    ));

// Use the GoogleStrategy within Passport.
// Strategies in Passport require a `verify` function, which accept
// credentials (in this case, an accessToken, refreshToken, and Google
// profile), and invoke a callback with a user object.
	passport.use(new GoogleStrategy({
		clientID: GOOGLE_CONSUMER_KEY,
		clientSecret: GOOGLE_CONSUMER_SECRET,
		callbackURL: "http://localhost:8080/auth/google/callback"
	},
	function(req, accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
		process.nextTick(function () {

				if (!req.user) {
				User.findOne({ 'user.email' :  profile.emails[0].value }, function(err, user) {
    				if (err){ return done(err);}
    				if (user) {
        			return done(null, user);
    				} else {
        				var newUser = new User();
				        newUser.user.firstName = profile.displayName;
				        newUser.user.email = profile.emails[0].value;
				        newUser.user.name = ''
				        newUser.user.address = ''

        				newUser.save(function(err) {
            				if (err)
                			throw err;
            				return done(null, newUser);
        				});
    				}

				});
         		} else {
                    var user = req.user;
                    user.user.firstName = profile.displayName;
                    user.user.email = profile.emails[0].value;
		            user.save(function(err) {
    					if (err)
        					throw err;
    					return done(null, user);
			        });
		        }
		});

    }
 
    ));

};

