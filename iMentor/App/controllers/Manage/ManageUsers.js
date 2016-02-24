
app.controller('manageUsersCtrl', ['$scope', '$rootScope', '$location', 'manageService',
    function ManageUsersCtrl($scope, $rootScope, $location, manageService) 
    {
        $scope.currentUserIsAdmin = true;
        getUsers();

        // ---------------------------------------------------------------
        // Grid
        // ---------------------------------------------------------------
        $scope.gridOptions = {
            data: "users",
            columnDefs: [
            { field: 'ID', displayName: 'Id', visible: false },
            { field: 'UserName', displayName: 'User Name', width: '20%', cellClass: 'gridCellLeft', headerClass: 'gridHeaderLeft' },
            { field: 'Email', displayName: 'Email', width: '24%', cellClass: 'gridCellLeft', headerClass: 'gridHeaderLeft' },
            { field: 'RoleId', displayName: 'Role', width: '24%', cellClass: 'gridCellLeft', headerClass: 'gridHeaderLeft' },
            {
                field: ' ',
                displayName: 'Edit',
                width: '5%',
                cellTemplate: 'Templates/EditBtn.html',
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
        // Load Data
        // ---------------------------------------------------------------
        function getUsers() {
            manageService.getUsers()
                .success(function (users) {
                    $scope.users = users;

                    for(var i = 0; i < users.length; i++)
                    {
                        $scope.users[i].RoleId = getRoleByUser($scope.users[i]);
                    }
                })
                .error(function (error) {
                    $scope.status = 'Unable to load listing data: ' + error.message;
                });
        }

        function getRoleByUser(user) {
            manageService.getRoleByUser(user)
                .success(function (role) {
                console.log(role);
                    return role;
                })
                .error(function (error) {
                    $scope.status = 'Unable to load listing data: ' + error.message;
                });
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