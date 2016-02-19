

app.factory('manageService', ['$http',
    function ($http) {

        var manageService = {};

        manageService.getListings = function () {
            return $http.get('/manage/getListings');
        };

        manageService.getListingById = function(listingId)
        {
            return $http.get('/manage/getListingById', {
                params: { listingId: listingId }
            });
        };
 
        return manageService;

    }
]);