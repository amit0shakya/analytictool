var newusers = angular.module('Controllers')
newusers.controller('NewUsersCtrl',['$scope','$q','JettyService','UtilitiesService','JSONService',function($scope, $q, JettyService, UtilitiesService, JSONService) {
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

    var NU = function() {
        var deferred = $q.defer();
        JettyService.timewise('NU','2665c38c69',$scope.endgap,$scope.range_days,2,2,function(data) {
            $scope.new_users_data = data;
            // mod_data = JSONService.cummulative(data);
            mod_data = data;
            UtilitiesService.draw_chart(line(mod_data),'Line.swf','TnewUsersTrend','100%','353');
            console.log(data);
            $scope.new_users_raw = UtilitiesService.total_count(data);
            console.log($scope.new_users_raw);
            $scope.new_users = UtilitiesService.numberFormat($scope.new_users_raw);
            deferred.resolve();
        });
        return deferred.promise;
    };
    var NUTop20Devices = function() {
        var deferred = $q.defer();
        JettyService.timewise('NUTop20DeviceModels',"2665c38c69",$scope.endgap,$scope.range_days,2,3,function(data) {
            $scope.top20DevicesData = data;
            $scope.nutop20Devices = UtilitiesService.top_cummulative_3var(data,1,20);
            $scope.percent_top5 = [];
            for(i=0; i< $scope.nutop20Devices.length && i<5; i++)
            {
                $scope.percent_top5[i] = ($scope.nutop20Devices[i].z /$scope.new_users_raw)*100;
                $scope.percent_top5[i] = $scope.percent_top5[i].toFixed(2);
                console.log($scope.percent_top5[i]);
            }
            deferred.resolve();
        });
        return deferred.promise;
    };

    var DayWiseForDevice = function(device,manu){
         var deferred = $q.defer();
            JettyService.keywise('NUDeviceModel',"2665c38c69",device,$scope.endgap,$scope.range_days,2,2,function(data){
                if(data[0].x)
                {   
                    data = data.concat({"x": device, "y": manu});
                }
                else
                {
                    data = [];
                    data = data.concat({"x": device, "y": manu});
                }
                deferred.resolve(data);
            });
            return deferred.promise;
    };

    var TopDeviceTrends = function() {
        var deferred = $q.defer();
        var mod_data = [];
        var promises = [];
        for(i=0;i<$scope.nutop20Devices.length && i<3 ;i++)
            {
                var device = $scope.nutop20Devices[i].x;
                var manu = $scope.nutop20Devices[i].y;
                promise = DayWiseForDevice(device,manu);

                promise.then(function(data){
                    var dev = data[data.length-1].x;
                    var manufacturer = data[data.length-1].y;
                    data = data.slice(0,data.length-1);
                    data = JSONService.fill(data,$scope.endgap,$scope.range_days);
                    mod_data = mod_data.concat({"z": manufacturer+" "+dev , "a": data});
                });
                promises.push(promise);
            }
            $q.all(promises).then(function(){
                console.log("k"+ i);
                console.log(mod_data);
                $scope.topdevice_daywise = mod_data;
                UtilitiesService.draw_chart(multiLine2(mod_data),"MSLine.swf",'NUTopDeviceTrends','100%','353');
                deferred.resolve();

            });
            return deferred.promise;
    };

    var TopManufacturers = function() {
        var deferred = $q.defer();
        JettyService.timewise('NUTop20DeviceManufacturers','2665c38c69',$scope.endgap,$scope.range_days,2,3,function(data) {
            $scope.nutop5Manu = UtilitiesService.top_cummulative_2var(data,1,5);
            $scope.percent_top5manu = [];
            var count = 0;
            $scope.topManuDevCount = $scope.nutop5Manu[0].y;
            for(i=0;i<5;i++)
            {
                $scope.percent_top5manu = $scope.percent_top5manu.concat({"x": $scope.nutop5Manu[i].x , "y": $scope.nutop5Manu[i].y });
                count += $scope.nutop5Manu[i].y;
                $scope.nutop5Manu[i].y = UtilitiesService.numberFormat($scope.nutop5Manu[i].y);
            }
            $scope.percent_top5manu = $scope.percent_top5manu.concat({"x": "Others", "y": $scope.new_users_raw - count })
            UtilitiesService.draw_chart(piechart_op($scope.percent_top5manu),"doughnut2d.swf","manu_share","100%","200")
            deferred.resolve();
        });
        return deferred.promise;
    };
    var TopManuDevices = function() {
        var deferred = $q.defer();
        $scope.topManu_Devices = [];
        var j=0;
        for(i=0;i<$scope.nutop20Devices.length;i++)
        {
            if($scope.nutop20Devices[i].y == $scope.nutop5Manu[0].x && j<3)
            {
                $scope.topManu_Devices = $scope.topManu_Devices.concat({"x" : $scope.nutop20Devices[i].x , "y" : (($scope.nutop20Devices[i].z/ $scope.topManuDevCount)*100).toFixed(2) })
                j++;
            }
        }
        deferred.resolve();
        return deferred.promise;
    };
    var TopSources = function() {
        var deferred = $q.defer();
        JettyService.timewise('IPaidTop20Sources','2665c38c69',$scope.endgap,$scope.range_days,2,3,function(data) {
            $scope.topSources = data;
            $scope.nutop5Sources = UtilitiesService.top_cummulative_2var(data,1,5);
            deferred.resolve();
        });
        return deferred.promise;
    };

    var DayWiseForSource = function(source){
        var deferred = $q.defer();
        JettyService.keywise('IPaidSource',"2665c38c69",source,$scope.endgap,$scope.range_days,2,2,function(data){
            if(data[0].x)
            {   
                data = data.concat({"x": source});
            }
            else
            {
                data = [];
                data = data.concat({"x": source});
            }
            deferred.resolve(data);
        });
        return deferred.promise;
    }

    var TopSourcesTrend = function() {
        var deferred = $q.defer();
        var mod_data = [];
        var promises = [];

        for(i=0;i<$scope.nutop5Sources.length && i<3 ;i++)
        {
            var source = $scope.nutop5Sources[i].x;
            promise = DayWiseForSource(source);

            promise.then(function(data){
                var src = data[data.length-1].x;
                data = data.slice(0,data.length-1);
                data = JSONService.fill(data,$scope.endgap,$scope.range_days);
                mod_data = mod_data.concat({"z": src , "a": data});
            });
            promises.push(promise);
        }
        $q.all(promises).then(function(){
            console.log("i"+ i);
            console.log(mod_data);
            $scope.topsource_daywise = mod_data;
            UtilitiesService.draw_chart(multiLine2(mod_data),"MSLine.swf",'TopSourceTrends','100%','353');
            deferred.resolve();

        });
        return deferred.promise;
    };

    var TopSourcePercentage = function(){
        var deferred = $q.defer();
        JettyService.timewise('IPaid','2665c38c69',$scope.endgap,$scope.range_days,2,2,function(data) {
            var total_paid_installs = UtilitiesService.total_count(data);
            $scope.percent_top_sources = [];
            for(i=0;i< $scope.nutop5Sources.length && i<3;i++)
            {
                $scope.percent_top_sources[i] = (($scope.nutop5Sources[i].y/ total_paid_installs)*100).toFixed(2);
            }
            deferred.resolve();
        })
        return deferred.promise;
    };
    var TopKeyWords = function(){
        var deferred = $q.defer();
        JettyService.timewise('ITop20Terms','2665c38c69',$scope.endgap,$scope.range_days,2,3,function(data) {
            $scope.nutop5Keywords = UtilitiesService.top_cummulative_2var(data,1,5);
            UtilitiesService.draw_chart(piechart_op($scope.nutop5Keywords),"doughnut2d.swf","topKeywords_share","100%","400");
            deferred.resolve();
        })
        return deferred.promise;
    };
    var DayWiseList = function(){
        var deferred = $q.defer();
        $scope.daywiselist = [];
        var data = $scope.new_users_data;
        for(i=data.length-1; i>=0; i--) {
            if(i == 0)
            {
                $scope.daywiselist = $scope.daywiselist.concat({"x":data[i].x, "y":data[i].y, "z":0});
            }
            else
            {
                $scope.daywiselist = $scope.daywiselist.concat({"x":data[i].x, "y":data[i].y, "z":(data[i].y-data[i-1].y)});
            }
        }
        $scope.totalItems_tab1 = $scope.daywiselist.length;
        $scope.itemsPerPage = 10
        $scope.currentPage_tab1 = 1;
        $scope.maxSize_tab1 = 5;
        $scope.$watch('currentPage_tab1 + itemsPerPage', function() {
        var begin = (($scope.currentPage_tab1 - 1) * $scope.itemsPerPage),
        end = begin + $scope.itemsPerPage;
        $scope.filtereddaywiselist = $scope.daywiselist.slice(begin, end);
        });
        deferred.resolve();
        return deferred.promise;
    };


    var GetNUSourceStats = function(tab){
        $scope.sourcenewuserslist = [];
        JettyService.keywise('ISourcesAll',"2665c38c69",tab,$scope.endgap,$scope.range_days,2,3,function(data) {
            $scope.sourcenewuserslist = UtilitiesService.top_cummulative_2var(data,1);
        });
    };

    var SourceNewUsersList = function(){
        var deferred = $q.defer();
        $scope.totalItems_tab2 = 1000;
        $scope.itemsPerPage = 10
        $scope.currentPage_tab2 = 1;
        $scope.maxSize_tab2 = 5;
        $scope.$watch('currentPage_tab2 + itemsPerPage', function() {
            GetNUSourceStats($scope.currentPage_tab2);
        });
        deferred.resolve();
        return deferred.promise;
    };

    var GetNUDeviceStats = function(tab){
        $scope.devicenewuserslist = [];
        JettyService.keywise('NUDevicesAll',"2665c38c69",tab,$scope.endgap,$scope.range_days,2,3,function(data) {
            $scope.devicenewuserslist = UtilitiesService.top_cummulative_3var(data,1);
        });
    };

    var DeviceNewUsersList = function(){
        var deferred = $q.defer();
        $scope.totalItems_tab3 = 2000;
        $scope.itemsPerPage = 10
        $scope.currentPage_tab3 = 1;
        $scope.maxSize_tab3 = 5;
        $scope.$watch('currentPage_tab3 + itemsPerPage', function() {
            GetNUDeviceStats($scope.currentPage_tab3);
        });
        deferred.resolve();
        return deferred.promise;
    };

    var run = function()
    {
        NU().finally(NUTop20Devices)
            .finally(TopDeviceTrends)
            .finally(TopManufacturers)
            .finally(TopManuDevices)
            .finally(TopSources)
            .finally(TopSourcesTrend)
            .finally(TopSourcePercentage)
            .finally(TopKeyWords)
            .finally(DayWiseList)
            .finally(SourceNewUsersList)
            .finally(DeviceNewUsersList);
    };

    run();

}]);