'use strict';

app.controller('homeCtrl', ['$scope', '$uibModal', 'homeService', 'modalOptionService',
    function HomeCtrl($scope, $uibModal, homeService, modalOptionService)
    {
        $scope.subjects = [
            { 'subject': 'Math' },
            { 'subject': 'Science' },
            { 'subject': 'History' },
            { 'subject': 'Reading' }];
        $scope.subjectsIncludes = [];

        $scope.listings = [];
        getListings();

        $scope.includeSubject = function (subject) {
            var i = $.inArray(subject, $scope.subjectsIncludes);
            if (i > -1) {
                $scope.subjectsIncludes.splice(i, 1);
            } else {
                $scope.subjectsIncludes.push(subject);
            }
        }

        $scope.subjectFilter = function (subjects) {
            if ($scope.subjectsIncludes.length > 0) {
                if ($.inArray(subjects.subject, $scope.subjectsIncludes) < 0)
                    return;
            }

            return subjects;
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