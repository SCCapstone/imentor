angular.module('iMentor.directives', [])
    .directive('listingCard', function () {
        return {
            restrict: 'A',

            scope: {
                listing: '='
            },

            templateUrl: '/templates/ListingCard.html',

            link: function (scope, elem, attrs) {
                scope.titleClass = '';
                scope.title = null;
                scope.imagePath = '';

                scope.title = scope.listing.subject;

                scope.imagePath = getImage();


                function getImage()
                {
                    if (scope.listing.subject == 'Math')
                        return 'img/Math.png';
                    else if (scope.listing.subject == 'Science')
                        return 'img/Science.png';
                    else if (scope.listing.subject == 'History')
                        return 'img/World.png';
                    else if (scope.listing.subject == 'Reading')
                        return 'img/Reading.png';
                }
            }
        };
    })
;

