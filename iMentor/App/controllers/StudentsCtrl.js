app.controller('studentsCtrl', function ($scope, StudentsService) {

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