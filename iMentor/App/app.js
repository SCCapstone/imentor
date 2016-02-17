

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
        .when('/ManageUsers', { templateUrl: 'Manage/manageUsers', controller: 'manageUsersCtrl' })
        .when('/ManageListings', { templateUrl: 'Manage/manageListings', controller: 'manageListingsCtrl' })
        .when('/Calendar', { templateUrl: 'home/calendar', controller: 'calendarCtrl' })
        .otherwise({ redirectTo: '/' });

    $locationProvider.html5Mode(false).hashPrefix('!');
}]);

app.run(['$rootScope',
    function($rootScope) {
        $rootScope.currentListing = null;
    }
]);
