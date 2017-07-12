(function() {
	var rocq = angular.module('Rocq', ['ngRoute','Controllers','Services','ui.bootstrap','Users']);
    rocq.config(function($routeProvider,$locationProvider) {
        $locationProvider.html5Mode(true);
        var loginRequired = function($location, $q, $rootScope,localStorageService) { 
            var deferred = $q.defer();
            $rootScope.user = localStorageService.get('user') || {};
            if(!$rootScope.user.username) {
                deferred.reject()
                $location.path('/admin');
            } else {
                deferred.resolve()
            }
            return deferred.promise;
        }
        $routeProvider
            
            .when('/admin', {
                templateUrl : 'adminpartials/adminlogin.html'
            })
            .when('/user', {
                templateUrl : 'adminpartials/adminusers.html',
                resolve : {loginRequired : loginRequired}
            })
            // route for the applications page

    });
    rocq.run(function ($rootScope,localStorageService) {
        // keep user logged in after page refresh
        $rootScope.user = localStorageService.get('user') || {};
        $rootScope.app = localStorageService.get('app') || {};
    })
})();