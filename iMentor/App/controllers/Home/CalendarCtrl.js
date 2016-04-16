
// ---------------------------------------------------------------
// Calendar controller- sets up calendar to pull events from database
// ---------------------------------------------------------------

app.controller('calendarCtrl', ['$scope','$rootScope',  '$routeParams','$location', '$q', '$log',  'manageService',  'uiCalendarConfig',  'CalendarData', 'EventSourceFactory',
    function CalendarCtrl($scope,$rootScope, $routeParms, $location, $q, $log, manageService, uiCalendarConfig,CalendarData, EventSourceFactory){

        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();
        var currentView = "month";
      

        $scope.events = [];
        $scope.events2 = [];
        $scope.authNeeded = false;
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
        
            }
        };


      
        // ---------------------------------------------------------------
        // Retrieves listings from database, populates calendar, on
        // event click redirects to listing detail page.
        // ---------------------------------------------------------------  
        // load calendars from google and pass them as event sources to fullcalendar
        /*$scope.loadSources = function () {
            EventSourceFactory.getEventSources().then(function (result) {
               
                $scope.events = result;
               
                
                angular.forEach(result, function (source) {
                    $scope.myCalendar.fullCalendar('addEventSource', source);
                    $scope.eventSources = [$scope.events];
                });
            });
        };

        // request Google authorization from the user
        $scope.requestAuth = function () {
            gapi_helper.requestAuth();
        };

        // configure gapi-helper
       
        gapi_helper.configure({
            clientId: '1086641013362-rj0u1ckimo3hs369gc8q40bvqs2d1rau.apps.googleusercontent.com',
            apiKey: 'AIzaSyAbFYYKc7cdZwPTYhi9wK-C_hwZku3lVaE',
            scopes: 'https://www.googleapis.com/auth/calendar',
            services: {
                calendar: 'v3'
            }
        });

        // set authNeeded to appropriate value on auth events
        gapi_helper.when('authorized', function () {
           
            $scope.authNeeded = false;
           
        });
        gapi_helper.when('authFailed', function () {
          
            $scope.authNeeded = true;
          
        });

        // load the event sources when the calendar api is loaded
        gapi_helper.when('calendarLoaded', $scope.loadSources);*/
      
     
       

 

                      
           

              
           

         function getListings() {
             manageService.getListingsByCurrentUser()
                .then(function success(listings) {


                   
                    for(var i = 0; i < listings.length; i++)
                    {
                        
                        
                        var startDate = new Date(moment(new Date(parseInt(listings[i].StartDate.substr(6)))).format('YYYY/MM/DD'));
                        var endDate = new Date(moment(new Date(parseInt(listings[i].EndDate.substr(6)))).format('YYYY/MM/DD'));
                        

                  var weekday = new Array(7);
                  weekday[0] = "U";
                  weekday[1] = "M";
                  weekday[2] = "T";
                  weekday[3] = "W";
                  weekday[4] = "R";
                  weekday[5] = "F";
                  weekday[6] = "S";


                        $scope.events.push({
                            id: listings[i].Id,
                            title: listings[i].Title,
                            start: new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()),
                            end: new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()),
                            url: "/#!/Listing/" + listings[i].Id,
                            frequency: listings[i].Frequency,
                            allDay: false,
                            stick: true

                     
                        });
                    }

                    $scope.eventSources = [$scope.events];
                })
              
        }

          function getCurrentUser(){
            manageService.getCurrentUser().then(
                function success(user){
                    $scope.user = user;
                },
                function fail(reason){
                    console.log("Unable to load current user: " + reason);
                }
            );
          }

          function getUsersByListing() {
              manageService.getUsersByListing().then(
                  function success(user) {
                      $scope.user = user
                    
                  },
                  function fail(reason) {
                      console.log("Cannot find user: " + reason);
                  }
              );
          }

       

        //
        //
        //
      
    }
]);