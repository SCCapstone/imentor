

app.controller('calendarCtrl', ['$scope', 'calendarService', 
    function CalendarCtrl($scope, calendarService, uiCalendarConfig){

        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();

        $scope.events= [
           {title: 'All Day Event',start: new Date(y, m, 1)},
      {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
      {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
      {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
      {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
      {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
        ];

   
        $scope.uiConfig = {
            calendar: {
                height: 900,
                editable: true,

                header: {
                    left: 'today,prev, next',
                    center: 'title',
                    right: 'month,basicWeek,basicDay'

                }
            }
        };

        $scope.eventSources = [$scope.events];

        $scope.getListings = function() {
            calendarService.getListingsByCurrentUser()
                .success(function (listings) {
                    $scope.userListings = listings;
                 
                    for (var i = 0; i < $scope.userListings.length; i++)
                    {
                        console.log("For loop listing length"+$scope.userListings.length);
                        $scope.events.push({ title: $scope.userListings[i].Title, start: $scope.userListings[i].StartDate })
                        console.log("For loop events length" + $sccope.events.length);
                    }
                })
                .error(function (error) {
                    $scope.status = 'Unable to load listing data: ' + error.message;
                });
        }
      
    }
]);