
app.controller('viewApplicantsCtrl', ['$scope', '$uibModalInstance', '$location', '$rootScope', '$mdDialog', '$mdMedia', 'manageService', 'assignments', 'applicants',
    function viewApplicantsCtrl($scope, $uibModalInstance, $location, $rootScope, $mdDialog, $mdMedia, manageService, assignments, applicants)
    {
        $scope.assignments = assignments;
        $scope.applicants = applicants;
        init();
        

        // 
        // Grid
        // ---------------------------------------------------------------
        $scope.gridOptionsStudents = {
            data: "applicants",
            columnDefs: [
            { field: 'Id', displayName: 'Id', visible: false },
            { field: 'UserName', displayName: 'User Name', width: '50%', cellClass: 'gridCellLeft', headerClass: 'gridHeaderLeft' },
            { field: 'Email', displayName: 'Email', width:'50%', cellClass: 'gridCellLeft', headerClass: 'gridHeaderLeft' },
            ],
            enableSorting: true,
            enableCellSelection: true,
            rowHeight: 25
        };

        // ---------------------------------------------------------------
        // initialize
        // ---------------------------------------------------------------
        function init() {
        }

        function userAlreadyAssigned(user) {
        }

        function getAssignedUsers() {
        }

        function getNewUsers() {
        }

        function contains(a, obj) {
            for (var i = 0; i < a.length; i++) {
                if (a[i] === obj) {
                    return true;
                }
            }
            return false;
        }

        function addApplicant(user) {
            var applicant = applicants[0];

            applicant.UserId = user.Id;
            applicant.ListingId = listing.Id;

            manageService.addApplicant(applicant);
        }

        function removeParticipant(user) {
            var assignment = null;

            for (var i = 0; i < assignments.length; i++) {
                if (user.Id == assignments[i].UserId && listing.Id == assignments[i].ListingId) {
                    assignment = assignments[i];
                }
            }

            manageService.removeParticipant(assignment);
        }

        $scope.save = function (ev)
        {
           
        };

        $scope.cancel = function ()
	    {
		    $uibModalInstance.dismiss();
        };
    }
])