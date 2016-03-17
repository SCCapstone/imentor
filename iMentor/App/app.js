

var app = angular.module('app', [
    'ngAnimate',
    'ngRoute',
    'ngTouch',
    'ngMaterial',
    'ngMessages',
    'mgcrea.ngStrap.timepicker',
    'ui.grid',
    'xeditable',
    'ui.bootstrap',
    'ui.calendar',
    'iMentor.directives'
])

app.config(['$routeProvider', '$locationProvider', '$httpProvider', '$mdIconProvider',
    function ($routeProvider, $locationProvider, $httpProvider, $mdIconProvider)
    {
        $routeProvider
            .when('/', { templateUrl: 'home/home', controller: 'homeCtrl' })
            .when('/Login', { templateUrl: 'Account/login', controller: 'loginCtrl' })
            .when('/Calendar', { templateUrl: 'home/calendar', controller: 'calendarCtrl' })
            .when('/ManageUsers', { templateUrl: 'Manage/manageUsers', controller: 'manageUsersCtrl' })
            .when('/ManageListings', { templateUrl: 'Manage/manageListings', controller: 'manageListingsCtrl' })
        
            .when('/EditListing/:listingId', { templateUrl: 'Manage/editListing', controller: 'editListingCtrl' })
            .when('/EditUser/:userId', { templateUrl: 'Manage/editUser', controller: 'editUserCtrl' })

            .otherwise({ redirectTo: '/' });

        $locationProvider.html5Mode(false).hashPrefix('!');

        // Globally turn off caching of all data calls
        // Initialize headers
        $httpProvider.defaults.headers.get = $httpProvider.defaults.headers.get || {};

        // Set no cache items
        $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Tue, 01 Jan 1980 1:00:00 GMT';
        $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
        $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';

        $mdIconProvider.iconSet("avatar", 'Img/icons/avatar-icons.svg', 128);
    }
]);

app.run(['$rootScope', 'editableOptions',
    function($rootScope, editableOptions) {
        editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
    }
]);
