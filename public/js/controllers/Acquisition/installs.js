/*  Controller for New Users Page */

var newusers = angular.module('Controllers')
newusers.controller('InstallsCtrl',['$scope','$rootScope','$q','JettyService','UtilitiesService','JSONService',function($scope, $rootScope, $q, JettyService, UtilitiesService, JSONService) {

    /* global variables which we use inside functions */
    var today =  new Date();
    var currentdate = new Date(today.getUTCFullYear(),today.getUTCMonth(),today.getUTCDate());
    var app = $rootScope.app.app_secret;
    var new_users_raw;
    var new_users_data,nu_data, new_user_organic_data,  new_user_inorganic_data;
    var top_manu_raw;
    var paid_installs_raw;
    var total_installs_raw;
    var states;
    var source_trend_mod_data = [];
    var domain,type,src_type;
    var timeZone = "IST";

    $scope.init = function(mydomain,mytype)
    {
        domain = mydomain;
        type = mytype;
        if(mydomain == 'NU')
        {
            src_type = 'I'
        }
        else
        {
            src_type = 'AU'
        }

    }

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
        //$scope.date = {startDate: new Date(Date.UTC(2015,0,1)), endDate: new Date(Date.UTC(2015,0,8))};
        $scope.endGap = Math.abs(currentdate.getTime() - $scope.date.endDate.getTime())/(1000*60*60*24);
        $scope.noDays = Math.abs($scope.date.endDate.getTime() - $scope.date.startDate.getTime())/(1000*60*60*24) + 1;
    };
    /* Visitors Tab */
        /* New Users and NewUsers Trend line graph
           Should be executed before VisitorsDayWiseList and other functions where new_users_raw is used
        */

        var TotalNewUsers = function(){
             var deferred = $q.defer();
             JettyService.cummulative(domain,app,$scope.endGap,$scope.noDays,2,type,timeZone).then(function(data) {
                try{
                    new_users_raw = data.x;
                    $scope.new_users = UtilitiesService.numberFormat(new_users_raw);
                    deferred.resolve();
                }
                catch(err)
                {
                    deferred.resolve();
                }

            });
            return deferred.promise;
        }

        var NewUsersTrend = function() {
            var deferred = $q.defer();
            JettyService.granwise(domain,app,$scope.endGap,$scope.noDays,2,2,type,timeZone).then(function(data) {
                try
                {
                    data = JSONService.fill(data,$scope.endGap,$scope.noDays);
                    new_users_data = data;
                    
                    UtilitiesService.draw_chart(line(data,new_user_line_style),'Line.swf','TnewUsersTrend','100%','253');
                    deferred.resolve();
                }
                catch(err)
                {
                    deferred.resolve();
                }

            });
            return deferred.promise;
        };

        // reuired in AU page in daywise list table
        var NUTrend = function() {
            var deferred = $q.defer();
             if (domain=='NU')   // if we are on NU page then return
             {
                nu_data=JSONService.fill([],$scope.endGap,$scope.noDays);
                deferred.resolve();
                return deferred.promise;
             };
            JettyService.granwise('NU',app,$scope.endGap,$scope.noDays,2,2,type,timeZone).then(function(data) {
                try
                {
                    data = JSONService.fill(data,$scope.endGap,$scope.noDays);
                    nu_data = data;
                    deferred.resolve();
                }
                catch(err)
                {
                    deferred.resolve();
                }

            });
            return deferred.promise;
        };



        /* New Users in last 30 days section */
        var NewUsersLast30Days = function() {
            var deferred = $q.defer();
            JettyService.cummulative(domain,app,0,30,2,type,timeZone).then(function(data) {
                try
                {
                    var newusers_last30days = data.x;
                    $scope.newusers_last30days = UtilitiesService.numberFormat(newusers_last30days);
                    deferred.resolve();
                }
                catch(err)
                {
                    deferred.resolve();
                }
            });
            return deferred.promise;
        };

        var UninstallsTrend = function() {
            var deferred = $q.defer();
            var domain2;

            JettyService.granwise('U',app,$scope.endGap,$scope.noDays,2,2,type,timeZone).then(function(data) {

                    data = JSONService.fill(data,$scope.endGap,$scope.noDays);
                    uninstalls_data = data;
                    // UtilitiesService.draw_chart(line(data,new_user_line_style),'Line.swf','InstallsTrend','100%','253');
                    deferred.resolve();


            });
            return deferred.promise;
        };

        /* Top Device Top Vendor and side Top 4 device models sections
           This should be executed TopDevicesTrend, TopManuDevices as top_devices is used there
        */
        var TopDevice = function() {
            var deferred = $q.defer();
            var domain_cur;
            if(domain == 'AU')
                domain_cur = 'AUModelsAll';
            else
                domain_cur = 'NUTop20Models';
            JettyService.cummulative(domain_cur,app,$scope.endGap,$scope.noDays,3,type,timeZone).then(function(data) {
                try{
                    $scope.top_devices = (UtilitiesService.descending(data,3));
                    for (var i = 0; i < $scope.top_devices.length; i++) {
                       if(i<3)
                       {
                        $scope.top_devices[i].ticked=true;
                       }
                    };
                    $scope.top_devices_percent = [];
                    for(i=0; i< $scope.top_devices.length && i<5; i++)
                    {
                        $scope.top_devices_percent[i] = ($scope.top_devices[i].z /new_users_raw)*100;
                        $scope.top_devices_percent[i] = $scope.top_devices_percent[i].toFixed(2);
                    }
                    deferred.resolve();
                }
                catch(err)
                {
                    deferred.resolve();
                }

            });
            return deferred.promise;
        };

        var TopManufacturer = function() {
            var deferred = $q.defer();
            var domain_cur;
            if(domain == 'AU')
                domain_cur = 'AUManufacturersAll';
            else
                domain_cur = 'NUTop20Manufacturers';
            JettyService.cummulative(domain_cur,app,$scope.endGap,$scope.noDays,3,type,timeZone).then(function(data) {
                try{
                    $scope.top_manufacturer = (UtilitiesService.descending(data,2))[0].x;
                    deferred.resolve();
                }
                catch(err)
                {
                    deferred.resolve();
                }

            });
            return deferred.promise;
        };

        var NewUsersOrganicInorganic = function() {
            var deferred = $q.defer();
            var promise1 = JettyService.granwise('IPaid',app,$scope.endGap,$scope.noDays,2,2,"long",timeZone).then(function(data) {
                 data = JSONService.fill(data,$scope.endGap,$scope.noDays);
                new_user_inorganic_data=data;

            });
            var promise2 = JettyService.granwise('IOrganic',app,$scope.endGap,$scope.noDays,2,2,"long",timeZone).then(function(data) {
                 data = JSONService.fill(data,$scope.endGap,$scope.noDays);
                new_user_organic_data=data;
            });
            var promises=[];
            promises.push(promise1);
            promises.push(promise2);
            $q.all(promises).then(function() {
                deferred.resolve();
            });
            return deferred.promise;
        };

var GoalUser=[];
var UserWithGoalEvent = function() {
            var deferred = $q.defer();
            JettyService.granwise('NewTransactionUsers',app,$scope.endGap,$scope.noDays,2,2,"long",timeZone).then(function(data) {
                 data = JSONService.fill(data,$scope.endGap,$scope.noDays);
                GoalUser = data;
                deferred.resolve();
            })


            return deferred.promise;
        };
        /* Last Table in the visitors tab with pagination */
        var VisitorsDayWiseList = function(){
            var deferred = $q.defer();
            var daywiselist = [];
            var data = new_users_data;
            try
            {
                for(i=data.length-1; i>=0; i--) {
                        daywiselist = daywiselist.concat({
                        "x":data[i].x,
                        "y":UtilitiesService.CommaSeparatedNumberFormat(Number(new_user_organic_data[i].y)+Number(new_user_inorganic_data[i].y)),
                         "z":(i && ((data[i].y-data[i-1].y)/(data[i-1].y))*100).toFixed(1),
                          "a":UtilitiesService.CommaSeparatedNumberFormat(new_user_organic_data[i].y),
                          "b":new_user_inorganic_data[i].y,
                           "c":UtilitiesService.CommaSeparatedNumberFormat(nu_data[i].y),
                           "d":UtilitiesService.CommaSeparatedNumberFormat(data[i].y-nu_data[i].y),
                           "e":UtilitiesService.CommaSeparatedNumberFormat(uninstalls_data[i].y),
                           "f":GoalUser[i].y});
                }
                $scope.VisitorsDayWiseListCSV = jQuery.extend(true,[], daywiselist);
                for (var i = 0; i <  $scope.VisitorsDayWiseListCSV.length; i++) {
                     delete $scope.VisitorsDayWiseListCSV[i].c;
                     delete $scope.VisitorsDayWiseListCSV[i].d;
                };
                $scope.AUVisitorsDayWiseListCSV = jQuery.extend(true,[], daywiselist);
                for (var i = 0; i <  $scope.AUVisitorsDayWiseListCSV.length; i++) {
                     delete $scope.AUVisitorsDayWiseListCSV[i].a;
                     delete $scope.AUVisitorsDayWiseListCSV[i].b;
                     delete $scope.AUVisitorsDayWiseListCSV[i].e;
                };
                $scope.visitor_items = daywiselist.length;
                $scope.items_per_page1 = 10;
                $scope.visitor_current_page = 1;
                $scope.max_pages = 5;
                $scope.$watch('visitor_current_page + items_per_page1', function() {
                    var begin = (($scope.visitor_current_page - 1) * $scope.items_per_page1),
                    end = begin + $scope.items_per_page1;
                    $scope.page_daywise_list = daywiselist.slice(begin, end);
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


    /* Visitors Tab */

    /* Source Tab */

        /*  This Should run before all functions in the source tab where top_sources is used
            Returns the Top 5 Sources based on newusers in the given range
        */
        var TopSources = function() {
            var deferred = $q.defer();
            var domain_cur;
            if(domain == 'AU')
                domain_cur = 'AUSourcesAll';
            else
                domain_cur = src_type+'Top20Sources';
            JettyService.cummulative(domain_cur,app,$scope.endGap,$scope.noDays,3,type,timeZone).then(function(data) {
                try
                {
                    $scope.top_sources = UtilitiesService.descending(data,2).slice(0,5);
                    for (var i = 0; i < $scope.top_sources.length; i++) {
                       if(i<3)
                       {
                        $scope.top_sources[i].ticked=true;
                       }
                    };
                    deferred.resolve();
                }
                catch(err)
                {
                    deferred.resolve();
                }

            });
            return deferred.promise;
        };

        /* Top 3 Sources Percentage section on the top
            This should be executed before OrgInorgShare,TopKeyWords,SourceNewUsersList as  paid_installs_raw is used there
        */
        var TopSourcesPercentage = function(){
            var deferred = $q.defer();
            JettyService.cummulative(src_type+'Paid',app,$scope.endGap,$scope.noDays,2,type,timeZone).then(function(data) {
                try
                {
                    paid_installs_raw = data.x;
                    $scope.top_sources_percent = [];
                    for(i=0;i< $scope.top_sources.length && i<5;i++) {
                        $scope.top_sources_percent[i] = (($scope.top_sources[i].y/ paid_installs_raw)*100).toFixed(2);
                    }
                    deferred.resolve();
                }
                catch(err)
                {
                    deferred.resolve();
                }

            })
            return deferred.promise;
        };

        /*  Helper Function
            Given a Source it returns the day wise newusers in appropriate format
        */
        var SourceDayWiseNewUsers = function(source){
            var deferred = $q.defer();
            JettyService.keygranwise(src_type+'Source',app,source,$scope.endGap,$scope.noDays,2,2,type,timeZone).then(function(data){
                try
                {
                    if(data[0].x) {
                        data = data.concat({'x': source});
                    }
                    else {
                        data = [];
                        data = data.concat({'x': source});
                    }
                    deferred.resolve(data);
                }
                catch(err)
                {
                    deferred.resolve(data);
                }

            });
            return deferred.promise;
        }

        /*  Top 3 Sources Trend (Top Graph in Source Tab)
            Uses Above helper function
        */
        var TopSourcesTrend = function() {

            var deferred = $q.defer();
            var mod_data = [];
            var promises = [];
            try
            {
                for(i=0;i<$scope.selectedtop_sources.length ;i++)
                {
                    var source = $scope.selectedtop_sources[i].x;

                    promise = SourceDayWiseNewUsers(source);
                    promise.then(function(data){
                        var data_source = data[data.length-1].x;
                        data = data.slice(0,data.length-1);  // remove the source appended in above function
                        data = JSONService.fill(data,$scope.endGap,$scope.noDays); // fill the gaps with 0 if for some days newusers data is not there
                        mod_data = mod_data.concat({'z': data_source , 'a': data});  // convert the data so that we can use multiLine function for creating chart data
                    });
                    promises.push(promise);
                }
                $q.all(promises).then(function(){
                    if (mod_data.length==0) {
                        mod_data=[{'z': '' , 'a': [{}] }]
                    };
                    UtilitiesService.draw_chart(multiLine2(mod_data,new_user_source_installs_multiline_style),'MSLine.swf','TopSourceTrends','100%','300');
                    deferred.resolve();
                });
            }
            catch(err)
            {
                 deferred.resolve();
            }
            return deferred.promise;
        };
 $scope.$watch('selectedtop_sources',function(nv,ov) {
              if (nv.length!=ov.length) {

                // console.log($scope.selected_campaign)
               TopSourcesTrend();
               TopSourcesUninstalls();
      };

        })

        /*  Helper Function
            Given a Source it returns the day wise uninstalls in appropriate format
        */
        var DayWiseUninstallsForSource = function(source){
            var deferred = $q.defer();
            JettyService.keygranwise('USource',app,source,$scope.endGap,$scope.noDays,2,2,"long",timeZone).then(function(data){
                try
                {
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
                }
                catch(err)
                {
                    deferred.resolve(data);
                }

            });
            return deferred.promise;
        };


        // for sources tab table
        var SourceCummulativeUninstalls = function(){
            var deferred = $q.defer();
            SourceUninstallsOBJ={};
            JettyService.cummulative('USourcesAll',app,$scope.endGap,$scope.noDays,3,'string',timeZone).then(function(data){
                try
                {
                    console.log(data)
                    for (var i = 0; i < data.length; i++) {
                        SourceUninstallsOBJ[data[i].x]=data[i].y.split('__')[0];
                    };
                   console.log(SourceUninstallsOBJ)
                    deferred.resolve();
                }
                catch(err)
                {
                    deferred.resolve();
                }

            });
            return deferred.promise;
        };



        /* Top Source Daywise Uninstalls Graph
           Uses above helper function
        */
        var TopSourcesUninstalls = function() {
            var deferred = $q.defer();
            var mod_data = [];
            var promises = [];
            try
            {
                for(i=0;i<$scope.selectedtop_sources.length;i++)
                {
                    var source = $scope.selectedtop_sources[i].x;
                    promise = DayWiseUninstallsForSource(source); //Getting the daywise uninstalls for source
                    promise.then(function(data){
                        var src = data[data.length-1].x;
                        data = data.slice(0,data.length-1); //remove the source appended in above function
                        data = JSONService.fill(data,$scope.endGap,$scope.noDays); // fill the gaps with 0 if for some days data is not there
                        mod_data = mod_data.concat({"z": src+" Uninstalls" , "a": data});
                    });
                    promises.push(promise);
                }
                $q.all(promises).then(function(){
                    if (mod_data.length==0) {
                        mod_data=[{'z': '' , 'a': [{}] }]
                    };
                    UtilitiesService.draw_chart(multiLine2(mod_data,new_user_source_uninstalls_multiline_style),"MSLine.swf",'TopSourceUninstalls','100%','200');
                    deferred.resolve();

                });
            }
            catch(err)
            {
                deferred.resolve();
            }

            return deferred.promise;
        };

        /* Inorganic Vs Organic Users Pie Chart
            This should be executed before TopKeyWords as total_installs_raw is used there
        */
        var OrgInorgShare = function(){
            var deferred = $q.defer();
            JettyService.cummulative(src_type,app,$scope.endGap,$scope.noDays,2,type,timeZone).then(function(data) {
                try
                {
                    total_installs_raw = data.x;
                    var mod_data = [];
                    mod_data = mod_data.concat({'x':'Inorganic','y':paid_installs_raw});
                    mod_data = mod_data.concat({'x':'Organic','y':total_installs_raw-paid_installs_raw});
                    UtilitiesService.draw_chart(piechart_op(mod_data,organic_inorganic_pie_chart_style),'pie2d.swf','OrgvsInorg_share','100%','300');
                    deferred.resolve();
                }
                catch(err)
                {
                    deferred.resolve();
                }

            });
            return deferred.promise;
        }

        /* Top Key words pie chart and Key word cloud sections */
        var TopKeyWords = function(){
            var deferred = $q.defer();
            var domain_cur;
            if(domain == 'AU')
                domain_cur = 'AUTermsAll';
            else
                domain_cur = src_type+'Top20Terms';
            JettyService.cummulative(domain_cur,app,$scope.endGap,$scope.noDays,3,type,timeZone).then(function(data) {
                try
                {
                    var keywords = (UtilitiesService.descending(data,2)).slice(1,30);
                    words_temp =[];
                    var count = 0;
                    var count2 = 0;
                     for(i=0;i<keywords.length && i< 30;i++)
                    {

                        count2+=Math.log(keywords[i].y || 1);
                    }
                    for(i=0;i<keywords.length && i< 30;i++)
                    {
                            words_temp = words_temp.concat({'text':keywords[i].x, 'weight':Math.log(keywords[i].y || 1)*8/count2});


                            if(i<5)
                            {
                                count += keywords[i].y;
                            }
                    }

                   // console.log(JSON.stringify(words_temp));
                    $scope.words = words_temp;
                    var top_keywords = keywords.slice(0,5);
                    top_keywords = top_keywords.concat({'x':"Others", 'y':(total_installs_raw-paid_installs_raw)-count});
                    UtilitiesService.draw_chart(piechart_singlediv(top_keywords,top_keywords_doughnut_style),'doughnut2d.swf','topKeywords_share','100%','300');
                    deferred.resolve();
                }
                catch(err)
                {
                    deferred.resolve();
                }

            })
            return deferred.promise;
        };

        /*  Helper Function
            Given a Page it gives the sources list which falls in that page
        */
        var SourceList = function(){
            var deferred = $q.defer();
            var sourcenewuserslist = [];
            JettyService.cummulative(src_type+'SourcesAll',app,$scope.endGap,$scope.noDays,3,type,timeZone).then(function(data) {
                try
                {
                    sourcenewuserslist = UtilitiesService.descending(data,2);
                    for (var i = 0; i < sourcenewuserslist.length; i++) {
                    sourcenewuserslist[i].y=UtilitiesService.CommaSeparatedNumberFormat(sourcenewuserslist[i].y)
                      sourcenewuserslist[i].z=UtilitiesService.CommaSeparatedNumberFormat(sourcenewuserslist[i].z)
                };
                    deferred.resolve(sourcenewuserslist);
                }
                catch(err)
                {
                    deferred.resolve();
                }

            });
            return deferred.promise;
        };

        /* Source NewUsers Table in the source tab with pagination
           Uses the above Helper function
        */
        var SourceNewUsersList = function(){
            var deferred = $q.defer();
            $scope.itemsPerPage = 10
            $scope.source_current_page = 1;
            $scope.max_pages = 5;
            try
            {
                var promise = SourceList();
                promise.then(function(data){
                    console.log('edef')
                    for (var i = 0; i < data.length; i++) {
                        data[i].z=SourceUninstallsOBJ[data[i].x];
                    };
                    $scope.SourceNewUsersListCSV = data;
                    $scope.source_items = data.length;
                    $scope.paid_installs_total_raw = paid_installs_raw;
                    $scope.$watch('source_current_page + itemsPerPage', function() {
                        var begin = (($scope.source_current_page - 1) * $scope.itemsPerPage),
                        end = begin + $scope.itemsPerPage;
                        $scope.filteredsourcenewuserslist =  data.slice(begin, end);
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
            Given a Device it returns the day wise newusers in appropriate format
        */
        var DeviceDayWiseNewUsers = function(device,manu){
            var deferred = $q.defer();
            JettyService.keygranwise(domain+'Model',app,device,$scope.endGap,$scope.noDays,2,2,type,timeZone).then(function(data){
                try
                {
                    if(data[0].x) {
                        data = data.concat({'x': device, 'y': manu});
                    }
                    else {
                        data = [];
                        data = data.concat({'x': device, 'y': manu});
                    }
                    deferred.resolve(data);
                }
                catch(err)
                {
                    deferred.resolve();
                }
            });
            return deferred.promise;
        };

        /*  Top 3 Device Trends (Top Graph in Device Tab)
            Uses Above helper function
        */
        var TopDevicesTrend = function() {
            var deferred = $q.defer();
            var mod_data = [];
            var promises = [];
            try
            {
                for(i=0;i<$scope.selectedtop_manus.length ;i++) {
                    var device = $scope.selectedtop_manus[i].x;
                    var manu = $scope.selectedtop_manus[i].y;
                    promise = DeviceDayWiseNewUsers(device,manu);
                    promise.then(function(data){
                        var data_device = data[data.length-1].x;
                        var data_manu = data[data.length-1].y;
                        data = data.slice(0,data.length-1); // remove the device manu appended in above function
                        data = JSONService.fill(data,$scope.endGap,$scope.noDays); // fill the gaps with 0 if for some days newusers data is not there
                        mod_data = mod_data.concat({'z': data_manu+' '+data_device , 'a': data}); // convert the data so that we can use multiLine function for creating chart data
                    });
                    promises.push(promise);
                }
                $q.all(promises).then(function(){
                     if (mod_data.length==0) {
                        mod_data=[{'z': '' , 'a': [{}] }]
                    };
                    UtilitiesService.draw_chart(multiLine2(mod_data,new_user_device_multiline_style),'MSLine.swf','NUTopDeviceTrends','100%','353');
                    deferred.resolve();
                });
            }
            catch(err)
            {
                deferred.resolve();
            }

            return deferred.promise;
        };

 $scope.$watch('selectedtop_manus',function(nv,ov) {
              if (nv.length!=ov.length) {
                // console.log($scope.selected_campaign)
               TopDevicesTrend();
      };

        })
        /* Top Manufacturers Pie Chart, Top 4 Manufacturers Count and Top Manufacturer vs Others Pie Chart
            This should be executed before TopManuDevices as top_manus is used there
         */
        var TopManufacturers = function() {
            var deferred = $q.defer();
            var domain_cur;
            if(domain == 'AU')
                domain_cur = 'AUManufacturersAll';
            else
                domain_cur = domain+'Top20Manufacturers';
            JettyService.cummulative(domain_cur,app,$scope.endGap,$scope.noDays,3,type,timeZone).then(function(data) {
                try
                {
                    $scope.top_manus = UtilitiesService.descending(data,2).slice(0,5);

                    var top_manus_percent = [];
                    var count = 0;

                    top_manu_raw = $scope.top_manus[0].y; // top manufacturer new users we will use in below function for calcuting top 3 model percentages for top manufacturer
                    for(i=0;i<$scope.top_manus.length;i++)
                    {

                        top_manus_percent = top_manus_percent.concat({'x': $scope.top_manus[i].x , 'y': $scope.top_manus[i].y });
                        count += $scope.top_manus[i].y;
                        $scope.top_manus[i].y = UtilitiesService.numberFormat($scope.top_manus[i].y);

                     }
                    top_manus_percent = top_manus_percent.concat({'x': 'Others', 'y': new_users_raw - count });
                    /* Top Manufacturers Pie chart */
                    UtilitiesService.draw_chart(piechart_singlediv(top_manus_percent,new_user_device_manu_share),'doughnut2d.swf','manu_share','100%','300');

                    /* for Top Manufacturer percentage vs others pie chart */
                    var top_manu = [];
                    top_manu = top_manu.concat({'x': $scope.top_manus[0].x , 'y': ((top_manu_raw/new_users_raw)*100).toFixed(0)});
                    top_manu = top_manu.concat({'x': 'Others' , 'y': (((new_users_raw - top_manu_raw)/new_users_raw)*100).toFixed(0)});
                    UtilitiesService.draw_chart(piechart_singlediv(top_manu,new_user_device_top_share_style),'doughnut2d.swf','topmanu_share','100%','250');
                    deferred.resolve();
                }
                catch(err)
                {
                    deferred.resolve();
                }

            });
            return deferred.promise;
        };



        /* Top 3 Device Models of Top Manufacturer section */
        var TopManuDevices = function() {
            var deferred = $q.defer();
            $scope.top_manu_devices = [];
            var j=0;
            try
            {
                for(i=0;i<$scope.top_devices.length;i++)
                {
                    if($scope.top_devices[i].y == $scope.top_manus[0].x && j<3)
                    {
                        $scope.top_manu_devices = $scope.top_manu_devices.concat({'x' : $scope.top_devices[i].x , 'y' : (($scope.top_devices[i].z/ top_manu_raw)*100).toFixed(2) })
                        j++;
                    }
                }
                deferred.resolve();
            }
            catch(err)
            {
                deferred.resolve();
            }
            return deferred.promise;
        };

        /*  Helper Function
            Given a Page it gives the sources list which falls in that page
        */
        var DevicesList = function(){
            var deferred = $q.defer();
            var devicenewuserslist = [];
            var UModelsAllobj={};
            var promises=[];
            var promise1 = JettyService.cummulative(domain+'ModelsAll',app,$scope.endGap,$scope.noDays,3,type,timeutiliZone).then(function(data) {

                    devicenewuserslist = UtilitiesService.descending(data,3);
                    for (var i = 0; i < devicenewuserslist.length; i++) {
                    devicenewuserslist[i].z=UtilitiesService.CommaSeparatedNumberFormat(devicenewuserslist[i].z)
                };

            });
            var promise2 = JettyService.cummulative('UModelsAll',app,$scope.endGap,$scope.noDays,3,type,timeZone).then(function(data) {

               for (var i = 0; i < data.length; i++) {
                  UModelsAllobj[data.x+data.y]=data.z;
               };


            });
            promises.push(promise1);
            promises.push(promise2);
            $q.all(promises).then(function() {
                for (var i = 0; i < devicenewuserslist.length; i++) {
                  //  devicenewuserslist[i].a=0
                   devicenewuserslist[i].a=UModelsAllobj[devicenewuserslist.x+devicenewuserslist.y] || 0;
               };
               console.log(devicenewuserslist)
                deferred.resolve(devicenewuserslist);
            })
            return deferred.promise;
        };


var UModelsData;

 var GetUModelData = function(){
            var deferred = $q.defer();
            var devicenewuserslist = [];
            JettyService.cummulative(domain+'UModelsAll',app,$scope.endGap,$scope.noDays,3,type,timeZone).then(function(data) {
                try
                {
                    console.log(data);
                    for (var i = 0; i < data.length; i++) {
                        UModelsData[data.x]=data.y
                    };
                    console.log(UModelsData);
                    devicenewuserslist = UtilitiesService.descending(data,3);
                    deferred.resolve(devicenewuserslist);
                }
                catch(err)
                {
                    deferred.resolve();
                }

            });
            return deferred.promise;
        };
        /* Source NewUsers Table in the source tab with pagination
           Uses the above Helper function
        */
        var DeviceNewUsersList = function(){
            var deferred = $q.defer();
            $scope.itemsPerPage = 10
            $scope.device_current_page = 1;
            $scope.max_pages = 5;
            try
            {
                var promise = DevicesList();
                promise.then(function(data){
                    $scope.DeviceNewUsersListCSV = data;
                    $scope.device_items = data.length;
                    $scope.total_new_users_raw = new_users_raw;
                    $scope.$watch('device_current_page + itemsPerPage', function() {
                        var begin = (($scope.device_current_page - 1) * $scope.itemsPerPage),
                        end = begin + $scope.itemsPerPage;
                        $scope.filtereddevicenewuserslist =  data.slice(begin, end);
                        // $scope.table3loaded=true;




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

        // /*  Helper Function
        //     Given a Page it gives the devices list which falls in that page
        // */
        // var DeviceListForPage = function(page){
        //     $scope.page_device_list = [];
        //     JettyService.cummulative'NUModelsAll',app,page,$scope.endGap,$scope.noDays,3,"long").then(function(data) {
        //         $scope.page_device_list = UtilitiesService.top_cummulative_new(data,1,3);
        //     });
        // };

        // /* Last Table in the device tab with pagination
        //    Uses the above Helper function
        // */
        // var DeviceNewUsersList = function(){
        //     var deferred = $q.defer();
        //     $scope.device_items = 2000;   // Remember to change this
        //     $scope.items_per_page2 = 10;
        //     $scope.device_current_page = 1;
        //     $scope.max_pages = 5;
        //     $scope.total_new_users_raw = new_users_raw;
        //     $scope.$watch('device_current_page + items_per_page2', function() {
        //         DeviceListForPage($scope.device_current_page);
        //     });
        //     deferred.resolve();
        //     return deferred.promise;
        // };
    /* Device Tab */

    /* Location Tab */

        /* Top Cities Bar Graph and below percentages sections */
        var TopCities = function() {
            var deferred = $q.defer();
            JettyService.cummulative(domain+'City',app,$scope.endGap,$scope.noDays,3,type,timeZone).then(function(data) {
                $scope.cities = UtilitiesService.descending(data,2);
                $scope.citiesCSV = jQuery.extend(true,[],UtilitiesService.descending(data,2));
                for (var i = 0; i < $scope.citiesCSV.length; i++) {
                    $scope.citiesCSV[i].y=UtilitiesService.CommaSeparatedNumberFormat($scope.citiesCSV[i].y)
                };
                $scope.top_cities_percent = [];
                for(i=0; i<5; i++)
                {
                    $scope.top_cities_percent[i] = ($scope.cities[i].y /new_users_raw)*100;
                    $scope.top_cities_percent[i] = $scope.top_cities_percent[i].toFixed(2);
                }
                UtilitiesService.draw_chart(bargraph($scope.cities.slice(0,10),new_user_location_bar_style),'column2d.swf','top10Cities','100%','200');
                deferred.resolve();
            });
            return deferred.promise;
        };

        /* Left Table in the location tab with pagination (cities table) */
        var CityNewUsersList = function() {
            var deferred = $q.defer();
            $scope.CityNewUsersListCSV = $scope.citiesCSV;
            $scope.city_items = $scope.citiesCSV.length;
            $scope.items_per_page4 = 10;
            $scope.city_current_page = 1;
            $scope.max_pages = 5;
            $scope.$watch('city_current_page + items_per_page4', function() {
                var begin = (($scope.city_current_page - 1) * $scope.items_per_page4),
                end = begin + $scope.items_per_page4;
                $scope.page_city_list = $scope.citiesCSV.slice(begin, end);
                // $scope.table4loaded=true;
            });
            deferred.resolve();
            return deferred.promise;
        };

        /* Right Table in the location tab with pagination (states table) */
        var statesCSV;
        var StateNewUsersList = function() {
            var deferred = $q.defer();
            JettyService.cummulative(domain+'State',app,$scope.endGap,$scope.noDays,3,type,timeZone).then(function(data) {
                // $scope.table5loaded=true;
                states = UtilitiesService.descending(data,2);
                statesCSV = jQuery.extend(true,[],UtilitiesService.descending(data,2));
                 for (var i = 0; i < statesCSV.length; i++) {
                    statesCSV[i].y=UtilitiesService.CommaSeparatedNumberFormat(statesCSV[i].y)
                };
                $scope.StateNewUsersListCSV = states;
                $scope.state_items = states.length;
                $scope.items_per_page5 = 10;
                $scope.state_current_page = 1;
                $scope.max_pages = 5;
                $scope.$watch('state_current_page + items_per_page5', function() {
                    var begin = (($scope.state_current_page - 1) * $scope.items_per_page5),
                    end = begin + $scope.items_per_page5;
                    $scope.page_state_list = statesCSV.slice(begin, end);

                });
                deferred.resolve();
            });
            return deferred.promise;
        };

        /* Change state to state code in the data for drawing the graph */
        var GetStateCode = function(state,count){
            var deferred = $q.defer();
            JettyService.state_code(state,count,function(data){
                deferred.resolve(data);
            });
            return deferred.promise;
        };

        /* Draws the state map for india */
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
                UtilitiesService.draw_map(map(map_data,new_users_raw / states.length, states[0].y,test_map_style),"maps/india",'mapStates','100%','600');
                deferred.resolve();
            });
            return deferred.promise;
        };
    /* Location Tab */

    var first = function(){
        var deferred = $q.defer();
        var promises = [];

        promises.push(TotalNewUsers().finally(TopDevice));
        promises.push(NewUsersLast30Days());
        promises.push(NewUsersTrend().finally(NUTrend).finally(NewUsersOrganicInorganic).finally(UninstallsTrend).finally(UserWithGoalEvent).finally(VisitorsDayWiseList));
        promises.push(TopManufacturer());

        $q.all(promises).then(function(){
            deferred.resolve();
        });
        return deferred.promise;
    }

    var block3 = function(){
        var deferred = $q.defer();
        var promises = [];

        promises.push(OrgInorgShare().finally(TopKeyWords));
        promises.push(SourceCummulativeUninstalls().finally(SourceNewUsersList));

        $q.all(promises).then(function(){
            deferred.resolve();
        });
        return deferred.promise;
    }

    var block2 = function(){
        var deferred = $q.defer();
        var promises = [];

        promises.push(TopSourcesTrend());
        if(domain == 'NU')
            promises.push(TopSourcesUninstalls());
        promises.push(TopSourcesPercentage().finally(block3));

        $q.all(promises).then(function(){
            deferred.resolve();
        });
        return deferred.promise;
    }

    var second = function(){
        var deferred = $q.defer();
        var promises = [];

        promises.push(TopSources().finally(block2));

        $q.all(promises).then(function(){
            deferred.resolve();
        });
        return deferred.promise;
    }

    var third = function(){
        var deferred = $q.defer();
        var promises = [];

        promises.push(TopDevicesTrend());
        promises.push(TopManufacturers().finally(TopManuDevices));
        promises.push(DeviceNewUsersList());

        $q.all(promises).then(function(){
            deferred.resolve();
        });
        return deferred.promise;
    }

     var fourth = function(){
        var deferred = $q.defer();
        var promises = [];

        promises.push(TopCities().finally(CityNewUsersList)
                                  .finally(StateNewUsersList)
                                  .finally(StateMap));

        $q.all(promises).then(function(){
            deferred.resolve();
        });
        return deferred.promise;
    }

    var run = function()
    {
        first().finally(second).finally(third).finally(fourth);
    };

    //Start();
    WatchDate();

}]);
