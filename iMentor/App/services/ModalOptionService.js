

app.factory('modalOptionService', function () {
    return {
    
        optionsForAddParticipants: function(teachers, students, mentors, listing, assignments, listingsCtrl) {
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
                    listingsCtrl: function() { 
                        return listingsCtrl;
                    }
                }
            }
        }

    };
});