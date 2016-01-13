'use strict';

app.factory('homeService', function (apiService) {

    return{
        getUser: function(){
            var url = rootUrl + 'api/Home/GetUser';
            return apiService.httpGet(url, false);
        }
    }
 
});