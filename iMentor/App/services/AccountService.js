'use strict';

app.factory('accountService', ['$http', '$q', 'apiService',
function ($http, $q, apiService) {
    return {
        getCurrentUser: function () {
            var url = rootUrl + 'api/account/getCurrentUser';
            return apiService.httpGet(url, false);
        },

        logout: function () {
            var url = rootUrl + 'api/account/logout';
            return apiService.httpGet(url, false);
        },
    };
}]);