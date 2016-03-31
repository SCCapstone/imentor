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
                scope.startDate = scope.listing.StartDate;
                scope.endDate = scope.listing.EndDate;
                scope.owner = scope.listing.OwnerUserName;
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
                    
                    scope.daysOfTheWeek = [
                        { value: 1, text: "Monday", abb: "Mon", letter: "M", selected: false },
                        { value: 2, text: "Tuesday", abb: "Tue", letter: "T", selected: false },
                        { value: 3, text: "Wednesday", abb: "Wed", letter: "W", selected: false },
                        { value: 4, text: "Thursday", abb: "Thu", letter: "R", selected: false },
                        { value: 5, text: "Friday", abb: "Fri", letter: "F", selected: false },
                        { value: 6, text: "Saturday", abb: "Sat", letter: "S", selected: false },
                        { value: 7, text: "Sunday", abb: "Sun", letter: "U", selected: false }
                    ]

                    parseFrequency();

                    scope.isNew = (scope.listing.Id == null);

                    scope.timeEditMode = (scope.listing.Id == null);

                    scope.startTime = null; 
                    scope.endTime = null;
                    scope.startDate = null;
                    scope.endDate = null;

                    if(!scope.isNew){
                        scope.startTime = scope.listing.StartDate; 
                        scope.endTime = scope.listing.EndDate;
                        scope.startDate = scope.listing.StartDate;
                        scope.endDate = scope.listing.EndDate;
                    }else{
                        scope.startTime = new Date(); 
                        scope.endTime = new Date();
                        scope.startDate = new Date();
                        scope.endDate = new Date();
                    }
                    
                    scope.picker = { opened: false };

                    scope.openPicker = function () {
                        $timeout(function () {
                            scope.picker.opened = true;
                        });
                    };

                    scope.closePicker = function () {

                        var startDate = new Date(scope.startDate);
                        var startTime = new Date(scope.startTime);
                        var endDate = new Date(scope.endDate);
                        var endTime = new Date(scope.endTime);

                        startDate.setHours(startTime.getHours());
                        startDate.setMinutes(startTime.getMinutes());

                        endDate.setHours(endTime.getHours());
                        endDate.setMinutes(endTime.getMinutes());

                        scope.listing.StartDate = startDate;
                        scope.listing.EndDate = endDate;

                        scope.picker.opened = false;
                    };

                    scope.edit = function () {
                        scope.timeEditMode = true;
                    }

                    scope.saveDateTime = function () {
                        //--Date/Time--
                        var startDate = new Date(scope.startDate);
                        var startTime = new Date(scope.startTime);
                        var endDate = new Date(scope.endDate);
                        var endTime = new Date(scope.endTime);

                        startDate.setHours(startTime.getHours());
                        startDate.setMinutes(startTime.getMinutes());

                        endDate.setHours(endTime.getHours());
                        endDate.setMinutes(endTime.getMinutes());

                        scope.listing.StartDate = startDate;
                        scope.listing.EndDate = endDate;

                        //--Frequency--
                        var frequency = "";
                        for (var i = 0; i < scope.daysOfTheWeek.length; i++) {
                            if (scope.daysOfTheWeek[i].selected) {
                                frequency += scope.daysOfTheWeek[i].letter;
                            }
                        }
                        scope.listing.Frequency = frequency;

                        //--Update the listing if it's not new--
                        if(!scope.isNew){
                            manageService.updateListing(scope.listing);
                        }

                        scope.timeEditMode = false;
                    }


                    //This function allows other code to call it through the $rootscope
                    scope.$on('saveDateTime', function (event, data) {
                        scope.saveDateTime();
                    });

                    function parseFrequency() {
                        if(scope.listing.Frequency != null){
                            var days =  scope.listing.Frequency.split("");
                            for (var i = 0; i < scope.daysOfTheWeek.length; i++) {
                                if (contains(days, scope.daysOfTheWeek[i].letter)) {
                                    scope.daysOfTheWeek[i].selected = true;
                                }
                            }
                        }
                    }

                    scope.updateFrequency = function (day) {
                        console.log(day);
                        var frequency = day;

                        for (var i = 0; i < scope.daysOfTheWeek.length; i++) {
                            if (scope.daysOfTheWeek[i].selected) {
                                frequency += scope.daysOfTheWeek[i].letter;
                            }
                        }
                        scope.listing.Frequency = frequency;

                        console.log("Update Frequency: " + frequency);
                    }

                    function contains(a, obj) {
                        for (var i = 0; i < a.length; i++) {
                            if (a[i] === obj) {
                                return true;
                            }
                        }
                        return false;
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

