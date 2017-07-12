/*  Controller for Dashboard Overview Page 
    Function Names matches the section headings of the dashboard which they effect 
*/

var dashboard = angular.module('Controllers');
dashboard.controller('DoverviewCtrl',['$scope','$rootScope','$q','JettyService','UtilitiesService','JSONService',function($scope, $rootScope, $q, JettyService, UtilitiesService, JSONService) {
   // var endGap = 50;  // for testing because data is not available, prod this should be 1 (1 day delay)

     /* global variables which we use inside functions */
    var today =  new Date();
    var currentdate = new Date(today.getUTCFullYear(),today.getUTCMonth(),today.getUTCDate()); 
    var app = $rootScope.app.app_secret;
    var timeZone = "IST";
    var topSourcesInstalls;

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
    // var Start = function() {
    //     $scope.date = {startDate: new Date(currentdate.getTime() - 8*1000*60*60*24), endDate: new Date(currentdate.getTime() - 2*1000*60*60*24)};
    //     // $scope.date = {startDate: new Date(Date.UTC(2015,0,1)), endDate: new Date(Date.UTC(2015,0,8))};
    //     $scope.endGap = Math.abs(currentdate.getTime() - $scope.date.endDate.getTime())/(1000*60*60*24);
    //     $scope.noDays = Math.abs($scope.date.endDate.getTime() - $scope.date.startDate.getTime())/(1000*60*60*24) + 1;
    // };
    
    var Installs = function(){
        var promises = [];
        var promise1 = JettyService.cummulative('NU',app,$scope.endGap,$scope.noDays,2,"long",timeZone);
        var promise2 = JettyService.cummulative('NU',app,$scope.endGap+$scope.noDays,$scope.noDays,2,"long",timeZone);
        promise1.then(function(data1) {
            installs1 = data1.x;

        });
        promise2.then(function(data2) {
            installs2 = data2.x;
        });
        promises.push(promise1);
        promises.push(promise2);
        $q.all(promises).then(function() {
            $scope.installs = (UtilitiesService.numberFormat(installs1));
            $scope.installs_change = ((((installs1 - installs2)/installs2)*100).toFixed(0));
        });
    };

    var ActiveUsers = function() {
        var promises = [];
        var promise1 = JettyService.cummulative('AU',app,$scope.endGap,$scope.noDays,2,"hll",timeZone);
        var promise2 = JettyService.cummulative('AU',app,$scope.endGap+$scope.noDays,$scope.noDays,2,"hll",timeZone);
        promise1.then(function(data1) {
            activeusers1 = data1.x;
        });
        promise2.then(function(data2) {
            activeusers2 = data2.x;
        });
        promises.push(promise1);
        promises.push(promise2);
        $q.all(promises).then(function() {
            $scope.activeusers = (UtilitiesService.numberFormat(activeusers1));
            $scope.activeusers_change = ((((activeusers1 - activeusers2)/activeusers2)*100).toFixed(0));
        });
    };
    
    var Revenue = function() {
        var deferred = $q.defer();
        var promises = [];
        var promise1 = JettyService.cummulative('TotalRevenue',app,$scope.endGap,$scope.noDays,2,"long",timeZone);
        var promise2 = JettyService.cummulative('TotalRevenue',app,$scope.endGap+$scope.noDays,$scope.noDays,2,"long",timeZone);
        
        try
        {
            promise1.then(function(data1) {
                 if (data1=='null') {data1={x:0}};
                Revenue1 = data1.x/100;
            });
            promise2.then(function(data2) {
                 if (data2=='null') {data1={x:0}};
                Revenue2 = data2.x/100;
            });
            promises.push(promise1);
            promises.push(promise2);
            $q.all(promises).then(function() {
                $scope.revenue_num=Revenue1;
                $scope.revenue = UtilitiesService.numberFormat((Revenue1).toFixed(0));
                $scope.revenue_change = ((((Revenue1 - Revenue2)/Revenue2) || 0)*100).toFixed(0);
                deferred.resolve();
            });
        }
        catch(errs)
        {
             deferred.resolve();
        }
        return deferred.promise;
    };

    var OverallDownloads = function() {
        JettyService.overview('ODownloads',app).then(function(data) {
            $scope.downloads = data.x;
        });
    };

    var NewUsersTrend = function() {
        JettyService.granwise('NU',app,$scope.endGap,$scope.noDays,2,2,"long",timeZone).then(function(data) {
            UtilitiesService.draw_chart(line(data,dashboard_newusers_line_style),'Line.swf','newUsersTrend','100%','270');
        });
    };

    var ActiveUsersTrend = function() {
        JettyService.granwise('AU',app,$scope.endGap,$scope.noDays,2,2,"hll",timeZone).then(function(data) {
            UtilitiesService.draw_chart(line(data,dashboard_activeusers_line_style),'Line.swf','activeUsersTrend','100%','215');
        });
    };

    var AvgSessionLength = function() {
        JettyService.cummulative('S',app,$scope.endGap,$scope.noDays,2,"string",timeZone).then(function(data) {
                temp = (parseFloat((data.x).split('__')[1])/3600000) ;
                if (temp<0 && $rootScope.user.username!='hello@rocq.io') {
                    temp=-temp;
                };
                $scope.avg_session_length_hours = (parseInt(temp));
                $scope.avg_session_length_minutes = (parseInt((temp - $scope.avg_session_length_hours)*60));
                $scope.avg_session_length_seconds = (parseInt(((temp - $scope.avg_session_length_hours)*60 - $scope.avg_session_length_minutes)*60));
        });
    };

    var NetworkType = function(){
        JettyService.cummulative('NUNetworkType',app,$scope.endGap,$scope.noDays,3,"long",timeZone).then(function(data) {
            var oa_networktype = (UtilitiesService.descending(data,2)).slice(0,5);
            var mod_data = [];
            for(i=0;i< oa_networktype.length && i< 5;i++)
            {
                mod_data = mod_data.concat({"x": oa_networktype[i].x, "y": oa_networktype[i].y });
            }
            UtilitiesService.draw_chart(piechart_singlediv(mod_data, dashboard_network_type_pie_chart_style),"doughnut2d.swf","NetworkType","100%","215");
        });
    };

    var InstallsandUninstalls = function(){
        var promises = [];
        var mod_data = [];
        var installs,uninstalls;
        var promise1 = JettyService.cummulative('NU',app,$scope.endGap,$scope.noDays,2,"long",timeZone);
        var promise2 = JettyService.cummulative('U',app,$scope.endGap,$scope.noDays,2,"long",timeZone);
        promise1.then(function(data1) {
            installs = data1.x;
        });
        promise2.then(function(data2) {
            uninstalls = data2.x;
        });
        promises.push(promise1);
        promises.push(promise2);
        $q.all(promises).then(function() {
            mod_data = mod_data.concat({"x": "Installs", "y": installs });
            mod_data = mod_data.concat({"x": "Uninstalls", "y": uninstalls });
            UtilitiesService.draw_chart(piechart_op(mod_data, dashboard_installs_uninstalls_pie_chart_style),"pie2d.swf","InstallsUninstalls","100%","153");
        });
    };
   
    var TopSources = function(){
        var deferred = $q.defer();
        JettyService.cummulative('ITop20Sources',app,$scope.endGap,$scope.noDays,3,"long",timeZone).then(function(data){
            try
            {
                topSourcesInstalls = (UtilitiesService.descending(data,2)).slice(0,10);
                deferred.resolve(data);
            }
            catch(err)
            {
                deferred.resolve(data);
            }    
        });
        return deferred.promise;
    };

      /* Source By Revenue Bar Graph section */
    var RevenueBySource = function(){
        JettyService.cummulative('RevenueUserTop20Sources',app,$scope.endGap,$scope.noDays,3,"hlllong",timeZone).then(function(data) {
             if (data=='null') {data=[{x:"",y:0}]};
            var revenue_sources = (UtilitiesService.descending(data,2)).slice(0,5);
            var mod_data = [];

            for(i=0;i< revenue_sources.length && i< 10;i++)
            {
                mod_data = mod_data.concat({"x": revenue_sources[i].x, "y": Math.floor(revenue_sources[i].y/100) });
            }
            if(mod_data.length < 10)
            {
                var promise = TopSources();
                promise.then(function(data1){
                    if (mod_data[0].x=="") {
                        mod_data[0].x=data1[0].x;
                    };
                    for(j=1;j < data1.length && j < 6 ;j++)
                    {
                        var flag = false;
                        for(k=0;k<mod_data.length;k++)
                        {
                            if(data1[j].x === mod_data[k].x)
                            flag = true;
                        }
                        
                        if(flag == false)
                        {
                            mod_data = mod_data.concat({"x": data1[j].x, "y": 0 });
                        }
                    }

                   
                   UtilitiesService.draw_chart(bargraph(mod_data,dashboard_overview_revenuebysource_bar_style),"column2d.swf","RevenueBySource","100%","258");

                });
            }
            else
            {
            UtilitiesService.draw_chart(bargraph(mod_data,dashboard_overview_revenuebysource_bar_style),"column2d.swf","RevenueBySource","100%","268");

            }
        });
    };

    var TotalEvents = function(){
        JettyService.cummulative('TotalEvents',app,$scope.endGap,$scope.noDays,2,"long",timeZone).then(function(data) {
                 $scope.total_events = UtilitiesService.numberFormat(data.x);   
        });
    };

    var TopEvents = function(){
        JettyService.cummulative('Top20Events',app,$scope.endGap,$scope.noDays,1,"long",timeZone).then(function(data) {
            $scope.top_eventsCSV=data;
            data = UtilitiesService.descending(data,2).slice(0,7);
            for (var i = 0; i < data.length; i++) {
               data[i].y=UtilitiesService.numberFormat(data[i].y)
            };
                 $scope.top_events = data;
        });
    };


    var TotalVisitors = function(){

             var deferred = $q.defer();
             JettyService.cummulative('AU',app,$scope.endGap,$scope.noDays,2,'hll',timeZone).then(function(data) {
                try{
                    users_raw = data.x;
                    $scope.TotalVisitors = UtilitiesService.numberFormat(users_raw);
                    deferred.resolve();
                }
                catch(err)
                {
                    deferred.resolve();
                }
                
            });
            return deferred.promise;
        }


    // required for state map
    var TotalNewUsers = function(){
             var deferred = $q.defer();
             JettyService.cummulative('NU',app,$scope.endGap,$scope.noDays,2,'long',timeZone).then(function(data) {
                try{
                    new_users_raw = data.x;
                    // $scope.new_users = UtilitiesService.numberFormat(new_users_raw);
                    deferred.resolve();
                }
                catch(err)
                {
                    deferred.resolve();
                }
                
            });
            return deferred.promise;
        }
        

    var StateNewUsersList = function() {
            var deferred = $q.defer();
            JettyService.cummulative('NUState',app,$scope.endGap,$scope.noDays,3,"long",timeZone).then(function(data) {
                states = UtilitiesService.descending(data,2);
                $scope.StateNewUsersListCSV = states;
                $scope.top_state=states[0];
                $scope.state_items = states.length;
                $scope.items_per_page5 = 10;
                $scope.state_current_page = 1;
                $scope.max_pages = 5;
                $scope.$watch('state_current_page + items_per_page5', function() {
                    var begin = (($scope.state_current_page - 1) * $scope.items_per_page5),
                    end = begin + $scope.items_per_page5;
                    $scope.page_state_list = states.slice(begin, end);
                });
                deferred.resolve();
            });
            return deferred.promise;
        };

    var GetStateCode = function(state,count){
            var deferred = $q.defer();

            JettyService.state_code(state,count,function(data){
                deferred.resolve(data);
            });
            return deferred.promise;
        };

    var StateMap = function() {
            var deferred = $q.defer();
            var mod_data = [];
            var promises = [];
            var map_data=[]
            for(i=0;i<states.length ;i++)
            {
                var state = states[i];
                promise = GetStateCode(state.x,state.y);
                promise.then(function(data) {
                    if (data.x.code != null) {
                        var data_point = {"x" : data.x.code, "y" : data.y}
                        map_data=map_data.concat(data_point)
                    }
                });
                promises.push(promise);
            }
            $q.all(promises).then(function(){
                UtilitiesService.draw_map(map(map_data,new_users_raw / states.length, states[0].y,test_map_style),"maps/india",'mapStates','100%','234');   
                deferred.resolve();
            });
            return deferred.promise;
        };



    var run = function() {
        // ActiveUsers();
        // NewUsers();
        // OverallDownloads();
        Installs();
        ActiveUsers();
        Revenue();
        NewUsersTrend();
        InstallsandUninstalls();
        ActiveUsersTrend();
        AvgSessionLength();
        NetworkType();
        RevenueBySource();
        TotalEvents();
        TopEvents();
        TotalVisitors();
        TotalNewUsers().finally(StateNewUsersList).
        finally(StateMap);
    };

 //   Start();
    WatchDate();
    
}]);