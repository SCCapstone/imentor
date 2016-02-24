

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

        manageService.updateListing = function (listing) {
            var response = $http({
                method: "post",
                url: "Manage/UpdateListing",
                data: JSON.stringify(listing),
                dataType: "json"
            });
            return response;
        }
        return manageService;
    }
]);