var device = angular.module('Controllers')
device.controller('DeviceCtrl',['$scope','$q','JettyService','UtilitiesService','JSONService',function($scope, $q, JettyService, UtilitiesService, JSONService) {
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

    var OATop20Devices = function() {
        var deferred = $q.defer();
        JettyService.timewise('NUTop20DeviceModels',"2665c38c69",$scope.endgap,$scope.range_days,2,3,function(data) {
            $scope.oatop20DevicesData = data;
            $scope.oatop20Devices = UtilitiesService.top_cummulative_3var(data,1,20);
            console.log($scope.oatop20Devices);
            var mod_data = [];
            for(i=0;i< $scope.oatop20Devices.length && i< 7;i++)
            {
            	mod_data = mod_data.concat({"x": $scope.oatop20Devices[i].y+" "+$scope.oatop20Devices[i].x, "y": $scope.oatop20Devices[i].z });
            }
            UtilitiesService.draw_chart(bargraph(mod_data),"column2d.swf","OATopDevices","100%","400");
            deferred.resolve();
        });
        return deferred.promise;
    };

    var GetDeviceStats = function(tab){
        $scope.devicestatslist = [];
        JettyService.keywise('OADeviceStats',"2665c38c69",tab,$scope.endgap,$scope.range_days,2,3,function(data) {
            $scope.devicestatslist = UtilitiesService.top_cummulative_5var(data,1);
        });
    };

    var OADeviceStats = function(){
        var deferred = $q.defer();
        $scope.totalItems_tab1 = 2000;
        $scope.itemsPerPage = 10;
        $scope.currentPage_tab1 = 1;
        $scope.maxSize_tab1 = 5;
        $scope.$watch('currentPage_tab1 + itemsPerPage', function() {
            GetDeviceStats($scope.currentPage_tab1);
        });
        deferred.resolve();
        return deferred.promise;
    };

    var run = function()
    {
    	OATop20Devices().finally(OADeviceStats);

    };

    run();

}]);