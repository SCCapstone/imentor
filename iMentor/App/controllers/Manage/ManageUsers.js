
app.controller('manageUsersCtrl', ['$scope', '$rootScope', '$location', 'manageService',
    function ManageUsersCtrl($scope, $rootScope, $location, manageService) 
    {
        $scope.users = [];
        getUsers();
        getCurrentUser();

        // ---------------------------------------------------------------
        // Grid
        // ---------------------------------------------------------------
        $scope.gridOptions = {
            data: "users",
            columnDefs: [
            { field: 'Id', displayName: 'Id', visible: false },
            { field: 'UserName', displayName: 'User Name', width: '35%', cellClass: 'gridCellLeft', headerClass: 'gridHeaderLeft' },
            { field: 'Email', displayName: 'Email', width:'35%', cellClass: 'gridCellLeft', headerClass: 'gridHeaderLeft' },
            { field: 'RoleId', displayName: 'RoleId', visible: false },
            { field: 'Role', displayName: 'Role', width: '16%', cellClass: 'gridCellLeft', headerClass: 'gridHeaderLeft' },
            {
                field: ' ',
                displayName: 'Edit',
                width: '10%',
                cellTemplate: 'Templates/EditUsersBtn.html',
                cellClass: 'gridCellCenter',
                headerClass: 'gridHeaderCenter',
                sortable: false
            },
            ],
            enableColumnResize: true,
            enableSorting: true,
            enableHighlighting: false,
            selectWithCheckboxOnly: true,
            keepLastSelected: false,
            multiSelect: false,
            showSelectionCheckbox: false,
            showColumnMenu: false,
            showFilter: false,
            showGroupPanel: false,
            showFooter: false,
            useExternalSorting: false,
            beforeSelectionChange: function ()
            {
                return false;
            },
            rowHeight: 35
        };

        // ---------------------------------------------------------------
        // Manage Users
        // ---------------------------------------------------------------
        function getUsers() {
            manageService.getUsers().then(
                function success(users) {
                    $scope.users = users;
                },
                function error (error) {
                    $scope.status = 'Unable to load listing data: ' + error.message;
                }
            );
        }

        function getCurrentUser() {
            manageService.getCurrentUser().then(
                function success(user) {
                    $scope.user = user;
                    if($scope.user.RoleId == 1){
                        $scope.goToStudentView();
                    }
                },
                function fail(reason) {
                    console.log("Unable to load current user: " + reason);
                }
            );
        }



        $scope.refreshUsers = function () {
            getUsers();
        }

        // ---------------------------------------------------------------
        // Navigation
        // ---------------------------------------------------------------
        $scope.editUser = function (userId)
        {
            $location.path("/EditUser/" + userId);
        }

        $scope.showInactiveUsers = function()
        {
            console.log("Show Inactive Listings");
        }

        $scope.goToStudentView = function (id) {
            $location.path("/StudentView/");
        }
    }
]);