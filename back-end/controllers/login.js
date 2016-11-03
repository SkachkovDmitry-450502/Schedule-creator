var mysql = require('mysql');
var async = require('async');
var userDB = require('../db/userDB');
var controller = require('./controller');

exports.login = function (email, password, callback) {
    async.waterfall([
        function (callback) {
            controller.checkUserExist(email, callback);
        },
        function (isExist, callback) {
            if (isExist) {
                checkPassword(email, password, callback);
            } else {
                callback(null, false);
            }
        }
    ], callback);
};

function checkPassword(email, password, callback) {
    async.waterfall([
        function (callback) {
            userDB.getUserByEmail(email, callback);
        },
        function (user, callback) {
            callback(null, user['password'] == password);
        }
    ], callback);
}