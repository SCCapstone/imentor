
app.controller('hangoutCtrl', ['$scope',
    function($scope){

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
            
       
  
            }]);








