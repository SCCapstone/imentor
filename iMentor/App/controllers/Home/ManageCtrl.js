

app.controller('manageCtrl', ['$scope', '$rootScope',
    function ManageCtrl($scope, $rootScope) 
    {
        var listing = $rootScope.currentListing;
        console.log(listing);

        $scope.ok = function () 
        {
            $rootScope.currentListing = null;
        };
    }
]);
