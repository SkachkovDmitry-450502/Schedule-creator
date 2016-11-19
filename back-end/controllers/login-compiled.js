'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var mysql = require('mysql');
var async = require('async');
var userDB = require('../db/userDB');
var controller = require('./controller');

var Req = function Req(name) {
    _classCallCheck(this, Req);

    this.name = name;
};

exports.login = function (email, password, callback) {
    async.waterfall([function (callback) {
        controller.checkUserExist(email, callback);
    }, function (isExist, callback) {
        if (isExist) {
            checkPassword(email, password, callback);
        } else {
            callback(null, false);
        }
    }], callback);
};

function checkPassword(email, password, callback) {
    async.waterfall([function (callback) {
        userDB.getUserByEmail(email, callback);
    }, function (user, callback) {
        callback(null, user['password'] == password);
    }], callback);
}

//# sourceMappingURL=login-compiled.js.map