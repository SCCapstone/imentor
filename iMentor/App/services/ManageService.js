

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




        manageService.getUsers = function () {
            return $http.get('/manage/getUsers');
        };

        manageService.getCurrentUser = function () {
            return $http.get('/manage/getCurrentUser');
        };

        manageService.addUser = function (user) {
            var response = $http({
                method: "post",
                url: "Manage/AddUser",
                data: JSON.stringify(user),
                dataType: "json"
            });
            return response;
        }

        manageService.deleteUser = function (user) {
            var response = $http({
                method: "post",
                url: "Manage/DeleteUser",
                data: JSON.stringify(user),
                dataType: "json"
            });
            return response;
        }

        manageService.updateUser = function (user) {
            var response = $http({
                method: "post",
                url: "Manage/UpdateUser",
                data: JSON.stringify(user),
                dataType: "json"
            });
            return response;
        }



        manageService.getRoles = function () {
            return $http.get('/manage/getRoles');
        };

        manageService.getRoleByUser = function (user) {
            var response = $http({
                method: "get",
                url: "Manage/GetRoleByUser",
                data: JSON.stringify(user),
                dataType: "json"
            });
            return response;
        }

        return manageService;
    }
]);