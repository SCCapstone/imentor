'use strict';

var app = angular.module('app', [
    'ngRoute',
    'ngAnimate',
    'ui.bootstrap'
])

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider)
{
    $routeProvider
        .when('/', { templateUrl: 'home/home', controller: 'homeCtrl' })
        .when('/Login', { templateUrl: 'login/', controller: 'loginCtrl' })
        .when('/Listings', { templateUrl: 'home/listings', controller: 'listingsCtrl' })
        .otherwise({ redirectTo: '/' });

    $locationProvider.html5Mode(false).hashPrefix('!');
}]);

//app.run([
//    '$rootScope', '$log', '$location',
//        function ($rootScope, $log, $location) {
            

//            // Route change
//            $rootScope.$on('$locationChangeStart', function (event, newUrl, oldUrl) {
//                var locationPath = $location.path();

//                $location.path('/');

//                // Set the selected nav based on the url
//                $rootScope.selectedNav = getSelectedNav(locationPath);
//            });
//        }
//]);


function getSelectedNav(url) {
    return '/';
}