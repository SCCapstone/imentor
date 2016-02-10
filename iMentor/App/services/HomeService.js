'use strict';

app.factory('homeService', ['$http', 'apiService',
function ($http, apiService) {

    //return{
    //    getListings: function(){
    //        var url = 'api/home/getlistings';
    //        return apiService.httpGet(url, false);
    //    }
    //}

    var homeService = {};

    homeService.getListings = function () {
        return $http.get('/home/getlistings');
    };
 
    return homeService;
 
}]);