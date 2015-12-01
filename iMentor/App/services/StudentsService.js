StudentsApp.factory('StudentsService', ['$http', function ($http) {
    var StudentsService = {};

    StudentsService.getStudent = function () {
        return $http.get('/Students/GetStudents');
    };

    return StudentsService;

}]);