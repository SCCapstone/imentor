
app.controller('editListingCtrl', ['$scope', '$rootScope', '$routeParams', '$location', 'manageService',
    function EditListingCtrl($scope, $rootScope, $routeParams, $location, manageService) 
    {
        $scope.editMode = false;

        $scope.bools = ['True', 'False'];
        $scope.selectedBool = null;

        $scope.areas = ['Math', 'Science', 'History', 'Reading', 'Computer Science'];
        $scope.selectedArea = null;

        var DEFAULT_PWD = '1234567890';

        $scope.usernamePattern = /^([A-Za-z0-9_-]){3,50}$/;
        $scope.passwordPattern = /^([\@A-Za-z0-9_-]){6,50}$/;
        $scope.namePattern_100 = /^[A-Za-z0-9_-\s]{1,100}$/;
        $scope.emailPattern = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        $scope.listingId = $routeParams.listingId;
        var id = $scope.listingId;


        getCurrentUser();


        $scope.isNew = ($scope.listingId < 1);
        if (!$scope.isNew) {
            getListings();
        }

        // ---------------------------------------------------------------
        // Load Database Listings
        // ---------------------------------------------------------------
        function getListings() {
            manageService.getListings()
                .success(function (listings) {
                    for (var i = 0; i < listings.length; i++)
                    {
                        if(id == 0)
                        {
                            $scope.listing = null;
                        }
                        else if(listings[i].ID == id)
                        {
                            $scope.listing = listings[i];
                            $scope.listing.StartDate = new Date(parseInt(listings[i].StartDate.substr(6)));
                            $scope.listing.EndDate = new Date(parseInt(listings[i].EndDate.substr(6)));
                        }
                    }
                })
                .error(function (error) {
                    $scope.status = 'Unable to load listing data: ' + error.message;
                });
        }

        function getCurrentUser(){
            manageService.getCurrentUser()
                .success(function (user) {
                    $scope.user = user;
                })
                .error(function (error) {
                    $scope.status = 'Unable to load listing data: ' + error.message;
                });
        }


        // ---------------------------------------------------------------
        // Functions
        // ---------------------------------------------------------------

        $scope.save = function () {
            if (!$scope.listingForm.open.$invalid
                && !$scope.listingForm.startDate.$invalid && !$scope.listingForm.endDate.$invalid
                && !$scope.listingForm.title.$invalid && !$scope.listingForm.email.$invalid) {
                if ($scope.isNew) {
                    $scope.addListing();
                }
                else {
                    $scope.updateListing();
                }
                $location.path("/ManageListings");
            }
        }

        $scope.cancel = function () {
            $location.path("/ManageListings");
        }

        $scope.addListing = function () {
            manageService.addListing($scope.listing)
                .success(function (response) {
                });
        }

        $scope.updateListing = function () {
            manageService.updateListing($scope.listing)
                .success(function (response) {
                });
        }

        $scope.toggleEditMode = function () {
            $scope.editMode = !$scope.editMode;
        }


        // ---------------------------------------------------------------
        // Drop Boxes
        // ---------------------------------------------------------------

        $scope.dropboxboolselected = function (item) {
            $scope.selectedBool = item;
        }

        $scope.dropboxareaselected = function (item) {
            $scope.selectedArea = item;
        }
    }
]);