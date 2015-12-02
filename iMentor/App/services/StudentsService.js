app.factory('studentsService', ['$http', function ($http) {
    var studentsService = {};

    studentsService.getStudent = function () {
        return $http.get('/Students/GetStudents');
    };

    return studentsService;

}]);