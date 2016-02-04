
function listingDetailCtrl($scope, $modalInstance, listing) 
{
    $scope.title = listing.subject;

    $scope.ok = function ()
	{
		$modalInstance.dismiss();
	};
}