

app.factory('modalOptionService', function () {
    return {
    
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