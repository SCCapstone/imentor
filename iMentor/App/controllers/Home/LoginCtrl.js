'use strict';

app.controller('LoginCtrl', function($scope,$ionicPopup) {
$scope.logged_in = false;
$scope.getMember = function(id) {
    console.log(id);
};
$scope.test = function(){
    $ionicPopup.alert({"title":"Clicked"});
}

$scope.call_google = function(){
    googleapi.authorize({
        client_id: '1086641013362-rj0u1ckimo3hs369gc8q40bvqs2d1rau.apps.googleusercontent.com',
    client_secret: 'sN9oU8mW3jP6qGDYGNMX2LS7',

    redirect_uri: 'http://localhost:44300',
    scope: 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar'
    }).done(function(data) {
        accessToken=data.access_token;
        // alert(accessToken);
        // $loginStatus.html('Access Token: ' + data.access_token);
        console.log(data.access_token);
        //$ionicPopup.alert({"title":JSON.stringify(data)});
        $scope.getDataProfile();
    });
};
$scope.getDataProfile = function(){
    var term=null;
    //  alert("getting user data="+accessToken);
    $.ajax({
           url:'https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token='+accessToken,
           type:'GET',
           data:term,
           dataType:'json',
           error:function(jqXHR,text_status,strError){
           },
           success:function(data)
           {
           var item;

           console.log(JSON.stringify(data));
           // Save the userprofile data in your localStorage.
           window.localStorage.gmailLogin="true";
           window.localStorage.gmailID=data.id;
           window.localStorage.gmailEmail=data.email;
           window.localStorage.gmailFirstName=data.given_name;
           window.localStorage.gmailLastName=data.family_name;
           window.localStorage.gmailProfilePicture=data.picture;
           window.localStorage.gmailGender=data.gender;
           window.localStorage.gmailName=data.name;
           $scope.email = data.email;
           $scope.name = data.name;
           }
        });
        //$scope.disconnectUser(); //This call can be done later.
};
$scope.disconnectUser = function() {
  var revokeUrl = 'https://accounts.google.com/o/oauth2/revoke?token='+accessToken;

  // Perform an asynchronous GET request.
  $.ajax({
    type: 'GET',
    url: revokeUrl,
    async: false,
    contentType: "application/json",
    dataType: 'jsonp',
    success: function(nullResponse) {
      // Do something now that user is disconnected
      // The response is always undefined.
      accessToken=null;
      console.log(JSON.stringify(nullResponse));
      console.log("-----signed out..!!----"+accessToken);
    },
    error: function(e) {
      // Handle the error
      // console.log(e);
      // You could point users to manually disconnect if unsuccessful
      // https://plus.google.com/apps
    }
  });
};
})