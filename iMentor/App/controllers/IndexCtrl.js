

app.controller('indexCtrl', [ '$scope', '$location', 'manageService',
    function IndexCtrl($scope, $location, manageService) {
        getCurrentUser();

        //---------------------------------------------------
        // Service Calls
        //---------------------------------------------------
        function getCurrentUser(){
            manageService.getCurrentUser().then(
                function success(user){
                    $scope.user = user;
                },
                function fail(reason){
                    console.log("Unable to load current user: " + reason);
                }
            );
        }

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
