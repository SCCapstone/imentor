

app.controller('calendarCtrl', ['$scope', 'calendarService', 
    function CalenadarCtrl($scope, calendarService){

        $scope.userListings = [];
        getListingsByCurrentUser();
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
        //events.push({ title: $scope.userListings[0].Title, start: $scope.userListings[0].StartDate });

        $scope.eventSources = [events];
        $scope.calOptions = {
            eventStartEditable: true,
            header:{
                left: 'prev',
                center:'title',
                right: 'next',
                prev: 'left-single-arrow',
                next: 'right-single-arrow',
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