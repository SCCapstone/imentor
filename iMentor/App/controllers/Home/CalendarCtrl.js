

app.controller('calendarCtrl', ['$scope', '$http', '$uibModal', 'calendarService', 'modalOptionService', 'uiCalendarConfig',
    function CalendarCtrl($scope, $uibModal, $http, calendarService, modalOptionService, uiCalendarConfig){

        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();
        var currentView = "month";

        $scope.events = [];
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
                 eventClick:  function(event, jsEvent, view) {
         $scope.selectListing = function (listing) {
            $scope.showListingDetail(listing);
         };
         $scope.showListingDetail = function (listing) {
             var modalOptions = modalOptionService.optionsForEventDetails(listing);
             var modalInstance = $uibModal.open(modalOptions);

             modalInstance.result.then(
                 null,
                 function cancel() {
                     // No-op
                 });
         };

        }
            }
        };


        function getListings() {
            calendarService.getListings()
                .success(function (listings) {
                    for(var i = 0; i < listings.length; i++)
                    {
                        var startDate = new Date(moment(new Date(parseInt(listings[i].StartDate.substr(6)))).format('YYYY/MM/DD'));
                        var endDate = new Date(moment(new Date(parseInt(listings[i].EndDate.substr(6)))).format('YYYY/MM/DD'));

                        $scope.events.push({
                            id: listings[i].ID,
                            title: listings[i].Title,
                            start: new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()),
                            end: new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()),
                            allDay: false
                        });
                    }

                    $scope.eventSources = [$scope.events];
                })
                .error(function (error) {
                    $scope.status = 'Unable to load listing data: ' + error.message;
                });
        }
      
    }
]);