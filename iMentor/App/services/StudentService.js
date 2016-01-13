'use strict';

app.factory('studentService', function (apiService) {
    return{
        getStudent: function (){
            var url = rootUrl + 'api/Students/GetStudents';
            return apiService.httpGet(url, false);
        }
    }
});