app.factory('hangoutService', ['$http',
    function ($http) {
    
     var hangoutService = {};
     $scope.hangoutUrl = gapi.hangout.getHangoutUrl();
       
       
        hangoutService.getListings = function () {
            return $http.get('/manage/getListings');
        };


         hangoutService.addHangout = function (listing) {
             var response = $http({
                 method: "post",
                 url: "Manage/UpdateListing",
                 data:gapi.hangout.getHangoutUrl(),
                dataType: "json"
            });
            return response;
         };


     onClientReady = function() {

            gapi.hangout.onApiReady.add(function (e) {
                if (e.isApiReady) {
                    onApiReady();
                }

            });
        };
    
    
    
    }]);