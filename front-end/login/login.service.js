'use strict';

(function () {
    var injections = [
        '$http'
    ];

    function LoginService($http) {

        this.login = function (email, password) {
            return $http.post('/login/', {email: email, password: password}).then(function (response) {
                return response.data
            }, function (error) {

            })
        };
        
    }
    
    LoginService.$inject = injections;

    angular.module('login')
        .service('LoginService', LoginService);
})();

