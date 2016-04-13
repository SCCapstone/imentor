
app.controller('createHangoutCtrl', ['$scope', '$mdDialog', 'manageService', 'listing',
    function createHangoutCtrl($scope, $mdDialog, manageService, listing)
    {
        $scope.listing = listing;

        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        $scope.save = function () {
            $scope.listing.HangoutStart = new Date();
            console.log($scope.listing);
            manageService.updateListing($scope.listing);
            $mdDialog.hide();
        };
    }
])