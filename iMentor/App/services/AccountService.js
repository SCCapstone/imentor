'use strict';

app.factory('accountService', function ($http, $q, $log, apiService) {
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
});