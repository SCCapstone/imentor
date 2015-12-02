app.controller('mentorsCtrl', function ($scope, MentorsService) {

    $scope.mentorId = getMentor();


    //******************************//
    //          Functions           //
    //******************************//
    function getMentor() {
        MentorsService.getMentor()
            .success(function (mentorId) {
                $scope.mentorId = mentorId;
                console.log($scope.mentorId);
            })
            .error(function (error) {
                $scope.status = 'Unable to load user data: ' + error.message;
                console.log($scope.status);
            });
    }
});