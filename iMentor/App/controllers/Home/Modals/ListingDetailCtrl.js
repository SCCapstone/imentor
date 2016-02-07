
function listingDetailCtrl($scope, $uibModalInstance, listing) 
{
    $scope.title = listing.subject;

    $scope.ok = function ()
	{
		$uibModalInstance.dismiss();
	};
}