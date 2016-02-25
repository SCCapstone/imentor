app.controller('eventDetailsCtrl', [ '$scope', '$uibModalInstance', '$location', '$rootScope', 'event',
    function eventDetailsCtrl($scope, $uibModalInstance, $location, $rootScope, event)
    {
        $scope.title = listing.Title;
        $scope.description = listing.Description;


        $scope.ok = function ()
	    {
            $rootScope.currentListing = null;
		    $uibModalInstance.dismiss();
        };

      
    }
])