var jetty = angular.module('Services',[]);
jetty.service('JettyService',['$http','$q',function($http,$q) {
    this.timewise = function(domain,app,endGap,range,gran,noVar,callback) {
        $http(
        {
            url: URL+'timewise',
            method: 'GET', 
            params: 
            {
                domain: domain,
                app: app,
                endGap: endGap,
                noDays: range,
                gran: gran,
                noVar: noVar
            }
        }
        ).success(function(data) {
            callback(data);
        });
    };
    this.overall = function(domain,app,callback) {
        $http(
        {
            url: URL+'total',
            method: 'GET', 
            params: 
            {
                domain: domain,
                app: app
            }
        }
        ).success(function(data) {
            callback(data);
        });
    };
    this.keywise = function(domain,app,key,endGap,range,gran,noVar,callback) {
        $http(
        {
            url: URL+'keywise',
            method: 'GET', 
            params: 
            {
                domain: domain,
                app: app,
                key: key,
                endGap: endGap,
                noDays: range,
                gran: gran,
                noVar: noVar
            }
        }
        ).success(function(data) {
            callback(data);
        });
    };


    /* modified function with deffered promise implementation */
    this.timewise_new = function(domain,app,endGap,range,gran,noVar) {
        var deffered = $q.defer();
        $http(
        {
            url: URL+'timewise',
            method: 'GET', 
            params: 
            {
                domain: domain,
                app: app,
                endGap: endGap,
                noDays: range,
                gran: gran,
                noVar: noVar
            }
        }
        ).success(function(data) {
            deffered.resolve(data);
        });
        return deffered.promise;
    };
    this.overall_new = function(domain,app) {
        var deffered = $q.defer();
        $http(
        {
            url: URL+'total',
            method: 'GET', 
            params: 
            {
                domain: domain,
                app: app
            }
        }
        ).success(function(data) {
            deffered.resolve(data);
        });
        return deffered.promise;
    };
    this.keywise_new = function(domain,app,key,endGap,range,gran,noVar) {
        var deffered = $q.defer();
        $http(
        {
            url: URL+'keywise',
            method: 'GET', 
            params: 
            {
                domain: domain,
                app: app,
                key: key,
                endGap: endGap,
                noDays: range,
                gran: gran,
                noVar: noVar
            }
        }
        ).success(function(data) {
            deffered.resolve(data);
        });
        return deffered.promise;
    };
}]);