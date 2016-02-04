

function listingCreationCtrl($scope, $modalInstance) 
{
    $scope.ok = function ()
	{
		$modalInstance.close();
	};

    $scope.close = function () {
        $modalInstance.dismiss();
    };
}