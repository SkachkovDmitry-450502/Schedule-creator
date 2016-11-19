'use strict';

var mysql = require('mysql');
var async = require('async');
var db = require('../db/db');
var user = require('../db/userDB');

// exports.checkUserExist = function (email, callback) {
//     async.waterfall([
//         function (callback) {
//             user.getUserByEmail(email, callback);
//         },
//         function (user, callback) {
//             if (user) {
//                 callback(null, true);
//             } else {
//                 callback(null, false);
//             }
//         }
//     ], callback);
// };

//# sourceMappingURL=controller-compiled.js.map