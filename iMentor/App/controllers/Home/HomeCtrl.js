'use strict';

app.controller('homeCtrl',
    function ($scope, $rootScope, $location, $log, homeService)
    {
        
        $scope.message = "Is that you, AngularJS?";

        //$scope.user = getUser();


        //******************************//
        //          Functions           //
        //******************************//

        $scope.getUser = function()
        {
            return homeService.getUser();
        }
    }
);