'use strict';

(function () {
    var injections = [
        '$http',
        '$q'
    ];

    function MainService($http, $q) {

        var email = localStorage.getItem('email');

        this.getNamesInformation = function () {
            var body = {
                info: {
                    email: email
                },
                type: 'names'
            };
            return $http.post('/main/information', body).then(function (response) {
                return response.data;
            }, function (error) {
                return $q.reject;
            })
        };

        this.getScheduleInformation = function (name) {
            var body = {
                info: {
                    email: email,
                    name: name
                },
                type: 'schedule'
            };
            return $http.post('/main/information', body).then(function (response) {
                return response.data;
            }, function (error) {
                return $q.reject;
            })
        };

        this.addParameter = function (parameter, scheduleName) {
            var body = {
                info: {
                    email: email,
                    scheduleName: scheduleName,
                    name: parameter
                },
                type: 'parameter'
            };
            return $http.post('/main/save', body).then(function (response) {
                return response.data
            }, function (error) {
                return $q.reject();
            })
        };

        this.addObject = function (object, scheduleName) {
            var body = {
                info: {
                    email: email,
                    scheduleName: scheduleName,
                    name: object.name,
                    count: object.count,
                    duration: object.duration,
                    properties: object.properties
                },
                type: 'object'
            };
            return $http.post('/main/save', body).then(function (response) {
                return response.data
            }, function (error) {
                return $q.reject();
            })
        };

        this.renameParameter = function (oldName, newName, scheduleName) {
            var body = {
                info: {
                    email: email,
                    scheduleName: scheduleName,
                    name: oldName
                },
                newInfo: {
                    name: newName
                },
                type: 'parameter'
            };
            return $http.post('/main/update', body).then(function (responce) {
                return responce.data;
            }, function (error) {
                return $q.reject();
            })
        };

        this.deleteParameter = function (nameParameter, scheduleName) {
            var body = {
                info: {
                    email: email,
                    scheduleName: scheduleName,
                    name: nameParameter
                },
                type: 'parameter'
            };
            return $http.post('/main/delete', body).then(function (response) {
                return response.data
            }, function (error) {
                return $q.reject();
            })
        };

        this.addSchedule = function (name) {
            var body = {
                info: {
                    email: email,
                    name: name
                },
                type: 'schedule'
            };
            return $http.post('/main/save', body).then(function (response) {
                return response.data
            }, function (error) {
                return $q.reject();
            })
        };

        this.addDay = function (numberDay, duration, scheduleName) {
            var body = {
                info: {
                    email: email,
                    scheduleName: scheduleName,
                    name: 'Day ' + numberDay,
                    duration: duration
                },
                type: 'day'
            };
            console.log(body);
            return $http.post('/main/save', body).then(function (response) {
                return response.data
            }, function (error) {
                return $q.reject();
            })
        };

        this.deleteDay = function (numberDay, scheduleName) {
            var body = {
                info: {
                    email: email,
                    scheduleName: scheduleName,
                    name: 'Day' + numberDay
                },
                type: 'day'
            };
            return $http.post('/main/delete', body).then(function (response) {
                return response.data
            }, function (error) {
                return $q.reject();
            })
        };

    }

    MainService.$inject = injections;

    angular.module('main')
        .service('MainService', MainService);
})();