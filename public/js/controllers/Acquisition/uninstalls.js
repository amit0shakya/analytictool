/*  Controller for Installs Page */

var installs = angular.module('Controllers');
installs.controller('UnInstallsCtrl', ['$scope','$rootScope','$q','JettyService','UtilitiesService','JSONService',function($scope, $rootScope, $q, JettyService, UtilitiesService, JSONService) {

    /* global variables which we use inside functions */
    var today =  new Date();
    var currentdate = new Date(today.getUTCFullYear(),today.getUTCMonth(),today.getUTCDate()); 
    var app = $rootScope.app.app_secret;
    var domain,type;
    var installs_data,new_user_organic_data,new_user_inorganic_data;
    var timeZone = "IST";
    var data = {"andaman and nicobar islands" : "001" , "andhra pradesh" : "002" , "arunachal pradesh" : "003" , "assam" : "004" , "bihar" : "005" , "chandigarh" : "006" , "chhattisgarh" : "007" , "dadra and nagar haveli" : "008" , "daman and diu" : "009" , "delhi" : "010" , "goa" : "011" , "gujarat" : "012" , "haryana" : "013" , "himachal pradesh" : "014" , "jammu and kashmir" : "015" , "jharkhand" : "016" , "karnataka" : "017" , "kerala" : "018" , "lakshadweep" : "019" , "madhya pradesh" : "020" , "maharashtra" : "021" , "manipur" : "022" , "meghalaya" : "023" , "mizoram" : "024" , "nagaland" : "025" , "orissa" : "026" , "pondicherry" : "027" , "punjab" : "028" , "rajasthan" : "029" , "sikkim" : "030" , "tamil nadu" : "031" , "telangana" : "036" , "tripura" : "032" , "uttar pradesh" : "033" , "uttaranchal" : "034" , "west bengal" : "035"};


    $scope.init = function(mydomain,mytype)
    {
        domain = mydomain;
        type = mytype;
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
       	$scope.date = {startDate: new Date(currentdate.getTime() - 7*1000*60*60*24), endDate: new Date(currentdate.getTime() - 1*1000*60*60*24)};
//	    $scope.date = {startDate: new Date(Date.UTC(2015,0,1)), endDate: new Date(Date.UTC(2015,0,8))};
        $scope.endGap = Math.abs(currentdate.getTime() - $scope.date.endDate.getTime())/(1000*60*60*24);
        $scope.noDays = Math.abs($scope.date.endDate.getTime() - $scope.date.startDate.getTime())/(1000*60*60*24) + 1;
    };

    /* Get Total Paid,Organic Installs or Uninstalls depending on the parameter category('I'-Installs,'U'-Uninstalls) 
        Should be executed first before some functions in Device and Location tabs and also data produced in this function used
        in Source tab html
    */
    var TotalInstallsOrUninstalls = function(category,category2){
        var deferred = $q.defer();
        var promises = [];
        var count1,count2,count3,count4,count5;
        var promise1 = JettyService.cummulative(category+'Paid',app,$scope.endGap,$scope.noDays,2,"long",timeZone);
        var promise2 = JettyService.cummulative(category+'Organic',app,$scope.endGap,$scope.noDays,2,"long",timeZone);
        var promise3 = JettyService.cummulative(category2,app,$scope.endGap,$scope.noDays,2,"long",timeZone);
        try
        {
            promise1.then(function(data){
                count1 = data.x || 0;
                count2 = UtilitiesService.numberFormat(count1);
            });
            promise2.then(function(data){
                count3 = data.x || 0;
                count4 = UtilitiesService.numberFormat(count3);
            });
             promise3.then(function(data){
                count5 = data.x || 0;
            });
            promises.push(promise1);
            promises.push(promise2);
            promises.push(promise3);
            $q.all(promises).then(function() {
                if(category == 'I')
                {
                    $scope.totalPaidInstalls = count1;
                    $scope.totalPaidInstalls1 = count2;
                    $scope.totalOrgInstalls = count3;
                    $scope.totalOrgInstalls1 = count4;
                    if(count5-count1 >= 0)
                        $scope.totalOrgInstalls_sub1 = UtilitiesService.numberFormat(count5-count1);
                    else
                        $scope.totalOrgInstalls_sub1 = '0'

                }
                else
                {
                    $scope.totalPaidUninstalls = count1;
                    $scope.totalPaidUninstalls1 = count2;
                    $scope.totalOrgUninstalls = count3;
                    $scope.totalOrgUninstalls1 = count4;
                    if(count5-count1 >= 0)
                        $scope.totalOrgUninstalls_sub1 = UtilitiesService.numberFormat(count5-count1);
                    else
                        $scope.totalOrgUninstalls_sub1 = '0'

                }
                deferred.resolve();
            });
        }
        catch(err)
        {
            deferred.resolve();
        }
        return deferred.promise;
    };

    /*Installs Tab*/

     var InstallsTrend = function() {
            var deferred = $q.defer();
            var domain2;
            if (domain=='I') 
                {domain2='NU'}
            else
                {domain2=domain}

            JettyService.granwise(domain2,app,$scope.endGap,$scope.noDays,2,2,type,timeZone).then(function(data) {
                try
                {
                    data = JSONService.fill(data,$scope.endGap,$scope.noDays);
                    installs_data = data;
                    UtilitiesService.draw_chart(line(data,new_user_line_style),'Line.swf','InstallsTrend','100%','253');
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
            var promise1 = JettyService.granwise(domain+'Paid',app,$scope.endGap,$scope.noDays,2,2,"long",timeZone).then(function(data) {
                 data = JSONService.fill(data,$scope.endGap,$scope.noDays);
                new_user_inorganic_data=data;
            });
            var promise2 = JettyService.granwise(domain+'Organic',app,$scope.endGap,$scope.noDays,2,2,"long",timeZone).then(function(data) {
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

    /* Last Table in the visitors tab with pagination */
        var InstallsDayWiseList = function(){
            var deferred = $q.defer();
            var daywiselist = [];
            var data = installs_data;
            try
            {
                for(i=data.length-1; i>=0; i--) {
                    if(i == 0) {
                        daywiselist = daywiselist.concat({"x":data[i].x, "y":data[i].y, "z":0,"a":new_user_organic_data[i].y,"ap":' ('+((new_user_organic_data[i].y/data[i].y*100).toFixed(1)|0)+' %)', "b":new_user_inorganic_data[i].y,"bp":' ('+((new_user_inorganic_data[i].y/data[i].y*100).toFixed(1)||0)+' %)'});
                    }
                    else {
                        daywiselist = daywiselist.concat({"x":data[i].x, "y":data[i].y, "z":(((data[i].y-data[i-1].y)/(data[i-1].y))*100).toFixed(1),"a":new_user_organic_data[i].y,"ap":' ('+((new_user_organic_data[i].y/data[i].y*100).toFixed(1)|0)+' %)', "b":new_user_inorganic_data[i].y,"bp":' ('+((new_user_inorganic_data[i].y/data[i].y*100).toFixed(1)||0) +' %)'});
                    }
                }
                $scope.InstallsDayWiseListCSV = jQuery.extend(true,[], daywiselist);;
              for (var i = 0; i <  $scope.InstallsDayWiseListCSV.length; i++) {
                     delete $scope.InstallsDayWiseListCSV[i].ap;
                     delete $scope.InstallsDayWiseListCSV[i].bp;
                };
                

                $scope.installs_items = daywiselist.length;
                $scope.items_per_page1 = 10;
                $scope.installs_current_page = 1;
                $scope.max_pages = 5;
                $scope.$watch('installs_current_page + items_per_page1', function() {
                    var begin = (($scope.installs_current_page - 1) * $scope.items_per_page1),
                    end = begin + $scope.items_per_page1;
                    $scope.page_daywise_list = daywiselist.slice(begin, end);
                });
                deferred.resolve();
            }
            catch(err)
            {
                deferred.resolve();
            }
            
            return deferred.promise;
        };

    /*Installs Tab*/

    /*Source Tab*/

        /*  This Should run before all Source related functions in the source tab because of dependency 
            Returns the Top 5 Sources based on installs in the given range 
        */
        var TopSources = function() {
            var deferred = $q.defer();
            JettyService.cummulative(domain+'Top20Sources',app,$scope.endGap,$scope.noDays,3,type,timeZone).then(function(data){
                try
                {
                    if(type=='string')
                        data = UtilitiesService.session_split_2(data,1);
                    $scope.topSourcesInstalls = (UtilitiesService.descending(data,2)).slice(0,5);
                    $scope.selectedSource = $scope.topSourcesInstalls[0];
                    deferred.resolve();
                }
                catch(err)
                {
                    deferred.resolve();
                }    
            });
            return deferred.promise;
        };
        
        /*  Helper Function 
            Given a Source it returns the day wise installs in appropriate format 
        */
        var SourceDayWiseInstalls = function(source){
            var deferred = $q.defer();
            JettyService.keygranwise(domain+'Source',app,source,$scope.endGap,$scope.noDays,2,2,type,timeZone).then(function(data){
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

        /* Top Source Daywise Installs Graph 
           Uses above helper function 
        */
        var TopSourcesInstalls = function() {
            var deferred = $q.defer();
            var mod_data = [];
            var promises = [];
            try
            {
                for(i=0;i<$scope.topSourcesInstalls.length && i<3 ;i++)
                {
                    var source = $scope.topSourcesInstalls[i].x;
                    promise = SourceDayWiseInstalls(source);  //Getting the daywise installs for source
                    promise.then(function(data){
                        var src = data[data.length-1].x;
                        data = data.slice(0,data.length-1); // remove the source appended in above function
                        if(type==='string') 
                            data = UtilitiesService.session_split_2(data,1);
                        data = JSONService.fill(data,$scope.endGap,$scope.noDays);// fill the gaps with 0 if for some days data is not there
                        mod_data = mod_data.concat({"z": src , "a": data});
                    });
                    promises.push(promise);
                }
                $q.all(promises).then(function(){
                    UtilitiesService.draw_chart(multiLine2(mod_data,acquisition_installs_multiline_style),"MSLine.swf",'TopSourceInstalls','100%','353');
                    deferred.resolve();

                });
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
        var SourceList = function(){
            var deferred = $q.defer();
            var sourcenewuserslist = [];
            JettyService.cummulative(domain+'SourcesAll',app,$scope.endGap,$scope.noDays,3,type,timeZone).then(function(data) {
                try
                {
                    if(type==='string')
                        data = UtilitiesService.session_split_2(data,1);
                    sourcenewuserslist = UtilitiesService.descending(data,2);
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
                    $scope.source_items = data.length;
                    $scope.$watch('source_current_page + itemsPerPage', function() {
                        var begin = (($scope.source_current_page - 1) * $scope.itemsPerPage),
                        end = begin + $scope.itemsPerPage;
                        $scope.filteredsourcenewuserslist =  data.slice(begin, end);
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

        /*  Helper Function
            Given a Page it gives the sources list which falls in that page
        */
        var SourceList = function(){
            var deferred = $q.defer();
            var sourceinstallslist = [];
            JettyService.cummulative(domain+'SourcesAll',app,$scope.endGap,$scope.noDays,3,type,timeZone).then(function(data) {
                try
                {
                    if(type==='string')
                        data = UtilitiesService.session_split_2(data,1);
                    sourceinstallslist = UtilitiesService.descending(data,2);;
                    deferred.resolve(sourceinstallslist);
                }
                catch(err)
                {
                    deferred.resolve()
                }
                
            });
            return deferred.promise;
        };

        /* Source Installs Table in the source tab with pagination 
           Uses the above Helper function
        */
        var SourceInstallsList = function(){
            var deferred = $q.defer();
            $scope.itemsPerPage = 10
            $scope.currentPage_tab1 = 1;
            $scope.maxSize_tab1 = 5;
            try
            {
                var promise = SourceList();
                promise.then(function(data){
                     $scope.SourceInstallsListCSV = data;
                    $scope.totalItems_tab1 = data.length;
                    $scope.$watch('currentPage_tab1 + itemsPerPage', function() {
                        var begin = (($scope.currentPage_tab1 - 1) * $scope.itemsPerPage),
                        end = begin + $scope.itemsPerPage;
                        $scope.filteredsourceinstallslist =  data.slice(begin, end);
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

        /* Top Keyword Installs Bar Graph */
        var TopKeyWords = function(){
            var deferred = $q.defer();
            JettyService.cummulative(domain+'Top20Terms',app,$scope.endGap,$scope.noDays,3,type,timeZone).then(function(data) {
                try
                {
                    if(type==='string')
                        data = UtilitiesService.session_split_2(data,1);
                    top_terms = (UtilitiesService.descending(data,2)).slice(0,7);
                    UtilitiesService.draw_chart(bargraph(top_terms, acquisition_installs_bar_graph_style),"column2d.swf","SourceKeywords","100%","400");
                    deferred.resolve();
                }
                catch(err)
                {
                    deferred.resolve();
                }         
            });
            return deferred.promise;
        };

        /*  Helper Function
            Given a Page it gives the KeyWords list which falls in that page
        */
        var KeyWordList = function(){
            var deferred = $q.defer();
            var keywordinstallslist = [];
            JettyService.cummulative(domain+'TermsAll',app,$scope.endGap,$scope.noDays,3,type,timeZone).then(function(data) {
                try
                {
                    if(type==='string')
                        data = UtilitiesService.session_split_2(data,1);
                    keywordinstallslist = UtilitiesService.descending(data,2);
                    deferred.resolve(keywordinstallslist);
                }
                catch(err)
                {
                    deferred.resolve();
                }            
            });
            return deferred.promise;
        };

        /* KeyWord Installs Table in the source tab with pagination
           Uses the above Helper function
        */
        var KeyWordInstallsList = function(){
            var deferred = $q.defer();
            $scope.itemsPerPage = 10
            $scope.currentPage_tab2 = 1;
            $scope.maxSize_tab2 = 5;
            try
            {
                var promise = KeyWordList();
                promise.then(function(data){
                     $scope.KeyWordInstallsListCSV = data;
                    $scope.totalItems_tab2 = data.length;
                    $scope.$watch('currentPage_tab2 + itemsPerPage', function() {
                        var begin = (($scope.currentPage_tab2 - 1) * $scope.itemsPerPage),
                        end = begin + $scope.itemsPerPage;
                        $scope.filteredkeywordinstallslist =  data.slice(begin, end);
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

    /*Source Tab*/

    /* Device Tab */

        /*  Helper Function
            Given a Manufacturer,category(Paid/Organic) it gives the Devices of that Manufacturer with Top Installs in that category
        */
        var TopDevicesForManu = function(manu,category) {
            var deferred = $q.defer();
            JettyService.keycummulative(domain+category+'TopDevicesManu',app,manu,$scope.endGap,$scope.noDays,3,"long",timeZone).then(function(data2){
                try
                {

                    if(data2!=null)
                    {
                        data2 = data2.concat({"x": manu});    

                    }
                    else
                    {
                        data2 = [];
                        data2 = data2.concat({"x": manu});
                    }
                    deferred.resolve(data2);
                }
                catch(err)
                {
                     deferred.resolve();
                }
            });
            return deferred.promise;
        };

        /*  Bar Graph and Pie chart in Device Tab for Device Installs of the category(Paid/Organic) 
            Uses the above Helper function
        */
        var TopDeviceInstalls = function(category){
            var deferred = $q.defer();
            JettyService.cummulative(domain+category+'Top20Manufacturers',app,$scope.endGap,$scope.noDays,3,"long",timeZone).then(function(data1) {
                try
                {
                    var top5_manu = (UtilitiesService.descending(data1,2)).slice(0,5);
                    var mod_data = [];
                    var promises = [],count=0;
                    var top5_manu_share = [];
                    var total_installs;
                    if(category == 'Paid')
                    {
                        total_installs = $scope.totalPaidInstalls;
                    }
                    else
                    {
                        total_installs = $scope.totalOrgInstalls;
                    }
                    for(i=0;i<top5_manu.length;i++)
                    {
                        top5_manu_share = top5_manu_share.concat({"x": top5_manu[i].x , "y": top5_manu[i].y });
                        count += top5_manu[i].y;
                        top5_manu[i].y = UtilitiesService.numberFormat(top5_manu[i].y);
                    }
                    top5_manu_share = top5_manu_share.concat({"x": "Others", "y": total_installs - count })
                    UtilitiesService.draw_chart(piechart_singlediv(top5_manu_share,acquisition_installs_device_doughnut_style),"doughnut2d.swf",category+"_manu_share","100%","330")

                    for(i=0; i< top5_manu.length ; i++)
                    {  
                        var manu = top5_manu[i].x;
                        promise = TopDevicesForManu(manu,category); //Getting the Devices with top installs in the category
                        promise.then(function(data2){

                            var topdevices = [];
                            var manufacturer = data2[data2.length-1].x;
                            data2 = data2.slice(0,data2.length-1);
                            $scope.top20Devices = (UtilitiesService.descending(data2,2)).slice(0,5); 

                            for(j=0;j< $scope.top20Devices.length && j< 3 ;j++)
                            {
                                topdevices = topdevices.concat({"x": $scope.top20Devices[j].x ,"y": $scope.top20Devices[j].y});
                            }

                            mod_data = mod_data.concat({"z": manufacturer, "a": topdevices });
                        });
                        promises.push(promise);
                    }
                    $q.all(promises).then(function() {
                        if(category == 'Paid')
                        {
                            style = acquisition_installs_Paid_device_multibar_style;
                        }
                        else
                        {
                            style = acquisition_installs_Organic_device_multibar_style;
                        }
                        UtilitiesService.draw_chart(bargraph_multi(mod_data,3,style),"mscolumn2d.swf","Top"+category+"ManuDevices","100%","400");
                        deferred.resolve(); 
                    })
                }
                catch(err)
                {
                    deferred.resolve();
                }
                
            });
            return deferred.promise;
        };

        /*  Helper Function
            Given a Page it gives the Paid Installs Device list which falls in that page
        */
        var PaidInstallsDeviceListForPage = function(){
            var deferred = $q.defer();
            var deviceinorginstallslist = [];
            JettyService.cummulative(domain+"PaidModelsAll",app,$scope.endGap,$scope.noDays,3,"long",timeZone).then(function(data) {
                try
                {
                    deviceinorginstallslist = UtilitiesService.descending(data,3);
                    deferred.resolve(deviceinorginstallslist);
                }
                catch(err)
                {
                    deferred.resolve();
                }
                    
            });
            return deferred.promise;
        };

        /* Paid Installs Devic Table in the Device tab with pagination 
           Uses the above Helper function
        */
        var DevicePaidInstallsList = function(){
            var deferred = $q.defer();
            $scope.itemsPerPage = 10
            $scope.currentPage_tab3 = 1;
            $scope.maxSize_tab3 = 5;
            var promise = PaidInstallsDeviceListForPage();
            try
            {
                promise.then(function(data){
                    $scope.DevicePaidInstallsListCSV = data;
                    $scope.totalItems_tab3 = data.length;
                    $scope.$watch('currentPage_tab3 + itemsPerPage', function() {
                        var begin = (($scope.currentPage_tab3 - 1) * $scope.itemsPerPage),
                        end = begin + $scope.itemsPerPage;
                        $scope.filtereddeviceinorginstallslist =  data.slice(begin, end);
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

        /*  Helper Function
            Given a Page it gives the Organic Installs Device list which falls in that page
        */
        var OrganicInstallsDeviceListForPage = function(){
            var deferred = $q.defer();
            deviceorginstallslist = [];
            JettyService.cummulative(domain+"OrganicModelsAll",app,$scope.endGap,$scope.noDays,3,"long",timeZone).then(function(data) {
                try
                {
                    deviceorginstallslist = UtilitiesService.descending(data,3);
                    deferred.resolve(deviceorginstallslist); 
                }
                catch(err)
                {
                    deferred.resolve();
                }
                    
            });
            return deferred.promise;
        };

        /* Organic Installs Devic Table in the Device tab with pagination 
           Uses the above Helper function
        */
        var DeviceOrganicInstallsList = function(){
            var deferred = $q.defer();
            $scope.itemsPerPage1 = 10
            $scope.currentPage_tab4 = 1;
            $scope.maxSize_tab4 = 5;
            var promise = OrganicInstallsDeviceListForPage();
            try
            {
                promise.then(function(data){
                    $scope.DeviceOrganicInstallsListCSV = data;
                    $scope.totalItems_tab4 = data.length;
                    $scope.$watch('currentPage_tab4 + itemsPerPage', function() {
                        var begin = (($scope.currentPage_tab4 - 1) * $scope.itemsPerPage),
                        end = begin + $scope.itemsPerPage;
                        $scope.filtereddeviceorginstallslist =  data.slice(begin, end);
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

    /* Device Tab */

    /* Location Tab */

        var TopPaidCities = function() {
            var deferred = $q.defer();
            JettyService.keycummulative(domain+'PaidCity',app,$scope.selectedPaidState.toLowerCase(),$scope.endGap,$scope.noDays,3,"long",timeZone).then(function(data) {
                try
                {
                    $scope.topPaidCities = UtilitiesService.descending(data,2);
                    deferred.resolve();
                }
                catch(err)
                {
                    deferred.resolve();
                }
            });
            return deferred.promise;
        };

        var TopOrganicCities = function() {
            var deferred = $q.defer();
            JettyService.keycummulative(domain+'OrganicCity',app,$scope.selectedOrganicState.toLowerCase(),$scope.endGap,$scope.noDays,3,"long",timeZone).then(function(data) {
                try
                {
                    $scope.topOrganicCities = UtilitiesService.descending(data,2);
                    deferred.resolve();
                }
                catch(err)
                {
                    deferred.resolve();   
                }
            });
            return deferred.promise;
        };


        $scope.PaidStateObj={}
        var TopPaidStates = function() {
            var deferred = $q.defer();
            JettyService.cummulative(domain+'PaidState',app,$scope.endGap,$scope.noDays,3,"long",timeZone).then(function(data) {
                try
                {
                    $scope.topPaidStates = UtilitiesService.descending(data,2);
                    $scope.selectedPaidState=$scope.topPaidStates[0].x;
              		$scope.selectedPaidStateValue=$scope.topPaidStates[0].y;
                    for (var i = 0; i < $scope.topPaidStates.length; i++) {
                        $scope.PaidStateObj[$scope.topPaidStates[i].x]=$scope.topPaidStates[i].y;
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

        $scope.OrgStateObj={}
        var TopOrganicStates = function() {
            var deferred = $q.defer();
            JettyService.cummulative(domain+'OrganicState',app,$scope.endGap,$scope.noDays,3,"long",timeZone).then(function(data) {
                try
                {
                    $scope.topOrganicStates = UtilitiesService.descending(data,2);
                    $scope.selectedOrganicState=$scope.topOrganicStates[0].x;
                    $scope.selectedOrganicStateValue=$scope.topOrganicStates[0].y;
                    for (var i = 0; i < $scope.topOrganicStates.length; i++) {
                        $scope.OrgStateObj[$scope.topOrganicStates[i].x]=$scope.topOrganicStates[i].y;
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

        var DayWiseForState = function(state_code,count){
            var deferred = $q.defer();
            JettyService.state_code(state_code,count,function(data){
                deferred.resolve(data);
            });
            return deferred.promise;
        };

        var DayWiseForCity = function(state_code,count){
            var deferred = $q.defer();
            JettyService.city_code(state_code,count,function(data){
                deferred.resolve(data);
            });
            return deferred.promise;
        };

                                 
        var TopPaidStatesTrend = function() {
              var deferred = $q.defer();
              var mod_data = [];
              var promises = [];

              $scope.map_data_paid=[]
              for(i=0;i<$scope.topPaidStates.length ;i++)
              {
                    var state = $scope.topPaidStates[i];
                    promise = DayWiseForState(state.x,state.y);
                    promise.then(function(data){
                     if (data.x.code != null) {
                          var data_point = {"x" : data.x.code, "y" : data.y,"z": data.x.city}
                          $scope.map_data_paid=$scope.map_data_paid.concat(data_point)
                    }
            });
            promises.push(promise);
              }
              $q.all(promises).then(function(){
                  DrawMapPaid();
                  deferred.resolve();
              });
              return deferred.promise;
          };

        var TopOrganicStatesTrend = function() {
            var deferred = $q.defer();
            var mod_data = [];
            var promises = [];
            $scope.map_data_organic=[]
            for(i=0;i<$scope.topOrganicStates.length ;i++)
            {
                    var state = $scope.topOrganicStates[i];
                    promise = DayWiseForState(state.x,state.y);
                    promise.then(function(data){
                     if (data.x.code != null) {
                        var data_point = {"x" : data.x.code, "y" : data.y}
                        $scope.map_data_organic=$scope.map_data_organic.concat(data_point)
                      }
            });
            promises.push(promise);
            }
            $q.all(promises).then(function(){
                DrawMapOrganic();
                deferred.resolve();
            });
            return deferred.promise;
        };

        var TopPaidCitiesTrend = function() {
            var deferred = $q.defer();
            var mod_data = [];
            var promises = [];
            $scope.map_data_city_paid=[]
            for(i=0;i<$scope.topPaidCities.length ;i++)
            {
                var city = $scope.topPaidCities[i];
                promise = DayWiseForCity(city.x,city.y);
                promise.then(function(data){
                    if (data.x.code != null) {
                        var data_point = {"x" : data.x.code, "y" : data.y,"z": data.x.city}
                        $scope.map_data_city_paid=$scope.map_data_city_paid.concat(data_point)
                    }
                });
                promises.push(promise);
            }
            $q.all(promises).then(function(){
                DrawMapStatePaid();
                deferred.resolve();
            });
            return deferred.promise;
        };

        var TopOrganicCitiesTrend = function() {
            var deferred = $q.defer();
            var mod_data = [];
            var promises = [];
            $scope.map_data_city_organic=[]
            for(i=0;i<$scope.topOrganicCities.length ;i++)
            {
                var city = $scope.topOrganicCities[i];
                promise = DayWiseForCity(city.x,city.y);
                promise.then(function(data){
                    if (data.x.code != null) {
                        var data_point = {"x" : data.x.code, "y" : data.y}
                        $scope.map_data_city_organic=$scope.map_data_city_organic.concat(data_point)
                    }
                });
                promises.push(promise);
            }
            $q.all(promises).then(function(){
                DrawMapStateOrganic();
                deferred.resolve();
            });
            return deferred.promise;
        };

        var DrawMapPaid  = function(data) {
            var deferred = $q.defer();
            if (!data) {
            data=map($scope.map_data_paid,$scope.totalPaidInstalls / $scope.topPaidStates.length, $scope.topPaidStates[0].y,test_map_style);
            };
            data.entityclicked=function(evt,data2) {
                        $scope.City="";
                        $scope.selectedcity=""
                        $('#selected_state').html(data2.label)
                        for (var i = 0; i < data.data.length; i++) {
                         delete data.data[i].color;
                         if (data.data[i].id==data2.id) {
                            data.data[i].color="#e44a00"
                         };
                        };
                         UtilitiesService.draw_map(data,"maps/india",'mapPaidStates','100%','500',1);
                        console.log(data.data)
                        console.log(data2)
                    $scope.selectedPaidState=data2.label;
                    $scope.selectedPaidStateValue=data2.value;
                    $scope.$apply();
                }
            UtilitiesService.draw_map(data,"maps/india",'mapPaidStates','100%','500',1);
            deferred.resolve();
            return deferred.promise;
        };

        var DrawMapOrganic  = function() {
            var deferred = $q.defer();
            UtilitiesService.draw_map(map($scope.map_data_organic,$scope.totalOrgInstalls / $scope.topOrganicStates.length, $scope.topOrganicStates[0].y,test_map_style),"maps/india",'mapOrganicStates','100%','500',2);
            deferred.resolve();
            return deferred.promise;
        };

        var DrawMapStatePaid  = function() {
            var deferred = $q.defer();
            UtilitiesService.draw_map(map($scope.map_data_city_paid, $scope.selectedPaidStateValue / $scope.topPaidCities.length, $scope.topPaidCities[0].y,test_map_style),"maps/"+$scope.selectedPaidState.replace(/ /g,''),'mapTopPaidState','100%','250');
            deferred.resolve();
            return deferred.promise;
        };
        
        
        $scope.$watch('selectedPaidState',function(nv,ov) {
          if (ov!=undefined) {
            var deferred = $q.defer();
            var promises = [];
            
            promises.push(TopPaidCities()
            .finally(TopPaidCitiesTrend));
            $q.all(promises).then(function(){
              DrawMapStatePaid();
              deferred.resolve();
            });
          }
        });

        var DrawMapStateOrganic  = function() {
            var deferred = $q.defer();
            UtilitiesService.draw_map(map($scope.map_data_city_organic, $scope.selectedOrganicStateValue / $scope.topOrganicCities.length, $scope.topOrganicCities[0].y,test_map_style),"maps/"+$scope.selectedOrganicState.replace(/ /g,''),'mapTopOrganicState','100%','250');
            deferred.resolve();
            return deferred.promise;
        };
        
        $scope.$watch('selectedOrganicState',function(nv,ov) {
          if (ov!=undefined) {
            var deferred = $q.defer();
            var promises = [];
            promises.push(TopOrganicCities()
            .finally(TopOrganicCitiesTrend));
            $q.all(promises).then(function(){
              DrawMapStateOrganic();
              deferred.resolve();
            });
          }
        });


        var StatePaidInstallsList = function(){
            var deferred = $q.defer();
            $scope.itemsPerPage = 10
            $scope.currentPage_tab5 = 1;
            $scope.maxSize_tab5 = 5;
            $scope.StatePaidInstallsListCSV = $scope.topPaidStates;
            $scope.totalItems_tab5 = $scope.topPaidStates.length;
            $scope.$watch('currentPage_tab5 + itemsPerPage', function() {
                var begin = (($scope.currentPage_tab5 - 1) * $scope.itemsPerPage),
                end = begin + $scope.itemsPerPage;
                $scope.filteredpaidstateslist =  $scope.topPaidStates.slice(begin, end);
            });
            deferred.resolve();
            return deferred.promise;
        };

        var StateOrganicInstallsList = function(){
            var deferred = $q.defer();
            $scope.itemsPerPage = 10
            $scope.currentPage_tab6 = 1;
            $scope.maxSize_tab6 = 5;
            $scope.StateOrganicInstallsListCSV = $scope.topOrganicStates;
            $scope.totalItems_tab6 = $scope.topOrganicStates.length;
            $scope.$watch('currentPage_tab6 + itemsPerPage', function() {
                var begin = (($scope.currentPage_tab6 - 1) * $scope.itemsPerPage),
                end = begin + $scope.itemsPerPage;
                $scope.filteredorganicstateslist =  $scope.topOrganicStates.slice(begin, end);
            });
            deferred.resolve();
            return deferred.promise;
        };

 // var TopRegions = function() {
 //        var deferred = $q.defer();
 //        JettyService.cummulative('NUState',app,$scope.endGap,$scope.noDays,3,"long",timeZone).then(function(data) {
 //            $scope.topRegionsNU = UtilitiesService.descending(data,2);
 //            deferred.resolve();
 //        });
 //        return deferred.promise;
 //    };

    $scope.selectState = function(id,value,label)
    {   
        $scope.City="";
        $scope.selectedcity=""
        $('#selected_state').html(label)
    var data =map($scope.map_data_paid,$scope.totalPaidInstalls / $scope.topPaidStates.length, $scope.topPaidStates[0].y,test_map_style);
            for (var i = 0; i < data.data.length; i++) {
                if(data.data[i].id == id)
                {
                    data.data[i].color = "#e44a00";
                    $scope.selectedPaidState=label;
                    $scope.selectedPaidStateValue=value;
                    // $rootScope.$apply();
                }
                
            };
            DrawMapPaid(data);
            //UtilitiesService.draw_map(data,"maps/india",'mapPaidStates','100%','500',1);
           
    }


    $scope.selectCity = function(id,value,label)
    {  
        $scope.City=label;
    var data =map($scope.map_data_city_paid, $scope.selectedPaidStateValue / $scope.topPaidCities.length, $scope.topPaidCities[0].y,test_map_style);
            console.log(data)
            for (var i = 0; i < data.data.length; i++) {
                if(data.data[i].id == id)
                {
                    data.data[i].color = "#e44a00";
                    
                }
                
            };
            UtilitiesService.draw_map(data,"maps/"+$scope.selectedPaidState.replace(/ /g,''),'mapTopPaidState','100%','250',1);
           
    }



    $scope.uninstallemails=function(){
        JettyService.cummulative('UninstallSourceEmails',app,'100',$scope.noDays,2,"string",timeZone).then(function(data) {
                // console.log(data)
                var uninstallemails={}
                for (var i = 0; i < data.length; i++) {
                    // var elem=uninstallemails[data[i].x.split('^^')[0]];
                    data[i].y=data[i].y.split(',')
                    uninstallemails[data[i].x.split('^^')[0]]=uninstallemails[data[i].x.split('^^')[0]]||[]
                    uninstallemails[data[i].x.split('^^')[0]].push(data[i].y)
                    // console.log(uninstallemails,data[i].y)
                }
                $scope.uninstallemailscsv=[]
                for (var key in uninstallemails) {
                      if (uninstallemails.hasOwnProperty(key)) {
                        $scope.uninstallemailscsv.push({source:key,emails:(uninstallemails[key].filter(function(item, i, ar){ return ar.indexOf(item) === i; }))})
                        // uninstallemails[key]=uninstallemails[key].filter(function(item, i, ar){ return ar.indexOf(item) === i; });
                        // alert(key + " -> " + p[key]);
                      }
                    }
                    // $scope.uninstallemails=uninstallemails
                console.log($scope.uninstallemailscsv)
            });
            // return deferred.promise;
    }


    /* Location Tab */

    var first = function(){
        var deferred = $q.defer();
        var promises = [];

        promises.push(InstallsTrend().finally(NewUsersOrganicInorganic).finally(InstallsDayWiseList));

        $q.all(promises).then(function(){
            deferred.resolve();
        });  
        return deferred.promise;
    }

    var second = function(){
        var deferred = $q.defer();
        var promises = [];
        promises.push(TotalInstallsOrUninstalls('I','NU'));
        promises.push(TotalInstallsOrUninstalls('U','U'));
        promises.push(TopSources().finally(TopSourcesInstalls));
        promises.push(SourceInstallsList());
        promises.push(TopKeyWords());
        promises.push(KeyWordInstallsList());
        $q.all(promises).then(function(){
            deferred.resolve();
        });  
        return deferred.promise;
    }

    var third = function(){
        var deferred = $q.defer();
        var promises = [];
        promises.push(TopDeviceInstalls('Paid'));
        promises.push(TopDeviceInstalls('Organic'));
        promises.push(DevicePaidInstallsList());
        promises.push(DeviceOrganicInstallsList());
        $q.all(promises).then(function(){
            deferred.resolve();
        });  
        return deferred.promise;
    }

    var fourth = function(){
        var deferred = $q.defer();
        var promises = [];
        promises.push(TopPaidStates()
            .finally(TopPaidCities)
            .finally(TopOrganicStates)
            .finally(TopOrganicCities)
            .finally(TopPaidStatesTrend)
            .finally(TopPaidCitiesTrend)
            .finally(TopOrganicStatesTrend)
            .finally(TopOrganicCitiesTrend)
            .finally(StatePaidInstallsList)
            .finally(StateOrganicInstallsList));
            // .finally(TopRegions));
        $q.all(promises).then(function(){
            deferred.resolve();
        });
        return deferred.promise;
    }

    var run = function(){
        $scope.City="";
        $scope.selectedcity=""
        $('#selected_state').html('Select State')
        first().finally(function(){
            second();
            third();
            fourth();
        })
        $scope.uninstallemails()
        
               
    };

    //Start();
    WatchDate();
    
  

}]);
