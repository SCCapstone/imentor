


app.controller('CalendarCtrl', function ($scope){
    var events = [
    {title: "Test", start: new Date (2016, 2, 11)}
    ];

    $scope.eventSources = [events];
    $scope.calOptions = {
    editable: true,
    header:{
        left: 'prev',
        center:'title',
        right: 'next'
     }
    };

});