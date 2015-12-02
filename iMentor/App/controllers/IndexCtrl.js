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
            $location.path('/home/index');
        };

        $scope.goToManage = function () {
            $location.path('/manage');
        };

        $scope.goToLogin = function () {
            $location.path('/Account/Login');
        }

        $scope.gotToStudents = function () {
            $location.path('/student/index');
        }

        $scope.goToMentors = function () {
            $location.path('/mentor/index');
        }

        $scope.goToListings = function () {
            $location.path('/listings/index');
        }
    }
);