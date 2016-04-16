
app.controller('editUserCtrl', ['$scope', '$routeParams', '$location', 'manageService',
    function EditUserCtrl($scope, $routeParams, $location, manageService) 
    {
        $scope.user = {};
        $scope.userId = $routeParams.userId;
        $scope.showOnlyAssignedListings = false;
        getUsers();


        $scope.avatarData1 = [{
            id: "avatar:svg-1",
            title: 'avatar 1',
            value: '1'
            },{
            id: "avatar:svg-2",
            title: 'avatar 2',
            value: '2'
            },{
            id: "avatar:svg-3",
            title: 'avatar 3',
            value: '3'
            },{
            id: "avatar:svg-4",
            title: 'avatar 4',
            value: '4'
        }];

        $scope.avatarData2 = [{
            id: "avatar:svg-5",
            title: 'avatar 5',
            value: '5'
            },{
            id: "avatar:svg-6",
            title: 'avatar 6',
            value: '6'
            },{
            id: "avatar:svg-7",
            title: 'avatar 7',
            value: '7'
            },{
            id: "avatar:svg-8",
            title: 'avatar 8',
            value: '8'
        }];

        $scope.avatarData3 = [{
            id: "avatar:svg-9",
            title: 'avatar 9',
            value: '9'
            },{
            id: "avatar:svg-10",
            title: 'avatar 10',
            value: '10'
            },{
            id: "avatar:svg-11",
            title: 'avatar 11',
            value: '11'
            },{
            id: "avatar:svg-12",
            title: 'avatar 12',
            value: '12'
        }];

        $scope.avatarData4 = [{
            id: "avatar:svg-13",
            title: 'avatar 13',
            value: '13'
            },{
            id: "avatar:svg-14",
            title: 'avatar 14',
            value: '14'
            },{
            id: "avatar:svg-15",
            title: 'avatar 15',
            value: '15'
            },{
            id: "avatar:svg-16",
            title: 'avatar 16',
            value: '16'
        }];

        // ---------------------------------------------------------------
        // Service Calls
        // ---------------------------------------------------------------
        function getUsers() {
            manageService.getUsers().then(
                function success(users) {
                    for (var i = 0; i < users.length; i++)
                    {
                        if(users[i].Id == $scope.userId)
                        {
                            $scope.user = users[i];
                            $scope.showOnlyAssignedListings = $scope.user.ShowOnlyAssignedListings;
                        }
                    }
                },
                function error (error) {
                    $scope.status = 'Unable to load user data: ' + error.message;
                }
            );
        }


        // ---------------------------------------------------------------
        // Functions
        // ---------------------------------------------------------------

        $scope.save = function () {
            $scope.updateUser();
                
            $location.path("/ManageUsers");
        }

        $scope.cancel = function () {
            $location.path("/ManageUsers");
        }
        $scope.updateUser = function () {
            $scope.user.ShowOnlyAssignedListings = $scope.showOnlyAssignedListings;

            manageService.updateUser($scope.user).then(
                function success(response) {
                }
            );
        }

        $scope.roleChanged = function (){
            $scope.showOnlyAssignedListings = false;
        }
    }
]);