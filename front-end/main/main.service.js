'use strict';

(function () {
    var injections = [
        '$http'
    ];

    function MainService($http) {

        
    }

    MainService.$inject = injections;

    angular.module('main')
        .service('MainService', MainService);
})();