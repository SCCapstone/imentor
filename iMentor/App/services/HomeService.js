'use strict';

app.factory('homeService', ['apiService',
function (apiService) {

    return{
        getUser: function(){
            var url = 'api/Home/GetUser';
            return apiService.httpGet(url, false);
        }
    }
 
}]);