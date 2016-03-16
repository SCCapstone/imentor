app.factory('CalendarData', function($q, $log) {
  var self = {};

  // gets the calendar list from Google
  self.getCalendars = function() {
    var deferred = $q.defer();
    var request = gapi.client.calendar.calendarList.list();
    request.execute(function(resp) {
      $log.debug("CalendarData.getCalendars response %O", resp);
      deferred.resolve(resp.items);
    });
    return deferred.promise;
  };

  // fetches events from a particular calendar
  // start and end dates (optional) must be RFC 3339 format 
  self.getEvents = function(calendarId, start, end) {
    var deferred = $q.defer();
    if (gapi_helper.status.calendarLoaded) {
      var request = gapi.client.calendar.events.list({
        calendarId: calendarId,
        timeMin: start,
        timeMax: end,
        maxResults: 10000, // max results causes problems: http://goo.gl/FqwIFh
        singleEvents: true
      });
      request.execute(function(resp) {
        $log.debug("CalendarData.getEvents response %O", resp);
        deferred.resolve(resp.items || []);
      });
    } else {
      deferred.reject([]);
    }
    return deferred.promise;
  };

  return self;
});

app.factory("EventSourceFactory", function($q, CalendarData) {
  var self = {};

  self.eventCache = {};
  // if cached data is older than this, don't display it; wait for server data
  self.displayableTime = 1000 * 60 * 5; // 5 minutes
  // if cached data is younger than this, don't bother hitting the server at all
  self.noUpdateTime = 1000 * 30; // 30 seconds
  // (if age falls inbetween, display cached, then query server in the bg to update cache)

  // converts unix timestamp to Google API date format (RFC 3339)
  self.ts2googleDate = function(ts) {
    return $.fullCalendar.formatDate($.fullCalendar.parseDate(ts), 'u');
  };

  // reformats events from Google's API into an object fullcalendar can use
  self.google2fcEvent = function(google) {
    var fc = {
      title: google.summary,
      start: google.start.date || google.start.dateTime,
      end: google.end.date || google.end.dateTime,
      allDay: google.start.date ? true : false,
      google: google // keep a reference to the original
    };
    if (fc.allDay) {
      // subtract 1 from end date: Google all-day end dates are exclusive
      // FullCalendar's are inclusive
      var end = $.fullCalendar.parseDate(fc.end);
      end.setDate(end.getDate() - 1);
      fc.end = $.fullCalendar.formatDate(end, 'yyyy-MM-dd');
    }
    return fc;
  };

  // fetches events from Google
  // callback is called with the results when they arrive
  self.fetchEvents = function(calendarId, start, end, callback) {
    start = self.ts2googleDate(start);
    end = self.ts2googleDate(end);
    CalendarData.getEvents(calendarId, start, end).then(function(result) {
      callback(result.map(self.google2fcEvent));
    });
  };

  // gets events, possibly from the cache if it's not stale
  self.getEvents = function(calendarId, start, end, callback) {
    var key = calendarId + '|' + start + '|' + end;
    var cached = self.eventCache[key];
    var now = new Date();
    var displayCached = false,
      updateCache = true;
    if (cached) {
      var age = new Date().getTime() - cached.date.getTime();
      displayCached = age <= self.displayableTime;
      updateCache = age > self.noUpdateTime;
    }
    // cached data is ok to display? then display it
    if (displayCached) {
      callback(cached.data);
    }
    // do we need to update the cache with fresh data from Google?
    if (updateCache) {
      self.fetchEvents(calendarId, start, end, function(data) {
        self.eventCache[key] = {
          date: new Date(),
          data: data
        };
        // display the fresh data if we didn't display the cached data
        if (!displayCached) callback(data);
      });
    }
  };

  // converts a calendar object from Google's API to a fullcalendar event source
  self.google2fcEventSource = function(calendar) {
    return {
      events: function(start, end, callback) {
        self.getEvents(calendar.id, start, end, callback);
      },
      textColor: calendar.foregroundColor,
      color: calendar.backgroundColor,
      google: calendar // keep a reference to the original
    };
  };

  // gets event sources for all calendars in the user's Google account
  self.getEventSources = function() {
    var deferred = $q.defer();
    CalendarData.getCalendars().then(function(result) {
      sources = result.map(self.google2fcEventSource);
      deferred.resolve(sources);
    }, function(error) {
      $scope.$log("EventSourceFactory.getEventSources error %O", error);
      deferred.reject(error);
    });
    return deferred.promise;
  };

  return self;

});