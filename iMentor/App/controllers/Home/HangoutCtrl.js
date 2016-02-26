
app.controller('hangoutCtrl', ['$scope','manageService',
    function($scope, manageService){

        $scope.currentUserIsAdmin = true;

        $scope.getParameters = function(){
        
            $scope.ret = {};

            $scope.queryString = window.location.search.substring(1);
            $scope.params = queryString.split('&');
            for( var co=0; co<params.length;co++){

                $scope.keyValue = params[co].split('=');
                ret[keyValue[0]] = unescape(keyValue[1]);
            }
            
            return ret;
        };

               
        $scope.onClientReady = function () {

            gapi.hangout.onApiReady.add(function (e) {
                if (e.isApiReady) {
                    onApiReady();
                }

            });
        };

        onApiReady = function () { };
            
       $scope.param = getParameters();
       $scope.now = new Date();

       //gets hangout URL with users attending
       $scope.hangoutURL = gapi.hangout.getHangoutUrl();

       $scope.callbackUrl = 'register_hangout.json'

       $.ajax({
           url: callbackUrl,
           dataType: 'json',
           data: {
               "hangoutUrl": hangoutUrl,
               "topic": param["gd"]
           }
       }).done(function(data,status,xhr){

           $('#msg').html(data.msg);
       }).fail( function(xhr, status, error){
           $('msg').html("There was a probem contacting the help desk. Please try again.");
       });
           

       
  
            }]);








