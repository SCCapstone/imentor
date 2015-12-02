var ManageApp = angular.module('ManageApp', [])

ManageApp.controller('ManageController', function ($scope, ManageService) {
 
    $scope.message = "Change your account settings";


});
 
ManageApp.factory('ManageService', ['$http', function ($http) {
    var ManageService = {};

    

    return ManageService;
}]);