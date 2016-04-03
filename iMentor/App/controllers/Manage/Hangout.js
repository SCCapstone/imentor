 var apiKey = null;

        // Lay out the hangout scopes here.
        var scopes = ['https://www.googleapis.com/auth/plus.me',
                  'https://www.googleapis.com/auth/hangout.av',
                  'https://www.googleapis.com/auth/hangout.participants'];

        /** Run authorization call in either with or without popup
         * @param {boolean} isImmediate Use immedate mode for authorization.
         */
        function checkAuth(isImmediate) {
            console.log('checking auth');

            // Pass in a null client id; the gadget container will replace this
            // with a generated one.
            // HOWEVER!  You must go through the process of creating a client id
            // associated with this hangout app in the Google API console.
            gapi.auth.authorize({
                client_id: null,
                scope: scopes,
                immediate: isImmediate
            },
              handleAuthResult);
        }

        /** Callback from auth function
         * @param {object} authResult Return value from JS Client.
         */

        function handleAuthResult(authResult) {
            var authorizeButton = document.getElementById('authorize-button');
            var tokenButton = document.getElementById('token-button');

            if (authResult) {
                authorizeButton.style.visibility = 'hidden';
                tokenButton.style.visibility = '';
                tokenButton.onclick = toggleTokenVisible;
                makeGPlusApiCall();
            } else {
                authorizeButton.style.visibility = '';
                tokenButton.style.visibility = 'hidden';
                authorizeButton.onclick = onAuthorizeClick;
            }
        }

        function onAuthorizeClick(event) {
            // non-immediate mode; i.e., pop up a dialog.
            checkAuth(false);
        }

        function toggleTokenVisible(event) {
            var tokenButton = document.getElementById('token-button');
            var tokenField = document.getElementById('token-field');

            if (tokenField.style.visibility == 'hidden') {
                tokenField.innerHTML = gapi.auth.getToken().access_token;
                tokenButton.innerHTML = 'Hide token';
                tokenField.style.visibility = '';
            } else {
                tokenButton.innerHTML = 'Show token';
                tokenField.style.visibility = 'hidden';
            }
        }

        function makeGPlusApiCall() {
            gapi.client.load('plus', 'v1', function () {
                var request = gapi.client.plus.people.get({
                    'userId': 'me'
                });
                request.execute(function (resp) {
                    var heading = document.createElement('h4');
                    var nameHeading = document.createElement('h2');
                    var image = document.createElement('img');

                    // Note that these values, URL and displayName
                    // are already visible in the Hangouts API 
                    // as part of the Participant data structure.
                    // We are using these ONLY as an example.
                    image.src = resp.image.url;
                    nameHeading.appendChild(document.createTextNode(resp.displayName));
                    heading.appendChild(image);

                    document.getElementById('content').appendChild(heading);
                    document.getElementById('content').appendChild(nameHeading);

                    document.getElementById('instructions').innerHTML = '';

                });
            });
        }

/** Reads parameters off the iframe's URI
 @param {String} paramName the name of the parameter.
 @return {String} value of parameter.
 */

    function getParameters() {
        var ret = {};

        var queryString = window.location.search.substring(1);
        var params = queryString.split('&');
        for (var co = 0; co < params.length; co++) {
            var keyValue = params[co].split('=');
            ret[keyValue[0]] = unescape(keyValue[1]);
        }

        return ret;
    };
/** This is where we put status updates. */
var apiStatusDiv = document.getElementById('apiStatus');
/** Updates the list of participants.  We use this to show that our
  * API is ready. */
function updateParticipants() {
  var participantsDiv = document.getElementById('participants');
  var retVal = '<ul>';
  var participants = gapi.hangout.getParticipants();
  for (var index in participants) {
    var part = participants[index];
    if (part.person == null) {
      retVal += '<li>An unknown person</li>';
      continue;
    }
    retVal += '<li>' + stripHTML(part.person.displayName) + '</li>';
  }
  retVal += '</ul>';
  participantsDiv.innerHTML = retVal;
}
/** Make an authenticated Google+ API call using the access token. */
function onApiReady() {
    // We can get the parameters that were used to start the hangout,
    // and we will pass some of these along to the server.
    var param = getParameters();
    var now = new Date();

    // At this point, we can access the Hangout API functions
    var hangoutUrl = gapi.hangout.getHangoutUrl();
      console.log(hangoutUrl);
    //Get the URL of this javascript, so we can call a nearby page with this URL info
    var callbackUrl = 'register_hangout.json';

    // Make the call via AJAX.
    // The data are all passed as parameters in the call
    $.ajax({
        url: callbackUrl,
        dataType: 'json',
        data: {
            "hangoutUrl": hangoutUrl,
            "topic": param["gd"]
        }
      
    }).done(function (data, status, xhr) {
        // Call was made, process results
        $('#msg').html(data.msg);
    }).fail(function (xhr, status, error) {
        $('#msg').html("There was a problem contacting the help desk. Please try again. (" + textStatus + ")");
    });
};

onClientReady = function () {
    gapi.hangout.onApiReady.add(function (e) {
        if (e.isApiReady) {
            onApiReady();
        }
    });
};

       