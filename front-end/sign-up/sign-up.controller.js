'use strict';

(function () {
    var injections = [
        '$scope',
        'SignUpService'
    ];

    function SignUpController($scope, SignUpService) {

        $scope.user = {};

        $scope.signUp = function () {
            if($scope.user.password !== $scope.user.passwordControl) {
                $scope.errorPassword = true;
                $scope.errorEmail = false;
                return;
            }
            SignUpService.signUp($scope.user.email, $scope.user.password).then(function (response) {
                console.log('so good. you can visit our system');
                $scope.errorEmail = false;
                $scope.errorPassword = false;
                location.href='/login';
            }, function (error) {
                $scope.errorEmail = true;
                $scope.errorPassword = false;
                console.log('error');
            });
        };
    }

    SignUpController.$inject = injections;

    angular.module('sign-up')
        .controller('SignUpCtrl', SignUpController);
})();