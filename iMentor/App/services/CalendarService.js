

app.factory('calendarService', ['$http',
    function ($http) {

        var calendarService = {};

        calendarService.getListingsByCurrentUser = function (user) {
            return $http.get('/calendar/getListingsByCurrentUser');
        };
 
        return calendarService;

    }
]);