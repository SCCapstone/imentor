

app.factory('modalOptionService', function () {
    return {
    
        optionsForAddParticipants: function(teachers, students, mentors, listing, assignments, editListings) {
            return {
                templateUrl: '/Templates/AddParticipantsModal.html',
                controller: 'addParticipantsCtrl',
                backdrop: true,
                windowClass: 'addParticipantsModal',
                resolve: {
                    teachers: function() {
                        return teachers;
                    },
                    students: function() {
                        return students;
                    },
                    mentors: function() {
                        return mentors;
                    },
                    listing: function() {
                        return listing;
                    },
                    assignments: function() {
                        return assignments;
                    },
                    editListings: function() { 
                        return editListings;
                    }
                }
            }
        },

        optionsForViewApplicants: function(applicants, assignments) {
            return {
                templateUrl: '/Templates/ViewApplicantsModal.html',
                controller: 'viewApplicantsCtrl',
                backdrop: true,
                windowClass: 'viewApplicantsModal',
                resolve: {
                    applicants: function() {
                        return applicants;
                    },
                    assignments: function() {
                        return assignments;
                    }
                }
            }
        }

    };
});