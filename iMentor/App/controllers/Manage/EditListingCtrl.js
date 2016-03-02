
app.controller('editListingCtrl', ['$scope', '$rootScope', '$routeParams', '$location', '$filter', '$timeout', 'manageService', 
    function EditListingCtrl($scope, $rootScope, $routeParams, $location, $filter, $timeout, manageService)
    {
        $scope.picker = { opened: false };

        $scope.openPicker = function () {
            $timeout(function () {
                $scope.picker.opened = true;
            });
        };

        $scope.closePicker = function () {
            $scope.picker.opened = false;
        };

        $scope.editMode = false;
        $scope.imagePath = null;

        $scope.bools = ['True', 'False'];
        $scope.selectedBool = null;

        //$scope.areas = ['Math', 'Science', 'History', 'Reading', 'Computer Science'];
        $scope.areas = [
            { value: 1, text: 'Math' },
            { value: 2, text: 'Science' },
            { value: 3, text: 'History' },
            { value: 4, text: 'Reading' },
            { value: 5, text: 'Computer Science' }
        ];
        $scope.selectedArea = null;

        $scope.listingId = $routeParams.listingId;
        var id = $scope.listingId;
        //$scope.listing.HangoutUrl = hangoutUrl;


        getCurrentUser();


        $scope.isNew = ($scope.listingId < 1);
        if (!$scope.isNew) {
            getListings();
        }

        

        function getImage()
        {
            if($scope.listing != null)
            {
                if ($scope.listing.Area == 'Math')
                    return 'img/Math.png';
                else if ($scope.listing.Area == 'Science')
                    return 'img/Science.png';
                else if ($scope.listing.Area == 'History')
                    return 'img/World.png';
                else if ($scope.listing.Area == 'Reading')
                    return 'img/Reading.png';
                else if($scope.listing.Area == 'Computer Science')
                    return 'img/ComputerScience.png';
                else
                    return 'img/Unknown.png';
            }
            console.log($scope.listing);
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
                            $scope.imagePath = getImage();
                            getUsersByListing(id);
                        }
                    }
                })
                .error(function (error) {
                    $scope.status = 'Unable to load listing data: ' + error.message;
                });
        }

        function getUsersByListing(listingId){
            manageService.getUsersByListing(listingId)
                .success(function (assignedUsers) {
                    $scope.assignedUsers = assignedUsers;
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

        $scope.showAreas = function () {
            if ($scope.listing != undefined)
            {
                var selected = $filter('filter')($scope.areas, { value: $scope.listing.Area });
                return ($scope.listing.Area && selected.length) ? selected[0].text : $scope.listing.Area;
            }
        };

         // ---------------------------------------------------------------
        // Hangouts
        // ---------------------------------------------------------------


        // ---------------------------------------------------------------
        // Drop Boxes
        // ---------------------------------------------------------------

        $scope.dropboxboolselected = function (item) {
            $scope.selectedBool = item;
        }

        $scope.dropboxareaselected = function (item) {
            $scope.selectedArea = item;
        }


        // ---------------------------------------------------------------
        // Grid list
        // ---------------------------------------------------------------

        $scope.tiles = buildGridModel({
            icon : "avatar:svg-",
            title: "Svg-",
            background: ""
        });
        function buildGridModel(tileTmpl){
            var it, results = [ ];
            for (var j=0; j<11; j++) {
                it = angular.extend({},tileTmpl);
                it.icon  = it.icon + (j+1);
                it.title = it.title + (j+1);
                it.span  = { row : 1, col : 1 };
                switch(j+1) {
                    case 1:
                        it.background = "red";
                        it.span.row = it.span.col = 2;
                        break;
                    case 2: it.background = "green";         break;
                    case 3: it.background = "darkBlue";      break;
                    case 4:
                        it.background = "blue";
                        it.span.col = 2;
                        break;
                    case 5:
                        it.background = "yellow";
                        it.span.row = it.span.col = 2;
                        break;
                    case 6: it.background = "pink";          break;
                    case 7: it.background = "darkBlue";      break;
                    case 8: it.background = "purple";        break;
                    case 9: it.background = "deepBlue";      break;
                    case 10: it.background = "lightPurple";  break;
                    case 11: it.background = "yellow";       break;
                }
                results.push(it);
            }
            return results;
        }
    }
]);