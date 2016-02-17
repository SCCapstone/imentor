
function listingDetailCtrl($scope, $uibModalInstance, $location, $rootScope, listing)
{
    $rootScope.currentListing = listing;
    $scope.title = listing.Area;
    $scope.description = listing.Description;


    $scope.ok = function ()
	{
		$uibModalInstance.dismiss();
    };

    $scope.manage = function ()
	{
		$uibModalInstance.dismiss();
		$location.path('/ManageListings');
	};
}