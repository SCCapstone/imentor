var StudentsApp = angular.module('StudentsApp', [])

StudentsApp.controller('StudentsController', function ($scope, StudentsService) {
 
    $scope.studentId = getStudent();


    //******************************//
    //          Functions           //
    //******************************//
    function getStudent() {
        StudentsService.getStudent()
            .success(function (studentId) {
                $scope.studentId = studentId;
                console.log($scope.studentId);
            })
            .error(function (error) {
                $scope.status = 'Unable to load user data: ' + error.message;
                console.log($scope.status);
            });
    }
});
 
StudentsApp.factory('StudentsService', ['$http', function ($http) {
    var StudentsService = {};

    StudentsService.getStudent = function () {
        return $http.get('/Students/GetStudents');
    };

    return StudentsService;
 
}]);