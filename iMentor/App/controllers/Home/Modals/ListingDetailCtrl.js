
function listingDetailCtrl($scope, $uibModalInstance, listing) 
{
    $scope.title = listing.Area;

    $scope.ok = function ()
	{
		$uibModalInstance.dismiss();
	};
}