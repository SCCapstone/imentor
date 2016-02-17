
app.controller('manageListingsCtrl', ['$scope', '$rootScope',
    function ManageListingsCtrl($scope, $rootScope) 
    {
        var listing = $rootScope.currentListing;
        console.log(listing);

        $scope.ok = function () 
        {
            $rootScope.currentListing = null;
        };
    }
]);