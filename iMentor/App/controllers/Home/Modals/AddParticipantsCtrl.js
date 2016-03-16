
app.controller('addParticipantsCtrl', ['$scope', '$uibModalInstance', '$location', '$rootScope', '$mdDialog', '$mdMedia', 'manageService', 'students', 'mentors', 'listing', 'assignments',
    function addParticipantsCtrl($scope, $uibModalInstance, $location, $rootScope, $mdDialog, $mdMedia, manageService, students, mentors, listing, assignments)
    {
        $scope.assignments = assignments;
        $scope.students = students;
        $scope.mentors = mentors;
        $scope.saveError = "Must select a user first time.";
        $scope.valid = true;
        init();
        


        // ---------------------------------------------------------------
        // Grid
        // ---------------------------------------------------------------
        $scope.gridOptionsStudents = {
            data: "students",
            columnDefs: [
            { field: 'Id', displayName: 'Id', visible: false },
            { field: 'UserName', displayName: 'User Name', width: '50%', cellClass: 'gridCellLeft', headerClass: 'gridHeaderLeft' },
            { field: 'Email', displayName: 'Email', width:'50%', cellClass: 'gridCellLeft', headerClass: 'gridHeaderLeft' },
            ],
            enableSorting: true,
            enableCellSelection: true,
            rowHeight: 25
        };

        $scope.gridOptionsMentors = {
            data: "mentors",
            columnDefs: [
            { field: 'Id', displayName: 'Id', visible: false },
            { field: 'UserName', displayName: 'User Name', width: '50%', cellClass: 'gridCellLeft', headerClass: 'gridHeaderLeft' },
            { field: 'Email', displayName: 'Email', width: '50%', cellClass: 'gridCellLeft', headerClass: 'gridHeaderLeft' },
            ],
            enableSorting: true,
            enableCellSelection: true,
            rowHeight: 25
        };

        // ---------------------------------------------------------------
        // initialize
        // ---------------------------------------------------------------
        function init() {
            

            for(var j = 0; j < students.length; j++){
                students[j].selected = false;
                for(var i = 0; i < $scope.assignments.length; i++){
                    if(students[j].Id == $scope.assignments[i].UserId
                    && listing.ID == $scope.assignments[i].ListingId)
                    {
                        students[j].selected = true;
                    }
                }
            }

            for(var j = 0; j < mentors.length; j++){
                mentors[j].selected = false;
                for(var i = 0; i < $scope.assignments.length; i++){
                    if(mentors[j].Id == $scope.assignments[i].UserId
                    && listing.ID == $scope.assignments[i].ListingId)
                    {
                        mentors[j].selected = true;
                    }
                }
            }
        }

        function userAlreadyAssigned(user) {
            for(var i = 0; i < assignments.length; i++){
                if (user.Id == assignments[i].UserId
                    && listing.ID == assignments[i].ListingId) {
                    console.log("already assigned");
                    return true;
                }
            }
            return false;
        }

        function getAssignedUsers() {
            var users = [];

            for (var j = 0; j < students.length; j++) {
                for (var i = 0; i < $scope.assignments.length; i++) {
                    if (students[j].Id == $scope.assignments[i].UserId
                    && listing.ID == $scope.assignments[i].ListingId) {
                        users.push(students[j]);
                    }
                }
            }

            for (var j = 0; j < mentors.length; j++) {
                for (var i = 0; i < $scope.assignments.length; i++) {
                    if (mentors[j].Id == $scope.assignments[i].UserId
                    && listing.ID == $scope.assignments[i].ListingId) {
                        users.push(mentors[j]);
                    }
                }
            }

            return users;
        }

        function getNewUsers() {
            var users = [];

            for (var i = 0; i < students.length; i++) {
                if (students[i].selected) {
                    users.push(students[i]);
                }
            }

            for (var i = 0; i < mentors.length; i++) {
                if (mentors[i].selected) {
                    users.push(mentors[i]);
                }
            }

            return users;
        }

        function contains(a, obj) {
            for (var i = 0; i < a.length; i++) {
                if (a[i] === obj) {
                    return true;
                }
            }
            return false;
        }

        function addParticipant(user) {
            var assignment = assignments[0];

            assignment.UserId = user.Id;
            assignment.ListingId = listing.ID;

            manageService.addParticipant(assignment);
        }

        function removeParticipant(user) {
            var assignment = null;

            for (var i = 0; i < assignments.length; i++) {
                if (user.Id == assignments[i].UserId && listing.ID == assignments[i].ListingId) {
                    assignment = assignments[i];
                }
            }

            manageService.removeParticipant(assignment);
        }

        $scope.addListing = function () {
            manageService.addListing($scope.listing)
                .success(function (response) {
                });
        }

        $scope.isValid = function () {
            return $scope.valid;
        }

        $scope.save = function (ev)
        {
            var currentAssignedUsers = getAssignedUsers();  //Users that were assigned before the modal was open
            var newAssignedUsers = getNewUsers();  //Users assigned after the modal is closed

            var usersToRemove = [];
            var usersToAdd = [];

            //No users selected, no old users deselected: Error, don't save
            if (currentAssignedUsers.length == 0 && newAssignedUsers.length == 0) {
                $scope.valid = false;
            }
            //No previous users existed.  Add all
            else if (currentAssignedUsers.length == 0 && !newAssignedUsers.length == 0) {
                for (var i = 0; i < newAssignedUsers.length; i++) {
                    addParticipant(newAssignedUsers[i]);
                }

                
            }
            //No users in new array.  Remove all
            else if (newAssignedUsers.length == 0 && !currentAssignedUsers.length == 0) {
                for (var i = 0; i < currentAssignedUsers.length; i++) {
                    removeParticipant(currentAssignedUsers[i]);
                }

                $uibModalInstance.dismiss();
            }
            
            else {
                for (var i = 0; i < currentAssignedUsers.length; i++) {
                    for (var j = 0; j < newAssignedUsers.length; j++) {
                        //Participant exists in both arrays: Do nothing
                        if (contains(currentAssignedUsers, newAssignedUsers[j]) && contains(newAssignedUsers, currentAssignedUsers[i])) {
                            continue;
                        }

                        //Participant exists in the newAssignedUsers array but not in oldAssignedUsers: Add
                        if (!contains(currentAssignedUsers, newAssignedUsers[j]) && contains(newAssignedUsers, currentAssignedUsers[i])) {
                            if(!contains(usersToAdd, newAssignedUsers[j])){
                                usersToAdd.push(newAssignedUsers[j]);
                            }
                        }

                        //Participant exists in the oldAssignedUsers array but not in newAssignedUsers: Remove
                        if (!contains(newAssignedUsers, currentAssignedUsers[i]) && contains(currentAssignedUsers, newAssignedUsers[j])) {
                            if (!contains(usersToRemove, currentAssignedUsers[i])) {
                                usersToRemove.push(currentAssignedUsers[i]);
                            }
                        }
                    }
                }

                for (var i = 0; i < usersToAdd.length; i++) {
                    console.log("Add: " + usersToAdd[i].UserName);
                    addParticipant(usersToAdd[i]);
                }
                for (var i = 0; i < usersToRemove.length; i++) {
                    console.log("Remove: " + usersToRemove[i].UserName);
                    removeParticipant(usersToRemove[i]);
                }


                $uibModalInstance.dismiss();
            }
        };

        $scope.cancel = function ()
	    {
		    $uibModalInstance.dismiss();
        };
    }
])