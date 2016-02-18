angular.module('iMentor.directives', ['ui.bootstrap'])
    .directive('listingCard', function () {
        return {
            restrict: 'A',

            scope: {
                listing: '='
            },

            templateUrl: '/templates/ListingCard.html',

            link: function (scope, elem, attrs) {
                scope.imagePath = '';
                scope.title = scope.listing.Title;
                
                scope.area = scope.listing.Area;


                scope.imagePath = getImage();


                function getImage()
                {
                    if (scope.listing.Area == 'Math')
                        return 'img/Math.png';
                    else if (scope.listing.Area == 'Science')
                        return 'img/Science.png';
                    else if (scope.listing.Area == 'History')
                        return 'img/World.png';
                    else if (scope.listing.Area == 'Reading')
                        return 'img/Reading.png';
                    else if(scope.listing.Area == 'Computer Science')
                        return 'img/ComputerScience.png';
                    else
                        return 'img/Unknown.png';
                }
            }
        };
    })
;

