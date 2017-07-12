var ForgotPassword = angular.module('Controllers');
ForgotPassword.controller('ForgotPasswordController', ['$scope', '$rootScope', '$modal', '$http', '$location','localStorageService',
    function($scope, $rootScope, $modal, $http, $location,localStorageService) {

     

  $scope.generatetoken= function(){
	$http.post('/forgot', {email:$scope.useremail}).success(function(response) {
            console.log(response)
            if (response=='success') 
              {
                $scope.tokengenerted=true;
            	$('#Error').hide()
            	$('#Success').show()
            }
            else{
            	$('#error-msg').html(response)
            	$('#Error').show()
            	$('#Success').hide()
            }
            
            }).error(function() {
            	$('#error-msg').html('An error occured')
                 $('#Error').show()
            	 $('#Success').hide()
            });
  }

  $scope.getemail = function(){
    var qs=querystring(window.location.search.substr(1).split('&'))
      $scope.email=qs.email;
    }

   $scope.reset= function(){
   		
	   	var qs=querystring(window.location.search.substr(1).split('&'))
    
	$http.post('/resetpassword', {resettoken: qs.token, password:$scope.password}).success(function(response) {
            if (response=='success') {
            	$scope.success=true;
            	$('#Error').hide()
            	$('#Success').show()
            }
            else{
            	$('#error-msg').html(response)
            	$('#Error').show()
            	$('#Success').hide()
            }
            }).error(function() {
                 $('#error-msg').html('An error occured')
                 $('#Error').show()
            	 $('#Success').hide()
            });
  }

  // function to parse the url to get params
  var querystring = function(a) {
      if (a == "") return {};
      var b = {};
      for (var i = 0; i < a.length; ++i)
      {
          var p=a[i].split('=', 2);
          if (p.length == 1)
              b[p[0]] = "";
          else
              b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
      }
      return b;
    };

}]);

