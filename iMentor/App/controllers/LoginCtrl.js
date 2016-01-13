'use strict';

app.controller('loginCtrl',
    function ($scope, $log, $rootScope, $timeout, $location, accountService, securityService, apiService, urlService)
    {
 
        // When appUser is retrieved, call the security service to complete the authentication process
        function authComplete(appUser) {
            // The SecurityService stores the access token and current user in session storage
            securityService.setCurrUser(appUser);

            // All done - now redirect to dashboard
            $location.path(urlService.getReturnPath());

            urlService.clear();
        };
    }
);