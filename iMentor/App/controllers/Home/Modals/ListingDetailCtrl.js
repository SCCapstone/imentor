
function listingDetailCtrl($scope, $uibModalInstance, $location, $rootScope, listing)
{
    $scope.title = listing.Area;
    $scope.description = listing.Description;
    $rootScope.currentListing = listing;

    $scope.ok = function ()
	{
		$uibModalInstance.dismiss();
    };

    $scope.manage = function ()
	{
		$uibModalInstance.dismiss();
        $location.path('/Manage');
	};
}