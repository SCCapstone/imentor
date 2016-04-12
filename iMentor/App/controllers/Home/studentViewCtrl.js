app.controller('studentViewCtrl', ['$scope', '$mdToast', 'manageService',
    function studentViewCtrl($scope, $mdToast, manageService) 
    {

        getCurrentUser();
        getListingsByCurrentUser();


        $scope.showOpenError = function () {
            $mdToast.show(
              $mdToast.simple()
                .textContent('Unable to join Hangout')
                .position('top')
                .hideDelay(2000)
            );
        };
        
        // ---------------------------------------------------------------
        // Service Calls
        // ---------------------------------------------------------------

        function getCurrentUser() {
            manageService.getCurrentUser().then(
                function success(user) {
                    $scope.user = user;
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
        $scope.joinHangout = function (event) {
            var today = new Date();
            if ($scope.currentUserListings != null && event.eventDate.getDate() == today.getDate()) {
                for (var i = 0; i < $scope.currentUserListings.length; i++) {
                    if ($scope.currentUserListings[i].Id == event.id && $scope.currentUserListings[i].HangoutUrl != null) {
                        window.open($scope.currentUserListings[i].HangoutUrl);
                    }
                    else if ($scope.currentUserListings[i].Id == event.id && $scope.currentUserListings[i].HangoutUrl == null) {
                        $scope.showOpenError();
                    }
                }
            }
            else {
                $scope.showOpenError();
            }
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

        function sortByDate(a) {
            for (var x = a.length - 1; x >= 0; x--) {
                for (var y = 1; y <= x; y++) {
                    if (a[y - 1].EventDate > a[y].EventDate) {
                        var temp = a[y - 1];
                        a[y - 1] = a[y];
                        a[y] = temp;
                    }
                }
            }
        }

        function parseTime(e) {
            var hours = "";
            var minutes = "";
            var ampm = "";

            if (e.getHours() == 0) {
                hours = "12";
                ampm = "AM";
            } else if (e.getHours() < 12) {
                hours = "" + e.getHours();
                ampm = "AM";
            } else if (e.getHours() == 12) {
                hours = "12";
                ampm = "PM";
            } else if (e.getHours() > 12) {
                hours = "" + (e.getHours() - 12);
                ampm = "PM";
            }

            if (e.getMinutes() < 10) {
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
                                if(today.getDate() > d.getDate()){
                                    continue;
                                }

                                //If the new date is more than a week away, ignore it
                                if(nextWeek.getDate() <= d.getDate() ){
                                    //Break because every day after this will be to large too
                                    break;
                                }

                                //Find the days that match the frequency
                                for(var y = 0; y < days.length; y++){
                                    if(days[y].localeCompare(weekday[d.getDay()]) == 0){
                                        //Create new event

                                        var event = {
                                            ListingId: $scope.currentUserListings[i].Id,
                                            ListingTitle: $scope.currentUserListings[i].Title,
                                            ListingStartDate: $scope.currentUserListings[i].StartDate,
                                            ListingEndDate: $scope.currentUserListings[i].EndDate,
                                            EventDate: new Date(d),
                                            Background: "grey",
                                            Active: false
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
                            

                                //If the array is larger than 12, remove the last elements
                                while(upcomingEvents.length > 12){
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
                    it.startDate = (upcomingEvents[i].EventDate.getMonth() + 1)  + "/" + upcomingEvents[i].EventDate.getDate() + "/" + upcomingEvents[i].EventDate.getFullYear();
                    it.startTime = parseTime(upcomingEvents[i].ListingStartDate);
                    it.span = { row: 1, col: 1 };
                    it.id = upcomingEvents[i].ListingId;
                    it.background = upcomingEvents[i].Background;
                    it.eventDate = upcomingEvents[i].EventDate;
                    
                    if (upcomingEvents[i].Active) {
                        it.header = "Hangout active. Join now!";
                    } else if (upcomingEvents[i].EventDate.getDate() == today.getDate()) {
                        it.header = "Hangout inactive.";
                    } else {
                        it.header = "";
                    }

                    results.push(it);
                }

                

                return results;

            }
        }
    }
])