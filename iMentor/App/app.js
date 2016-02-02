'use strict';

var app = angular.module('app', [
    'ngRoute',
    'ngAnimate',
    'ngMaterial',
    'ngMessages',
    'ui.bootstrap',
    'iMentor.directives'
])

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider)
{
    $routeProvider
        .when('/', { templateUrl: 'home/home', controller: 'homeCtrl' })
        .when('/Login', { templateUrl: 'home/login', controller: 'loginCtrl' })
        .when('/Listings', { templateUrl: 'listings/index', controller: 'listingsCtrl' })
        .when('/Calendar', { templateUrl: 'home/calendar', controller: 'calendarCtrl' })
        .otherwise({ redirectTo: '/' });

    $locationProvider.html5Mode(false).hashPrefix('!');
}]);


function getSelectedNav(url) {
    return '/';
}