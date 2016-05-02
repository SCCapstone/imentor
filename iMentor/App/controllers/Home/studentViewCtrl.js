app.controller('studentViewCtrl', ['$scope', '$mdToast', 'manageService',
    function studentViewCtrl($scope, $mdToast, manageService) 
    {
        $scope.currentUserListings = [];
        getCurrentUser();
        reload();
        
        $scope.showOpenError = function () {
            $mdToast.show(
              $mdToast.simple()
                .textContent('Unable to join Hangout')
                .position('top')
                .hideDelay(2000)
            );
        };

        function reload() {
            getListingsByCurrentUser();
            setTimeout(reload, 5000);
        }

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

            //Copy old listings into a new array for comparing.
            var oldListings = [];
            if($scope.currentUserListings != null){
                for(var i = 0; i < $scope.currentUserListings.length; i++){
                    oldListings.push($scope.currentUserListings[i]);
                }
            }

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

                        //Stupid time hack :|
                        temp.StartDate.setHours(temp.StartDate.getHours() - 4);

                        $scope.currentUserListings.push(temp);
                    }

                    var sameLists = compareLists(oldListings, $scope.currentUserListings);

                    if(!sameLists){
                        console.log("Update");

                        $scope.tiles = buildGridModel({
                            icon: "avatar:svg-",
                            title: "Svg-",
                            background: ""
                        });
                    }

                    
                }
            )
        }


        function compareLists(oldListings, currentListings){
            var toReturn = true;
            var diff = "no differences";

            //If the arrays are different sizes,
            if(oldListings.length != currentListings.length){
                toReturn = false;
                diff = "length";
            }

            //If one of the arrays is null
            else if(oldListings == null || currentListings == null){
                toReturn = false;
                diff = "null";
            }

            //Loop through the arrays and compare values
            else{
                var oldListing = null;
                var currentListing = null;

                for(var i = 0; i < oldListings.length; i++){
                    oldListing = oldListings[i];

                    //Loop through the second array to find the same listing
                    for(var j = 0; j < currentListings.length; j++){
                        //ignore different listings
                        if(oldListings[i].Id == currentListings[j].Id){
                            currentListing = currentListings[j];
                        }
                    }

                    //If currentListing is still null, arrays are different
                    if (currentListing == null) {
                        toReturn = false;
                        diff = "null list";
                    }
                        //Else, compare the elements
                    else {
                        //Compare Titles
                        if (oldListing.Title.localeCompare(currentListing.Title) != 0) {
                            toReturn = false;
                            diff = "titles";
                        }
                            //Compare Times
                        else if (oldListing.StartDate > currentListing.StartDate || oldListing.StartDate < currentListing.StartDate) {
                            console.log(oldListing.StartDate);
                            console.log(currentListing.StartDate);
                            toReturn = false;
                            diff = "start date";
                        }
                            //Compare Hangout Urls
                        else if (!compareHangoutUrls(oldListing.HangoutUrl, currentListing.HangoutUrl)) {
                            toReturn = false;
                            diff = "hangout url";
                        }
                    }
                }
            }

            console.log(diff);
            return toReturn;
        }


        function compareHangoutUrls(oldUrl, currentUrl) {
            var toReturn = true;

            if(oldUrl == null && currentUrl == null){
                toReturn = true;
            } else if ((oldUrl == null && currentUrl != null) || (oldUrl != null && currentUrl == null)) {
                toReturn = false;
            } else if (oldUrl.localeCompare(currentUrl) != 0) {
                toReturn = false;
            }

            return toReturn;
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

        //ignoring leap years because I don't get paid enough.
            var months = [
                { value: 0, text: 'January', numberOfDays: 31 },
                { value: 1, text: 'February', numberOfDays: 28 },
                { value: 2, text: 'March', numberOfDays: 31 },
                { value: 3, text: 'April', numberOfDays: 30 },
                { value: 4, text: 'May', numberOfDays: 31 },
                { value: 5, text: 'June', numberOfDays: 30 },
                { value: 6, text: 'July', numberOfDays: 31 },
                { value: 7, text: 'August', numberOfDays: 31 },
                { value: 8, text: 'September', numberOfDays: 30 },
                { value: 9, text: 'October', numberOfDays: 31 },
                { value: 10, text: 'November', numberOfDays: 30 },
                { value: 11, text: 'December', numberOfDays: 31 }
            ];

            var weekday = new Array(7);
            weekday[0] = "U";
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
                            var days = $scope.currentUserListings[i].Frequency.split("");

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
                                    if (days[y].localeCompare(weekday[d.getDay()]) == 0) {
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

                                        if(event.ListingTitle.length > 70){
                                            event.ListingTitle = event.ListingTitle.slice(0,69) + "...";
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
                            

                                //If the array is larger than 20, remove the last elements
                                while(upcomingEvents.length > 20){
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
                    
                    it.id = upcomingEvents[i].ListingId;
                    it.background = upcomingEvents[i].Background;
                    it.eventDate = upcomingEvents[i].EventDate;
                    
                    if (upcomingEvents[i].Active) {
                        it.header = "Hangout active. Join now!";
                        it.span = { row: 2, col: 2 };
                        it.fontSize = 18;
                    } else if (upcomingEvents[i].EventDate.getDate() == today.getDate()) {
                        it.header = "Hangout has not been started.";
                        it.span = { row: 2, col: 1 };
                        it.fontSize = 14;
                    } else {
                        it.header = "";
                        it.span = { row: 1, col: 1 };
                        it.fontSize = 14;
                    }

                    results.push(it);
                }


                return results;

            }
        }
    }
])