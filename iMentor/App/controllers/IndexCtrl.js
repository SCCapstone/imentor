'use strict';

app.controller('indexCtrl', [ '$scope', '$rootScope', '$location',
    function IndexCtrl($scope, $rootScope, $location) {
        //---------------------------------------------------
        // $rootScope
        //---------------------------------------------------

        $rootScope.selectedNav = null;


        //---------------------------------------------------
        // Auth calls
        //---------------------------------------------------

        //$scope.getIsAuthenticated = function () {
        //    return securityService.isAuthenticated();
        //};

        //$scope.getCurrUser = function () {
        //    return securityService.getCurrUser();
        //};

        //---------------------------------------------------
        // Navigation
        //---------------------------------------------------

        $scope.goToHome = function ()
        {
            $location.path('/');
        };

        $scope.goToListings = function () {
            $location.path('/Listings');
        };

        $scope.goToCalendar = function ()
        {
            $location.path('/Calendar');
        }

        $scope.goToLogin = function ()
        {
            $location.path('/Login');
        }
    }
]);
