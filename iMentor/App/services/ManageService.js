

app.factory('manageService', ['$http',
    function ($http) {

        var manageService = {};

        manageService.getListings = function () {
            return $http.get('/manage/getListings');
        };

        manageService.addListing = function (listing) {
            var response = $http({
                method: "post",
                url: "Manage/AddListing",
                data: JSON.stringify(listing),
                dataType: "json"
            });
            return response;
        }

        manageService.deleteListing = function (listing) {
            var response = $http({
                method: "post",
                url: "Manage/DeleteListing",
                data: JSON.stringify(listing),
                dataType: "json"
            });
            return response;
        }

        manageService.getAspUsers = function () {
            return $http.get('/manage/getAspUsers');
        };

        manageService.getUserById = function(userId)
        {
            return $http.get('/manage/getUserById', {
                params: { userId: userId }
            });
        };
 
        return manageService;
    }
]);