'use strict';

app.controller('indexCtrl',
    function IndexCtrl($scope, $rootScope, $window, $location, $modal, $route, $log, securityService) {
        //---------------------------------------------------
        // $rootScope
        //---------------------------------------------------

        $rootScope.selectedNav = null;


        //---------------------------------------------------
        // Auth calls
        //---------------------------------------------------

        $scope.getIsAuthenticated = function () {
            return securityService.isAuthenticated();
        };

        $scope.getCurrUser = function () {
            return securityService.getCurrUser();
        };

        //---------------------------------------------------
        // Navigation
        //---------------------------------------------------

        $scope.goToHome = function () {
            
            $location.path('/home/');
        };

        $scope.goToListings = function () {
            $location.path('/listings/');
        };

        $scope.goToLogin = function ()
        {
            $location.path('/Account/Login/');
        }
    }
);
