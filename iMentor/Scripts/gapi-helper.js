gapi_helper = {
    
    start: moment(),
    listeners: {},
    status: {}
};

// for logging elapsed times to console
gapi_helper.time = function () {
    return moment(gapi_helper.start).fromNow();
};

// config must contain clientId, apiKey, scopes, and services to load, eg
// { clientId: "<id>", apiKey: "<key>", scopes: "https://www.googleapis.com/auth/calendar", 
//   services: { calendar: 'v3' } }
gapi_helper.configure = function (config) {
    //console.log("gapi configured %s", gapi_helper.time());
    // TODO: confirm valid config
    gapi_helper.config = config;
    if (gapi_helper.status.scriptLoaded) gapi_helper.init();
};

gapi_helper.onScriptLoad = function () {
//console.log("gapi script loaded %s", gapi_helper.time());
    gapi_helper.status.scriptLoaded = true;
    if (gapi_helper.config) gapi_helper.init();
};
// this synonym is needed by the '?onload=' construction, which seems to choke on object notatation
// use «script src="https://apis.google.com/js/client.js?onload=gapi_helper_onScriptLoad»
gapi_helper_onScriptLoad = gapi_helper.onScriptLoad;

gapi_helper.init = function () {
    //console.log("gapi_helper.init %s", gapi_helper.time());
    gapi.client.setApiKey(gapi_helper.config.apiKey);
    window.setTimeout(gapi_helper.checkAuth, 1);
};

gapi_helper.checkAuth = function () {
    //console.log("gapi_helper.checkAuth %s", gapi_helper.time());
    gapi.auth.authorize({
        client_id: gapi_helper.config.clientId,
        scope: gapi_helper.config.scopes,
        immediate: true
    }, gapi_helper.handleAuthResult);
};

gapi_helper.handleAuthResult = function (authResult) {
    //console.log("gapi_helper.handleAuthResult %s", gapi_helper.time());
    if (authResult && !authResult.error) {
        gapi_helper.fireEvent('authorized');
        gapi_helper.loadServices();
    } else {
        gapi_helper.fireEvent('authFailed');
    }
};

gapi_helper.requestAuth = function (event) {
    //console.log("gapi_helper.requestAuth %s", gapi_helper.time());
    gapi.auth.authorize({
        client_id: gapi_helper.config.clientId,
        scope: gapi_helper.config.scopes,
        immediate: false,
        cookie_policy: "single_host_origin"
    }, gapi_helper.handleAuthResult);
    return false; // so you can use this as an onclick handler
};

gapi_helper.loadServices = function () {
   //console.log("gapi_helper.loadServices %s", gapi_helper.time());

    function eventFirer(name, version) {
        return function (result) {
            //console.log("%s %s loaded %s %O", name, version, gapi_helper.time(), result);
            gapi_helper.fireEvent(name + 'Loaded');
        };
    }

    for (var name in gapi_helper.config.services) {
        var version = gapi_helper.config.services[name];
        gapi.client.load(name, version, eventFirer(name, version));
    }

};

// TODO add gapi_helper.logout

gapi_helper.when = function (eventName, callback) {
    // if event has already happened, trigger the callback immediately
    if (gapi_helper.status[eventName]) callback();
    // in any case, add the callback to the listeners array
    if (!gapi_helper.listeners[eventName]) gapi_helper.listeners[eventName] = [];
    gapi_helper.listeners[eventName].push(callback);
    //console.log('gapi_helper: registered listener for %s', eventName);
};

gapi_helper.fireEvent = function (eventName) {
    //console.log("firing %s", eventName);
    // register event
    gapi_helper.status[eventName] = true;
    // trigger listeners
    var listeners = gapi_helper.listeners[eventName] || [];
    for (var i = 0; i < listeners.length; i++) {
        listeners[i]();
    }
};

gapi_helper.watcher = setInterval(function () {
    var loaded = typeof gapi !== "undefined" && gapi.client;
    //console.log("%s %s", loaded ? "gapi loaded" : "waiting", gapi_helper.time());
    if (loaded) {
        clearTimeout(gapi_helper.watcher);
        gapi_helper.onScriptLoad();
    }
}, 500);