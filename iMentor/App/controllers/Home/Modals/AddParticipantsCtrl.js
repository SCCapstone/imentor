
app.controller('addParticipantsCtrl', ['$scope', '$uibModalInstance', '$location', '$rootScope', 'manageService', 'students', 'mentors', 'listing',
    function addParticipantsCtrl($scope, $uibModalInstance, $location, $rootScope, manageService, students, mentors, listing)
    {
        getAssignments();
        $scope.students = students;
        $scope.mentors = mentors;


        // ---------------------------------------------------------------
        // Grid
        // ---------------------------------------------------------------
        $scope.gridOptions = {
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


        function getAssignments() {
            manageService.getAssignments().then(
                function success(assignments) {
                    $scope.assignments = assignments;
                },
                function error(error) {

                }
            )
        }

        $scope.addListing = function () {
            manageService.addListing($scope.listing)
                .success(function (response) {
                });
        }

        $scope.save = function ()
        {
            if ($scope.assignments != null) {
                var assignment = $scope.assignments[0];

                for (var i = 0; i < students.length; i++) {
                    if (students[i].UserName.localeCompare($scope.selectParticipant) == 0) {
                        assignment.UserId = students[i].Id;
                    }
                }
                assignment.ListingId = listing.ID;

                manageService.addParticipant(assignment);

                $uibModalInstance.dismiss();
            }
        };

        $scope.cancel = function ()
	    {
		    $uibModalInstance.dismiss();
        };
    }
])