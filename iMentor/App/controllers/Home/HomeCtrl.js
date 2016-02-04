'use strict';

app.controller('homeCtrl',
    function ($scope, $rootScope, $location, $log, $modal, homeService, modalOptionService)
    {
        $scope.subjects = [
            { 'subject': 'Math' },
            { 'subject': 'Science' },
            { 'subject': 'History' },
            { 'subject': 'Reading' }];
        $scope.subjectsIncludes = [];



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



        $scope.createListing = function () {
            $scope.showCreationModal();
        }

        $scope.showCreationModal = function()
        {
            var modalOptions = modalOptionService.optionsForListingCreation();
            var modalInstance = $modal.open(modalOptions);

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
            var modalInstance = $modal.open(modalOptions);

            modalInstance.result.then(
                null,
                function cancel() {
                    // No-op
                });
        };
    }
);