
app.controller('editListingCtrl', ['$scope', '$rootScope', '$q', '$routeParams', '$location', '$filter', '$timeout', 'manageService', 
    function EditListingCtrl($scope, $rootScope, $q, $routeParams, $location, $filter, $timeout, manageService)
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

        $scope.bools = [
            { value: 1, text: 'True' },
            { value: 2, text: 'False' }
        ];

        //$scope.areas = ['Math', 'Science', 'History', 'Reading', 'Computer Science'];
        $scope.areas = [
            { value: 1, text: 'Math' },
            { value: 2, text: 'Science' },
            { value: 3, text: 'History' },
            { value: 4, text: 'Reading' },
            { value: 5, text: 'Computer Science' }
        ];

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
        // Service Calls
        // ---------------------------------------------------------------
        function getListings(){
            manageService.getListings().then(
                    function success(listings)
                    {
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
                                getUsersByListing($scope.listingId);
                                getStudents();
                                getMentors();
                            }
                        }
                    },
                    function fail(reason)
                    {
                        console.log("Unable to load listing: " + reason);
                    }
                );
        }

        function getUsersByListing(listingId){
            manageService.getUsersByListing(listingId).then(
                function success(assignedUsers){
                    $scope.assignedUsers = assignedUsers;
                    $scope.tiles = buildGridModel({
                        icon: "avatar:svg-",
                        title: "Svg-",
                        background: ""
                    });
                },
                function fail(reason){
                    console.log("Unable to load users: " + reason);
                }
            );
        }

        function getCurrentUser(){
            manageService.getCurrentUser().then(
                function success(user){
                    $scope.user = user;
                },
                function fail(reason){
                    console.log("Unable to load current user: " + reason);
                }
            );
        }

        function getStudents(){
            manageService.getStudents().then(
                function success(students){
                    $scope.students = students;
                },
                function fail(reason){
                    console.log("Unable to load students: " + reason);
                }
            );
        }

        function getMentors(){
            manageService.getMentors().then(
                function success(mentors){
                    $scope.mentors = mentors;
                },
                function fail(reason){
                    console.log("Unable to load mentors: " + reason);
                }
            );
        }

        // ---------------------------------------------------------------
        // Functions
        // ---------------------------------------------------------------
        function CompareForSort(first, second)
        {
            if (first.RoleId == second.RoleId)
                return 0;
            if (first.RoleId > second.RoledId)
                return 1;
            else
                return -1; 
        }

        $scope.save = function () {
            if ($scope.isNew) {
                $scope.addListing();
            }
            else {
                $scope.updateListing();
            }
            $location.path("/ManageListings");
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
        

        function buildGridModel(tileTmpl) {
            if ($scope.assignedUsers != undefined) {

                for (var x = $scope.assignedUsers.length - 1; x >= 0; x--) {
                    for (var y = 1; y <= x; y++){
                        if ($scope.assignedUsers[y - 1].RoleId < $scope.assignedUsers[y]) {
                            var temp = $scope.assignedUsers[y - 1];
                            $scope.assignedUsers[y - 1] = $scope.assignedUsers[y];
                            $scope.assignedUsers[y] = temp;
                        }
                    }
                }

                var it, results = [];
                for (var i = 0; i < $scope.assignedUsers.length; i++) {

                    it = angular.extend({}, tileTmpl);
                    it.icon = it.icon + (i + 1);
                    it.title = $scope.assignedUsers[i].UserName;
                    it.span = { row: 1, col: 1 };

                    switch ($scope.assignedUsers[i].RoleId) {
                        case 1:
                            it.background = "#80D8FF";
                            break;
                        case 2: 
                            it.background = "#84FFFF";
                            it.span.col = 2;
                            break;
                        case 3:
                            it.background = "#FF8A80";
                            it.span.row = it.span.col = 2;
                            break;
                        case 4: it.background = "#B9F6CA"; break;
                    }

                    results.push(it);
                }
                return results;
            }
        }
    }
]);