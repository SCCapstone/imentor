'use strict';

app.factory('apiService', function ($http, $q) {
    return {
        httpGet: function (url, useCache) {
            var doCache = (typeof useCache !== "undefined") ? useCache : false;

            var deferred = $q.defer();
            $http({ method: 'GET', url: url, cache: doCache }).
                success(function (svcResponse) {
                    if (svcResponse.code == 0) {
                        deferred.resolve(svcResponse.data);
                    } else {
                        deferred.reject(null);
                    }
                }).
                error(function (errorData, httpResponseCode) {
                    deferred.reject(null);
                });
            return deferred.promise;
        },
    };
});