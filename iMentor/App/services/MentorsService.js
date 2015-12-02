app.factory('mentorsService', ['$http', function ($http) {
    var mentorsService = {};

    mentorsService.getMentor = function () {
        return $http.get('/Mentors/GetMentor');
    };

    return mentorsService;

}]);