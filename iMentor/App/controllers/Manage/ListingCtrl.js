﻿
app.controller('listingCtrl', ['$scope', '$rootScope', '$q', '$routeParams', '$location', '$uibModal', '$filter', '$timeout', '$mdDialog', 'manageService',  'modalOptionService',
    function ListingCtrl($scope, $rootScope, $q, $routeParams, $location, $uibModal, $filter, $timeout, $mdDialog, manageService, modalOptionService)
    {
        $scope.areaEditMode = false;
        $scope.descriptionEditMode = false;
        $scope.applied = null;
        $scope.assigned = false;

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
                            if (listings[i].Id == id)
                            {
                                $scope.listing = listings[i];
                                $scope.listings.push($scope.listing);
                                $scope.listing.StartDate = new Date(parseInt(listings[i].StartDate.substr(6)));
                                $scope.listing.EndDate = new Date(parseInt(listings[i].EndDate.substr(6)));
                                console.log($scope.listing.StartDate);
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
            $scope.listing = {
                //Id: 0,
                Title: "",
                StartDate: new Date(),
                EndDate: new Date(),
                Area: "",
                Frequency: "",
                Description: "",
                HangoutUrl: null,
                TeacherId: null,
                Open: true
            };

            $scope.listings.push($scope.listing);

            if ($scope.user != null) {
                $scope.listing.TeacherId = $scope.user.Id;
            } else {
                $scope.listing.TeacherId = 37;
            }

            $scope.assignments = [];

            manageService.addListing($scope.listing).then(
                function success(listing) {
                    $scope.listing = listing;

                    addTeacher(listing);
                },
                function error(response) {
                    console.log("Unable to add new listing: " + response);
                }
            );

            $scope.areaEditMode = true;
            $scope.descriptionEditMode = true;
        }

        function getUsersByListing(listingId) {
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
                        if ($scope.listing != null) {
                            if (users[i].Id == $scope.listing.TeacherId) {
                                $scope.owner = users[i];
                            }
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

                    if ($scope.listing != null) {
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
                        if ($scope.user != null) {
                            for (var i = 0; i < $scope.applicants.length; i++) {
                                console.log($scope.applicants[i].Id);
                                if ($scope.applicants[i].Id == $scope.user.Id) {
                                    $scope.applied = true;
                                    break;
                                } else {
                                    $scope.applied = false;
                                }
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

        


        // ---------------------------------------------------------------
        // Functions
        // ---------------------------------------------------------------
        $scope.addListing = function () {
            manageService.addListing($scope.listing).then(
                function success(response){
                },
                function error(response) {
                    console.log("Unable to add listing: " + response);
                }
            );
        }

        $scope.updateListing = function () {
            manageService.updateListing($scope.listing).then(
                function success(response){
                }
            );
        }

        $scope.deleteListing = function() {
            manageService.deleteListing($scope.listing).then(
                function success(response){
                }    
            );
        }

        $scope.applyForListing = function(){
            console.log("Apply for Listing clicked!");
            
        }

        $scope.editArea = function(){
            $scope.areaEditMode = true;
        }

        $scope.saveArea = function () {
            $scope.imagePath = getImage();
            
            manageService.updateListing($scope.listing);
            

            $scope.areaEditMode = false;
        }

        $scope.cancelArea = function () {
            getListings();

            $scope.areaEditMode = false;
        }

        $scope.editDescription = function () {
            $scope.descriptionEditMode = true;
        }

        $scope.saveDescription = function () {
            manageService.updateListing($scope.listing);

            $scope.descriptionEditMode = false;
        }

        $scope.cancelDescription = function () {
            getListings();

            $scope.descriptionEditMode = false;
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

        $scope.showConfirm = function (ev) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                  .title('Create this listing?')
                  .textContent($scope.listing.Title)
                  .ariaLabel('')
                  .targetEvent(ev)
                  .ok('Create')
                  .cancel('Cancel');
            $mdDialog.show(confirm).then(function () {
                //Save the application
                console.log("Listing Created");
            }, function () {
                $scope.status = 'Canceled';
            });
        };

        $scope.cancelCreateListing = function () {
            $scope.deleteListing();
        }

        function refreshParticipants() {
            getUsersByListing($scope.listingId);
            getAssignments();
        }


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

        function addTeacher(listing) {
            if ($scope.user != null) {
                var assignment = {
                    Id: 0,
                    UserId: $scope.userId,
                    ListingId: listing.Id,
                }

                manageService.addParticipant(assignment).then(
                    function success(response) {
                        console.log("Teacher Added");
                    },
                    function error(response) {
                        console.log("Unable to add teacher");
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