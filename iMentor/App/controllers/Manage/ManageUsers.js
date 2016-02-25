
app.controller('manageUsersCtrl', ['$scope', '$rootScope', '$location', 'manageService',
    function ManageUsersCtrl($scope, $rootScope, $location, manageService) 
    {
        $scope.currentUserIsAdmin = true;
        $scope.users = [];
        getUsers();

        // ---------------------------------------------------------------
        // Grid
        // ---------------------------------------------------------------
        $scope.gridOptions = {
            data: "users",
            columnDefs: [
            { field: 'Id', displayName: 'Id', visible: false },
            { field: 'UserName', displayName: 'User Name', width: '250', cellClass: 'gridCellLeft', headerClass: 'gridHeaderLeft' },
            { field: 'Email', displayName: 'Email', width:'250', cellClass: 'gridCellLeft', headerClass: 'gridHeaderLeft' },
            { field: 'RoleId', displayName: 'RoleId', visible: false },
            { field: 'Role', displayName: 'Role', width: '183', cellClass: 'gridCellLeft', headerClass: 'gridHeaderLeft' },
            {
                field: ' ',
                displayName: 'Edit',
                width: '100',
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
            manageService.getUsers()
                .success(function (users) {
                    $scope.users = users;
                })
                .error(function (error) {
                    $scope.status = 'Unable to load listing data: ' + error.message;
                });
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
    }
]);