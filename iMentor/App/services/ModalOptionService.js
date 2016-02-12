﻿

app.factory('modalOptionService', function () {
    return {
        optionsForListingCreation: function () {
            return {
                templateUrl: '/Templates/ListingCreationModal.html',
                controller: listingCreationCtrl,
                backdrop: true,
                windowClass: 'listingCreationModal',
            }
        },
    
        optionsForListingDetail: function(listing) {
            return {
                templateUrl: '/Templates/ListingDetailModal.html',
                controller: listingDetailCtrl,
                backdrop: true,
                windowClass: 'listingDetailModal',
                resolve: {
                    listing: function() {
                        return listing;
                    }
                }
            }
        },

    };
});