


app.controller('calendarCtrl', function ($scope){
    var events = [
    {title: "Test", start: new Date (2016, 02, 11)}
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