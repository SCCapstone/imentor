
app.controller('editListingCtrl', ['$scope', '$rootScope', '$q', '$routeParams', '$location', '$uibModal', '$filter', '$timeout', '$mdDialog', 'manageService',  'modalOptionService',
    function EditListingCtrl($scope, $rootScope, $q, $routeParams, $location, $uibModal, $filter, $timeout, $mdDialog, manageService, modalOptionService)
    {
        $scope.areaEditMode = false;
        $scope.applied = null;
        $scope.assigned = false;
        $scope.htmlVariable = "";

        $scope.listings = [];
        $scope.currentUsers = [];

        $scope.editMode = false;
        $scope.imagePath = null;

        $scope.bools = [
            { value: 1, text: 'True' },
            { value: 2, text: 'False' }
        ];

        $scope.subjects = [
            { value: 1, text: 'Math', selected: true },
            { value: 2, text: 'Science', selected: false },
            { value: 3, text: 'History', selected: false },
            { value: 4, text: 'Reading', selected: false },
            { value: 5, text: 'Computer Science', selected: false }
        ];

        

        $scope.listingId = $routeParams.listingId;
        var id = $scope.listingId;
      
        
        getCurrentUser();
        getOwner();
        getMentors();
        getStudents();
        getTeachers();
        getUsers();
        $scope.isNew = ($scope.listingId < 1);
        if (!$scope.isNew) {
            getListings();
        }
        else{
            newListing();
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
                            else if(listings[i].Id == id)
                            {
                                $scope.listing = listings[i];
                                $scope.listings.push($scope.listing);
                                $scope.listing.StartDate = new Date(parseInt(listings[i].StartDate.substr(6)));
                                $scope.listing.EndDate = new Date(parseInt(listings[i].EndDate.substr(6)));
                                $scope.imagePath = getImage();
                                getUsersByListing($scope.listingId);
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

                        $scope.listing.Id = 0;
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

        function getUsersByListing(listingId) {
            console.log("getUsersByListing Called");
            manageService.getUsersByListing(listingId).then(
                function success(assignedUsers){
                    $scope.assignedUsers = assignedUsers;

                    for (var i = 0; i < assignedUsers.length; i++) {
                        if (assignedUsers[i].Id == $scope.user.Id) {
                            $scope.assigned = true;
                        }
                    }

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
                    console.log("Unable to load users: " + error)
                }
            )
        }

        function getCurrentUser(){
            manageService.getCurrentUser().then(
                function success(user){
                    $scope.user = user;
                    $scope.currentUsers.push(user);
                },
                function fail(reason){
                    console.log("Unable to load current user: " + reason);
                }
            );
        }

        function getTeachers(){
            manageService.getTeachers().then(
                function success(teachers){
                    $scope.teachers = teachers;
                },
                function fail(reason){
                    console.log("Unable to load teachers: " + reason);
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

                   getApplicants(mentors);
                },
                function fail(reason){
                    console.log("Unable to load mentors: " + reason);
                }
            );
        }

        function getOwner() {
            manageService.getUsers().then(
                function success(users) {
                    for (var i = 0; i < users.length; i++) {
                        if (users[i].Id == $scope.listing.TeacherId) {
                            $scope.owner = users[i];
                        }
                    }
                },
                function error(error) {
                    console.log("Unable to load users: " + error)
                }
            )
        }

        function getAssignments() {
            manageService.getAssignments().then(
                function success(assignments){
                    $scope.assignments = assignments;
                },
                function error(error) {
                    console.log("Unable to load assignments: " + error);
                }
            )
        }

        function removeParticipants(assignment) {
            manageService.removeParticipant(assignment).then(
                function success(response) {
                    getUsersByListing($scope.listingId);
                },
                function error(error) {
                    console.log("Unable to remove participants: " + error)
                }
            );
        }

        function getApplicants(mentors){
             manageService.getApplicants().then(
                function success(applicants){
                    $scope.applicants = [];

                    //Get all applicants for this listing
                    for (var j = 0; j < mentors.length; j++) {
                        for (var i = 0; i < applicants.length; i++) {
                            if (mentors[j].Id == applicants[i].UserId
                            && $scope.listing.Id == applicants[i].ListingId) {
                                $scope.applicants.push(mentors[j]);
                            }
                        }
                    }

                    //Check if current user is an applicant
                    if($scope.user != null){
                        for(var i = 0; i < $scope.applicants.length; i++){
                            console.log($scope.applicants[i].Id);
                            if($scope.applicants[i].Id == $scope.user.Id){
                                $scope.applied = true;
                                break;
                            }else{
                                $scope.applied = false;
                            }
                        }
                    }

                    //If no users are applied to this listing
                    if ($scope.applicants.length == 0) {
                        $scope.applied = false;
                    }
                },
                function error(error) {
                    console.log("Unable to load applicants: " + error);
                }
            )
        }

        function addApplicant(applicant){
            manageService.addApplicant(applicant).then(
                function success(response) {
                    
                },
                function error(error) {
                    console.log("Unable to add applicant: " + error)
                }
            );
        }

        function removeApplicant(applicant) {
            manageService.removeApplicant(applicant).then(
                function success(response) {
                    getUsersByListing($scope.listingId);
                },
                function error(error) {
                    console.log("Unable to remove applicant: " + error)
                }
            );
        }

        function refreshParticipants() {
            console.log("Refresh Participants");
            getUsersByListing($scope.listingId);
            getAssignments();
        }


        // ---------------------------------------------------------------
        // Functions
        // ---------------------------------------------------------------
        
        $scope.save = function () {
            if ($scope.isNew) {
                $scope.addListing();
            }
            else {
                $scope.updateListing();
            }
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

        $scope.applyForListing = function(){
            console.log("Apply for Listing clicked!");
            
        }

        $scope.editArea = function(){
            $scope.areaEditMode = true;

            $scope.showAreas();
        }
        $scope.saveArea = function () {
            $scope.imagePath = getImage();
            
            manageService.updateListing($scope.listing);
            

            $scope.areaEditMode = false;
        }

        $scope.editParticipants = function () {
            if($scope.students != null && $scope.listing != null){
                $scope.showAddParticipantsModal($scope.teachers, $scope.students, $scope.mentors, $scope.listing, $scope.assignments);
            }
        }

        $scope.refreshParticipantsList = function () {
            refreshParticipants();
        }

        $scope.showAddParticipantsModal = function (teachers, students, mentors, listing, assignments) {
            var modalOptions = modalOptionService.optionsForAddParticipants(teachers, students, mentors, listing, assignments, this);
            var modalInstance = $uibModal.open(modalOptions);

            modalInstance.result.then(
                null,
                function cancel() {
                    // No-op
                });
        };

        $scope.viewApplicants = function () {
            
            if($scope.applicants != null && $scope.assignments != null){
                $scope.showViewApplicantsModal($scope.applicants, $scope.assignments);
            }
        }

        $scope.showViewApplicantsModal = function (applicants, assignments) {
            var modalOptions = modalOptionService.optionsForViewApplicants(applicants, assignments);
            var modalInstance = $uibModal.open(modalOptions);

            modalInstance.result.then(
                null,
                function cancel() {
                    // No-op
                });
        };

        $scope.showConfirm = function (ev) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                  .title('Apply to this listing?')
                  .textContent($scope.listing.Title)
                  .ariaLabel('')
                  .targetEvent(ev)
                  .ok('Apply!')
                  .cancel('Cancel');
            $mdDialog.show(confirm).then(function () {
                //Save the application
                $scope.applied = true;

                if($scope.user != null && $scope.applicants != null && $scope.listing != null){
                    var applicant = { ListingId: $scope.listing.Id, UserId: $scope.user.Id };
                    
                    addApplicant(applicant);
                }
            }, function () {
                $scope.status = 'Canceled';
            });
        };


        // ---------------------------------------------------------------
        // Helper Methods
        // ---------------------------------------------------------------

        function CompareForSort(first, second) {
            if (first.RoleId == second.RoleId)
                return 0;
            if (first.RoleId > second.RoledId)
                return 1;
            else
                return -1;
        }

        function getDate() {
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!
            var yyyy = today.getFullYear();

            if (dd < 10) {
                dd = '0' + dd
            }

            if (mm < 10) {
                mm = '0' + mm
            }

            //today = mm+'/'+dd+'/'+yyyy;

            return new Date(dd, mm, yyyy);
        }

        function addTeacher() {
            if ($scope.assignments != null && $scope.user != null) {
                var assignment = $scope.assignments[0];

                assignment.UserId = $scope.user.Id;
                assignment.ListingId = listing.Id;


                manageService.addParticipant(assignment).then(
                    function success(response) {
                        console.log("Teacher added: " + assignment);
                    },
                    function error(response) {
                        console.log(response);
                    }
                );
            }
        }

        function getImage() {
            if ($scope.listing != null) {
                if ($scope.listing.Area == 'Math')
                    return 'img/Math.png';
                else if ($scope.listing.Area == 'Science')
                    return 'img/Science.png';
                else if ($scope.listing.Area == 'History')
                    return 'img/World.png';
                else if ($scope.listing.Area == 'Reading')
                    return 'img/Reading.png';
                else if ($scope.listing.Area == 'Computer Science')
                    return 'img/ComputerScience.png';
                else
                    return 'img/Unknown.png';
            }
            console.log($scope.listing);
        }

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
                            else if(listings[i].Id == id)
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
                        case 1: //Student
                            it.background = "#26a69a";
                            break;
                        case 2: //Mentor
                            it.background = "#00796b";
                            it.span.col = 2;
                            break;
                        case 3: //Teacher
                            it.background = "#004d40";
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