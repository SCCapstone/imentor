var MentorsApp = angular.module('MentorsApp', [])

MentorsApp.controller('MentorsController', function ($scope, MentorsService) {
 
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
 
MentorsApp.factory('MentorsService', ['$http', function ($http) {
    var MentorsService = {};

    MentorsService.getMentor = function () {
        return $http.get('/Mentors/GetMentor');
    };

    return MentorsService;
 
}]);