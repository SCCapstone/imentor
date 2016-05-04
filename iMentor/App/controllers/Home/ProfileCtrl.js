
app.controller('profileCtrl', ['$scope', '$rootScope', '$routeParams', '$location', 'manageService',
    function profileCtrl($scope, $rootScope, $routeParams, $location, manageService) 
    {
        $scope.user = {};
        $scope.userId = $routeParams.userId;
        getUsers();
        getCurrentUser();


        // ---------------------------------------------------------------
        // Service Calls
        // ---------------------------------------------------------------
        function getUsers() {
            manageService.getUsers().then(
                function success(users) {
                    for (var i = 0; i < users.length; i++)
                    {
                        if(users[i].UrlId.localeCompare($scope.userId) == 0)
                        {
                            $scope.user = users[i];
                        }
                    }

                    $scope.tiles = buildGridModel({
                        icon: "avatar:svg-",
                        title: "",
                        background: ""
                    });
                },
                function error (error) {
                    $scope.status = 'Unable to load user data: ' + error.message;
                }
            );
        }

        function getCurrentUser() {
            manageService.getCurrentUser().then(
                function success(user) {
                    $scope.currentUser = user;
                    if (user.RoleId == 1) {
                        $scope.goToStudentView();
                    }
                },
                function fail(reason) {
                    console.log("Unable to load current user: " + reason);
                }
            );
        }


        // ---------------------------------------------------------------
        // Navigation
        // ---------------------------------------------------------------
        $scope.goToStudentView = function (id) {
            $location.path("/StudentView/");
        }

        $scope.goToEditUser = function(){
            $location.path("/EditUser/" + $scope.user.UrlId);
        }


        // ---------------------------------------------------------------
        // Grid List
        // ---------------------------------------------------------------
        function buildGridModel(tileTmpl) {
            if ($scope.user != undefined) {

                var it, results = [];

                it = angular.extend({}, tileTmpl);
                it.icon = it.icon + $scope.user.IconIndex;
                it.title = $scope.user.UserName;
                it.span = { row: 1, col: 1 };
                it.id = $scope.userId;

                
                switch ($scope.user.RoleId) {
                    case 1: //Student
                        it.background = "#26a69a";
                        it.span.row = it.span.col = 2;
                        break;
                    case 2: //Mentor
                        it.background = "#00796b";
                        it.span.row = it.span.col = 2;
                        break;
                    case 3: //Teacher
                        it.background = "#004d40";
                        it.span.row = it.span.col = 2;
                        break;
                    case 4://Administrator
                        it.background = "#004d40";
                        it.span.row = it.span.col = 2;
                        break;
                }

                results.push(it);

                return results;
            }
        }
    }
]);