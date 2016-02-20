

app.controller('calendarCtrl', ['$scope', 'calendarService', 
    function CalendarCtrl($scope, calendarService, uiCalendarConfig){


      

   
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

        $scope.eventSources = [];

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