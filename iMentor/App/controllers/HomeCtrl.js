'use strict';

app.controller('homeCtrl',
    function ($scope, $rootScope, $location, $log, homeService) {
        $scope.userEmail = getUser();
        $scope.message = "Is that you, AngularJS?";

        //******************************//
        //          Functions           //
        //******************************//


        function getUser() {
            homeService.getUser()
                .success(function (userEmail) {
                    $scope.userEmail = userEmail;
                })
        }
    }
);