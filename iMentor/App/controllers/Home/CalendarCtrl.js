

app.controller('calendarCtrl', ['$scope', '$http', '$uibModal',
    function CalendarCtrl($scope,$uibModal, $http, uiCalendarConfig){

        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();
        var currentView = "month";
   
        $scope.uiConfig = {
            calendar: {
                height: 900,
                editable: true,

                header: {
                    left: 'today,prev, next',
                    center: 'title',
                    right: 'month,basicWeek,basicDay'

                },
                 eventClick:  function(event, jsEvent, view) {
            $('#modalTitle').html(event.title);
            $('#modalBody').html(event.description);
           
            $('#fullCalModal').modal();
        }
            }
        };


        $scope.getListings = function() {
            console.log("Does this work?");
            $http.get('/calendar/getListingsByCurrentUser').success(function (listings) {
                console.log(listings);
                for(var i = 0; i < listings.length; i++)
                {
                    $scope.events[i] = { id: listings[i].ID, title: listings[i].Title, start: new Date(listings[i].StartDate), end: new Date(listings[i].EndDate), allDay: false };
                    console.log(listings);
                    console.log(events.length);
                }
            })
            .error(function (error) {
                $scope.status = 'Unable to load listing data: ' + error.message;
            });

            console.log(events.length);
            $scope.eventSources = [$scope.events];
            console.log(eventSources.length);
        }
      
    }
]);