

app.controller('pageNotFoundCtrl', ['$scope', '$location',
    function pageNotFoundCtrl($scope, $location)
    {
        //---------------------------------------------------
        // Navigation
        //---------------------------------------------------

        $scope.goToHome = function ()
        {
            $location.path('/');
        };
    }
]);