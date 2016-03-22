

app.factory('modalOptionService', function () {
    return {
    
        optionsForAddParticipants: function(teachers, students, mentors, listing, assignments) {
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
                    }
                }
            }
        },

        optionsForListingDetail: function(listing) {
            return {
                templateUrl: '/Templates/ListingDetailModal.html',
                controller: 'listingDetailCtrl',
                backdrop: true,
                windowClass: 'listingDetailModal',
                resolve: {
                    listing: function() {
                        return listing;
                    }
                }
            }
        },
        
        optionsForEventDetails: function (listing) {

            return {

                templateUrl: '/Templates/EventDetailsModal.html',
                controller: 'eventDetailsCtrl',
                backdrop: true,
                windowClass: 'eventDetailsModal',
                resolve: {
                    listing: function () {
                        return listing;
                    }
                }

            }
        }

    };
});