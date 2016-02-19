
app.controller('manageListingsCtrl', ['$scope', '$rootScope', '$location', 'manageService',
    function ManageListingsCtrl($scope, $rootScope, $location, manageService) 
    {
        var listing = $rootScope.currentListing;
        $scope.currentUserIsAdmin = true;
        getListings();

        // ---------------------------------------------------------------
        // Grid
        // ---------------------------------------------------------------
        $scope.gridOptions = {
            data: "listings",
            columnDefs: [
            { field: 'ID', displayName: 'Id', visible: false },
            { field: 'Title', displayName: 'Title', width: '20%', cellClass: 'gridCellLeft', headerClass: 'gridHeaderLeft' },
            { field: 'Mentor', displayName: 'Mentor', width: '20%', cellClass: 'gridCellLeft', headerClass: 'gridHeaderLeft' },
            { field: 'Description', displayName: 'First Name', width: '20%', cellClass: 'gridCellLeft', headerClass: 'gridHeaderLeft' },
            { field: 'StartDate', displayName: 'Last Name', width: '20%', cellClass: 'gridCellLeft', headerClass: 'gridHeaderLeft' },
            { field: 'EndDate', displayName: 'Last Name', width: '20%', cellClass: 'gridCellLeft', headerClass: 'gridHeaderLeft' },
            { field: 'Email', displayName: 'Email', width: '24%', cellClass: 'gridCellLeft', headerClass: 'gridHeaderLeft' },
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
        // Load Database Listings
        // ---------------------------------------------------------------
        function getListings() {
            manageService.getListings()
                .success(function (listings) {
                    $scope.listings = listings;
                })
                .error(function (error) {
                    $scope.status = 'Unable to load listing data: ' + error.message;
                });
        }


        // ---------------------------------------------------------------
        // Navigation
        // ---------------------------------------------------------------
        $scope.addListing = function ()
        {
            $scope.editListing(0);
        }

        $scope.editListing = function (listingId)
        {
            $location.path("/EditListing/" + listingId);
        }
        
        

        $scope.showInactiveListings = function()
        {
            console.log("Show Inactive Listings");
        }
    }
]);