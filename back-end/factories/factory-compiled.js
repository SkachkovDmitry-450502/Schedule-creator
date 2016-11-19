'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Obj.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Factory = function () {
    function Factory() {
        _classCallCheck(this, Factory);
    }

    _createClass(Factory, [{
        key: 'register',
        value: function register(name, constructor) {
            if (name instanceof Function) {
                constructor = name;
                name = null;
            }

            if (!(constructor instanceof Function)) {
                throw {
                    name: 'Error',
                    message: 'constructor is not function'
                };
            }

            this[name || constructor.name] = constructor;
        }
    }]);

    return Factory;
}();

//# sourceMappingURL=factory-compiled.js.map