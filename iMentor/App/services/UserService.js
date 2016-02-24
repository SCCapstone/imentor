

app.factory('userService', ['$http',
    function ($http) {

        var userService = {};

        userService.getUsers = function () {
            var response = $http({
                method: "get",
                url: "Manage/GetUser"
            });
            return response;
        };


        userService.addUser = function (user) {
            var response = $http({
                method: "post",
                url: "Manage/AddUser",
                data: JSON.stringify(user),
                dataType: "json"
            });
            return response;
        }

        userService.deleteUser = function (user) {
            var response = $http({
                method: "post",
                url: "Manage/DeleteUser",
                data: JSON.stringify(user),
                dataType: "json"
            });
            return response;
        }

        userService.updateUser = function (user) {
            var response = $http({
                method: "post",
                url: "Manage/UpdateUser",
                data: JSON.stringify(user),
                dataType: "json"
            });
            return response;
        }

        return userService;
    }
]);