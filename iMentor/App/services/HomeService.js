

app.factory('homeService', ['$http',
    function ($http) {

        var homeService = {};

        homeService.getListings = function () {
            return $http.get('/home/getListings');
        };
 
        return homeService;
    }
]);