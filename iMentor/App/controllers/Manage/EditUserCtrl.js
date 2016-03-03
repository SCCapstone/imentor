
app.controller('editUserCtrl', ['$scope', '$rootScope', '$routeParams', '$location', 'manageService',
    function EditUserCtrl($scope, $rootScope, $routeParams, $location, manageService) 
    {
        $scope.user = {};
        $scope.userId = $routeParams.userId;
        var id = $scope.userId;
        getUsers();

        // ---------------------------------------------------------------
        // Load Database Users
        // ---------------------------------------------------------------
        function getUsers() {
            manageService.getUsers().then(
                function success(users) {
                    for (var i = 0; i < users.length; i++)
                    {
                        if(users[i].Id == id)
                        {
                            $scope.user = users[i];
                        }
                    }
                },
                function error (error) {
                    $scope.status = 'Unable to load user data: ' + error.message;
                }
            );
        }


        // ---------------------------------------------------------------
        // Functions
        // ---------------------------------------------------------------

        $scope.save = function () {
                $scope.updateUser();
                
                $location.path("/ManageUsers");
        }

        $scope.cancel = function () {
            $location.path("/ManageUsers");
        }

        $scope.updateUser = function () {
            manageService.updateUser($scope.user).then(
                function success(response) {
                }
            );
        }

    }
]);