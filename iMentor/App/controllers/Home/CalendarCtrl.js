

app.controller('calendarCtrl', ['$scope', 'calendarService', 
    function CalenadarCtrl($scope, calendarService){

        $scope.userListings = [];
        getListingsByCurrentUser();

        var events = [
                {title: "Test", start: new Date (2016, 02, 11)}
        ];

        $scope.eventSources = [events];
        $scope.calOptions = {
            editable: true,
            header:{
                left: 'prev',
                center:'title',
                right: 'next'
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