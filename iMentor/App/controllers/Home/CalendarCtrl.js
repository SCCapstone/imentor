

app.controller('calendarCtrl', ['$scope', 'calendarService', 
    function CalendarCtrl($scope, calendarService, uiCalendarConfig){

        $scope.userListings = [];
        $scope.events = [];

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

        $scope.$on('$viewContentLoaded', function () {
            $scope.getListings();
        });


        $scope.getListings = function() {
            calendarService.getListingsByCurrentUser()
                .success(function (listings) {
                    $scope.userListings = listings;

                    for (var i = 0; i < listings.length; i++)
                    {
                        $scope.events.push({ title: listings[i].Title, start: listings[i].StartDate })
                    }
                })
                .error(function (error) {
                    $scope.status = 'Unable to load listing data: ' + error.message;
                });
        }
    }
]);