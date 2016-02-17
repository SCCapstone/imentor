

var app = angular.module('app', [
    'ui.bootstrap',
    'ngRoute',
    'ui.calendar',
    'iMentor.directives'
])

app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider)
{
    $routeProvider
        .when('/', { templateUrl: 'home/home', controller: 'homeCtrl' })
        .when('/Login', { templateUrl: 'Account/login', controller: 'loginCtrl' })
        .when('/Manage', { templateUrl: 'home/manage', controller: 'manageCtrl' })
        .when('/Calendar', { templateUrl: 'home/calendar', controller: 'calendarCtrl' })
        .otherwise({ redirectTo: '/' });

    $locationProvider.html5Mode(false).hashPrefix('!');
}]);
