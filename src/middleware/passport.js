// var User        = require('../models/user');
var User2 = require('../models/user2');
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt  = require('passport-jwt').ExtractJwt;
var config      = require('../config/config');
 
var opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: global.gConfig.jwtSecret
}
 
module.exports = new JwtStrategy(opts, function (jwt_payload, done) {
    //mongo version
    // User.findById(jwt_payload.id, function (err, user) {
    //     if (err) {
    //         return done(err, false);
    //     }
    //     if (user) {
    //         return done(null, user);
    //     } else {
    //         return done(null, false);
    //     }
    // });
    //mysql version
    User2.findOne({
        where:{
            id:jwt_payload.id
        }
    }).then(user => {
        if (user){
            return done(null, user);
        }
    }).catch(err => {
        return done(err, false);
    });
});