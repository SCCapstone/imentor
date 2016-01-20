'use strict';

app.controller('homeCtrl',
    function ($scope, $rootScope, $location, $log, homeService)
    {
        $scope.subjects = [
            { 'name': 'Math' },
            { 'name': 'Science' },
            { 'name': 'History' },
            { 'name': 'Reading' }];

        $scope.subjectsIncludes = [];


        $scope.includeSubject = function (name) {
            var i = $.inArray(name, $scope.subjectsIncludes);
            if (i > -1) {
                $scope.subjectsIncludes.splice(i, 1);
            } else {
                $scope.subjectsIncludes.push(name);
            }
        }

        $scope.subjectFilter = function (subjects) {
            if ($scope.subjectsIncludes.length > 0) {
                if ($.inArray(subjects.name, $scope.subjectsIncludes) < 0)
                    return;
            }

            return subjects;
        }
    }
);