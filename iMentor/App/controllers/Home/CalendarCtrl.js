
// ---------------------------------------------------------------
// Calendar controller- sets up calendar to pull events from database
// ---------------------------------------------------------------

app.controller('calendarCtrl', ['$scope','$rootScope',  '$routeParams','$location', '$q', '$log',  'manageService',  'uiCalendarConfig',  'CalendarData', 'EventSourceFactory',
    function CalendarCtrl($scope,$rootScope, $routeParms, $location, $q, $log, manageService, uiCalendarConfig,CalendarData, EventSourceFactory){

        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();
        var currentView = "month";
      

        $scope.events = [];
        $scope.events2 = [];
        $scope.authNeeded = false;
        getListings();
        $scope.eventSources = [$scope.events];
   
        $scope.uiConfig = {
            calendar: {
                height: 900,
                editable: true,

                header: {
                    left: 'today,prev, next',
                    center: 'title',
                    right: 'month,basicWeek,basicDay'
                },
        
            }
        };


        function getListings() {
            manageService.getListingsByCurrentUser().then(
                function success(listings) {

                    var listingEvents = getListingEvents(listings);

                    for (var i = 0; i < listingEvents.length; i++)
                    {
                        $scope.events.push({
                            id: listingEvents[i].ListingId,
                            title: listingEvents[i].Title,
                            start: new Date(listingEvents[i].EventDate.getFullYear(), listingEvents[i].EventDate.getMonth(), listingEvents[i].EventDate.getDate()),
                            end: new Date(listingEvents[i].EventDate.getFullYear(), listingEvents[i].EventDate.getMonth(), listingEvents[i].EventDate.getDate()),
                            url: "/#!/Listing/" + listingEvents[i].ListingUrlId,
                            frequency: listingEvents[i].Frequency,
                            allDay: false,
                            stick: true
                        });
                    }

                    $scope.eventSources = [$scope.events];
                }
            )
        }

        function getListingEvents(listings) {
            var listingEvents = [];

            var weekday = new Array(7);
            weekday[0] = "U";
            weekday[1] = "M";
            weekday[2] = "T";
            weekday[3] = "W";
            weekday[4] = "R";
            weekday[5] = "F";
            weekday[6] = "S";

            for (var i = 0; i < listings.length; i++) {
                var startDate = new Date(parseInt(listings[i].StartDate.substr(6)));
                var endDate = new Date(parseInt(listings[i].EndDate.substr(6)));

                // Get the total number of days in the listing
                var timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
                var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));


                //Create array of selected days of the week
                if (listings[i].Frequency != null) {
                    var days = listings[i].Frequency.split("");

                    //Step through each day, create a new event when the day matches
                    for (var x = 0; x < diffDays; x++) {
                        //Create a new date for the day
                        var d = new Date(startDate);
                        d.setDate(d.getDate() + x);

                        //Find the days that match the frequency
                        for (var y = 0; y < days.length; y++) {
                            if (days[y].localeCompare(weekday[d.getDay()]) == 0) {
                                //Create new event
                                var event = {
                                    Title: listings[i].Title,
                                    ListingId: listings[i].Id,
                                    ListingUrlId: listings[i].UrlId,
                                    ListingStartDate: listings[i].StartDate,
                                    ListingEndDate: listings[i].EndDate,
                                    EventDate: new Date(d)
                                }

                                listingEvents.push(event);
                            }
                        }

                        //Sort new array by date
                        sortByDate(listingEvents);
                    }
                }
            }

            return listingEvents;
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

        // ---------------------------------------------------------------
        // Navigation
        // ---------------------------------------------------------------
        $scope.goToStudentView = function (id) {
            $location.path("/StudentView/");
        }
      
    }
]);