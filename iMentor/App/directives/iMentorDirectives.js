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

                scope.title = scope.listing.Title;

                console.log(scope.listing.Title);

                scope.imagePath = getImage();


                function getImage()
                {
                    if (scope.listing.area == 'Math')
                        return 'img/Math.png';
                    else if (scope.listing.area == 'Science')
                        return 'img/Science.png';
                    else if (scope.listing.area == 'History')
                        return 'img/World.png';
                    else if (scope.listing.area == 'Reading')
                        return 'img/Reading.png';
                }
            }
        };
    })
;

