var rootUrl = '/';

var app = angular.module('app', [
    'ngRoute',
    'ngAnimate',
    'ui.bootstrap'
])

app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.when('/', { templateUrl: rootUrl + 'home/index', controller: 'homeCtrl' });
        $routeProvider.when('/login', { templateUrl: rootUrl + 'account/login', controller: 'loginCtrl' });
    }
]);

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
    return rootUrl;
}