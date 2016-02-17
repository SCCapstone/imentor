

app.controller('indexCtrl', [ '$scope', '$location',
    function IndexCtrl($scope, $location) {
        //---------------------------------------------------
        // Navigation
        //---------------------------------------------------

        $scope.goToHome = function ()
        {
            $location.path('/');
        };

        $scope.goToManageUsers = function () {
            $location.path('/ManageUsers');
        };

        $scope.goToManageListings = function () {
            $location.path('/ManageListings');
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
