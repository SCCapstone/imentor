angular.module('iMentor.directives', [])
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
    .directive('dateTime', ['$timeout', 'manageService',
        function ($timeout, manageService) {
            return {
                restrict: 'A',

                scope: {
                    listing: '=',
                    user: '='
                },

                templateUrl: '/templates/DateTime.html',

                link: function (scope, elem, attrs) {
                    scope.startTime = "1970-01-01T15:30:40.000Z"; 
                    scope.endTime = "1970-01-01T15:30:40.000Z";
                    scope.timeEditMode = false;
                    scope.startDate = scope.listing.StartDate;
                    scope.endDate = scope.listing.EndDate;

                    scope.endAMPM = 'AM';
                    scope.startAMPM = 'AM';
                    scope.startHrs = 12;
                    scope.startMins = 00;
                    scope.endHrs = 12;
                    scope.endMins = 00;

                    scope.times = [
                        { value: 1, text: 'AM' },
                        { value: 2, text: 'PM' }
                    ];
                    
                    scope.picker = { opened: false };

                    scope.openPicker = function () {
                        $timeout(function () {
                            scope.picker.opened = true;
                        });
                    };

                    scope.closePicker = function () {
                        scope.picker.opened = false;
                    };

                    scope.edit = function () {
                        scope.timeEditMode = true;
                    }

                    scope.save = function () {
                        scope.timeEditMode = false;

                        var startDate = new Date(scope.startDate);
                        var startTime = new Date(scope.startTime);
                        

                        console.log("Start Date: " + startDate + ', Start Time: ' + startTime.getTime());

                        startDate.setTime(startTime.getTime());
                        console.log("New Date: " + startDate);

                        //console.log(new Date(scope.startDate + ' ' + scope.startTime));

                        manageService.updateListing(scope.listing);
                    }
                }
            };
        }
    ])
    .directive('imBtn', function () {
        return {
            restrict: 'A',

            scope: {
                iconClass: '=',
                imDisabled: '=',
                imShowTooltip: '=',
                imTooltipText: '=',
                onClick: '&'
            },

            templateUrl: 'templates/BtnDT.html',

            link: function (scope, element, attrs) {
                scope.imBtnIconClass = null;
                scope.text = null;
                scope.showIcon = true;
                scope.imBtnClass = 'im-flat-button';
                scope.clickEnabled = true;
                scope.popoverText = null;

                scope.$watch('iconClass', function (iconClass) {
                    if (imIsDefined(iconClass)) {
                        scope.imBtnIconClass = iconClass;
                        scope.showIcon = true;
                    }
                });

                scope.$watch('imShowTooltip', function (imShowTooltip) {
                    showTooltip(imShowTooltip);
                });

                scope.$watch('imTooltipText', function (imTooltipText) {
                    scope.popoverText = imTooltipText;
                    showTooltip(scope.imShowTooltip);
                });

                function showTooltip(value) {
                    if (imIsDefined(value) && value == true)
                        scope.popoverText = scope.imTooltipText;
                    else
                        scope.popoverText = '';
                }

                scope.$watch('imDisabled', function (imDisabled) {
                    if (imIsDefined(imDisabled) && imDisabled == true) {
                        scope.imBtnClass = 'im-flat-button-dis';
                    } else {
                        scope.imBtnClass = 'im-flat-button';
                    }
                    scope.clickEnabled = !imDisabled;
                });

                if (imIsDefined(attrs.icon)) {
                    scope.imBtnIconClass = attrs.icon;
                    scope.showIcon = true;
                };

                if (imIsDefined(attrs.text))
                    scope.text = attrs.text;

                var onClickHandler = scope.onClick();

                scope.click = function () {
                    if (imIsDefined(onClickHandler)) {
                        if (scope.clickEnabled)
                            onClickHandler();
                    }
                };
            }
        }
    })
;

