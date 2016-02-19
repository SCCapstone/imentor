
app.controller('editListingCtrl', ['$scope', '$rootScope', '$routeParams', 'manageService',
    function EditListingCtrl($scope, $rootScope, $routeParams, manageService) 
    {
        var DEFAULT_PWD = '1234567890';

        $scope.usernamePattern = /^([A-Za-z0-9_-]){3,50}$/;
        $scope.passwordPattern = /^([\@A-Za-z0-9_-]){6,50}$/;
        $scope.namePattern_100 = /^[A-Za-z0-9_-\s]{1,100}$/;
        $scope.emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        $scope.listingId = $routeParams.listingId;
        var id = $scope.listingId;
        $scope.isNew = ($scope.listingId < 1);
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
        function getListingById(id) {
            manageService.getListingById(id)
                .success(function (listing) {
                    //for (var i = 0; i < listings.length; i++)
                    //{
                    //    if(listingId == 0)
                    //    {
                    //        $scope.listing = null;
                    //    }
                    //    else if(listings[i].ID == listingID)
                    //    {
                    //        $scope.listing = listings[i];
                    //    }
                    //}
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