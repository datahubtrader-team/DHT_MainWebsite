var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var sendComms = require('../outboundAPIclient/apiclient');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.register = function(req, res) {

    // if(!req.body.name || !req.body.email || !req.body.password) {
    //   sendJSONresponse(res, 400, {
    //     "message": "All fields required"
    //   });
    //   return;
    // }

    var user = new User();

    user.name = req.body.name;
    user.email = req.body.email;

    console.log("This is a test " + req.body.name);

    console.log("This is a test " + req.body.password);

    user.setPassword(req.body.password);

    //TODO: Publish notifications on message bus to notify buyer and send them an email
    //Send email (and mobile number, where applicable) after registration
    //sendComms.sendCommunication(req.body.email, req.body.name);

    user.save(function(err) {
        var token;
        token = user.generateJwt();
        res.status(200);
        res.json({
            "token": token
        });

    });

};

module.exports.login = function(req, res) {

    // if(!req.body.email || !req.body.password) {
    //   sendJSONresponse(res, 400, {
    //     "message": "All fields required"
    //   });
    //   return;
    // }
    console.log("Login " + req.body.password);
    passport.authenticate('local', function(err, user, info) {
        var token;

        // If Passport throws/catches an error
        if (err) {
            res.status(404).json(err);
            return;
        }

        // If a user is found
        if (user) {
            token = user.generateJwt();
            res.status(200);
            res.json({
                "token": token
            });
        } else {
            // If user is not found
            res.status(401).json(info);
        }
    })(req, res);

};