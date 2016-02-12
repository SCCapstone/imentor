

app.controller('homeCtrl', ['$scope', '$uibModal', 'homeService', 'modalOptionService',
    function HomeCtrl($scope, $uibModal, homeService, modalOptionService)
    {
        $scope.listings = [];
        $scope.subjectsIncludes = [];

        getListings();

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


        function getListings() {
            homeService.getListings()
                .success(function (listings) {
                    $scope.listings = listings;
                })
                .error(function (error) {
                    $scope.status = 'Unable to load listing data: ' + error.message;
                });
        }


        $scope.createListing = function () {
            $scope.showCreationModal();
        }

        $scope.showCreationModal = function()
        {
            var modalOptions = modalOptionService.optionsForListingCreation();
            var modalInstance = $uibModal.open(modalOptions);

            modalInstance.result.then(
                null,
                function cancel() {
                    // No-op
                });
        }

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