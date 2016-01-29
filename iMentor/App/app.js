'use strict';

var app = angular.module('app', [
    'ngRoute',
    'ngAnimate',
    'ngMaterial',
    'ngMessages',
    'ui.bootstrap'
])

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider)
{
    $routeProvider
        .when('/', { templateUrl: 'home/home', controller: 'homeCtrl' })
        .when('/Login', { templateUrl: 'account/login', controller: 'loginCtrl' })
        .when('/Listings', { templateUrl: 'listing/index', controller: 'listingsCtrl' })
        .otherwise({ redirectTo: '/' });

    $locationProvider.html5Mode(false).hashPrefix('!');
}]);


function getSelectedNav(url) {
    return '/';
}