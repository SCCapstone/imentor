
app.controller('manageListingsCtrl', ['$scope', '$rootScope', '$location',
    function ManageListingsCtrl($scope, $rootScope, $location) 
    {
        var listing = $rootScope.currentListing;
        console.log(listing);


        $scope.goToCreateListing = function()
        {
               $location.path("/CreateListing");
        }

        $scope.ok = function () 
        {
            $rootScope.currentListing = null;
        };
    }
]);