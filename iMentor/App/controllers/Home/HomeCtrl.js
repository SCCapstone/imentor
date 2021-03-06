﻿

app.controller('homeCtrl', ['$scope', '$location', 'manageService',
    function HomeCtrl($scope, $location, manageService)
    {
        $scope.listings = [];
        $scope.subjectsIncludes = [];
        $scope.ageGroupIncludes = [];
        $scope.owners = [];
        $scope.selectAll = false;
        $scope.sortListings = "-Id";
        $scope.openLength = 0;
        $scope.closedLength = 0;
        $scope.showOpen = true;


        $scope.currentPage = 1;
        $scope.itemsPerPage = 10;

        $scope.pageChanged = function() {
            $log.log('Page changed to: ' + $scope.currentPage);
        };


        getCurrentUser();
        getListings();
        

        $scope.subjects = [
            { value: 1, text: 'Math', selected: false },
            { value: 2, text: 'Science', selected: false },
            { value: 3, text: 'Social Studies', selected: false },
            { value: 4, text: 'Reading', selected: false },
            { value: 5, text: 'Computer Applications', selected: false },
            { value: 6, text: 'Foreign Language', selected: false },
            { value: 7, text: 'Arts', selected: false },
            { value: 8, text: 'Writing', selected: false },
            { value: 9, text: 'Music', selected: false }
        ];

        $scope.ageGroups = [
            { value: 1, text: '0-2', selected: false },
            { value: 2, text: '3-5', selected: false },
            { value: 3, text: '6-8', selected: false },
            { value: 4, text: '9-12', selected: false }
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
                if ($.inArray(listings.Area, $scope.subjectsIncludes) < 0 && $.inArray(listings.AgeGroup, $scope.subjectsIncludes) < 0)
                    return;
            }

            return listings;
        }

        $scope.toggleShowOpen = function () {
            $scope.showOpen = !$scope.showOpen;
            getListings();
        } 

        // ---------------------------------------------------------------
        // Sorting
        // ---------------------------------------------------------------
        $scope.sort = function (field) {
            if (field.localeCompare("Id") == 0
                && $scope.sortListings.localeCompare("Id") == 0) {
                $scope.sortListings = "-Id";
                return;
            } else if (field.localeCompare("Id") == 0
                && $scope.sortListings.localeCompare("-Id") == 0) {
                $scope.sortListings = "Id";
                return;
            } else if (field.localeCompare("Id") == 0
                && $scope.sortListings.localeCompare("Id") != 0) {
                $scope.sortListings = "Id";
                return;
            }

            if (field.localeCompare("StartDate") == 0
                && $scope.sortListings.localeCompare("StartDate") == 0) {
                $scope.sortListings = "-StartDate";
                return;
            } else if (field.localeCompare("StartDate") == 0
                && $scope.sortListings.localeCompare("-StartDate") == 0) {
                $scope.sortListings = "StartDate";
                return;
            } else if (field.localeCompare("StartDate") == 0
                && $scope.sortListings.localeCompare("StartDate") != 0) {
                $scope.sortListings = "StartDate";
                return;
            }

            if (field.localeCompare("OwnerUserName") == 0
                && $scope.sortListings.localeCompare("OwnerUserName") == 0) {
                $scope.sortListings = "-OwnerUserName";
                return;
            } else if (field.localeCompare("OwnerUserName") == 0
                && $scope.sortListings.localeCompare("-OwnerUserName") == 0) {
                $scope.sortListings = "OwnerUserName";
                return;
            } else if (field.localeCompare("OwnerUserName") == 0
                && $scope.sortListings.localeCompare("OwnerUserName") != 0) {
                $scope.sortListings = "OwnerUserName";
                return;
            }

            if (field.localeCompare("Title") == 0
                && $scope.sortListings.localeCompare("Title") == 0) {
                $scope.sortListings = "-Title";
                return;
            } else if (field.localeCompare("Title") == 0
                && $scope.sortListings.localeCompare("-Title") == 0) {
                $scope.sortListings = "Title";
                return;
            } else if (field.localeCompare("Title") == 0
                && $scope.sortListings.localeCompare("Title") != 0) {
                $scope.sortListings = "Title";
                return;
            }

            if (field.localeCompare("Area") == 0
                && $scope.sortListings.localeCompare("Area") == 0) {
                $scope.sortListings = "-Area";
                return;
            } else if (field.localeCompare("Area") == 0
                && $scope.sortListings.localeCompare("-Area") == 0) {
                $scope.sortListings = "Area";
                return;
            } else if (field.localeCompare("Area") == 0
                && $scope.sortListings.localeCompare("Area") != 0) {
                $scope.sortListings = "Area";
                return;
            }

            if (field.localeCompare("AgeGroup") == 0
                && $scope.sortListings.localeCompare("AgeGroup") == 0) {
                $scope.sortListings = "-AgeGroup";
                return;
            } else if (field.localeCompare("AgeGroup") == 0
                && $scope.sortListings.localeCompare("-AgeGroup") == 0) {
                $scope.sortListings = "AgeGroup";
                return;
            } else if (field.localeCompare("AgeGroup") == 0
                && $scope.sortListings.localeCompare("AgeGroup") != 0) {
                $scope.sortListings = "AgeGroup";
                return;
            }
        }

        // ---------------------------------------------------------------
        // Service Calls
        // ---------------------------------------------------------------
        function getListings() {
            manageService.getListings().then(
                function success(listings){
                    $scope.listings = [];
                    $scope.openLength = 0;
                    $scope.closedLength = 0;

                    $scope.totalItems = listings.length;

                    manageService.getUsers().then(
                        function success(users) {
                            for (var i = 0; i < listings.length; i++) {
                                var temp = {
                                    Id: listings[i].Id,
                                    UrlId: listings[i].UrlId,
                                    Title: listings[i].Title,
                                    Area: listings[i].Area,
                                    AgeGroup: listings[i].AgeGroup,
                                    StartDate: new Date(parseInt(listings[i].StartDate.substr(6))),
                                    EndDate: new Date(parseInt(listings[i].EndDate.substr(6))),
                                    OwnerId: listings[i].TeacherId,
                                    OwnerUserName: null,
                                    Open: listings[i].Open
                                }
                                

                                if (listings[i].Open) {
                                    $scope.openLength++;
                                } else {
                                    $scope.closedLength++;
                                }

                                for (var j = 0; j < users.length; j++) {
                                    if (listings[i].TeacherId == users[j].Id) {
                                        temp.OwnerUserName = users[j].UserName;
                                    }
                                }

                                if ($scope.showOpen && listings[i].Open) {
                                    $scope.listings.push(temp);
                                } else if(!$scope.showOpen && !listings[i].Open) {
                                    $scope.listings.push(temp);
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

        function getCurrentUser() {
            manageService.getCurrentUser().then(
                function success(user) {
                    $scope.user = user;
                    if(user.RoleId == 1){
                        $scope.goToStudentView();
                    } else if (user.RoleId == 2) {
                        getListingsByCurrentUser();
                    }
                },
                function fail(reason) {
                    console.log("Unable to load current user: " + reason);
                }
            );
        }

        function getListingsByCurrentUser() {
            manageService.getListingsByCurrentUser().then(
                function success(listings) {
                    $scope.currentUserListings = [];
                    for (var i = 0; i < listings.length; i++) {
                        var temp = {
                            Id: listings[i].Id,
                            UrlId: listings[i].UrlId,
                            Title: listings[i].Title,
                            Area: listings[i].Area,
                            StartDate: new Date(parseInt(listings[i].StartDate.substr(6))),
                            EndDate: new Date(parseInt(listings[i].EndDate.substr(6))),
                            Frequency: listings[i].Frequency,
                            HangoutUrl: listings[i].HangoutUrl,
                            OwnerId: listings[i].TeacherId,
                            OwnerUserName: null,
                            Open: listings[i].Open
                        }

                        $scope.currentUserListings.push(temp);
                    }

                    $scope.tiles = buildGridModel({
                        icon: "avatar:svg-",
                        title: "Svg-",
                        background: ""
                    });
                }
            )
        }

        // ---------------------------------------------------------------
        // Navigation
        // ---------------------------------------------------------------
        $scope.createNewListing = function()
        {
            $location.path("/Listing/" + "new");
        }

        $scope.selectListing = function (listing) {
            $location.path("/Listing/" + listing.UrlId);
        };

        $scope.goToListing = function (urlId) {
            
            $location.path("/Listing/" + urlId);
        }

        $scope.goToStudentView = function (id) {
            $location.path("/StudentView/");
        }

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

        function sortByDate(a){
            for (var x = a.length - 1; x >= 0; x--) {
                for (var y = 1; y <= x; y++){
                    if (a[y - 1].EventDate > a[y].EventDate) {
                        var temp = a[y - 1];
                        a[y - 1] = a[y];
                        a[y] = temp;
                    }
                }
            }
        }

        function parseTime(e){
            var hours = "";
            var minutes = "";
            var ampm = "";

            if(e.getHours() == 0){
                hours = "12";
                ampm = "AM";
            } else if(e.getHours() < 12) { 
                hours = "" + e.getHours();
                ampm = "AM";
            } else if(e.getHours() == 12) { 
                hours = "12";
                ampm = "PM";
            } else if(e.getHours() > 12) { 
                hours = "" + (e.getHours() - 12);
                ampm = "PM";
            }

            if(e.getMinutes() < 10){
                minutes = "0" + e.getMinutes();
            } else {
                minutes = "" + e.getMinutes();
            }

            var t = hours + ":" + minutes + " " + ampm;
            return t;
        }


        // ---------------------------------------------------------------
        // Grid list
        // ---------------------------------------------------------------
        
        function buildGridModel(tileTmpl) {
            var weekday = new Array(7);
            weekday[0]=  "U";
            weekday[1] = "M";
            weekday[2] = "T";
            weekday[3] = "W";
            weekday[4] = "R";
            weekday[5] = "F";
            weekday[6] = "S";

            if ($scope.currentUserListings.length > 0) {

                //Get open listings assigned to the current user
                    //...get only listings within the next week
                    //...create object based on day of the week (and maybe time) and put it into a new array
                    //...sort this array by upcoming first
                //...create tiles based on this new array.
                var today = new Date();
                var nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
                var upcomingEvents = [];

                var it, results = [];
                for (var i = 0; i < $scope.currentUserListings.length; i++) {

                    //Only get open listings for the next week
                    if ($scope.currentUserListings[i].Open && $scope.currentUserListings[i].StartDate < nextWeek) {
                        
                        // Get the total number of days in the listing
                        var timeDiff = Math.abs($scope.currentUserListings[i].EndDate.getTime() - $scope.currentUserListings[i].StartDate.getTime());
                        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

                        //Create array of selected days of the week
                        if($scope.currentUserListings[i].Frequency != null){
                            var days =  $scope.currentUserListings[i].Frequency.split("");

                            //Step through each day, create a new event when the day matches
                            for(var x = 0; x < diffDays; x++){
                                //Create a new date for the day
                                var d = new Date($scope.currentUserListings[i].StartDate);
                                d.setDate(d.getDate() + x);

                                //If the new date is older than today, ignore it
                                if((today.getMonth() == d.getMonth() && today.getDate() > d.getDate()) || today.getMonth() > d.getMonth() || today.getYear() > d.getYear()){
                                    continue;
                                }

                                //Find the days that match the frequency
                                for(var y = 0; y < days.length; y++){
                                    if(days[y].localeCompare(weekday[d.getDay()]) == 0){
                                        //Create new event

                                        var event = {
                                            ListingId: $scope.currentUserListings[i].Id,
                                            ListingUrlId: $scope.currentUserListings[i].UrlId,
                                            ListingTitle: $scope.currentUserListings[i].Title,
                                            ListingStartDate: $scope.currentUserListings[i].StartDate,
                                            ListingEndDate: $scope.currentUserListings[i].EndDate,
                                            EventDate: new Date(d)
                                        }

                                        if(event.ListingTitle.length > 25){
                                            event.ListingTitle = event.ListingTitle.slice(0,24) + "...";
                                        }

                                        //Change the color of the event if the hangout is active and the event day is today
                                        if ($scope.currentUserListings[i].HangoutUrl != null && event.EventDate.getDate() == today.getDate()) {
                                            event.Background = "#00bfa5";
                                            event.Active = true;
                                        } else if ($scope.currentUserListings[i].HangoutUrl == null && event.EventDate.getDate() == today.getDate()) {
                                            event.Background = "yellow";
                                            event.Active = false;
                                        } else {
                                            event.Background = "grey";
                                            event.Active = false;
                                        }
                                            
                                        upcomingEvents.push(event);
                                    }   
                                }

                                //Sort new array by date
                                sortByDate(upcomingEvents);
                            

                                //If the array is larger than 10, remove the last elements
                                while(upcomingEvents.length > 10){
                                    upcomingEvents.pop();
                                }
                            }
                        }
                    }
                }

                for(var i = 0; i < upcomingEvents.length; i++){
                    it = angular.extend({}, tileTmpl);
                    it.icon = it.icon + (i + 1);
                    it.title = upcomingEvents[i].ListingTitle;
                    it.startDate = (upcomingEvents[i].EventDate.getMonth() + 1) + "/" + upcomingEvents[i].EventDate.getDate() + "/" + upcomingEvents[i].EventDate.getFullYear();
                    it.startTime = parseTime(upcomingEvents[i].ListingStartDate);

                    it.id = upcomingEvents[i].ListingId;
                    it.urlId = upcomingEvents[i].ListingUrlId;
                    it.background = upcomingEvents[i].Background;
                    it.eventDate = upcomingEvents[i].EventDate;

                    results.push(it);
                }

                return results;
            }
        }
    }
]);