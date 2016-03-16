
app.controller('editListingCtrl', ['$scope', '$rootScope', '$q', '$routeParams', '$location', '$uibModal', '$filter', '$timeout', 'manageService',  'modalOptionService',
    function EditListingCtrl($scope, $rootScope, $q, $routeParams, $location, $uibModal, $filter, $timeout, manageService, modalOptionService)
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

        $scope.areas = [
            { value: 1, text: 'Math' },
            { value: 2, text: 'Science' },
            { value: 3, text: 'History' },
            { value: 4, text: 'Reading' },
            { value: 5, text: 'Computer Science' }
        ];

        $scope.listingId = $routeParams.listingId;
        var id = $scope.listingId;
      
        
        getCurrentUser();

        $scope.isNew = ($scope.listingId < 1);
        if (!$scope.isNew) {
            getListings();
        }
        else{
            newListing();
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
                                getUsers();
                                getAssignments();
                            }
                        }
                    },
                    function fail(reason)
                    {
                        console.log("Unable to load listing: " + reason);
                    }
                );
        }

        function newListing(){
            manageService.getListings().then(
                    function success(listings)
                    {
                        $scope.listing = listings[0];

                        $scope.listing.ID = 0;
                        $scope.listing.Title = "*New Title*";
                        $scope.listing.StartDate = new Date();
                        $scope.listing.EndDate = new Date();
                        $scope.listing.Area = "*Choose Subject*";
                        $scope.listing.Frequency = "";
                        $scope.listing.Description = "*New Description*";
                        $scope.listing.Mentor = "";
                        $scope.listing.Email = "";
                        $scope.listing.HangoutUrl = "";

                        if($scope.currentUser != null){
                            $scope.listing.TeacherId = "";
                        }
                        else{
                            $scope.listing.Teacher = "";
                        }

                        $scope.listing.Open = true;

                        $scope.imagePath = getImage();
                        
                        getUsersByListing();
                        getStudents();
                        getMentors();
                        getUsers();
                        getAssignments();
                        addTeacher();

                        console.log($scope.listing);
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

        function getUsers() {
            manageService.getUsers().then(
                function success(users) {
                    $scope.users = users;
                },
                function error(error) {

                }
            )
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

        function getAssignments() {
            manageService.getAssignments().then(
                function success(assignments){
                    $scope.assignments = assignments;
                },
                function error(error) {

                }
            )
        }

        function removeParticipants(assignment) {
            manageService.removeParticipant(assignment).then(
                function success(response) {
                    getUsersByListing($scope.listingId);
                },
                function error(error) {

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

        function getDate(){
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1; //January is 0!
            var yyyy = today.getFullYear();

            if(dd<10) {
                dd='0'+dd
            } 

            if(mm<10) {
                mm='0'+mm
            } 

            //today = mm+'/'+dd+'/'+yyyy;

            return new Date(dd, mm, yyyy);
        }

        function addTeacher(){
            if ($scope.assignments != null && $scope.user != null) {
                var assignment = $scope.assignments[0];

                assignment.UserId = $scope.user.Id;
                assignment.ListingId = listing.ID;


                manageService.addParticipant(assignment).then(
                    function success(response){
                        console.log("Teacher added: " + assignment); 
                    },
                    function error(response){
                        console.log(response);
                    }
                );
            }
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
            manageService.addListing($scope.listing).then(
                function success(response){
                }
            );
        }

        $scope.updateListing = function () {
            manageService.updateListing($scope.listing).then(
                function success(response){
                }
            );
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

        $scope.deleteParticipant = function (tile) {
            if ($scope.editMode) {
                if ($scope.assignments != null && $scope.users != null && $scope.listing != null) {
                    var assignment = null;
                    var user = null;

                    //get user for its Id
                    for(var i = 0; i < $scope.users.length; i++){
                        if($scope.users[i].UserName.localeCompare(tile.title) == 0){
                            user = $scope.users[i];
                        }
                    }

                    //find assignment 
                    if (user != null) {
                        for (var i = 0; i < $scope.assignments.length; i++) {
                            if ($scope.assignments[i].ListingId == $scope.listing.ID && $scope.assignments[i].UserId == user.Id) {
                                assignment = $scope.assignments[i];
                            }
                        }
                    }

                    removeParticipants(assignment);
                }
            }
        }

        $scope.addParticipants = function () {
            if($scope.students != null && $scope.listing != null){
                $scope.showAddParticipantsModal($scope.students, $scope.mentors, $scope.listing, $scope.assignments);
            }
        }

        $scope.showAddParticipantsModal = function (students, mentors, listing, assignments) {
            var modalOptions = modalOptionService.optionsForAddParticipants(students, mentors, listing, assignments);
            var modalInstance = $uibModal.open(modalOptions);

            modalInstance.result.then(
                null,
                function cancel() {
                    // No-op
                });
        };

        // ---------------------------------------------------------------
        // Hangouts
        // ---------------------------------------------------------------
   
        $scope.onClientReady = function(){
	gapi.hangout.onApiReady.add(function(e){
		if(e.isApiReady){
			onApiReady();
		}
	});
}

        $scope.onApiReady = function () {

            
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
                               $scope.listing.HangoutUrl = gapi.hangout.getHangoutUrl();
                            }
                        }
                    },
                    function fail(reason)
                    {
                	    console.log("Unable to load listing: " + reason);
                    }
                );
        }
            
            $scope.updateListing();


            
        
        };


        // ---------------------------------------------------------------
        // Grid list
        // ---------------------------------------------------------------
        

        function buildGridModel(tileTmpl) {
            if ($scope.assignedUsers != undefined) {

                //Sort participants by Teacher -> Mentor -> Student
                for (var x = $scope.assignedUsers.length - 1; x >= 0; x--) {
                    for (var y = 1; y <= x; y++){
                        if ($scope.assignedUsers[y - 1].RoleId < $scope.assignedUsers[y].RoleId) {
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

                //Add the "Add Participant" tile
                it = angular.extend({}, tileTmpl);
                it.icon = 1;
                it.title = "Add Participant";
                it.span = { row: 1, col: 1 };
                it.background = "#80D8FF"

                results.push(it);

                return results;
            }
        }
    }
]);