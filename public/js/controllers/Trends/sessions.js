/*  Controller for Sessions Page */

var sessions = angular.module('Controllers')
sessions.controller('SessionsCtrl',['$scope','$rootScope','$q','JettyService','UtilitiesService','JSONService',function($scope, $rootScope, $q, JettyService, UtilitiesService, JSONService) {
  
    /* global variables which we use inside functions */
    var today =  new Date();
    var currentdate = new Date(today.getUTCFullYear(),today.getUTCMonth(),today.getUTCDate()); 
    var app = $rootScope.app.app_secret;
    var session_daywise_data;
    var source_sessions_share;
    var total_sessions_raw;
    var timeZone = "IST";
    var topCitiesAll;
    
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

    /* Session Tab */

        /* Average Time, Total Sessions and Sessions Trend line graph 
           This should be executed before the SessionDayWiseList because of data dependency
           It must be executed before DrawMap and DrawMapRegion
        */
        var S = function(){
            var deferred = $q.defer();
            JettyService.cummulative('S',app,$scope.endGap,$scope.noDays,2,"string",timeZone).then(function(data) {
                try
                {
                    total_sessions_raw = 0;
                    $scope.avg_time = UtilitiesService.convertToMinutes((parseFloat((data.x).split('__')[1])/1000).toFixed(0));
                    total_sessions_raw = (parseInt((data.x).split('__')[0])).toFixed(2)
                    $scope.total_sessions = UtilitiesService.numberFormat(total_sessions_raw);
                    deferred.resolve();
                }
                catch(err)
                {
                    deferred.resolve();
                }              
            });
            return deferred.promise;
        };

        var STrend = function(){
            var deferred = $q.defer();
            JettyService.granwise('S',app,$scope.endGap,$scope.noDays,2,2,"string",timeZone).then(function(data) {
                try
                {
                    session_daywise_data = data;
                    for (i=0; i<session_daywise_data.length; i++) 
                    {
                        session_daywise_data[i].y = parseInt((session_daywise_data[i].y).split('__')[0]);
                    }
                    UtilitiesService.draw_chart(line(session_daywise_data,session_line_style),'Line.swf','TsessionsTrend','100%','253');
                    deferred.resolve();
                }
                catch(err)
                {
                    deferred.resolve();
                }                
            });
            return deferred.promise;
        };

        /* Number of Top Bucket Sessions and Session Length Pie Chart in the Session,Source,Device tabs is shown here */
        var Slength = function(){
            var deferred = $q.defer();
            JettyService.cummulative('SLength',app,$scope.endGap,$scope.noDays,3,"long",timeZone).then(function(data) {
                try
                {
                    var sessionlength_share;
                    sessionlength_share = data;
                    var sessionlength_bucket = [ "< 10sec", "10sec - 30sec", "30sec - 1min", "1 min - 3min", "3 min - 10min", "> 10 min"];
                    for(j=0; j<sessionlength_bucket.length; j++)
                    {
                        for(i=0; i<sessionlength_share.length; i++)
                        {
                            if(sessionlength_share[i].x == sessionlength_bucket[j])
                            {
                                $scope.topsessionbucket = sessionlength_bucket[j];
                                $scope.topsessionbucketsessions = UtilitiesService.numberFormat(sessionlength_share[i].y);
                            }
                        }
                    }
                    UtilitiesService.draw_chart(piechart_singlediv(sessionlength_share,session_duration_doughnut_style),"doughnut2d.swf","sessionlength_share1","100%","300");
                    UtilitiesService.draw_chart(piechart_singlediv(sessionlength_share,session_duration_doughnut_style),"doughnut2d.swf","sessionlength_share2","100%","300");
                    UtilitiesService.draw_chart(piechart_singlediv(sessionlength_share,session_duration_doughnut_style),"doughnut2d.swf","sessionlength_share3","100%","300");
                    deferred.resolve();
                }
                catch(err)
                {
                    deferred.resolve();
                }
                
            });
            return deferred.promise;
        };

        /* Source Sessions Pie Chart in the Session,Source,Device tabs is drawn here 
        */
        var SourceSessions = function(){
            var deferred = $q.defer();
            JettyService.cummulative('STop20Sources',app,$scope.endGap,$scope.noDays,3,"string",timeZone).then(function(data){
                try
                {
                    source_sessions_share = UtilitiesService.descending(UtilitiesService.session_split_2(data,1),2);
                    UtilitiesService.draw_chart(piechart_singlediv(source_sessions_share.slice(0,5),session_source_doughnut_style),"doughnut2d.swf","sessionssource_share1","100%","350");
                    UtilitiesService.draw_chart(piechart_singlediv(source_sessions_share.slice(0,5),session_source_doughnut_style),"doughnut2d.swf","sessionssource_share2","100%","350");
                    UtilitiesService.draw_chart(piechart_singlediv(source_sessions_share.slice(0,5),session_source_doughnut_style),"doughnut2d.swf","sessionssource_share3","100%","350");
                    UtilitiesService.draw_chart(bargraph(source_sessions_share.slice(0,8),session_source_bar_style),"column2d.swf","SSourceTrends","100%","400");
                    deferred.resolve();
                }
                catch(err)
                {
                     deferred.resolve();
                }
                
            });
            return deferred.promise;
        };

        var slendata=[]; 
        var SessionLengthTrend = function() {
            slendata=[]
            var deferred = $q.defer();
                JettyService.granwise('S',app,$scope.endGap,$scope.noDays,2,2,"string",timeZone).then(function(data) {
                for (i=0; i<data.length; i++) 
                {
                    slendata.push(UtilitiesService.convertToMinutes((parseFloat((data[i].y).split('__')[1])/1000).toFixed(0)))
                }
                deferred.resolve();
                });
                return deferred.promise;
         };

         var ActiveUsers = function() {
            var deferred = $q.defer();
            JettyService.granwise('AU',app,$scope.endGap,$scope.noDays,2,2,'hll',timeZone).then(function(data) {
                try
                {
                    data = JSONService.fill(data,$scope.endGap,$scope.noDays);
                    ActiveUsers_data = data;
                    //UtilitiesService.draw_chart(line(data,new_user_line_style),'Line.swf','InstallsTrend','100%','253');
                    deferred.resolve();
                }
                catch(err)
                {
                    deferred.resolve();
                }
                
            });
            return deferred.promise;
        };

        var SMaxDuration_data=[];
        var SMaxDurationUsers = function() {
            var deferred = $q.defer();
            JettyService.granwise('SMaxDuration',app,$scope.endGap,$scope.noDays,2,2,'string',timeZone).then(function(data) {
                try
                {
                    data = JSONService.fill(data,$scope.endGap,$scope.noDays);
                    SMaxDuration_data = data;
                    deferred.resolve();
                }
                catch(err)
                {
                    deferred.resolve();
                }
                
            });
            return deferred.promise;
        };
        

        /* Sessions DayWise Table in the session tab with pagination */
        var SessionDayWiseList = function(){
            var deferred = $q.defer();
            var session_daywiselist = [];
            try
            {
                var data = session_daywise_data;
                for(i=data.length-1; i>=0; i--) {
                    if(i == 0)
                    {
                        session_daywiselist = session_daywiselist.concat({"x":data[i].x, "y":UtilitiesService.CommaSeparatedNumberFormat(data[i].y), "z":0, "a":slendata[i],"b":UtilitiesService.CommaSeparatedNumberFormat(ActiveUsers_data[i].y),"c":data[i].y/ActiveUsers_data[i].y,"d":SMaxDuration_data[i]});
                    }
                    else
                    {
                        session_daywiselist = session_daywiselist.concat({"x":data[i].x, "y":UtilitiesService.CommaSeparatedNumberFormat(data[i].y), "z":(((data[i].y-data[i-1].y)/data[i-1].y)*100).toFixed(1),"a":slendata[i],"b":UtilitiesService.CommaSeparatedNumberFormat(ActiveUsers_data[i].y),"c":data[i].y/ActiveUsers_data[i].y,"d":SMaxDuration_data[i]});
                    }
                }
                $scope.SessionDayWiseListCSV = session_daywiselist;
                $scope.totalItems_tab1 = session_daywiselist.length;
                $scope.itemsPerPage = 10;
                $scope.currentPage_tab1 = 1;
                $scope.maxSize_tab1 = 5;
                $scope.$watch('currentPage_tab1 + itemsPerPage', function() {
                    var begin = (($scope.currentPage_tab1 - 1) * $scope.itemsPerPage),
                    end = begin + $scope.itemsPerPage;
                    $scope.filteredsessiondaywiselist = session_daywiselist.slice(begin, end);
                    // $scope.table1loaded=true;
                });
                deferred.resolve();
            }
            catch(err)
            {
                deferred.resolve();
            }
            
            return deferred.promise;
        };

    /* Session Tab */

    /* Source Tab */

        /*  Helper Function
            Given a Page it gives the sources list which falls in that page
        */
        var SourceSessionForPage = function(){
            var deferred = $q.defer();
            var sourcesessionslist = [];
            JettyService.cummulative('SSourcesAll',app,$scope.endGap,$scope.noDays,3,"string",timeZone).then(function(data) {
                try
                {
                    sourcesessionslist = UtilitiesService.descending(UtilitiesService.session_split_2(data,0),2);
                    for (var i = 0; i < sourcesessionslist.length; i++) {
                    sourcesessionslist[i].y=UtilitiesService.CommaSeparatedNumberFormat(sourcesessionslist[i].y)
                };
                    deferred.resolve(sourcesessionslist);
                }
                catch(err)
                {
                    deferred.resolve();
                }
            });
            return deferred.promise;
        };

        /* Source Sessions Table in the source tab with pagination 
           Uses the above Helper function
        */
        var SourceSessionsList = function(){
            var deferred = $q.defer();
            $scope.itemsPerPage = 10
            $scope.currentPage_tab2 = 1;
            $scope.maxSize_tab2 = 5;
            try
            {
                var promise = SourceSessionForPage();
                promise.then(function(data){
                    $scope.SourceSessionsListCSV = data;
                    $scope.totalItems_tab2 = data.length;
                    $scope.$watch('currentPage_tab2 + itemsPerPage', function() {
                        var begin = (($scope.currentPage_tab2 - 1) * $scope.itemsPerPage),
                        end = begin + $scope.itemsPerPage;
                        $scope.filteredsourcesessionslist =  data.slice(begin, end);
                        // $scope.table2loaded=true;

                    });
                })
                deferred.resolve();
            }
            catch(err)
            {
                deferred.resolve();
            }
            return deferred.promise;
        };

    /* Source Tab */

    /* Device Tab */

        /*  Helper Function
            Given a Manufacturer it gives the Devices of that Manufacturer with Top number of Sessions
        */
        var TopDevicesForManu = function(manu) {
                var deferred = $q.defer();
                JettyService.keywise_new('STopDevicesManu',app,manu,$scope.endGap,$scope.noDays,2,3,timeZone).then(function(data2){
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

        /*  Multi Bar Graph in Device Tab showing Top 3 Devices of top Mannufacturers according to number of session
            Uses the above Helper function
        */
        var STopManuTopDevices = function(){
            var deferred = $q.defer();
            JettyService.cummulative('STop20Manufacturers',app,$scope.endGap,$scope.noDays,3,"string",timeZone).then(function(data1) {
                var mod_data1 = UtilitiesService.session_split_2(data1,0);
                var session_top5_manu = UtilitiesService.descending(mod_data1,2).slice(0,5);
                var mod_data = [];
                var promises = [],count=0;

                for(i=0; i< session_top5_manu.length ; i++)
                {  
                    var manu = session_top5_manu[i].x;
                    promise = TopDevicesForManu(manu); //Getting the Top Devices for manu
                    promise.then(function(data2){
                        var topdevices = [];
                        var manufacturer = data2[data2.length-1].x;
                        data2 = data2.slice(0,data2.length-1);
                        var mod_data2 = UtilitiesService.session_split(data2,1);
                        var stop20Devices = UtilitiesService.top_cummulative_new(mod_data2,0,2,5);
                        for(j=0;j< stop20Devices.length && j< 3 ;j++)
                        {
                            topdevices = topdevices.concat({"x": stop20Devices[j].x ,"y": stop20Devices[j].y});
                        }
                        mod_data = mod_data.concat({"z": manufacturer, "a": topdevices });
                    });
                    promises.push(promise);
                }
                $q.all(promises).then(function() {
                    UtilitiesService.draw_chart(bargraph_multi(mod_data,3,sessions_device_multibar_style),"mscolumn2d.swf","STopManuDevices","100%","400");
                    deferred.resolve(); 
                })
                
            });
            return deferred.promise;
        };    

        /*  Helper Function
            Given a Page it gives the Sessions Device list which falls in that page
        */
        var DeviceSessionForPage = function(){
            var deferred = $q.defer();
            var devicesessionslist = [];
            JettyService.cummulative('SModelsAll',app,$scope.endGap,$scope.noDays,3,"string",timeZone).then(function(data) {
                try
                {
                    devicesessionslist = UtilitiesService.descending(UtilitiesService.session_split_2(data,2),2);
                    for (var i = 0; i < devicesessionslist.length; i++) {
                    devicesessionslist[i].y=UtilitiesService.CommaSeparatedNumberFormat(devicesessionslist[i].y)
                };
                    deferred.resolve(devicesessionslist);
                }
                catch(err)
                {
                    deferred.resolve();
                }
            });
            return deferred.promise;
        };

        /* Device Sessions Table in the Device tab with pagination 
           Uses the above Helper function
        */
        var DeviceSessionsList = function(){
            var deferred = $q.defer();
            $scope.itemsPerPage = 10
            $scope.currentPage_tab3 = 1;
            $scope.maxSize_tab3 = 5;
            try
            {
                var promise = DeviceSessionForPage();
                promise.then(function(data){
                    $scope.DeviceSessionsListCSV = data;
                    $scope.totalItems_tab3 = data.length;
                    $scope.$watch('currentPage_tab3 + itemsPerPage', function() {
                        var begin = (($scope.currentPage_tab3 - 1) * $scope.itemsPerPage),
                        end = begin + $scope.itemsPerPage;
                        $scope.filtereddevicesessionslist =  data.slice(begin, end);
                        // $scope.table3loaded=true;
                    });
                })
                deferred.resolve();
            }
            catch(err)
            {
                deferred.resolve();
            }
            deferred.resolve();
            return deferred.promise;
        };

    /* Device Tab */

    /* Location Tab */

    var TopCities = function() {
        var deferred = $q.defer();
        JettyService.keycummulative('SCity',app,$rootScope.selectedPaidState.toLowerCase(),$scope.endGap,$scope.noDays,3,"long",timeZone).then(function(data) {
            $scope.topCities = UtilitiesService.descending(data,2);
            // $scope.nutop5Cities = UtilitiesService.top_cummulative_new(data,1,2);
            deferred.resolve();
        });
        return deferred.promise;
    };

    var TopStates = function() {
        var deferred = $q.defer();
        JettyService.cummulative('SState',app,$scope.endGap,$scope.noDays,3,"long",timeZone).then(function(data) {
            $scope.topStates = UtilitiesService.descending(data,2);
            $scope.topStatesCSV = jQuery.extend(true,[],UtilitiesService.descending(data,2));

            $rootScope.selectedPaidState=$scope.topStates[0].x;
            $rootScope.selectedPaidStateValue=$scope.topStates[0].y;
            $scope.selectedPaidStateCSValue=UtilitiesService.CommaSeparatedNumberFormat($scope.topStates[0].y);

            for (var i = 0; i < $scope.topStatesCSV.length; i++) {
                    $scope.topStatesCSV[i].y=UtilitiesService.CommaSeparatedNumberFormat($scope.topStatesCSV[i].y)
                };
            deferred.resolve();
        });
        return deferred.promise;
    };

    var DayWiseForState = function(city_code,count){
        var deferred = $q.defer();
        JettyService.state_code(city_code,count,function(data){
            deferred.resolve(data);
        });
        return deferred.promise;
    };

    var DayWiseForCity = function(city_code,count){
        var deferred = $q.defer();
        JettyService.city_code(city_code,count,function(data){
            deferred.resolve(data);
        });
        return deferred.promise;
    };

    var TopStatesTrend = function() {
        var deferred = $q.defer();
        var mod_data = [];
        var promises = [];
        $scope.map_data=[]

        for(i=0;i<$scope.topStates.length ;i++)
        {
            var state = $scope.topStates[i];
            promise = DayWiseForState(state.x,state.y);
            promise.then(function(data){
                if (data.x.code != null) {
                    var data_point = {"x" : data.x.code, "y" : data.y}
                    $scope.map_data=$scope.map_data.concat(data_point)
                }
            });
            promises.push(promise);
        }
        $q.all(promises).then(function(){
                DrawMap();
                deferred.resolve();
            });
        return deferred.promise;
    };

    var TopCitiesTrend = function() {
        var deferred = $q.defer();
        var mod_data = [];
        var promises = [];
        $scope.map_data_city=[]

        for(i=0;i<$scope.topCities.length ;i++)
        {
            var city = $scope.topCities[i];
            // if (state.x.toLowerCase() == $scope.topStates[0].x.toLowerCase()) {
            //     promise = DayWiseForState(state.x,state.y);
            // } else {
            //     continue;
            // }
            promise = DayWiseForCity(city.x,city.y);
            promise.then(function(data){
                if (data.x.code != null) {
                    var data_point = {"x" : data.x.code, "y" : data.y}
                    $scope.map_data_city=$scope.map_data_city.concat(data_point)
                }
            });
            promises.push(promise);
        }
        $q.all(promises).then(function(){
                DrawMapState();
                deferred.resolve();
            });
        return deferred.promise;
    };

    var DrawMap  = function() {
        var deferred = $q.defer();
        UtilitiesService.draw_map(map($scope.map_data, total_sessions_raw / $scope.topStates.length, $scope.topStates[0].y,session_map_style),"maps/india",'mapIndia','100%','500',1);
        deferred.resolve();
        return deferred.promise;
    };

    var DrawMapState  = function() {
        var deferred = $q.defer();
        UtilitiesService.draw_map(map($scope.map_data_city, $rootScope.selectedPaidStateValue / $scope.topStates.length, $scope.topCities[0].y,session_map_style),"maps/"+$rootScope.selectedPaidState.replace(/ /g,''),'mapTopState','100%','250');//.toLowerCase().replace(/ /g,'')
        deferred.resolve();
        return deferred.promise;
    };

    $scope.$watch('selectedPaidState',function(nv,ov) { 
          if (ov!=undefined) {
            var deferred = $q.defer();
            var promises = [];
            promises.push(TopCities()
            .finally(TopCitiesTrend));
            $q.all(promises).then(function(){
              DrawMapState();
              deferred.resolve();
            });
          }
        });

    var TopCitiesAll = function() {
        var deferred = $q.defer();
        JettyService.cummulative('SCityAll',app,$scope.endGap,$scope.noDays,3,"long",timeZone).then(function(data) {
            
            topCitiesAll = UtilitiesService.descending(data,2);
            topCitiesAllCSV = jQuery.extend(true,[],UtilitiesService.descending(data,2));
             for (var i = 0; i < topCitiesAllCSV.length; i++) {
                    topCitiesAllCSV[i].y=UtilitiesService.CommaSeparatedNumberFormat(topCitiesAllCSV[i].y)
                };
            deferred.resolve();
        });
        return deferred.promise;
    };

    var SessionCityWiseList = function(){
        var deferred = $q.defer();
        $scope.SessionCityWiseListCSV = topCitiesAllCSV;
        $scope.totalItems_tab4 = topCitiesAllCSV.length;
        $scope.itemsPerPage = 10
        $scope.currentPage_tab4 = 1;
        $scope.maxSize_tab4 = 5;
        $scope.$watch('currentPage_tab4 + itemsPerPage', function(nv,ov) {
                var begin = (($scope.currentPage_tab4- 1) * $scope.itemsPerPage),
                end = begin + $scope.itemsPerPage;
                $scope.filteredcitywiselist = topCitiesAllCSV.slice(begin, end);

                // $scope.table4loaded=true;
        });
        deferred.resolve();
        return deferred.promise;
    };

     

    var SessionStateWiseList = function(){
        var deferred = $q.defer();
        // $scope.statesessionslist = UtilitiesService.top_cummulative_new($scope.topRegions,1,2);
        $scope.SessionStateWiseListCSV = $scope.topStatesCSV;
        $scope.totalItems_tab5 = $scope.topStatesCSV.length;
        $scope.itemsPerPage = 10
        $scope.currentPage_tab5 = 1;
        $scope.maxSize_tab5 = 5;
        $scope.$watch('currentPage_tab5 + itemsPerPage', function() {
        var begin = (($scope.currentPage_tab5-1) * $scope.itemsPerPage),
        end = begin + $scope.itemsPerPage;
        $scope.filteredstatewiselist = $scope.topStatesCSV.slice(begin, end);
        // $scope.table5loaded=true;
        });
        deferred.resolve();
        return deferred.promise;
    };

    /* Location Tab */


    var first = function()
    {
        var deferred = $q.defer();
        var promises = [];

        promises.push(S());
        promises.push(STrend().finally(SessionLengthTrend).finally(ActiveUsers).finally(SMaxDurationUsers).finally(SessionDayWiseList));
        promises.push(Slength());
        promises.push(SourceSessions());

        $q.all(promises).then(function(){
            deferred.resolve();
        });  
        return deferred.promise;
    }

    var second = function()
    {
        var deferred = $q.defer();
        var promises = [];

        promises.push(SourceSessionsList());

        $q.all(promises).then(function(){
            deferred.resolve();
        });  
        return deferred.promise;
    }

    var third = function()
    {
        var deferred = $q.defer();
        var promises = [];

        //promises.push(STopManuTopDevices());
        promises.push(DeviceSessionsList());

        $q.all(promises).then(function(){
            deferred.resolve();
        });  
        return deferred.promise;
    }

    var fourth = function()
    {
        var deferred = $q.defer();
        var promises = [];

        promises.push(TopStates().finally(TopCities)
                                   .finally(TopCitiesTrend)
                                   .finally(TopStatesTrend)
                                   .finally(SessionStateWiseList));
        promises.push(TopCitiesAll().finally(SessionCityWiseList));

        $q.all(promises).then(function(){
            deferred.resolve();
        });  
        return deferred.promise;
    }

    var run = function()
    {
       first().finally(second).finally(third).finally(fourth);
    }

   //Start();
   WatchDate();

}])