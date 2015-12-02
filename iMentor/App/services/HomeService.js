'use strict';

app.factory('homeService', ['$http', function ($http, apiService) {
 
    var homeService = {};
    homeService.getUser = function () {
        return $http.get('/Home/GetUser');
    };
    return homeService;
 
}]);