
app.controller('listingDetailCtrl', [ '$scope', '$uibModalInstance', '$location', '$rootScope', 'listing',
    function listingDetailCtrl($scope, $uibModalInstance, $location, $rootScope, listing)
    {
        $scope.title = listing.Area;
        $scope.description = listing.Description;


        $scope.ok = function ()
	    {
            $rootScope.currentListing = null;
		    $uibModalInstance.dismiss();
        };

        $scope.manage = function ()
	    {
            $rootScope.currentListing = listing;
		    $uibModalInstance.dismiss();
		    $location.path("/EditListing/" + listing.Id);
	    };
    }
])