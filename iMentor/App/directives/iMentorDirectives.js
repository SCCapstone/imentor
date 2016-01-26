angular.module('iMentor.directives', [])
    .directive('listingTile', function ($rootScope) {
        return {
            restrict: 'A',

            scope: {
                listing: '='
            },

            templateUrl: rootUrl + 'templates/ListingTile.html',

            link: function (scope, elem, attrs) {
                scope.titleClass = '';
                scope.title = null;

                scope.title = listing.subject;
            }
        };
    })
;

