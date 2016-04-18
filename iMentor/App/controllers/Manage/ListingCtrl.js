
app.controller('listingCtrl', ['$scope', '$rootScope', '$q', '$routeParams', '$location', '$uibModal', '$filter', '$timeout', '$mdDialog', 'manageService', 'modalOptionService',
    function ListingCtrl($scope, $rootScope, $q, $routeParams, $location, $uibModal, $filter, $timeout, $mdDialog, manageService, modalOptionService)
    {
        $scope.areaEditMode = false;
        $scope.descriptionEditMode = false;
        $scope.titleEditMode = false;
        $scope.applied = null;
        $scope.assigned = false;
        $scope.listing = null;
        $scope.user = null;
        $scope.hangoutSaved = false;
        $scope.validListing = false;
        $scope.particpantsCollapsed = true;
        $scope.applicantsCollapsed = false;

        $scope.listings = [];
        $scope.currentUsers = [];

        $scope.editMode = false;
        $scope.imagePath = null;

        $scope.bools = [
            { value: 1, text: 'True' },
            { value: 2, text: 'False' }
        ];

        $scope.subjects = [
            { value: 1, text: 'Math', selected: false },
            { value: 2, text: 'Science', selected: false },
            { value: 3, text: 'Social Studies', selected: false },
            { value: 4, text: 'Reading', selected: false },
            { value: 5, text: 'Computer Applications', selected: false },
            { value: 6, text: 'Foreign Language', selected: false },
            { value: 7, text: 'Arts', selected: false },
            { value: 8, text: 'Writing', selected: false },
            { value: 9, text: 'Music', selected: false }
        ];

        $scope.ageGroups = [
            { value: 1, text: '0-2', selected: false },
            { value: 2, text: '3-5', selected: false },
            { value: 3, text: '6-8', selected: false },
            { value: 4, text: '9-12', selected: false }
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
                            $scope.validListing = true;
                            $scope.listing = listings[i];
                            $scope.listing.StartDate = new Date(parseInt(listings[i].StartDate.substr(6)));
                            $scope.listing.EndDate = new Date(parseInt(listings[i].EndDate.substr(6)));

                            if($scope.listings.length < 1){
                                $scope.listings.push($scope.listing);   
                            }

                            $scope.imagePath = getImage();
                            getUsersByListing($scope.listingId);
                            getAssignments();

                            if (listings[i].HangoutUrl != null) {
                                $scope.hangoutSaved = true;
                            }
                        }
                    }

                    if(!$scope.validListing){
                        goToPageNotFound();
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
                Title: "",
                StartDate: new Date(),
                EndDate: new Date(),
                Area: "",
                Frequency: "",
                Description: "",
                HangoutUrl: null,
                TeacherId: null,
                Open: false
            };

            if ($scope.listings.length < 1) {
                $scope.listings.push($scope.listing);
            }

            $scope.assignments = [];

            $scope.titleEditMode = true;
            $scope.areaEditMode = true;
            $scope.descriptionEditMode = true;
        }

        function getUsersByListing(listingId) {
            manageService.getUsersByListing(listingId).then(
                function success(assignedUsers){
                    $scope.assignedUsers = assignedUsers;

                    //If the current user is assigned to the listing
                    for (var i = 0; i < assignedUsers.length; i++) {
                        if (assignedUsers[i].Id == $scope.user.Id) {
                            $scope.assigned = true;
                        }
                    }

                    $scope.participantTiles = buildParticipantGridModel({
                        icon: "avatar:svg-",
                        title: "",
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

                    if ($scope.currentUsers.length < 1) {
                        $scope.currentUsers.push(user);
                    }

                    if ($scope.isNew) {
                        $scope.listing.TeacherId = $scope.user.Id;
                    }
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

                    $scope.applicantTiles = buildApplicantGridModel({
                        icon: "avatar:svg-",
                        title: "",
                        background: ""
                    });
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

        function acceptApplicant(id){

            manageService.getUsers().then(
                function success(users){
                    for(var i = 0; i < users.length; i++){
                        if(users[i].Id == id){
                            $scope.assignedUsers.push(users[i]);

                            var assignment = {
                                UserId: users[i].Id,
                                ListingId: $scope.listing.Id
                            }
                            manageService.addParticipant(assignment);
                            

                            var a = $scope.assignedUsers;

                            $rootScope.$broadcast('refreshParticipantsList', { assignments: a });
                            

                            var applicant = {
                                UserId: users[i].Id,
                                ListingId: $scope.listing.Id
                            }
                            removeApplicant(applicant);
                        }
                    }
                }
            )
        }

        function removeApplicant(applicant) {
            manageService.removeApplicant(applicant).then(
                function success(response) {
                    var a = [];
                    for(var i = 0; i < $scope.applicants.length; i++){
                        if($scope.applicants[i].Id == applicant.UserId){
                            continue;
                        }
                        a.push($scope.applicants[i]);
                    }
                    $rootScope.$broadcast('refreshApplicantsList', { applicants: a });
                },
                function error(error) {
                    console.log("Unable to remove applicant: " + error)
                }
            );
        }

        function goToPageNotFound() {
            $location.path('/PageNotFound');
        }

        // ---------------------------------------------------------------
        // Functions
        // ---------------------------------------------------------------

        //Calls the manage service and adds a listing to the database

        $scope.addListing = function () {
            manageService.addListing($scope.listing).then(
                function success(response){
                },
                function error(response) {
                    console.log("Unable to add listing: " + response);
                }
            );
        }

        //Grabs a listing using the manage service and updates some listing
        $scope.updateListing = function () {
            manageService.updateListing($scope.listing).then(
                function success(response){
                }
            );
        }

        
        //Removes a listing via the manageservice
        $scope.deleteListing = function() {
            manageService.deleteListing($scope.listing).then(
                function success(response){
                }    
            );
        }

        $scope.createNewListing = function () {
            $location.path("/Listing/" + 0);
        }

        $scope.editTitle = function () {
            $scope.oldTitle = $scope.listing.Title;
            $scope.titleEditMode = true;
        }

        $scope.saveTitle = function () {
            manageService.updateListing($scope.listing);

            $scope.titleEditMode = false;
        }

        $scope.cancelTitle = function () {
            $scope.listing.Title = $scope.oldTitle;
            $scope.titleEditMode = false;
        }

        $scope.editArea = function(){
            $scope.areaEditMode = true;
        }

        $scope.saveArea = function () {
            $scope.imagePath = getImage();
            
            manageService.updateListing($scope.listing);
            

            $scope.areaEditMode = false;
        }

        $scope.editDescription = function () {
            $scope.oldDescription = $scope.listing.Description;

            $scope.descriptionEditMode = true;
        }

        $scope.saveDescription = function () {
            manageService.updateListing($scope.listing);

            $scope.descriptionEditMode = false;
        }

        $scope.cancelDescription = function () {
            $scope.listing.Description = $scope.oldDescription;

            $scope.descriptionEditMode = false;
        }


        $scope.$on('refreshParticipantsList', function (event, data) {
            $scope.assignedUsers = [];
            for (var i = 0; i < data.assignments.length; i++) {
                $scope.assignedUsers.push(data.assignments[i]);
            }
            refreshParticipants();
        });

        function refreshParticipants() {
            $scope.participantTiles = buildParticipantGridModel({
                icon: "avatar:svg-",
                title: "Svg-",
                background: ""
            });
        }

         $scope.$on('refreshApplicantsList', function (event, data) {
         console.log("Before: " + $scope.applicants);
            $scope.applicants = [];
            
            for (var i = 0; i < data.applicants.length; i++) {
                $scope.applicants.push(data.applicants[i]);
            }

            console.log("After: " + $scope.applicants);
            refreshApplicants();
        });

        function refreshApplicants() {
            $scope.applicantTiles = buildApplicantGridModel({
                icon: "avatar:svg-",
                title: "Svg-",
                background: ""
            });
        }

        $scope.editParticipants = function () {
            if($scope.students != null && $scope.listing != null){
                manageService.getAssignments().then(
                    function success(assignments){
                        $scope.showAddParticipantsModal($scope.teachers, 
                                        $scope.students, $scope.mentors, 
                                        $scope.listing, assignments);
                    }
                )
            }
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
                  //.ariaLabel('')
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

        $scope.showAdvanced = function (ev) {
            $mdDialog.show({
                controller: 'createHangoutCtrl',
                templateUrl: 'Templates/CreateHangout.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                resolve: {
                    listing: function () {
                        return $scope.listing;
                    }
                }
            })
            .then(function (answer) {
                $scope.hangoutSaved = true;
            }, function () {
                $scope.status = 'Canceled';
            });
        };

        $scope.closeHangout = function (ev) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                  .title('Close Hangout?')
                  .textContent($scope.listing.Title)
                  .targetEvent(ev)
                  .ok('Okay')
                  .cancel('Cancel');
            $mdDialog.show(confirm).then(function () {
                //Save the application
                $scope.listing.HangoutUrl = null;
                $scope.listing.HangoutStart = null;
                manageService.updateListing($scope.listing);
                $scope.hangoutSaved = false;
            }, function () {
                $scope.status = 'Canceled';
            });
        };

        $scope.createListing = function (ev) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                  .title('Create this listing?')
                  .textContent($scope.listing.Title)
                  //.ariaLabel('')
                  .targetEvent(ev)
                  .ok('Create')
                  .cancel('Cancel');
            $mdDialog.show(confirm).then(function () {
                $rootScope.$broadcast('saveDateTime')
            }, function () {
                $scope.status = 'Canceled';
            });
        };

        $scope.$on('createNewListing', function (event, data)  {
            $scope.listing.Open = true;
            manageService.addListing($scope.listing).then(
                function success(listing) {
                    addTeacher(listing.Id);
                    $location.path("/Listing/" + listing.Id);
                },
                function error(response) {
                    console.log("Unable to create listing");
                }
            );
        });

        $scope.$on('cancelCreation', function (event, data) {
            $scope.cancelCreateListing();
        });

        $scope.cancelCreateListing = function () {
            $scope.deleteListing();
        }

        

        $scope.showUrlInput = function () {
            $scope.showHangoutUrl = true;
        }

        $scope.joinHangout = function() {
            window.open($scope.listing.HangoutUrl);
        }

        $scope.goToProfile = function(userId){
            $location.path("/ViewProfile/" + userId);
        }

        $scope.toggleParticipantsCollapse = function () {
            $scope.particpantsCollapsed = !$scope.particpantsCollapsed;
        }

        $scope.toggleApplicantsCollapse = function () {
            $scope.applicantsCollapsed = !$scope.applicantsCollapsed
        }

        $scope.addApplicant = function (ev, tile) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                  .title('Add Mentor')
                  .textContent(tile.title)
                  //.ariaLabel('')
                  .targetEvent(ev)
                  .ok('Okay')
                  .cancel('Cancel');
            $mdDialog.show(confirm).then(function () {
                acceptApplicant(tile.id);
            }, function () {
                $scope.status = 'Canceled';
            });
        };

        $scope.rejectApplicant = function (ev, tile) {
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.confirm()
                  .title('Reject Mentor')
                  .textContent(tile.title)
                  //.ariaLabel('')
                  .targetEvent(ev)
                  .ok('Okay')
                  .cancel('Cancel');
            $mdDialog.show(confirm).then(function () {
            var applicant = {
                                UserId: tile.id,
                                ListingId: $scope.listing.Id
                            }
                removeApplicant(applicant);
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

        function addTeacher(listingId) {
            if ($scope.user != null) {
                var assignment = {
                    UserId: $scope.user.Id,
                    ListingId: listingId,
                }


                manageService.addParticipant(assignment).then(
                    function success(response) {
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
                else if ($scope.listing.Area == 'Social Studies')
                    return 'img/World.png';
                else if ($scope.listing.Area == 'Reading')
                    return 'img/Reading.png';
                else if ($scope.listing.Area == 'Computer Applications')
                    return 'img/ComputerScience.png';
                else if ($scope.listing.Area == 'Arts')
                    return 'img/Art.png';
                else if ($scope.listing.Area == 'Foreign Language')
                    return 'img/ForeignLanguage.png';
                else if ($scope.listing.Area == 'Music')
                    return 'img/Music.png';
                else if ($scope.listing.Area == 'Writing')
                    return 'img/Writing.png';
                else
                    return 'img/Unknown.png';
            }
        }

   


        // ---------------------------------------------------------------
        // Grid list
        // ---------------------------------------------------------------
        
        //Participants
        function buildParticipantGridModel(tileTmpl) {
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
                    it.icon = it.icon + $scope.assignedUsers[i].IconIndex;
                    it.title = $scope.assignedUsers[i].UserName;
                    it.span = { row: 1, col: 1 };
                    it.id = $scope.assignedUsers[i].Id;

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
                        case 4://Administrator
                            it.background = "#004d40";
                            it.span.row = it.span.col = 2;
                            break;
                    }

                    results.push(it);
                }

                return results;
            }
        }

        function buildApplicantGridModel(tileTmpl) {
            if ($scope.applicants != undefined) {

                var it, results = [];
                for (var i = 0; i < $scope.applicants.length; i++) {

                    it = angular.extend({}, tileTmpl);
                    it.icon = it.icon + $scope.applicants[i].IconIndex;
                    it.title = $scope.applicants[i].UserName;
                    it.span = { row: 1, col: 1 };
                    it.id = $scope.applicants[i].Id;

                    it.background = "#00796b";
                    it.span.row = it.span.col = 2;

                    results.push(it);
                }

                return results;
            }
        }
    }
]);