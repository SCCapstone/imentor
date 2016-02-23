

app.factory('calendarService', ['$http',
    function ($http) {

        var calendarService = {};

        calendarService.getListings = function () {
            return $http.get('/calendar/getListings');
        };

        calendarService.getListingsByCurrentUser = function (user) {
            return $http.get('/calendar/getListingsByCurrentUser');
        };
 
        return calendarService;

    }
]);