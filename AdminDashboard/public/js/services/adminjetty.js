var jetty = angular.module('Services',[]);
jetty.service('JettyService',['$http','$rootScope','$q',function($http,$rootScope,$q) {
	
    
    this.getusers = function(domain,app) {
        var deffered = $q.defer();
        $http(
        {
            url: 'http://api.rocq.io/getusers',
            method: 'GET',
            params: 
            {
                domain: domain,
                app: app,
                index: 0,
               
            }
        }).success(function(data) {
            deffered.resolve(data);
        }).error(function(data) {
            deffered.resolve();
        });
        return deffered.promise;
    };

    this.overview = function(domain,app) {
        var deffered = $q.defer();
        $http(
        {
            url: 'http://api.rocq.io/overview',
            method: 'GET',
            params: 
            {
                domain: domain,
                app: app,
            }
        }).success(function(data) {
            deffered.resolve(data);
        }).error(function(data) {
            deffered.resolve();
        });
        return deffered.promise;
    };
    
}]);