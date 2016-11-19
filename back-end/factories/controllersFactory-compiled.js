'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _user = require('../controllers/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var controllersFactory = function () {
    function controllersFactory() {
        _classCallCheck(this, controllersFactory);

        this.register('user', _user2.default.constructor);
    }

    _createClass(controllersFactory, [{
        key: 'register',
        value: function register(name, constructor) {
            if (name instanceof Function) {
                constructor = name;
                name = null;
            }

            if (!(constructor instanceof Function)) {
                // throw {
                //     name: 'Error',
                //     message: 'PetConstructor is not function'
                // }
            }

            this[name || constructor.name] = constructor;
        }
    }, {
        key: 'create',
        value: function create(name, object) {
            var constructor = this[name];
            if (!(constructor instanceof Function)) {
                throw {
                    name: 'Error',
                    message: 'constructor "' + petName + '" undefined'
                };
            }
            return new constructor(object);
        }
    }]);

    return controllersFactory;
}();

//
// PetFactory.register = function(name, PetConstructor) {
//     if (name instanceof Function) {
//         PetConstructor = name;
//         name = null;
//     }
//
//     if (!(PetConstructor instanceof Function)) {
//         throw {
//             name: 'Error',
//             message: 'PetConstructor is not function'
//         }
//     }
//     this[name || PetConstructor.name] = PetConstructor;
// };
//
// PetFactory.create = function(petName) {
//     var PetConstructor = this[petName];
//     if (!(PetConstructor instanceof Function)) {
//         throw {
//             name: 'Error',
//             message: 'constructor "' + petName + '" undefined'
//         }
//     }
//     return new PetConstructor();
// };

//# sourceMappingURL=controllersFactory-compiled.js.map