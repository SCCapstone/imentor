

app.controller('pageNotFoundCtrl', ['$scope', '$location', 'manageService',
    function pageNotFoundCtrl($scope, $location, manageService)
    {

        getCurrentUser();

        function getCurrentUser() {
            manageService.getCurrentUser().then(
                function success(user) {
                    $scope.user = user;
                    if($scope.user.RoleId == 1){
                        $scope.goToStudentView();
                    }
                },
                function fail(reason) {
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

        $scope.goToStudentView = function (id) {
            $location.path("/StudentView/");
        }
    }
]);