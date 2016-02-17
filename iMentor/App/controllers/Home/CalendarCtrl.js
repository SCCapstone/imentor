

app.controller('calendarCtrl', ['$scope', 'calendarService', 
    function CalendarCtrl($scope, calendarService, uiCalendarConfig){

    $scope.userListings= [];
    $scope.events = [];
    getListingsByCurrentUser();
    console.log($scope.userListings);
    console.log($scope.userListings.length);

      for (var i = 0; i < $scope.userListings.length; i++)
      {
          events.push({title: userListings[i].Title, start: userListings[i].StartDate})
      }
 

      
      $scope.eventSources = [$scope.userListings];
 
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
        

        function getListingsByCurrentUser() {
            calendarService.getListingsByCurrentUser()
                .success(function (listings) {
                    $scope.userListings = listings;
                })
                .error(function (error) {
                    $scope.status = 'Unable to load listing data: ' + error.message;
                });
        }

       
     

    }
]);