var rootUrl = '/';

var app = angular.module('app', [
    'ngRoute',
    'ngAnimate',
    'ui.bootstrap'
])

app.config(function ($routeProvider){
    $routeProvider
        .when('/', 
        { 
            templateUrl: 'home/home', 
            controller: 'homeCtrl' 
        })

        .when('/login', 
            {
                templateUrl: '/login',
                controller: 'loginCtrl'
            })

        .when('/listings',
        {
            templateUrl: 'listings/index',
            controller: 'listingsCtrl'
        })

        .otherwise({ redirectTo: '/' });
});

app.run([
    '$rootScope', '$log', '$location',
        function ($rootScope, $log, $location) {
            

            // Route change
            $rootScope.$on('$locationChangeStart', function (event, newUrl, oldUrl) {
                var locationPath = $location.path();

                $location.path('/');

                // Set the selected nav based on the url
                $rootScope.selectedNav = getSelectedNav(locationPath);
            });
        }
]);


function getSelectedNav(url) {
    return '/';
}