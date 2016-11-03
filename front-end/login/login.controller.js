'use strict';

(function () {
    var injections = [
        '$scope',
        'LoginService'
    ];

    function LoginController($scope, LoginService) {

        $scope.user = {};

        $scope.login = function () {
            LoginService.login($scope.user.email, $scope.user.password).then(function (response) {
                $scope.error = false;
                location.href='/main';
                console.log('welcome :) ');
            }, function (error) {
                $scope.error = true;
                console.log('error');
            });
        };

        $scope.signUp = function () {
            console.log('hh');
            location.href='/sign-up';
        };

    }

    LoginController.$inject = injections;

    angular.module('login')
        .controller('LoginCtrl', LoginController);
})();