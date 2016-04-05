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
                        { value: 1, text: "Monday", abb: "Mon", letter: "M", selected: false, disabled: false },
                        { value: 2, text: "Tuesday", abb: "Tue", letter: "T", selected: false, disabled: false },
                        { value: 3, text: "Wednesday", abb: "Wed", letter: "W", selected: false, disabled: false },
                        { value: 4, text: "Thursday", abb: "Thu", letter: "R", selected: false, disabled: false },
                        { value: 5, text: "Friday", abb: "Fri", letter: "F", selected: false, disabled: false },
                        { value: 6, text: "Saturday", abb: "Sat", letter: "S", selected: false, disabled: false },
                        { value: 7, text: "Sunday", abb: "Sun", letter: "U", selected: false, disabled: false }
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
                        scope.changeDate();
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

                    scope.changeDate = function () {
                        var weekday = new Array(7);
                        weekday[0]=  "U";
                        weekday[1] = "M";
                        weekday[2] = "T";
                        weekday[3] = "W";
                        weekday[4] = "R";
                        weekday[5] = "F";
                        weekday[6] = "S";

                        var startDate = new Date(scope.startDate);
                        var endDate = new Date(scope.endDate);

                        var timeDiff = Math.abs(endDate - startDate);
                        var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

                        if (diffDays < 7) {
                            var startDay = startDate.getDay();
                            var endDay = endDate.getDay();
                            
                            for (var j = 0; j < scope.daysOfTheWeek.length; j++) {
                                scope.daysOfTheWeek[j].disabled = true;
                            }

                            //If the startDay is a weekday earlier than the endDay weekday or they are the same day
                            if (startDay < endDay || startDay == endDay) {
                                var dayArray = new Array(endDay - startDay + 1);
                                for (var i = 0; i < dayArray.length; i++) {
                                    dayArray[i] = weekday[startDay + i];
                                }
                                
                                findValidDays(dayArray);
                            }
                            //if the endDay is a weekday eariler than the startDay weekday ( Thur->Monday)
                            else if (endDay < startDay) {
                                var dayArray = [];

                                for (var i = 0; i <= 6 - startDay; i++) {
                                    dayArray.push(weekday[startDay + i]);
                                }

                                for (var i = 0; i <= endDay; i++) {
                                    dayArray.push(weekday[i]);
                                }


                                findValidDays(dayArray);
                            }
                        } else {
                            for (var j = 0; j < scope.daysOfTheWeek.length; j++) {
                                scope.daysOfTheWeek[j].disabled = false;
                            }
                        }
                    }

                    function contains(a, obj) {
                        for (var i = 0; i < a.length; i++) {
                            if (a[i] === obj) {
                                return true;
                            }
                        }
                        return false;
                    }

                    function findValidDays(a) {
                        for (var i = 0; i < a.length; i++) {
                            for (var j = 0; j < scope.daysOfTheWeek.length; j++) {
                                if (a[i].localeCompare(scope.daysOfTheWeek[j].letter) == 0) {
                                    scope.daysOfTheWeek[j].disabled = false;
                                }
                            }
                        }

                        for (var j = 0; j < scope.daysOfTheWeek.length; j++) {
                            if (scope.daysOfTheWeek[j].disabled) {
                                scope.daysOfTheWeek[j].selected = false;
                            }
                        }
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

