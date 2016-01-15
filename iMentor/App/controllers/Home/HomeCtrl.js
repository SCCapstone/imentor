'use strict';

app.controller('homeCtrl',
    function ($scope, $rootScope, $location, $log, homeService)
    {
        $scope.message = "Home Page";
    }
);