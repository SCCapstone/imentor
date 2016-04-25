

app.controller('aboutCtrl', ['$scope', '$location', 'manageService',
    function aboutCtrl($scope, $location, manageService) 
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

        // ---------------------------------------------------------------
        // Navigation
        // ---------------------------------------------------------------
        $scope.goToStudentView = function (id) {
            $location.path("/StudentView/");
        }
    }
])