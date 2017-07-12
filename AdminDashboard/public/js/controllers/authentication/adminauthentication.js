var authentication = angular.module('Users',['LocalStorageModule','ui.bootstrap']);
authentication.controller('AuthenticationController', ['$scope', '$rootScope', '$modal', '$http', '$location','localStorageService',
	function($scope, $rootScope, $modal, $http, $location,localStorageService) {

		$scope.firstname = $rootScope.user.firstname;
		$scope.appname = $rootScope.app.application;

		$scope.signin = function() {
			
			$http.post('/adminsignin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
                 $rootScope.user = response;
				localStorageService.set('user',$rootScope.user);
				// And redirect to the index page
				$location.path('/user');
			}).error(function() {
				$scope.error = "User Name or Password is incorrect";
			});
		};

		$scope.logout = function() {
			$http.get('/logout', $scope.credentials).success(function(response) {
				localStorageService.remove('user',$rootScope.user);
				$location.path('/admin');
				
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
/*
		$scope.register = function() {
			var modalInstance = $modal.open({
			      templateUrl: 'partials/signup.html',
			      controller: ModalInstanceCtrl
			});
		};
		*/
}]);

var ModalInstanceCtrl = function ($scope,$modalInstance,$http) {
			$scope.signup = function() {
				$http.post('/signup', $scope.credentials).success(function(response) {
							if(response.error)
							{
								$scope.error = response.error;
							}
							else
							{
								$modalInstance.close()
							}
						}).error(function(response) {
							$scope.error = response;
						});
			}

			$scope.close = function() {
        		$modalInstance.close()
    		};
		};