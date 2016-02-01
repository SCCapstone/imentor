'use strict';

app.controller('calendarCtrl', function ($scope, $log) {
   
 
 

 
    function makeApiCall() {
        gapi.client.load('calendar', 'v3', function() {
            var request = gapi.client.calendar.calendarList.list();
            request.execute(function(resp){
                $.each( resp.items, function( key, value ) {
                    console.log(resp.items[key].id);
                });
            });
            var request1 = gapi.client.calendar.events.list({
                'calendarId': 'primary',
                'timeMin': '2015-12-23T04:26:52.000Z'//Suppose that you want get data after 23 Dec 2014
            });
            request1.execute(function(resp){
                $.each( resp.items, function( key, value ) {
                    console.log(resp.items[key].id);// here you give all events from google calendar
                });
            });
        });
    } 
 
});
