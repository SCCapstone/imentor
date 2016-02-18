
app.controller('listingCreationCtrl', ['$scope', '$uibModalInstance',
    function listingCreationCtrl($scope, $uibModalInstance) 
    {
        $scope.ok = function ()
	    {
		    $uibModalInstance.close();
	    };

        $scope.close = function () {
            $uibModalInstance.dismiss();
        };
    }
])