/*  Controller for Device Page */

var device = angular.module('Controllers')
device.controller('DeviceCtrl',['$scope','$rootScope','$q','JettyService','UtilitiesService','JSONService',function($scope,  $rootScope, $q, JettyService, UtilitiesService, JSONService) {
	/* global variables which we use inside functions */
    var today =  new Date();
    var currentdate = new Date(today.getUTCFullYear(),today.getUTCMonth(),today.getUTCDate()); 
    var app = $rootScope.app.app_secret;
    var timeZone = "IST";

    /*  if the user uses the date picker and changes the date, inner function gets called
        Trigger function sets the endGap and noDays based on the new date and loads the page again
    */
    var WatchDate = function(){
        $scope.$watch('daterange.date',function(nv,ov) {
            $rootScope.daterange.date.startDate = new Date(nv.startDate.getFullYear(),nv.startDate.getMonth(),nv.startDate.getDate());
            $rootScope.daterange.date.endDate = new Date(nv.endDate.getFullYear(),nv.endDate.getMonth(),nv.endDate.getDate());
            $rootScope.daterange.endGap = Math.floor((currentdate.getTime() - $rootScope.daterange.date.endDate.getTime())/(1000*60*60*24));
            $rootScope.daterange.noDays = Math.floor(($rootScope.daterange.date.endDate.getTime() - $rootScope.daterange.date.startDate.getTime())/(1000*60*60*24) + 1);
            $scope.endGap = $rootScope.daterange.endGap;
            $scope.noDays = $rootScope.daterange.noDays;
            run();
        })
    };

    /* Initialized the default date range and sets the endGap and noDays */
    var Start = function() {
        $scope.date = {startDate: new Date(currentdate.getTime() - 8*1000*60*60*24), endDate: new Date(currentdate.getTime() - 2*1000*60*60*24)};
        // $scope.date = {startDate: new Date(Date.UTC(2015,0,1)), endDate: new Date(Date.UTC(2015,0,8))};
        $scope.endGap = Math.abs(currentdate.getTime() - $scope.date.endDate.getTime())/(1000*60*60*24);
        $scope.noDays = Math.abs($scope.date.endDate.getTime() - $scope.date.startDate.getTime())/(1000*60*60*24) + 1;
    };

    /* Top Device modal and the number of these devices section and Top Devices bar graph*/
    var OATop20Devices = function() {
        JettyService.cummulative('NUTop20Models',app,$scope.endGap,$scope.noDays,3,"long",timeZone).then(function(data) {
            var oa_top20_devices = (UtilitiesService.descending(data,3)).slice(0,20);
            var mod_data = [];
            for(i=0;i< oa_top20_devices.length && i< 7;i++)
            {
            	mod_data = mod_data.concat({"x": oa_top20_devices[i].y+" "+oa_top20_devices[i].x, "y": oa_top20_devices[i].z });
            }
            $scope.oa_top_device = oa_top20_devices[0];
            UtilitiesService.draw_chart(bargraph(mod_data,oa_device_bar_style),"column2d.swf","OATopDevices","100%","400");
        });
    };

    /* Top Device Vendor section */
    var TopManu = function(){
        JettyService.cummulative('NUTop20Manufacturers',app,$scope.endGap,$scope.noDays,3,"long",timeZone).then(function(data) {
            $scope.top_manu = (UtilitiesService.descending(data,2)).slice(0,1);
        });
    }

    var DeviceMerge = function(data1,data2,data3){
        var map = {};
        for(i=0;i<data1.length;i++)
        {
            map[data1[i].x] = {'x': data1[i].y+" "+data1[i].x, 'y': data1[i].z, 'z':0, 'a':0}
        }
        for(i=0;i<data2.length;i++)
        {
            if(data2[i].x in map)
                map[data2[i].x].z = data2[i].z;       
        }
        data3 = UtilitiesService.session_split_2(data3,3);
        for(i=0;i<data3.length;i++)
        {
            if(data3[i].x in map)
                map[data3[i].x].a = data3[i].y;
        }

        var array = [];
        for(key in map){
            array = array.concat({'x':map[key].x, 'y':map[key].y, 'z':map[key].z, 'a':map[key].a})
        }

        return array;

    }
    /*  Helper Function
        Given a Page it gives the devices list which falls in that page
    */
    var DeviceList = function(tab){
        var deferred = $q.defer();
        var deviceslist = [];
        var promises = [];
        var data1,data2,data3;
        var promise1 = JettyService.cummulative('NUModelsAll',app,$scope.endGap,$scope.noDays,3,"long",timeZone);
        var promise2 = JettyService.cummulative('AUModelsAll',app,$scope.endGap,$scope.noDays,3,"hll",timeZone);
        var promise3 = JettyService.cummulative('SModelsAll',app,$scope.endGap,$scope.noDays,3,"string",timeZone);
        try
        {
            promise1.then(function(data){
                data1 = data
                $scope.oa_total_devices=0;
                for (var i = 0; i < data.length; i++) {
                    $scope.oa_total_devices+=data[i].z;
                };
            });
            promise2.then(function(data){
                data2 = data
            });
            promise3.then(function(data){
                data3 = data
            });
            promises.push(promise1);
            promises.push(promise2);
            promises.push(promise3);

            $q.all(promises).then(function(){
                deviceslist = UtilitiesService.descending(DeviceMerge(data1,data2,data3),2);
                for (var i = 0; i < deviceslist.length; i++) {
                    deviceslist[i].y=UtilitiesService.CommaSeparatedNumberFormat(deviceslist[i].y)
                     deviceslist[i].z=UtilitiesService.CommaSeparatedNumberFormat(deviceslist[i].z)
                };
                deferred.resolve(deviceslist);
            })

        }
        catch(err)
        {
            deferred.resolve();
        }
        return deferred.promise;
    };

    /* Device List Table with pagination 
       Uses the above Helper function
    */
    var OADeviceStats = function(){
        $scope.itemsPerPage = 10;
        $scope.currentPage_tab1 = 1;
        $scope.maxSize_tab1 = 5;
        var promise = DeviceList();
        promise.then(function(data){
            $scope.OADeviceStatsCSV = data;
            $scope.totalItems_tab1 = data.length;
            $scope.$watch('currentPage_tab1 + itemsPerPage', function() {
                var begin = (($scope.currentPage_tab1 - 1) * $scope.itemsPerPage),
                end = begin + $scope.itemsPerPage;
                $scope.filtereddeviceslist =  data.slice(begin, end);
                // $scope.table1loaded=true;
            });
        })
    };

    var run = function()
    {
    	OATop20Devices();
        TopManu();
        OADeviceStats();

    };

    //Start();
    WatchDate();

}]);