'use strict';

(function () {
    var injections = [
        '$scope',
        'MainService'
    ];

    function MainController($scope, MainService) {

        $scope.typesOption = [];

        $scope.addTypeOption = function() {
          $scope.typesOption.push($scope.typeOption);
        };


    }

    MainController.$inject = injections;

    angular.module('main')
        .controller('MainCtrl', MainController);
})();