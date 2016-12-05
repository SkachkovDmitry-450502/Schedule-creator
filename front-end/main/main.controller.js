'use strict';

(function () {
    var injections = [
        '$scope',
        '$sce',
        'MainService'

    ];

    function MainController($scope, $sce, MainService) {

        $scope.isCollapsedChooseSchedule = false;
        $scope.isCollapsedAddObject = false;
        $scope.isCollapsedAddParameter = false;
        $scope.isCollapsedParameters = false;
        $scope.isCollapsedSchedule = false;
        $scope.isCollapsedObjects = false;

        $scope.schedules = [];
        $scope.scheduleName = '';
        $scope.allObjects = [];
        $scope.object = {};
        $scope.parameters = [];
        $scope.object.properties = [];
        $scope.days = [];

        MainService.getNamesInformation().then(function (data) {
            $scope.schedules = data;
            $scope.schedules.push({name: 'Add schedule'});
            if ($scope.schedules.length) {
                $scope.selectScheduleName = $scope.schedules[0].name;
                MainService.getScheduleInformation($scope.selectScheduleName).then(function (data) {
                    $scope.scheduleName = data.name;
                    $scope.days = data.days;
                    $scope.parameters = data.parameters;
                    $scope.allObjects = data.objects;


                })
            } else {
                $scope.selectScheduleName = 'Add schedule';
            }
        });

        $scope.schedules.push({name: 'Add schedule'});


        $scope.openSchedule = function (name) {
            $scope.selectScheduleName = name.name.name;
            if ($scope.selectScheduleName !== 'Add schedule') {
                MainService.getScheduleInformation($scope.selectScheduleName).then(function (data) {
                    $scope.scheduleName = data.name;
                    $scope.days = data.days;
                    $scope.parameters = data.parameters;
                    $scope.allObjects = data.objects;
                })
            }
        };

        $scope.addSchedule = function (name) {
            MainService.addSchedule(name).then(function (data) {
                $scope.schedules.push({name: name});
                $scope.openSchedule(name);
            });
        };

        $scope.backChooseSchedule = function () {
            $scope.selectScheduleName = $scope.scheduleName;
        };

        $scope.addParameter = function () {
            MainService.addParameter($scope.parameter.name, $scope.scheduleName).then(function (data) {
                $scope.parameters.push($scope.parameter);
                delete $scope.parameter;
            });
        };

        $scope.addParameters = function () {
            $scope.object.properties.push({});
        };

        $scope.addObject = function () {
            MainService.addObject($scope.object, $scope.scheduleName).then(function (data) {
                $scope.allObjects.push($scope.object);
                $scope.object = {};
                $scope.object.properties = [];
            });
        };

        $scope.deleteObjectProperty = function (index) {
            $scope.object.properties.splice(index, 1);
        };

        $scope.deleteParameter = function (index) {
            MainService.deleteParameter($scope.parameters[index].name, $scope.scheduleName).then(function (data) {
                $scope.parameters.splice(index, 1);
            });
        };

        $scope.addDay = function (duration) {
            MainService.addDay($scope.days.length + 1, duration, $scope.scheduleName).then(function (data) {
                $scope.days.push({'duration': duration});
            });
        };

        $scope.deleteDay = function (index) {
            MainService.deleteDay(index + 1, $scope.scheduleName).then(function (data) {
                $scope.days.splice(index, 1);
            });
        };

        $scope.popover = {
            templateUrl: 'popoverTemplate.html'
        };

        $scope.renameParameterPopover = $sce.trustAsHtml('<input class="option-input" type="text" ng-model="popover">');

        $scope.renameParameter = function (newParameterName, index) {
            MainService.renameParameter($scope.parameters[index].name, newParameterName, $scope.scheduleName).then(function (data) {
               $scope.parameters[index].name = newParameterName;
                MainService.getScheduleInformation($scope.scheduleName).then(function (data) {
                    $scope.days = data.days;
                    $scope.parameters = data.parameters;
                    $scope.allObjects = data.objects;
                })
            });
            $scope.parameters[index].popoverIsOpen = !$scope.parameters[index].popoverIsOpen;
        };

    }

    MainController.$inject = injections;

    angular.module('main')
        .controller('MainCtrl', MainController);
})
();