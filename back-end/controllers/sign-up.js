var async = require('async');
var user = require('../db/userDB');
var controller = require('./controller');

exports.save = function (user, callback) {
    async.waterfall([
        function (callback) {
            controller.checkUserExist(user['email'], callback);
        },
        function (isExist, callback) {
            if(isExist){
                callback(null, false);
            } else {
                user.insertUser(user, callback)
            }
        }
    ], callback);
};
