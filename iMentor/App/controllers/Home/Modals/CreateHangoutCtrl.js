
app.controller('createHangoutCtrl', ['$scope', '$mdDialog', 'manageService', 'listing',
    function createHangoutCtrl($scope, $mdDialog, manageService, listing)
    {
        $scope.listing = listing;
        var talkgadget = 'https://talkgadget.google.com/hangouts/';
        var hangout = 'https://hangouts.google.com/call/';

        $scope.cancel = function () {
            $scope.listing.HangoutUrl = null;
            $mdDialog.cancel();
        };

        $scope.save = function () {
            if(validate()){
                $scope.listing.HangoutStart = new Date();
                manageService.updateListing($scope.listing);
                $mdDialog.hide();
            }
        };

        $scope.isValid = function() {
            validate();
        }

        function validate() {
            var toReturn = true;
            $scope.hangoutForm.hangoutUrl.$setValidity('valid', true);

            if ($scope.hangoutForm.$invalid) {
                toReturn = false;
            } else if (!$scope.listing.HangoutUrl.includes(talkgadget) && !$scope.listing.HangoutUrl.includes(hangout)) {
                toReturn = false;
                $scope.hangoutForm.hangoutUrl.$setValidity('valid', false);
            }

            return toReturn;
        }
    }
])