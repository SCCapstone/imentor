
app.controller('manageListingsCtrl', ['$scope', '$rootScope', '$location', 'manageService',
    function ManageListingsCtrl($scope, $rootScope, $location, manageService) 
    {
        $scope.user = null;
        $scope.listings = [];
        getCurrentUser();
        getListings();
        

        // ---------------------------------------------------------------
        // Grid
        // ---------------------------------------------------------------
        $scope.gridOptions = {
            data: "listings",
            columnDefs: [
            { field: 'Id', displayName: 'Id', visible: false },
            { field: 'UrlId', displayName: 'UrlId', visible: false },
            { field: 'Title', displayName: 'Title', width: '20%', cellClass: 'gridCellLeft', headerClass: 'gridHeaderLeft' },
            { field: 'Area', displayName: 'Area', width: '12%', cellClass: 'gridCellLeft', headerClass: 'gridHeaderLeft' },
            { field: 'StartDate', displayName: 'Start', width: '20%', cellClass: 'gridCellLeft', headerClass: 'gridHeaderLeft' },
            { field: 'EndDate', displayName: 'End', width: '20%', cellClass: 'gridCellLeft', headerClass: 'gridHeaderLeft' },
            { field: 'Open', displayName: 'Open', width: '10%', cellClass: 'gridCellLeft', headerClass: 'gridHeaderLeft' },
            {
                field: ' ',
                displayName: 'Edit',
                width: '8%',
                cellTemplate: 'Templates/EditListingBtn.html',
                cellClass: 'gridCellCenter',
                headerClass: 'gridHeaderCenter',
                sortable: false
            },
            {
                field: ' ',
                displayName: 'Delete',
                width: '10%',
                cellTemplate: 'Templates/DltBtn.html',
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
        // Manage Listings
        // ---------------------------------------------------------------
        function getListings() {
            $scope.listings = [];
            manageService.getListings().then(
                function success(listings) {
                    for (var i = 0; i < listings.length; i++) {
                        listings[i].StartDate = new Date(parseInt(listings[i].StartDate.substr(6)));
                        listings[i].EndDate = new Date(parseInt(listings[i].EndDate.substr(6)));

                        listings[i].StartDate = (listings[i].StartDate.getMonth() + 1)  + "/" + listings[i].StartDate.getDate() + "/" + listings[i].StartDate.getFullYear()
                                                    + " " + parseTime(listings[i].StartDate);
                        listings[i].EndDate = (listings[i].EndDate.getMonth() + 1)  + "/" + listings[i].EndDate.getDate() + "/" + listings[i].EndDate.getFullYear()
                                                    + " " + parseTime(listings[i].EndDate);

                        $scope.listings.push(listings[i]);
                    }

                    //$scope.listings = listings;
                },
                function error(error) {
                    $scope.status = 'Unable to load listing data: ' + error.message;
                });
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

        $scope.deleteListing = function (row) {
            var index = $scope.gridOptions.data.indexOf(row.entity);
            var listing = null;

            for (var i = 0; i < $scope.listings.length; i++)
            {
                if($scope.listings[i].Id == row.entity.Id){
                    listing = $scope.listings[i];
                }
            }

            manageService.deleteListing(listing).then(
                function success(listings){
                    getListings();
                }
            )
        }

        $scope.refreshListings = function () {
            getListings();
        }

        function parseTime(e){
            var hours = "";
            var minutes = "";
            var ampm = "";

            if(e.getHours() == 0){
                hours = "12";
                ampm = "AM";
            } else if(e.getHours() < 12) { 
                hours = "" + e.getHours();
                ampm = "AM";
            } else if(e.getHours() == 12) { 
                hours = "12";
                ampm = "PM";
            } else if(e.getHours() > 12) { 
                hours = "" + (e.getHours() - 12);
                ampm = "PM";
            }

            if(e.getMinutes() < 10){
                minutes = "0" + e.getMinutes();
            } else {
                minutes = "" + e.getMinutes();
            }

            var t = hours + ":" + minutes + " " + ampm;
            return t;
        }


        // ---------------------------------------------------------------
        // Navigation
        // ---------------------------------------------------------------
        $scope.addListing = function ()
        {
            $scope.editListing(0);
            getListings();
        }

        $scope.editListing = function (listingId)
        {
            $location.path("/Listing/" + listingId);
        }
        
        $scope.showInactiveListings = function()
        {
            console.log("Show Inactive Listings");
        }

        $scope.goToStudentView = function (id) {
            $location.path("/StudentView/");
        }
    }
]);