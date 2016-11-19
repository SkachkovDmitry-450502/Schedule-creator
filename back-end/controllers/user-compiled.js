'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var async = require('async');

var User = function () {
    function User(object) {
        _classCallCheck(this, User);

        this.email = object.email;
        this.password = object.password;
    }

    _createClass(User, [{
        key: 'login',
        value: function login() {
            async.waterfall([function (callback) {
                this._checkUserExist(this.email, callback);
            }, function (isExist, callback) {
                if (isExist) {
                    checkPassword(this.email, this.password, callback);
                } else {
                    callback(null, false);
                }
            }], callback);
        }
    }, {
        key: 'save',
        value: function save() {
            async.waterfall([function (callback) {
                this._checkUserExist(user['email'], callback);
            }, function (isExist, callback) {
                if (isExist) {
                    callback(null, false);
                } else {
                    user.insertUser(user, callback);
                }
            }], callback);
        }
    }, {
        key: '_checkUserExist',
        value: function _checkUserExist(email, callback) {
            async.waterfall([function (callback) {
                userDB.getUserByEmail(email, callback);
            }, function (user, callback) {
                if (user) {
                    callback(null, true);
                } else {
                    callback(null, false);
                }
            }], callback);
        }
    }, {
        key: '_checkPassword',
        value: function _checkPassword(email, password, callback) {
            async.waterfall([function (callback) {
                userDB.getUserByEmail(email, callback);
            }, function (user, callback) {
                callback(null, user['password'] == password);
            }], callback);
        }
    }]);

    return User;
}();

exports.default = User;

//# sourceMappingURL=user-compiled.js.map