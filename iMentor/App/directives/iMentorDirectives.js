angular.module('iMentor.directives', [])
    .directive('imListingTile', function ($rootScope) {
        return {
            restrict: 'A',

            scope: {
                listing: '='
            },

            templateUrl: rootUrl + 'templates/ListingTile.html',

            link: function (scope, elem, attrs) {

            }
        };
    })
;

