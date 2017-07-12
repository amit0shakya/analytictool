var uninstalls = angular.module('Controllers');
    uninstalls.controller('UnInstallsCtrl', ['$scope','$q','JettyService','UtilitiesService','JSONService',function($scope, $q, JettyService, UtilitiesService, JSONService) {
        $scope.date = {startDate: new Date(2015,0,1), endDate: new Date(2015,0,8)};
        var today =  new Date();
        $scope.currentdate = new Date(today.getFullYear(),today.getMonth(),today.getDate());
        $scope.endgap = Math.abs($scope.currentdate.getTime() - $scope.date.endDate.getTime())/(1000*60*60*24);
        $scope.range_days = Math.abs($scope.date.endDate.getTime() - $scope.date.startDate.getTime())/(1000*60*60*24) + 1;

        // $scope.$watch('date',function(nv,ov) {
        //     $scope.date.startDate = new Date(nv.startDate.getFullYear(),nv.startDate.getMonth(),nv.startDate.getDate());
        //     $scope.date.endDate = new Date(nv.endDate.getFullYear(),nv.endDate.getMonth(),nv.endDate.getDate());
        //     $scope.endgap = Math.abs($scope.currentdate.getTime() - $scope.date.endDate.getTime())/(1000*60*60*24);
        //     $scope.range_days = Math.abs($scope.date.endDate.getTime() - $scope.date.startDate.getTime())/(1000*60*60*24) + 1;
        //     run();
        // })
        
        var TotalUninstalls = function(){
            var deferred = $q.defer();
            var promises = [];
            var promise1 = JettyService.timewise_new('UPaid','91c556949f',$scope.endgap,$scope.range_days,2,2);
            var promise2 = JettyService.timewise_new('UOrganic','91c556949f',$scope.endgap,$scope.range_days,2,2);
            promise1.then(function(data){
                $scope.totalPaidUninstalls = UtilitiesService.total_count(data);
                $scope.totalPaidUninstalls1 = UtilitiesService.numberFormat($scope.totalPaidUninstalls);
            });
            promise2.then(function(data){
                $scope.totalOrgUninstalls = UtilitiesService.total_count(data);
                $scope.totalOrgUninstalls1 = UtilitiesService.numberFormat($scope.totalOrgUninstalls);
            });
            promises.push(promise1);
            promises.push(promise2);
            $q.all(promises).then(function() {
                deferred.resolve();
            });
            return deferred.promise;
        }

        var TopSources = function() {
            var deferred = $q.defer();
            JettyService.timewise('UPaidTop20Sources','91c556949f',$scope.endgap,$scope.range_days,2,3,function(data) {
                $scope.topSourcesUninstalls = UtilitiesService.top_cummulative_2var(data,1,5);
                $scope.topsources_uninstalls = 0;
                $scope.selectedSource_uninstalls = $scope.topSourcesUninstalls[0];
                for(i=0;i<$scope.topSourcesUninstalls.length && i<5 ;i++)
                {
                    $scope.topsources_uninstalls += $scope.topSourcesUninstalls[i].y;
                }
                $scope.topsources_uninstalls = UtilitiesService.numberFormat($scope.topsources_uninstalls);
                deferred.resolve();
            });
            return deferred.promise;
        };

        var DayWiseForSource = function(source){
            var deferred = $q.defer();
            JettyService.keywise('UPaidSource',"91c556949f",source,$scope.endgap,$scope.range_days,2,2,function(data){
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
        };

        var TopSourcesUninstalls = function() {
            var deferred = $q.defer();
            var mod_data = [];
            var promises = [];
            for(i=0;i<$scope.topSourcesUninstalls.length && i<3 ;i++)
            {
                var source = $scope.topSourcesUninstalls[i].x;
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
                //$scope.topsource_daywise = mod_data;
                UtilitiesService.draw_chart(multiLine2(mod_data),"MSLine.swf",'TopSourceUninstalls','100%','353');
                deferred.resolve();

            });
            return deferred.promise;
        };

        var TopTerms = function(){
            var deferred = $q.defer();
            JettyService.timewise('UTop20Terms','91c556949f',$scope.endgap,$scope.range_days,2,3,function(data) {
                // mod_data = JSONService.parse(data);
                top_terms = UtilitiesService.top_cummulative_2var(data,1,5);
                $scope.top_terms_uninstalls = 0;
                for(i=0;i<top_terms.length;i++)
                {
                    $scope.top_terms_uninstalls += top_terms[i].y;
                }
                UtilitiesService.draw_chart(bargraph(top_terms),"column2d.swf","SourceKeywords_uninstalls","100%","400");
                deferred.resolve();
            });
            return deferred.promise;
        }

        var TopDevicesForManu = function(manu,category) {
            var deferred = $q.defer();
            JettyService.keywise('U'+category+'TopDevicesManu',"91c556949f",manu,$scope.endgap,$scope.range_days,2,3,function(data2){
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
        }

        var TopDeviceUninstalls = function(category){
            var deferred = $q.defer();
            JettyService.timewise('U'+category+'DeviceManufacturer','91c556949f',$scope.endgap,$scope.range_days,2,3,function(data1) {
                $scope.top5Manu_Uninstalls = UtilitiesService.top_cummulative_2var(data1,1,5);
                console.log($scope.top5Manu_Uninstalls);
                var mod_data = [];
                var promises = [],count=0;
                $scope.top5Manu_share_uninstalls = [];
                if(category == 'Paid')
                {
                    $scope.totalUninstalls = $scope.totalPaidUninstalls;
                }
                else
                {
                    $scope.totalUninstalls = $scope.totalOrgUninstalls;
                }
                for(i=0;i<$scope.top5Manu_Uninstalls.length;i++)
                {
                    $scope.top5Manu_share_uninstalls = $scope.top5Manu_share_uninstalls.concat({"x": $scope.top5Manu_Uninstalls[i].x , "y": $scope.top5Manu_Uninstalls[i].y });
                    count += $scope.top5Manu_Uninstalls[i].y;
                    $scope.top5Manu_Uninstalls[i].y = UtilitiesService.numberFormat($scope.top5Manu_Uninstalls[i].y);
                }
                $scope.top5Manu_share_uninstalls = $scope.top5Manu_share_uninstalls.concat({"x": "Others", "y": $scope.totalUninstalls - count })
                UtilitiesService.draw_chart(piechart_op($scope.top5Manu_share_uninstalls),"doughnut2d.swf",category+"_manu_share_uninstalls","100%","200")

                for(i=0; i< $scope.top5Manu_Uninstalls.length ; i++)
                {  
                    var manu = $scope.top5Manu_Uninstalls[i].x;
                    promise = TopDevicesForManu(manu,category);
                    // console.log(manu)
                    promise.then(function(data2){
                        var topdevices = [];
                        // console.log(data2);
                        var manufacturer = data2[data2.length-1].x;
                        data2 = data2.slice(0,data2.length-1);
                        $scope.top20Devices_uninstalls = UtilitiesService.top_cummulative_2var(data2,1,5);
                        // console.log("adfdsf");
                        // console.log($scope.top20Devices_paid);
                        for(j=0;j< $scope.top20Devices_uninstalls.length && j< 3 ;j++)
                        {
                            topdevices = topdevices.concat({"x": $scope.top20Devices_uninstalls[j].x ,"y": $scope.top20Devices_uninstalls[j].y});
                        }
                        mod_data = mod_data.concat({"z": manufacturer, "a": topdevices });
                    });
                    promises.push(promise);
                }
                $q.all(promises).then(function() {
                     console.log("mode_data");
                     console.log(mod_data);
                    UtilitiesService.draw_chart(bargraph_multi(mod_data,3),"mscolumn2d.swf","Top"+category+"ManuDevices_uninstalls","100%","400");
                    deferred.resolve(); 
                })
                
            });
            return deferred.promise;
        }

        var run = function(){
            TotalUninstalls().finally(TopSources)
                             .finally(TopSourcesUninstalls)
                             .finally(TopTerms)
                             .finally(TopDeviceUninstalls('Paid'))
                             .finally(TopDeviceUninstalls('Organic'));
        }

        run();
    }]);