var sessions = angular.module('Controllers')
sessions.controller('SessionsCtrl',['$scope','$q','JettyService','UtilitiesService','JSONService',function($scope, $q, JettyService, UtilitiesService, JSONService) {
  
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

    var S = function(){
        var deferred = $q.defer();
        JettyService.timewise('S','2665c38c69',$scope.endgap,$scope.range_days,2,2,function(data) {
            $scope.total_time = 0;
            $scope.total_sessions = 0;
            var mod_data = data;
            for (i=0; i<data.length; i++) {
                var day_avg_session = parseFloat((data[i].y).split('__')[1]);
                var day_sessions = parseInt((data[i].y).split('__')[0]);
                $scope.total_time += day_avg_session*day_sessions;
                $scope.total_sessions += day_sessions;
                console.log(day_avg_session,day_sessions);
            }
            $scope.avg_time = (($scope.total_time/$scope.total_sessions)/60000).toFixed(2);
            $scope.total_sessions = UtilitiesService.numberFormat($scope.total_sessions);

            for (i=0; i<mod_data.length; i++) {
                mod_data[i].y = parseInt((mod_data[i].y).split('__')[0]);
            }
            UtilitiesService.draw_chart(line(mod_data),'Line.swf','TsessionsTrend','100%','353');
            deferred.resolve();
        });
        return deferred.promise;
    };

    var Slength = function(){
        var deferred = $q.defer();
        JettyService.timewise('SLength','2665c38c69',$scope.endgap,$scope.range_days,2,3,function(data) {
            $scope.slength_share = UtilitiesService.top_cummulative_2var(data,1,5);
            UtilitiesService.draw_chart(piechart_op($scope.slength_share),"doughnut2d.swf","sessionlength_share","100%","200");
            deferred.resolve();
        });
        return deferred.promise;
    };

    var SourceSessions = function(){
        var deferred = $q.defer();
        JettyService.timewise('STop20Sources','91c556949f',$scope.endgap,$scope.range_days,2,3,function(data){
            mod_data = UtilitiesService.session_split(data,1);
            $scope.sourcesessions_share = UtilitiesService.top_cummulative_2var(mod_data,0,5);
            UtilitiesService.draw_chart(piechart_op($scope.sourcesessions_share),"doughnut2d.swf","sessionssource_share","100%","200");
            deferred.resolve();
        });
        return deferred.promise;
    };

    var DaywiseForSource = function(source,count){
        var deferred = $q.defer();
        JettyService.keywise('SSource',"91c556949f",source,$scope.endgap,$scope.range_days,2,2,function(data){
            if(data[0].x)
            {
                data = data.concat({"x": source, "y": count});    

            }
            else
            {
                data = [];
                data = data.concat({"x": source, "y": count});
            }
            deferred.resolve(data);
        });
        return deferred.promise;

    };

    var SourceSessionTrends = function(){
        var deferred = $q.defer();
        var promises = [];
        var mod_data = [];
        for(i=0;i< $scope.sourcesessions_share.length;i++)
        {
            var source = $scope.sourcesessions_share[i].x;
            var sessions_count = $scope.sourcesessions_share[i].y;
            promise = DaywiseForSource(source,sessions_count);
            promise.then(function(data){
                var total_time_source = 0;
                var total_sessions_source = 0;
                var src = data[data.length-1].x;
                var count = data[data.length-1].y;
                data = data.slice(0,data.length-1);
                for(j=0;j<data.length;j++)
                {
                    var day_avg_session = parseFloat((data[j].y).split('__')[1]);
                    var day_sessions = parseInt((data[j].y).split('__')[0]);
                    total_time_source += day_avg_session*day_sessions;
                    total_sessions_source += day_sessions;
                }
                if(total_sessions_source!= 0)
                {   
                    console.log("NUM>>>"+total_sessions_source+"<<<"+total_time_source);
                    avg_time_source = ((total_time_source/total_sessions_source)/60000).toFixed(2);
                }
                else
                {
                    avg_time_source = 0;
                }
                
                mod_data = mod_data.concat({"x":src, "y":count, "z": avg_time_source});
            });
            promises.push(promise);
        }
        $q.all(promises).then(function(){
            UtilitiesService.draw_chart(bargraph_line(mod_data),"MSCombiDY2D.swf","SSourceTrends","100%","400");
            deferred.resolve(); 
        });
        return deferred.promise;
    };

    var TopDevicesForManu = function(manu) {
            var deferred = $q.defer();
            JettyService.keywise('STopDevicesManu',"2665c38c69",manu,$scope.endgap,$scope.range_days,2,3,function(data2){
                if(data2[0].z)
                {
                    data2 = data2.concat({"x": manu});    

                }
                else
                {
                    data2 = [];
                    data2 = data2.concat({"x": manu});
                }
                deferred.resolve(data2);
            });
            return deferred.promise;
        };

        var STopManuTopDevices = function(){
            var deferred = $q.defer();
            JettyService.timewise('STop20DeviceManufacturers','2665c38c69',$scope.endgap,$scope.range_days,2,3,function(data1) {
                var mod_data1 = UtilitiesService.session_split(data1);
                $scope.stop5Manu = UtilitiesService.top_cummulative_2var(mod_data1,0,5);
                console.log($scope.stop5Manu);
                var mod_data = [];
                var promises = [],count=0;

                for(i=0; i< $scope.stop5Manu.length ; i++)
                {  
                    var manu = $scope.stop5Manu[i].x;
                    promise = TopDevicesForManu(manu);
                    promise.then(function(data2){
                        var topdevices = [];
                        var manufacturer = data2[data2.length-1].x;
                        data2 = data2.slice(0,data2.length-1);
                        var mod_data2 = UtilitiesService.session_split(data2,1);
                        $scope.stop20Devices = UtilitiesService.top_cummulative_2var(mod_data2,0,5);
                        for(j=0;j< $scope.stop20Devices.length && j< 3 ;j++)
                        {
                            topdevices = topdevices.concat({"x": $scope.stop20Devices[j].x ,"y": $scope.stop20Devices[j].y});
                        }
                        mod_data = mod_data.concat({"z": manufacturer, "a": topdevices });
                    });
                    promises.push(promise);
                }
                $q.all(promises).then(function() {
                    UtilitiesService.draw_chart(bargraph_multi(mod_data,3),"mscolumn2d.swf","STopManuDevices","100%","400");
                    deferred.resolve(); 
                })
                
            });
            return deferred.promise;
        };

    var GetSourceSessionStats = function(tab){
        $scope.sourcesessionslist = [];
        JettyService.keywise('SSourcesAll',"91c556949f",tab,$scope.endgap,$scope.range_days,2,3,function(data) {
            data = UtilitiesService.session_split(data,0);
            $scope.sourcesessionslist = UtilitiesService.top_cummulative_forsessions(data,0);
        });
    };

    var SourceSessionsList = function(){
        var deferred = $q.defer();
        $scope.totalItems_tab1 = 2000;
        $scope.itemsPerPage = 10
        $scope.currentPage_tab1 = 1;
        $scope.maxSize_tab1 = 5;
        $scope.$watch('currentPage_tab1 + itemsPerPage', function() {
            GetSourceSessionStats($scope.currentPage_tab1);
        });
        deferred.resolve();
        return deferred.promise;
    };

    var run = function()
    {
        S().finally(Slength)
           .finally(SourceSessions)
           .finally(SourceSessionTrends)
           .finally(STopManuTopDevices)
           .finally(SourceSessionsList);
    }

    run();
}])