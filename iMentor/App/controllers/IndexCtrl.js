

app.controller('indexCtrl', [ '$scope', '$location',
    function IndexCtrl($scope, $location) {
        //---------------------------------------------------
        // Navigation
        //---------------------------------------------------

        $scope.goToHome = function ()
        {
            $location.path('/');
        };

        $scope.goToManage = function () {
            $location.path('/Manage');
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
