

app.controller('calendarCtrl', ['$scope', 'calendarService', 
    function CalendarCtrl($scope, calendarService, uiCalendarConfig){

        $scope.userListings = [];

        console.log("controller user listings" + $scope.userListings.length);
        $scope.events = [];
        $scope.eventSources = [

         '/calendar/getListingsByCurrentUser'
        ];
        console.log($scope.eventSources.length);
   
        console.log("controller events length" + $scope.events.length);
        //console.log("controller event sources" + $scope.eventSources.length);
 
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

        $scope.$on('$viewContentLoaded', function () {
            $scope.getListings();
           });
  

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