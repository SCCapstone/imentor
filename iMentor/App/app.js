

var app = angular.module('app', [
    'ngAnimate',
    'ngRoute',
    //'ngTouch',
    'ngMaterial',
    'ngMessages',
    'mgcrea.ngStrap.timepicker',
    'ui.grid',
    'xeditable',
    'textAngular',
    'ui.bootstrap',
    'ui.calendar',
    'iMentor.directives'
])

app.config(['$routeProvider', '$locationProvider', '$httpProvider', '$mdIconProvider', '$mdThemingProvider',
    function ($routeProvider, $locationProvider, $httpProvider, $mdIconProvider, $mdThemingProvider)
    {
        $routeProvider
            .when('/', { templateUrl: 'home/home', controller: 'homeCtrl' })
            .when('/Login', { templateUrl: 'Account/login', controller: 'loginCtrl' })
            .when('/Calendar', { templateUrl: 'home/calendar', controller: 'calendarCtrl' })
            .when('/ManageUsers', { templateUrl: 'Manage/manageUsers', controller: 'manageUsersCtrl' })
            .when('/ManageListings', { templateUrl: 'Manage/manageListings', controller: 'manageListingsCtrl' })
        
            .when('/Listing/:listingId', { templateUrl: 'Manage/Listing', controller: 'listingCtrl' })
            .when('/EditUser/:userId', { templateUrl: 'Manage/editUser', controller: 'editUserCtrl' })
            .when('/PageNotFound', { templateUrl: 'Home/pageNotFound', controller: 'pageNotFoundCtrl'})
            .when('/About', { templateUrl: 'Home/about', controller: 'aboutCtrl'})
            .when('/StudentView', { templateUrl: 'Home/studentView', controller: 'studentViewCtrl'})

            .otherwise({ redirectTo: '/' });

        $locationProvider.html5Mode(false).hashPrefix('!');

        // Initialize headers
        $httpProvider.defaults.headers.get = $httpProvider.defaults.headers.get || {};

        // Set no cache items
        $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Tue, 01 Jan 1980 1:00:00 GMT';
        $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
        $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';

        $mdIconProvider.iconSet("avatar", 'Img/icons/avatar-icons.svg', 128);

        $mdThemingProvider.theme('default')
            .primaryPalette('teal')
            .accentPalette('teal');
    }
]);

app.run(['$rootScope', 'editableOptions',
    function($rootScope, editableOptions, $log) {
        editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
        $rootScope.$log = $log;
    }
]);
