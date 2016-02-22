

app.controller('homeCtrl', ['$scope', '$uibModal', '$location', 'homeService', 'modalOptionService',
    function HomeCtrl($scope, $uibModal, $location, homeService, modalOptionService)
    {
        $scope.listings = [];
        $scope.subjectsIncludes = [];

        getListings();


        // ---------------------------------------------------------------
        // Filters
        // ---------------------------------------------------------------
        $scope.includeArea = function (listing) {
            var i = $.inArray(listing, $scope.subjectsIncludes);
            if (i > -1) {
                $scope.subjectsIncludes.splice(i, 1);
            } else {
                $scope.subjectsIncludes.push(listing);
            }
        }

        $scope.areaFilter = function (listings) {
            if ($scope.subjectsIncludes.length > 0) {
                if ($.inArray(listings.Area, $scope.subjectsIncludes) < 0)
                    return;
            }

            return listings;
        }


        // ---------------------------------------------------------------
        // Load Database Listings
        // ---------------------------------------------------------------
        function getListings() {
            homeService.getListings()
                .success(function (listings) {
                    $scope.listings = listings;
                })
                .error(function (error) {
                    $scope.status = 'Unable to load listing data: ' + error.message;
                });
        }


        // ---------------------------------------------------------------
        // Navigation
        // ---------------------------------------------------------------
        $scope.goToCreateListing = function()
        {
            $location.path("/EditListing/" + 0);
        }


        // ---------------------------------------------------------------
        // Modals
        // ---------------------------------------------------------------
        $scope.selectListing = function (listing) {
            $scope.showListingDetail(listing);
        };

        $scope.showListingDetail = function (listing) {
            var modalOptions = modalOptionService.optionsForListingDetail(listing);
            var modalInstance = $uibModal.open(modalOptions);

            modalInstance.result.then(
                null,
                function cancel() {
                    // No-op
                });
        };
    }
]);