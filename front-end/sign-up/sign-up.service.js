'use strict';

(function () {
    var injections = [
        '$http'
    ];

    function SignUpService($http) {

        this.signUp = function (email, password) {
            return $http.post('/sign-up/', {email: email, password: password}).then(function (response) {
                var data = response.data;
                return data;
            });
        };

    }

    SignUpService.$inject = injections;

    angular.module('sign-up')
        .service('SignUpService', SignUpService);
})();