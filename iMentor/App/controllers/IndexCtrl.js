

app.controller('indexCtrl', [ '$scope', '$location', 'manageService',
    function IndexCtrl($scope, $location, manageService) {
        expireListings();
        getCurrentUser();

        //---------------------------------------------------
        // Service Calls
        //---------------------------------------------------
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

        //---------------------------------------------------
        // Functions
        //---------------------------------------------------
        function expireListings() {
            manageService.getListings().then(
                function success(listings){
                    
                    var currentDate = new Date();

                    for(var i = 0; i < listings.length; i++){

                        var listingEndDate = new Date(parseInt(listings[i].EndDate.substr(6)));

                        console.log("Current Date: " + currentDate);
                        console.log("End Date: " + listingEndDate);

                        if(currentDate > listingEndDate && listings[i].Open){
                            console.log("Listing has expired: " + listings[i].Id);
                            //listings[i].Open = false;
                        }
                    }
                }
            )
        }

        //---------------------------------------------------
        // Navigation
        //---------------------------------------------------

        $scope.goToHome = function ()
        {
            $location.path('/');
        };

        $scope.goToManageUsers = function () {
            $location.path('/ManageUsers');
        };

        $scope.goToManageListings = function () {
            $location.path('/ManageListings');
        };

        $scope.goToCalendar = function ()
        {
            $location.path('/Calendar');
        }

        $scope.goToLogin = function ()
        {
            $location.path('/Login');
        }
    }
]);
