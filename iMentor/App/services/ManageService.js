

app.factory('manageService', ['$http', '$q', 'apiService',
    function ($http, $q, apiService) {

        var manageService = {};

        manageService.getListings = function () {
            var url = '/manage/getListings';

            return apiService.httpGet(url, false);
        };

        manageService.addListing = function (listing) {
            var url = 'Manage/AddListing';

            return apiService.httpPost(url, listing);
        }

        manageService.deleteListing = function (listing) {
            var url = 'Manage/DeleteListing';

            return apiService.httpPost(url, listing);
        }

        manageService.updateListing = function (listing) {
            var url = 'Manage/UpdateListing';

            return apiService.httpPost(url, listing);
        }

        manageService.getListingsByCurrentUser = function() {
            var url = '/manage/getListingsByCurrentUser';

            return apiService.httpGet(url, false);
        }  



        manageService.getUsers = function () {
            var url = '/manage/getUsers';

            return apiService.httpGet(url, false);
        };

        manageService.getCurrentUser = function () {
            var url = '/manage/getCurrentUser';

            return apiService.httpGet(url, false);
        };

        manageService.getStudents = function () {
            var url = '/manage/getStudents';

            return apiService.httpGet(url, false);
        };

        manageService.getMentors = function () {
            var url = '/manage/getMentors';

            return apiService.httpGet(url, false);
        };

        manageService.getTeachers = function () {
            var url = '/manage/getTeachers';

            return apiService.httpGet(url, false);
        };

        manageService.addUser = function (user) {
            var response = $http({
                method: "post",
                url: "Manage/AddUser",
                data: JSON.stringify(user),
                dataType: "json"
            });
            return response;
        }

        manageService.deleteUser = function (user) {
            var response = $http({
                method: "post",
                url: "Manage/DeleteUser",
                data: JSON.stringify(user),
                dataType: "json"
            });
            return response;
        }

        manageService.updateUser = function (user) {
            var url = 'Manage/UpdateUser';

            return apiService.httpPost(url, user);
        }

        manageService.getUsersByListing = function (data) {
            var url = 'manage/getUsersByListing';

            return apiService.httpGetData(url, data);
        }

        manageService.removeParticipant = function (assigment) {
            var url = 'manage/removeParticipant';
            
            return apiService.httpPost(url, assigment);
        }

        manageService.addParticipant = function (assigment) {
            var url = 'manage/addParticipant';
            
            return apiService.httpPost(url, assigment);
        }

        manageService.getAssignments = function(){
            var url = 'manage/getAssignments';

            return apiService.httpGet(url, false);
        }

        manageService.removeApplicant = function (applicant) {
            var url = 'manage/removeApplicant';
            
            return apiService.httpPost(url, applicant);
        }

        manageService.addApplicant = function (applicant) {
            var url = 'manage/addApplicant';
            
            return apiService.httpPost(url, applicant);
        }

        manageService.getApplicants = function(){
            var url = 'manage/getApplicants';

            return apiService.httpGet(url, false);
        }



        manageService.getRoles = function () {
            return $http.get('/manage/getRoles');
        };

        manageService.getRoleByUser = function (user) {
            var response = $http({
                method: "get",
                url: "Manage/GetRoleByUser",
                data: JSON.stringify(user),
                dataType: "json"
            });
            return response;
        }

        

        return manageService;
    }
]);