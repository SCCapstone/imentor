
app.controller('editUserCtrl', ['$scope', '$rootScope',
    function EditUserCtrl($scope, $rootScope) 
    {
        $scope.userId = $routeParams.userId;
        var id = $scope.userId;
        $scope.isNew = ($scope.userId < 1);
        if (!$scope.isNew) {
            getListingById(id);
            $scope.password = DEFAULT_PWD;
            $scope.confirmPassword = DEFAULT_PWD;
        } else {
            $scope.password = null;
            $scope.confirmPassword = null;
        }

        // ---------------------------------------------------------------
        // Load Database Listings
        // ---------------------------------------------------------------
        function getUserById(id) {
            manageService.getUserById(id)
                .success(function (listing) {
                    $scope.listing = listing;

                    console.log(listing);
                })
                .error(function (error) {
                    $scope.status = 'Unable to load listing data: ' + error.message;
                    console.log($scope.status);
                });
        }
    }
]);