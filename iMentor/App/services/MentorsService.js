MentorsApp.factory('MentorsService', ['$http', function ($http) {
    var MentorsService = {};

    MentorsService.getMentor = function () {
        return $http.get('/Mentors/GetMentor');
    };

    return MentorsService;

}]);