
app.factory('apiService', ['$http', '$q',
    function ($http, $q) {
        return {
            httpGet: function (url, useCache) {
                var doCache = (typeof useCache !== "undefined") ? useCache : false;

                var deferred = $q.defer();
                $http({ method: 'GET', url: url, cache: doCache }).
                    success(function (response) {
                        deferred.resolve(response);
                    }).
                    error(function (errorData, httpResponseCode) {
                        deferred.reject("Failed to get: " + httpResponseCode + ", " + errorData);
                    });
                return deferred.promise;
            },

            httpGetData: function (url, data) {
                var deferred = $q.defer();
                $http({ method: 'GET', url: url, params: {data : data} }).
                    success(function (response) {
                        deferred.resolve(response);
                    }).
                    error(function (errorData, httpResponseCode) {
                        deferred.reject("Failed to get: " + httpResponseCode + ", " + errorData);
                    });
                return deferred.promise;
            },

            httpPost: function (url, data) {
                var deferred = $q.defer();
                $http({ method: 'POST', url: url, data: JSON.stringify(data), dataType: "json" }).
                    success(function (response) {
                        deferred.resolve(response);
                    }).
                    error(function (errorData, httpResponseCode) {
                        deferred.reject("error");
                    });
                return deferred.promise;
            }
        };
    }
]);