
app.controller('addParticipantsCtrl', ['$scope', '$uibModalInstance', '$location', '$rootScope', 'manageService', 'students', 'mentors', 'listing', 'assignments',
    function addParticipantsCtrl($scope, $uibModalInstance, $location, $rootScope, manageService, students, mentors, listing, assignments)
    {
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
            $scope.assignments = assignments;
            $scope.students = students;
            $scope.mentors = mentors;

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

        function userAlreadyAssigned(user){
            for(var i = 0; i < assignments.length; i++)
            {
                if(user.Id == assignments.UserId){
                    
                }
            }
        }

        $scope.addListing = function () {
            manageService.addListing($scope.listing)
                .success(function (response) {
                });
        }

        $scope.save = function ()
        {
        //Loop through all the users and get the selected users
        //If the user already exists in the Assignments, ignore it
        //Else if the user doesn't not exist, add it
        //Else if the user existed but was unselected, remove it

            for(var i = 0; i < students.length; i++){
                if(students[i].selected){
                    var studentExists
                    var assignment = assignments[0];

                    for(var j = 0; j < assignments.length; j++){
                        if (students[i].Id == assignments.UserId) {
                            assignment.UserId = students[i].Id;
                        }
                    }
                }
            }   

            

            for (var i = 0; i < students.length; i++) {
                
            }
            assignment.ListingId = listing.ID;

            manageService.addParticipant(assignment);

            $uibModalInstance.dismiss();
        };

        $scope.cancel = function ()
	    {
		    $uibModalInstance.dismiss();
        };
    }
])