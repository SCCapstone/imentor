﻿

app.controller('homeCtrl', ['$scope', '$uibModal', '$location', 'manageService', 'modalOptionService',
    function HomeCtrl($scope, $uibModal, $location, manageService, modalOptionService)
    {
        $scope.listings = [];
        $scope.subjectsIncludes = [];
        $scope.owners = [];
        $scope.selectAll = false;
        getListings();

        $scope.subjects = [
            { value: 1, text: 'Math', selected: false },
            { value: 2, text: 'Science', selected: false },
            { value: 3, text: 'History', selected: false },
            { value: 4, text: 'Reading', selected: false },
            { value: 5, text: 'Computer Science', selected: false }
        ];


        // ---------------------------------------------------------------
        // Filters
        // ---------------------------------------------------------------
        $scope.includeArea = function (listing) {
            var i = $.inArray(listing, $scope.subjectsIncludes);

            if (listing.localeCompare('All') == 0) {
                if ($scope.selectAll == false) {
                    i = 0;
                    for (var j = 0; j < $scope.subjects.length; j++) {
                        $scope.subjects[j].selected = true;
                    }
                } else {
                    i = 0;
                    for (var j = 0; j < $scope.subjects.length; j++) {
                        $scope.subjects[j].selected = false;
                    }
                }
            }

            if (i > -1) {
                $scope.subjectsIncludes.splice(i, 1);


            } else {
                $scope.subjectsIncludes.push(listing);


                if ($scope.selectAll) {
                    $scope.selectAll = false;
                }
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
        // Service Calls
        // ---------------------------------------------------------------
        function getListings() {
            manageService.getListings().then(
                function success(listings){
                    manageService.getUsers().then(
                        function success(users) {
                            for (var i = 0; i < listings.length; i++) {
                                var temp = {
                                    Id: listings[i].Id,
                                    Title: listings[i].Title,
                                    Area: listings[i].Area,
                                    StartDate: new Date(parseInt(listings[i].StartDate.substr(6))),
                                    EndDate: listings[i].EndDate,
                                    OwnerId: listings[i].TeacherId,
                                    OwnerUserName: null,
                                    Open: listings[i].Open
                                }
                                $scope.listings.push(temp);
                                for (var j = 0; j < users.length; j++) {
                                    if (listings[i].TeacherId == users[j].Id) {
                                        $scope.listings[i].OwnerUserName = users[j].UserName;
                                    }
                                }
                            }
                        },
                        function error(error) {
                            console.log("Unable to load users (homeCtrl)");
                        }
                    )
                },
                function error(response){
                    console.log("Unable to load listings (homeCtrl)");
                }
            );
        }

        // ---------------------------------------------------------------
        // Navigation
        // ---------------------------------------------------------------
        $scope.createNewListing = function()
        {
            $location.path("/Listing/" + 0);
        }

        $scope.selectListing = function (listing) {
             $location.path("/Listing/" + listing.Id);
        };

        // ---------------------------------------------------------------
        // Helper Methods
        // ---------------------------------------------------------------
        function contains(a, obj) {
            for (var i = 0; i < a.length; i++) {
                if (a[i] === obj) {
                    return true;
                }
            }
            return false;
        }
    }
]);