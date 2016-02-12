

app.factory('accountService', ['$http',
    function ($http) {

        var accountService = {};

        accountService.getCurrentUser = function () {
            return $http.get('/account/getCurrentUser');
        };
 
        return accountService;
    }
]);