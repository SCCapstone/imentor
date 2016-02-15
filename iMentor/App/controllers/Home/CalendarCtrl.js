

app.controller('calendarCtrl', ['$scope', 'calendarService', 
    function CalenadarCtrl($scope, calendarService, uiCalendarConfig){

       var userListings = [];
       var data = getListingsByCurrentUser();
        //$scope.numberOfListings = data.length();
        //$scope.length2 = getListingsByCurrentUser().length;

        var events = [];
        /*
        var events = [
                {title: "Test", start: new Date (2016, 02, 11)}
        ];
        
        var length = userListings.length;
        var tempTitle = "";
        var tempDate = "";
        
        for (var i = 0; i < length; ++i) {
            userListings[i].Title = tempTitle;
            userListings[i].StartDate = tempDate;

            events.push({title: tempTitle, start: tempDate})
        }
        */
        events.push({ title: "Test", start: new Date(2016, 02, 11) });
       userListings.push({ title: "new Testing", start: new Date(2016,2,16) });

        $scope.eventSources = [userListings];
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