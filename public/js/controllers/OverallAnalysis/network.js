var network = angular.module('Controllers')
network.controller('NetworkCtrl',['$scope','$q','JettyService','UtilitiesService','JSONService',function($scope, $q, JettyService, UtilitiesService, JSONService) {

	$scope.date = {startDate: new Date(2015,0,1), endDate: new Date(2015,0,8)};
    console.log($scope.date);
    var today =  new Date();
    $scope.currentdate = new Date(today.getFullYear(),today.getMonth(),today.getDate());
    $scope.endgap = Math.abs($scope.currentdate.getTime() - $scope.date.endDate.getTime())/(1000*60*60*24);
    $scope.range_days = Math.abs($scope.date.endDate.getTime() - $scope.date.startDate.getTime())/(1000*60*60*24) + 1;
    console.log($scope.endgap+"dfsdf"+$scope.range_days);

    // $scope.$watch('date',function(nv,ov) {
    //     $scope.date.startDate = new Date(nv.startDate.getFullYear(),nv.startDate.getMonth(),nv.startDate.getDate());
    //     $scope.date.endDate = new Date(nv.endDate.getFullYear(),nv.endDate.getMonth(),nv.endDate.getDate());
    //     $scope.endgap = Math.abs($scope.currentdate.getTime() - $scope.date.endDate.getTime())/(1000*60*60*24);
    //     $scope.range_days = Math.abs($scope.date.endDate.getTime() - $scope.date.startDate.getTime())/(1000*60*60*24) + 1;
    //     run();
    // })

    var OATop20Operators = function(){
    	var deferred = $q.defer();
        JettyService.timewise('OATop20NetworkOperators',"2665c38c69",$scope.endgap,$scope.range_days,2,3,function(data) {
            console.log(data);
            $scope.oatop20Operators = UtilitiesService.top_cummulative_2var(data,1,5);
            var mod_data = [];
            for(i=0;i< $scope.oatop20Operators.length && i< 5;i++)
            {
            	mod_data = mod_data.concat({"x": $scope.oatop20Operators[i].x, "y": $scope.oatop20Operators[i].y });
            }
            console.log(mod_data);
            UtilitiesService.draw_chart(bargraph(mod_data),"column2d.swf","OATopOperators","100%","400");
            deferred.resolve();
        });
        return deferred.promise;
    };

    var OANetworkType = function(){
    	var deferred = $q.defer();
        JettyService.timewise('OANetworkType',"2665c38c69",$scope.endgap,$scope.range_days,2,3,function(data) {
            console.log(data);
            $scope.oanetworktype = UtilitiesService.top_cummulative_2var(data,1,5);
            var mod_data = [];
            for(i=0;i< $scope.oanetworktype.length && i< 5;i++)
            {
            	mod_data = mod_data.concat({"x": $scope.oanetworktype[i].x, "y": $scope.oanetworktype[i].y });
            }
            console.log(mod_data);
            UtilitiesService.draw_chart(piechart_op(mod_data),"doughnut2d.swf","OANetworkType","100%","400");
            deferred.resolve();
        });
        return deferred.promise;
    };

    var GetOperators = function(tab){
        $scope.operatorslist = [];
        JettyService.keywise('OANetworkOperatorsAll',"2665c38c69",tab,$scope.endgap,$scope.range_days,2,3,function(data) {
            $scope.operatorslist = UtilitiesService.top_cummulative_2var(data,1);
        });
    }

    var OANetworkOperatorsAll = function(){
        var deferred = $q.defer();
        $scope.totalItems_tab1 = 2000;
        $scope.itemsPerPage = 10;
        $scope.currentPage_tab1 = 1;
        $scope.maxSize_tab1 = 5;
        $scope.$watch('currentPage_tab1 + itemsPerPage', function() {
            GetOperators($scope.currentPage_tab1);
        });
        deferred.resolve();
        return deferred.promise;
    };

    var run = function(){
    	OATop20Operators().finally(OANetworkType)
                          .finally(OANetworkOperatorsAll);
    };

    run();

}]);