
app.controller('addParticipantsCtrl', ['$scope', '$uibModalInstance', '$location', '$rootScope', 'manageService', 'users', 'listing',
    function addParticipantsCtrl($scope, $uibModalInstance, $location, $rootScope, manageService, users, listing)
    {
        getAssignments();
        $scope.users = users;
        console.log($scope.users);


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

                for (var i = 0; i < users.length; i++) {
                    if (users[i].UserName.localeCompare($scope.selectParticipant) == 0) {
                        assignment.UserId = users[i].Id;
                    }
                }
                assignment.ListingId = listing.ID;

                console.log(assignment);

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