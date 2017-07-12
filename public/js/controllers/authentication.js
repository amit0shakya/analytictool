var authentication = angular.module('Users',['LocalStorageModule','ui.bootstrap']);
authentication.controller('AuthenticationController', ['$scope', '$rootScope', '$modal', '$http', '$location','localStorageService',
	function($scope, $rootScope, $modal, $http, $location,localStorageService) {

		$scope.firstname = $rootScope.user.firstname;
		$scope.appname = $rootScope.app.application;

		$scope.signin = function() {
			$http.post('/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$rootScope.user = response;
				localStorageService.set('user',$rootScope.user);
				localStorageService.set('age',Date.now());
				// And redirect to the index page
				$location.path('/application');
			}).error(function(response) {
				
				if (response==11) {
					$scope.error = "User not found";
				}
				else if(response==12)
				{
					$scope.error = "Wrong password";
				}
				else if(response==13)
				{
					$scope.error = "Unable to connect to server";
				}
				
				
			});
		};

		$scope.logout = function() {
			$http.get('/logout').success(function(response) {
				localStorageService.remove('user');
				localStorageService.remove('app');
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.register = function() {
			var modalInstance = $modal.open({
			      templateUrl: 'partials/signup.html',
			      controller: ModalInstanceCtrl
			});
		};

		$scope.is_demo = function(){
			if($location.absUrl().indexOf("demo")>-1 || $location.absUrl().indexOf("148.251.42.156")>-1
				|| $location.absUrl().indexOf("148.251.42.155")>-1)
			{
				return true;
			}
			return false;
		};

		$scope.reloadPage=function(page) {
			if ($scope.subPage=='partials/'+page) {
				$scope.subPage='partials/send-push-reprt.html';
				 setTimeout(function() {
				 $scope.$apply(function() {
				 $scope.subPage='partials/'+page; }, 10);
      				});
			}
			else{
				$scope.subPage='partials/'+page
			 }
			


   

}

}]);

var ModalInstanceCtrl = ['$scope','$rootScope','$modalInstance','$http','$location',function ($scope,$rootScope,$modalInstance,$http,$location) {

			$scope.signup = function() {
				$http.post('/signup', $scope.credentials).success(function(response) {
							if(response.error)
							{
								$scope.error = response.error;
							}
							else
							{
								$modalInstance.close()
								$rootScope.activationemail=response.email
								$location.path('/activate')
							}
						}).error(function(response) {
							$scope.error = response;
						});
			}

			$scope.close = function() {
        		$modalInstance.close()
    		};



		}];