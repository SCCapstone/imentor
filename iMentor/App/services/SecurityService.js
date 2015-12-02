'use strict';

app.factory('securityService', function ($rootScope, $window, $q, $log, accountService)
{
	var authComplete = false;
	var passwordResetIsEnabled = null;

	$rootScope.appData = null;

	return {

		setCurrUser: function (appUser)
		{
			// Add the current user to session storage
			$window.sessionStorage.setItem(SESSKEY_CURRUSER, JSON.stringify(appUser));

			this.setAuthComplete();
		},

		setAuthComplete: function ()
		{
			$rootScope.$broadcast(BROADCAST_AUTHCOMPLETE);
			authComplete = true;
		},

		getAuthComplete: function ()
		{
			return authComplete;
		},

		getCurrUser: function ()
		{
			return JSON.parse($window.sessionStorage.getItem(SESSKEY_CURRUSER));
		},

		isAuthenticated: function ()
		{
			if ($window.sessionStorage.getItem(SESSKEY_ACCESSTOKEN))
				return true;
			return false;
		},

		logout: function ()
		{
			// Remove the access token from session storage
			$window.sessionStorage.removeItem(SESSKEY_ACCESSTOKEN);
			$window.sessionStorage.removeItem(SESSKEY_CURRUSER);
			// Clear the auth flag
			authComplete = false;
		},
	};
});