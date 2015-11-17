﻿var HomeApp = angular.module('HomeApp', [])

HomeApp.controller('HomeController', function ($scope) {

    $scope.message = "Welcome to the iMentor AngularJS home page!";

});

HomeApp.controller('HomeController', function ($scope, HomeService) {
 
    getUser();
    function getUser() {
        HomeService.getUser()
            .success(function (userEmail) {
                $scope.userEmail = userEmail;
                console.log($scope.userEmail);
            })
            .error(function (error) {
                $scope.status = 'Unable to load user data: ' + error.message;
                console.log($scope.status);
            });
    }
});
 
HomeApp.factory('HomeService', ['$http', function ($http) {
 
    var HomeService = {};
    HomeService.getUser = function () {
        return $http.get('/Home/GetUser');
    };
    return HomeService;
 
}]);