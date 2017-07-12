/*  Controller for Revenue Page */

var revenue = angular.module('Controllers')
revenue.controller('RevenueCtrl',['$scope','$rootScope','$q','JettyService','UtilitiesService','JSONService',function($scope,  $rootScope, $q, JettyService, UtilitiesService, JSONService) {

    /* global variables which we use inside functions */
    var today =  new Date();
    var currentdate = new Date(today.getUTCFullYear(),today.getUTCMonth(),today.getUTCDate()); 
    var app = $rootScope.app.app_secret;
    var timeZone = "IST";
    var transactionusers1,transactionusers2;
    var TotalRev1,TotalRev2;
    var TotalRevenueDaywise,TransactionUsersDaywise,TransactionsDaywise;
    var TopLocationRevenue,TopLocationRevenue2,TopLocationUsers,TopSourceRevenue,TopSourceUsers;
    var OrganicCities={},InOrganicCities={};


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


    $scope.$watch('selectedRevenueCity',function(nv,ov) {
                    if ($scope.selectedRevenueCity!=undefined)
                    {
                        if ($scope.selectedRevenueCity.x=="Select City") {
                            RevenueByCityChart();
                        }
                        else{
                            RevenueByCityChart($scope.selectedRevenueCity.x);
                        }
                    }
        
            });

    $scope.$watch('selectedRevenueSource',function(nv,ov) {
                if ($scope.selectedRevenueSource!=undefined)
                {
                    if ($scope.selectedRevenueSource.x=="Select Source") {
                        RevenueBySourceChart();
                    }
                    else{
                        RevenueBySourceChart($scope.selectedRevenueSource.x);
                    }
                }
        
                    });

    /* Initialized the default date range and sets the endGap and noDays */
    // var Start = function() {
    //     $scope.date = {startDate: new Date(currentdate.getTime() - 8*1000*60*60*24), endDate: new Date(currentdate.getTime() - 2*1000*60*60*24)};
    //     $scope.endGap = Math.abs(currentdate.getTime() - $scope.date.endDate.getTime())/(1000*60*60*24);
    //     $scope.noDays = Math.abs($scope.date.endDate.getTime() - $scope.date.startDate.getTime())/(1000*60*60*24) + 1;
    // };

    var Revenue = function() {
        var deferred = $q.defer();
        var promises = [];
        var promise1 = JettyService.cummulative('TotalRevenue',app,$scope.endGap,$scope.noDays,2,"long",timeZone);
        var promise2 = JettyService.cummulative('TotalRevenue',app,$scope.endGap+$scope.noDays,$scope.noDays,2,"long",timeZone);
        
        try
        {
            promise1.then(function(data1) {
                if (data1==undefined || data1=='null') {data1={x:0}};
                Revenue1 = data1.x/100;
            });
            promise2.then(function(data2) {
                if (data2==undefined || data2=='null') {data2={x:0}};
                Revenue2 = data2.x/100;
            });
            promises.push(promise1);
            promises.push(promise2);
            $q.all(promises).then(function() {
                $scope.revenue_num=Revenue1;
                $scope.revenue_num_old=Revenue2;
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

     var TransactionUsers = function() {
        var deferred = $q.defer();
        var promises = [];
        var promise1 = JettyService.cummulative('TotalTransactionUsers',app,$scope.endGap,$scope.noDays,2,"hll",timeZone);
        var promise2 = JettyService.cummulative('TotalTransactionUsers',app,$scope.endGap+$scope.noDays,$scope.noDays,2,"hll",timeZone);
        try
        {
            promise1.then(function(data1) {
                 if (data1==undefined || data1=='null') {data1={x:0}};
                transactionusers1 = data1.x;
            });
            promise2.then(function(data2) {
                 if (data2==undefined || data2=='null') {data2={x:0}};
                transactionusers2 = data2.x;
            });
            promises.push(promise1);
            promises.push(promise2);
            $q.all(promises).then(function() {
                $scope.transactionusers = UtilitiesService.numberFormat(transactionusers1);
                $scope.transactionusers_change = ((((transactionusers1 - transactionusers2)/transactionusers2) || 0)*100).toFixed(0);
                
                var rpu1 = (Revenue1/transactionusers1) || 0;
                var rpu2 = (Revenue2/transactionusers2) || 0;
                $scope.transcactionperuser = (rpu1).toFixed(0);
                $scope.transcactionperuser_change = Number(((((rpu1) - (rpu2))/(rpu2))*100).toFixed(0))||0;
                
                deferred.resolve();
            });
        }
        catch(err)
        {
            deferred.resolve();
        }
        return deferred.promise;
    };

    // var RevenuePerUsers = function(){
    //     var deferred = $q.defer();
    //     try
    //     {
           
    //         deferred.resolve();
    //     }
    //     catch(err)
    //     {
    //         deferred.resolve();
    //     }
    //     return deferred.promise;
    // };

    var TotalVsInorganicvsOrganic = function(){
        var promises = [];
        var promise1 = JettyService.granwise('TotalRevenue',app,$scope.endGap,$scope.noDays,2,2,"long",timeZone);
        var promise2 = JettyService.granwise('OrganicRevenue',app,$scope.endGap,$scope.noDays,2,2,"long",timeZone);
        var promise3 = JettyService.granwise('InOrganicRevenue',app,$scope.endGap,$scope.noDays,2,2,"long",timeZone);
        var data1=[],data2=[],data3=[];
        
            promise1.then(function(data){
                 if (data==undefined || data=='null') {data=[]};
                data = JSONService.fill(data,$scope.endGap,$scope.noDays);
                for(i=0;i<data.length;i++)
                {
                    data1 = data1.concat({"x":data[i].x, "y":((data[i].y)/100).toFixed(0)});
                }
                 TotalRevenueDaywise=data1;
            });
            promise2.then(function(data){
                if (data==undefined || data=='null') {data=[]};
                for(i=0;i<data.length;i++)
                {
                    data2 = data2.concat({"x":data[i].x, "y":((data[i].y)/100).toFixed(0)});
                }
            });
            promise3.then(function(data){
                if (data==undefined || data=='null') {data=[]};
                for(i=0;i<data.length;i++)
                {
                    data3 = data3.concat({"x":data[i].x, "y":((data[i].y)/100).toFixed(0)});
                }
            });
           
            promises.push(promise1);
            promises.push(promise2);
            promises.push(promise3);
            $q.all(promises).then(function(){
                
                mod_data = JSONService.merge3(data1,data2,data3,'TotalRevenue','OrganicRevenue','InorganicRevenue',$scope.endGap,$scope.noDays);
                UtilitiesService.draw_chart(multiLine(mod_data,3,revenue_TotalVsOrganicvsInorganic_multiline_style),"MSLine.swf","TotalVsInorganicvsOrganic","100%","353");
            });
        
    };

    var OneVsTwoVsThreeRepeatedUser = function(){
        var promises = [];
        var promise1 = JettyService.keygranwise('RepeatedUserRevenue',app,'one',$scope.endGap,$scope.noDays,2,2,"long",timeZone);
        var promise2 = JettyService.keygranwise('RepeatedUserRevenue',app,'two',$scope.endGap,$scope.noDays,2,2,"long",timeZone);
        var promise3 = JettyService.keygranwise('RepeatedUserRevenue',app,'more',$scope.endGap,$scope.noDays,2,2,"long",timeZone);
        var data1=[],data2=[],data3=[];
        promise1.then(function(data){
             if (data==undefined || data=='null') {data=[]};
             data = JSONService.fill(data,$scope.endGap,$scope.noDays);
            for(i=0;i<data.length;i++)
            {
                data1 = data1.concat({"x":data[i].x, "y":((data[i].y)/100).toFixed(0)});
            }
        });
        promise2.then(function(data){
             if (data==undefined || data=='null') {data=[]};
            for(i=0;i<data.length;i++)
            {
                data2 = data2.concat({"x":data[i].x, "y":((data[i].y)/100).toFixed(0)});
            }
        });
        promise3.then(function(data){
             if (data==undefined || data=='null') {data=[]};
             
            for(i=0;i<data.length;i++)
            {
                data3 = data3.concat({"x":data[i].x, "y":((data[i].y)/100).toFixed(0)});
            }
        });
         promises.push(promise1);
            promises.push(promise2);
            promises.push(promise3);
        $q.all(promises).then(function(){
            
            mod_data = JSONService.merge3(data1,data2,data3,'One','Two','More',$scope.endGap,$scope.noDays);
            UtilitiesService.draw_chart(multiLine(mod_data,3,revenue_OneVsTwoVsThreeRepeatedUser_stackedbar_style),"StackedColumn2D.swf","OneVsTwoVsThreeRepeatedUser","100%","353");
        });
    };

    var TransactionGranWise = function() {
        var deferred = $q.defer();
        var promises = [];
        var promise1 = JettyService.granwise('TotalTransactions',app,$scope.endGap,$scope.noDays,2,2,"long",timeZone).then(function(data) {
                if (data==undefined || data=='null') {data=[]};
                data = JSONService.fill(data,$scope.endGap,$scope.noDays);
                TransactionsDaywise = data;
            });;
        var promise2 = JettyService.granwise('TotalTransactionUsers',app,$scope.endGap,$scope.noDays,2,2,"hll",timeZone).then(function(data) {
                if (data==undefined || data=='null') {data=[]};
                data = JSONService.fill(data,$scope.endGap,$scope.noDays)
                TransactionUsersDaywise = data;
            });
        promises.push(promise1);
        promises.push(promise2);
       
            $q.all(promises).then(function() {
                deferred.resolve();
            });
        
        return deferred.promise;
    };

    // var TransactionUsersGranWise = function() {
    //     var deferred = $q.defer();
    //     var promises = [];
        
    //     try
    //     {
    //         promise1
            
           
    //         promises.push(promise1);
            
    //         $q.all(promises).then(function() {
                
    //             deferred.resolve();
    //         });
    //     }
    //     catch(err)
    //     {
    //         deferred.resolve();
    //     }
    //     return deferred.promise;
    // };

    /* Last Table in the Overview tab with pagination */
        var TransactionsDayWiseList = function(){
            var deferred = $q.defer();
            var daywiselist = [];
            try
            {
                for(var i=TotalRevenueDaywise.length-1; i>=0; i--) {
                    daywiselist = daywiselist.concat({"x": TotalRevenueDaywise[i].x,
                        "y":UtilitiesService.numberFormat(TotalRevenueDaywise[i].y), 
                        "z":UtilitiesService.CommaSeparatedNumberFormat(TotalRevenueDaywise[i].y/TransactionUsersDaywise[i].y || 0),
                        "a":UtilitiesService.numberFormat(TransactionsDaywise[i].y),
                        "b":(i && (TotalRevenueDaywise[i].y-(TotalRevenueDaywise[i-1].y))*100/(TotalRevenueDaywise[i-1].y)).toFixed(0)}); 
                }
                $scope.TransactionsDayWiseListCSV = daywiselist;
                $scope.transaction_items = daywiselist.length;
                var items_per_page = 10;
                $scope.transaction_current_page = 1;
                $scope.max_pages = 5;
                $scope.$watch('transaction_current_page', function() {
                    var begin = (($scope.transaction_current_page - 1) * items_per_page),
                    end = begin + items_per_page;
                    $scope.transaction_daywise_list = daywiselist.slice(begin, end);
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



        // Helper function to get granwise data for each key
        var GetRevenueKeyGranwiseData = function(domain,key){
            var deferred = $q.defer();
            JettyService.keygranwise(domain,app,key,$scope.endGap,$scope.noDays,2,2,"long",timeZone).then(function(data){
                try
                {
                   if (data==undefined || data=='null') {data=[]};
                    for (var i = 0; i < data.length; i++) {
                        data[i].y=data[i].y/100;
                    };
                    data = data.concat({"x": key});
                   
                    deferred.resolve(data);
                }
                catch(err)
                {
                    deferred.resolve(data);
                }
               
            });
            return deferred.promise;
        };


         var TopRevenueSources = function() {
            var deferred = $q.defer();
            JettyService.cummulative('RevenueUserTop20Sources',app,$scope.endGap,$scope.noDays,3,"hlllong",timeZone).then(function(data){
                try
                {
                    if (data==undefined || data=='null') {data=[{x:"",y:0}]};
                    for (var i = 0; i < data.length; i++) {
                        data[i].y=data[i].y/100;
                    };
                    TopSourceRevenue=(UtilitiesService.descending(data,2));
                    data = data.slice(0,5);
                    var default_string = "Select Source";
                    data.unshift({x:default_string})
                    $scope.topRevenueSources = data;
                    $scope.selectedRevenueSource = $scope.topRevenueSources[0];
                    
                    deferred.resolve();
                }
                catch(err)
                {
                    deferred.resolve();
                }    
            });
            return deferred.promise;
        };

        /* Top RevenueSource Daywise Installs Graph 
        */
        var RevenueBySourceChart = function(optional_source) {
            var deferred = $q.defer();
            var mod_data = [];
            var promises = [];
            try
            {   // optional_source is undefined when "Select Source" is selected
                if (optional_source === undefined) {
                    for(var i=1;i<$scope.topRevenueSources.length && i<4 ;i++)
                    {
                        var source = $scope.topRevenueSources[i].x;
                        promise = GetRevenueKeyGranwiseData('RevenueSource',source);  //Getting the daywise installs for source
                        promise.then(function(data){
                            var src = data[data.length-1].x;
                            data = data.slice(0,data.length-1); // remove the source appended in above function
                            data = JSONService.fill(data,$scope.endGap,$scope.noDays);// fill the gaps with 0 if for some days data is not there
                            mod_data = mod_data.concat({"z": src , "a": data});
                        });
                        promises.push(promise);
                    }
                }
                else
                {
                            promise = GetRevenueKeyGranwiseData('RevenueSource',optional_source);  //Getting the daywise installs for source
                            promise.then(function(data){
                            var src = data[data.length-1].x;
                            data = data.slice(0,data.length-1); // remove the source appended in above function
                            data = JSONService.fill(data,$scope.endGap,$scope.noDays);// fill the gaps with 0 if for some days data is not there
                            mod_data = mod_data.concat({"z": src , "a": data});
                        });
                        promises.push(promise);
                }
                $q.all(promises).then(function(){
                    UtilitiesService.draw_chart(multiLine2(mod_data,revenue_source_multiline_style),"MSLine.swf",'RevenueBySourceChart','100%','353');
                    deferred.resolve();

                });
            }
            catch(err)
            {
                deferred.resolve();
            }  
            return deferred.promise;
        };



        

        var OrganicRevenue = function() {
            var deferred = $q.defer();
            var promises=[];
            var organic_user=0,inorganic_user=0;
            var organic_rev=0,inorganic_rev=0;
            var old_organic_rev=0,old_organic_rev=0;

            var promise1=JettyService.cummulative('OrganicRevenue',app,$scope.endGap,$scope.noDays,2,"long",timeZone).then(function(data){
                   if (data==undefined || data=='null') {data={x:0}};
                    organic_rev=data.x/100;
                    inorganic_rev=$scope.revenue_num-data.x/100;
                    $scope.OrganicRevenue = UtilitiesService.numberFormat(organic_rev);
                    $scope.InOrganicRevenue = UtilitiesService.numberFormat(inorganic_rev);
            });
            var promise2=JettyService.cummulative('OrganicRevenue',app,$scope.endGap+$scope.noDays,$scope.noDays,2,"long",timeZone).then(function(data){
                   if (data==undefined || data=='null') {data={x:0}};
                    old_organic_rev=data.x/100;
                    old_inorganic_rev=$scope.revenue_num_old-data.x/100;
            });
            var promise3=JettyService.cummulative('TotalTransactionUsersOrganic',app,$scope.endGap,$scope.noDays,2,"hll",timeZone).then(function(data){
                   if (data==undefined || data=='null') {data={x:0}};
                    organic_user = data.x;
                    inorganic_user = transactionusers1-data.x;
            });
            promises.push(promise1);
            promises.push(promise2);
            promises.push(promise3);
            $q.all(promises).then(function() {
                $scope.OrganicRevenue_change = Math.round((organic_rev-old_organic_rev)*100/old_organic_rev) || "0";
                $scope.RevenueperOrganicuser=(organic_rev/organic_user|| 1).toFixed(0);
                $scope.InOrganicRevenue_change = Math.round((inorganic_rev-old_inorganic_rev)*100/old_inorganic_rev) || "0";
                $scope.RevenueperInOrganicuser=Math.round(inorganic_rev/(inorganic_user || 1));
                deferred.resolve();
            });
            return deferred.promise;
        };

        // var InOrganicRevenue = function() {
        //     var deferred = $q.defer();
        //     var promises=[];
        //     var inorganic_user=0;
        //     var inorganic_rev=0;
        //     var old_inorganic_rev=0;
        //     var promise1=JettyService.cummulative('InOrganicRevenue',app,$scope.endGap,$scope.noDays,2,"long",timeZone).then(function(data){
        //            if (data=='null') {data={x:0}};
        //             inorganic_rev=data.x/100;
        //             $scope.InOrganicRevenue = UtilitiesService.numberFormat(data.x/100);
        //     });
        //     var promise2=JettyService.cummulative('InOrganicRevenue',app,$scope.endGap+$scope.noDays,$scope.noDays,2,"long",timeZone).then(function(data){
        //            if (data=='null') {data={x:0}};
        //             old_inorganic_rev=data.x/100;
        //     });
        //     var promise3=JettyService.cummulative('TotalTransactionUsersInorganic',app,$scope.endGap,$scope.noDays,2,"hll",timeZone).then(function(data){
        //            if (data=='null') {data={x:0}};
        //             inorganic_user = data.x;
        //     });
        //     promises.push(promise1);
        //     promises.push(promise2);
        //     promises.push(promise3);
        //     $q.all(promises).then(function() {
        //         $scope.InOrganicRevenue_change = Math.round((inorganic_rev-old_inorganic_rev)*100/old_inorganic_rev) || "0";
        //         $scope.RevenueperInOrganicuser=(inorganic_rev/inorganic_user).toFixed(0);
        //         deferred.resolve();
        //     });
        //     return deferred.promise;
        // };

        var TopRevenueKeyword = function() {
            var deferred = $q.defer();
            var curr_data,old_data;
            var promise1 = JettyService.cummulative('RevenueTop20Keywords',app,$scope.endGap,$scope.noDays,3,"long",timeZone).then(function(data){
               
                        if (data==undefined || data=='null') {data=[{x:"",y:0}]};
                        data = (UtilitiesService.descending(data,2)).slice(0,5);
                        curr_data=data;
                       
            });

             var promise2 = JettyService.cummulative('RevenueTop20Keywords',app,$scope.endGap+$scope.noDays,$scope.noDays,3,"long",timeZone).then(function(data){
                 if (data==undefined || data=='null') {data=[{x:"",y:0}]};
                
                 old_data={};
                 for (var i = 0; i < data.length; i++) {
                    old_data[data[i].x]=data[i].y;
                };
  
                 
            });

            var promises=[];
            promises.push(promise1);
            promises.push(promise2);

            $q.all(promises).then(function(){
                data1=[];
                var colors =["blue","red","green","yellow"]
                for(i=0;i<curr_data.length;i++)
                {
                    data1.push({"x":curr_data[i].x,
                     "y":UtilitiesService.numberFormat((curr_data[i].y)/100),
                     "z": Math.round((curr_data[i].y-old_data[curr_data[i].x])*100/old_data[curr_data[i].x]) || "0",
                     "a": UtilitiesService.numberFormat((curr_data[i].y)/$scope.revenue_num),
                     "c": colors[i]
                 });
                }
              
               $scope.topRevenueKeyword=data1;
                deferred.resolve();
            });

            return deferred.promise;
        };


    //     var TopSourceWiseUsers = function() {
    //     var deferred = $q.defer();
    //     var promises = [];
    //     var promise1 = JettyService.cummulative('UsersTopSource',app,$scope.endGap,$scope.noDays,3,"hll",timeZone);
    //     try
    //     {
    //         TopSourceUsers={};
    //         promise1.then(function(data) {
    //             for (var i = 0; i < data.length; i++) {
    //                 TopSourceUsers[data[i].x]=data[i].y;
    //             };
    //         });
            
           
    //         promises.push(promise1);
            
    //         $q.all(promises).then(function() {
                
    //             deferred.resolve();
    //         });
    //     }
    //     catch(err)
    //     {
    //         deferred.resolve();
    //     }
    //     return deferred.promise;
    // };


         /* Last Table in the Source tab with pagination */
        var SourceWiseList = function(){
            var deferred = $q.defer();
            var list = [];
            try
            {
                for(var i=0; i<TopSourceRevenue.length; i++) {
                    list = list.concat({"x": TopSourceRevenue[i].x,
                        "y":UtilitiesService.CommaSeparatedNumberFormat(TopSourceRevenue[i].y/TopSourceRevenue[i].z || 0),
                        "z":UtilitiesService.numberFormat(TopSourceRevenue[i].y),
                        "a":UtilitiesService.CommaSeparatedNumberFormat(TopSourceRevenue[i].z || 0)
                        });
                }
                $scope.RevenueBySource_list= list.slice(0,6);        
                $scope.SourceListCSV = list;
                $scope.source_items = list.length;
                $scope.items_per_page1 = 10;
                $scope.source_current_page = 1;
                $scope.max_pages = 5;
                $scope.$watch('source_current_page', function() {
                    var begin = (($scope.source_current_page - 1) * $scope.items_per_page1),
                    end = begin + $scope.items_per_page1;
                    $scope.source_list = list.slice(begin, end);
                    // $scope.table2loaded=true;

                });
                deferred.resolve();
            }
            catch(err)
            {
                deferred.resolve();
            }
            
            return deferred.promise;
        };

        var TopRevenueCity = function() {
            var deferred = $q.defer();
            var promise1 = JettyService.cummulative('RevenueUserTop20Cities',app,$scope.endGap,$scope.noDays,3,"hlllong",timeZone).then(function(data){
               
                    if (data==undefined || data=='null') {data=[{x:"",y:0,z:0}]};
                    
                    TopLocationRevenue = UtilitiesService.descending(data,2).slice(0,6);
                    for(i=0;i<TopLocationRevenue.length;i++){
                        TopLocationRevenue[i].a=UtilitiesService.numberFormat(TopLocationRevenue[i].y/100);
                    }
                    data = data.slice(0,20);
                    var default_string = "Select City";
                    data.unshift({x:default_string});
                    $scope.topRevenueCity = data;
                    $scope.selectedRevenueCity = $scope.topRevenueCity[0];
                 
            });

           var promise2 = JettyService.cummulative('RevenueUserTop20Cities',app,$scope.endGap+$scope.noDays,$scope.noDays,3,"hlllong",timeZone).then(function(data){
                 if (data==undefined || data=='null') {data=[{x:"",y:0,z:0}]};
                 TopLocationRevenue2={};
                 for (var i = 0; i < data.length; i++) {
                    TopLocationRevenue2[data[i].x]=data[i].y;
                };
            });
           var promise3= JettyService.cummulative('OrganicRevenueTop20Cities',app,$scope.endGap,$scope.noDays,3,"long",timeZone).then(function(data){
                
                if (data==undefined || data=='null') {data=[]};
                for (var i = 0; i < data.length; i++) {
                    OrganicCities[data[i].x]=Math.round(data[i].y);
                };
            });
            var promises=[];
            promises.push(promise1);
            promises.push(promise2);
            $q.all(promises).then(function(){
                var oldrev;
                for(i=0;i<TopLocationRevenue.length;i++){
                    city=TopLocationRevenue[i].x;
                    TopLocationRevenue[i].b=Math.round(((TopLocationRevenue[i].y-TopLocationRevenue2[city])*100)/TopLocationRevenue2[city]) || "0";
                    TopLocationRevenue[i].c=Math.round((OrganicCities[city]*100)/TopLocationRevenue[i].y);
                }
                $scope.RevenueByLocation = TopLocationRevenue;
                deferred.resolve();
            });
            return deferred.promise;
        };



        /* Top RevenueCity Daywise Installs Graph 
           Uses above helper function 
        */
        var RevenueByCityChart = function(optional_city) {
            var deferred = $q.defer();
            var mod_data = [];
            var promises = [];
            try
            {
                if (optional_city===undefined) {
                    for(var i=1;i<$scope.topRevenueCity.length && i<6 ;i++)
                    {
                        var source = $scope.topRevenueCity[i].x;
                        promise = GetRevenueKeyGranwiseData('RevenueCity',source);  //Getting the daywise installs for source
                        promise.then(function(data){
                            var src = data[data.length-1].x;
                            data = data.slice(0,data.length-1); // remove the source appended in above function
                            data = JSONService.fill(data,$scope.endGap,$scope.noDays);// fill the gaps with 0 if for some days data is not there
                            mod_data = mod_data.concat({"z": src , "a": data});
                        });
                        promises.push(promise);
                    }
                }
                else{
                            promise = GetRevenueKeyGranwiseData('RevenueCity',optional_city);  //Getting the daywise installs for source
                            promise.then(function(data){
                            var src = data[data.length-1].x;
                            data = data.slice(0,data.length-1); // remove the source appended in above function
                            data = JSONService.fill(data,$scope.endGap,$scope.noDays);// fill the gaps with 0 if for some days data is not there
                            mod_data = mod_data.concat({"z": src , "a": data});
                        });
                        promises.push(promise);
                }
                $q.all(promises).then(function(){
                    UtilitiesService.draw_chart(multiLine2(mod_data,revenue_location_multiline_style),"MSLine.swf",'RevenueByCityChart','100%','353');
                    deferred.resolve();
                });
            }
            catch(err)
            {
                deferred.resolve();
            }  
            return deferred.promise;
        };

        
        // Used in LocationWiseList
        // var TopRevnueCitiesOrgvsInorg = function() {
        //     var deferred = $q.defer();
        //     var promise1 = JettyService.cummulative('OrganicRevenueTop20Cities',app,$scope.endGap,$scope.noDays,3,"long",timeZone);
        //     var promise2 = JettyService.cummulative('OrganicRevenueTop20Cities',app,$scope.endGap,$scope.noDays,3,"long",timeZone);
        //     var promises = [];
            
        //     promise1.then(function(data){
                
        //         if (data=='null') {data=[]};
        //         for (var i = 0; i < data.length; i++) {
        //             OrganicCities[data[i].x]=Math.round(data[i].y/100);
        //         };
        //     });
        //     // promise2.then(function(data){
                
        //     //     if (data=='null') {data=[]};
        //     //     for (var i = 0; i < data.length; i++) {
        //     //         InOrganicCities[data[i].x]=Math.round(data[i].y/100);
        //     //     };
        //     // });
        //     promises.push(promise1);
        //    // promises.push(promise2);
        //     $q.all(promises).then(function(){
               
        //         deferred.resolve();
        //     });
            
        //     return deferred.promise;
        // };

        // Used in LocationWiseList
    //     var TopLocationWiseUsers = function() {
    //     var deferred = $q.defer();
    //     var promises = [];
    //     var promise1 = JettyService.cummulative('UsersTopCity',app,$scope.endGap,$scope.noDays,3,"hll",timeZone);
    //     try
    //     {
    //         TopLocationUsers={};
    //         promise1.then(function(data) {
    //             for (var i = 0; i < data.length; i++) {
    //                 TopLocationUsers[data[i].x]=data[i].y;
    //             };
    //         });
            
           
    //         promises.push(promise1);
            
    //         $q.all(promises).then(function() {
                
    //             deferred.resolve();
    //         });
    //     }
    //     catch(err)
    //     {
    //         deferred.resolve();
    //     }
    //     return deferred.promise;
    // };


         /* Last Table in the Location tab with pagination */
        var LocationWiseList = function(){
            var deferred = $q.defer();
            var list = [];
            var promise1 = JettyService.cummulative('RevenueUserCityStats',app,$scope.endGap,$scope.noDays,3,"citystats",timeZone);
             // $scope.table3loaded=true;
            promise1.then(function(data){
                if (data==undefined || data=='null') {data=[{x1:"",x2:0,x3:0,x4:0,x5:0}]};
                data = data.sort(function(a,b) {return b.x3-a.x3});
                for(var i=0; i<data.length; i++) {
                    data[i].x2=Math.round(data[i].x3/(data[i].x2*100)) || 0;
                    data[i].x3=UtilitiesService.numberFormat(data[i].x3/100);
                    data[i].x4=UtilitiesService.numberFormat(data[i].x4/100);
                    data[i].x5=UtilitiesService.numberFormat(data[i].x5/100);

                }
                $scope.LocationListCSV = data;
                $scope.location_items = data.length;
                var items_per_page = 10;
                $scope.location_current_page = 1;
                $scope.max_pages = 5;
                $scope.$watch('location_current_page', function() {
                    var begin = (($scope.location_current_page - 1) * items_per_page),
                    end = begin + items_per_page;
                    $scope.location_list = data.slice(begin, end);
                   
                });
                 deferred.resolve();
            });
            // try
            // {
            //     for(var i=0; i<TopLocationRevenue.length; i++) {
            //         var city = TopLocationRevenue[i];
            //         var old = TopLocationRevenue2[city.x] || 0;
            //         var organic_rev=OrganicCities[city.x] || 0;
            //         var inorganic_rev=InOrganicCities[city.x] || 0;
            //         list = list.concat({"x": city.x,
            //             "y":UtilitiesService.numberFormat(city.y/TopLocationUsers[city.x] || 0),
            //             "z":UtilitiesService.numberFormat(city.y),
            //              "a":UtilitiesService.numberFormat(organic_rev),
            //              "b":UtilitiesService.numberFormat(inorganic_rev),
            //              "c":(organic_rev*100/(organic_rev+inorganic_rev)).toFixed(0),
            //              "d": Math.round((city.y-old)*100/old) || "0"
            //             });
            //     }
            //     $scope.LocationListCSV = list;
            //     $scope.location_items = list.length;
            //     var items_per_page = 10;
            //     $scope.location_current_page = 1;
            //     $scope.max_pages = 5;
            //     $scope.$watch('location_current_page', function() {
            //         var begin = (($scope.location_current_page - 1) * items_per_page),
            //         end = begin + items_per_page;
            //         $scope.location_list = list.slice(begin, end);
            //     });
            //     deferred.resolve();
            // }
            // catch(err)
            // {
            //     deferred.resolve();
            // }
            
            return deferred.promise;
        };


    var RevenueAndUsers = function(){
         var deferred = $q.defer();
        var promises = [];
        promises.push(Revenue());
        promises.push(TransactionUsers());
         $q.all(promises).then(function(){
           deferred.resolve();
        });  
        return deferred.promise;
    };

     var Transaction_daywise = function(){
        var deferred = $q.defer();
        var promises = [];
        promises.push(TotalVsInorganicvsOrganic());
        //promises.push(TransactionUsersGranWise());
        promises.push(TransactionGranWise());
        $q.all(promises).then(function(){
            deferred.resolve();
        });  
        return deferred.promise;
    }


    var run = function(){
       
        RevenueAndUsers().finally(OrganicRevenue);
       // TotalVsInorganicvsOrganic();
        Transaction_daywise().finally(TransactionsDayWiseList);
        OneVsTwoVsThreeRepeatedUser(); 
        TopRevenueCity();
       // TransactionUsersGranWise();
       // TransactionGranWise();
        TopRevenueSources().finally(SourceWiseList)
        //RevenueBySourceChart      // called by watch function itself
        //OrganicRevenue();
        TopRevenueKeyword();
        //InOrganicRevenue();
        //.finally(TopRevnueCitiesOrgvsInorg)
        //.finally(TopLocationWiseUsers)
        //.finally(LocationWiseList);
        LocationWiseList();
    };

    //  var tab_arr=[0,0,0,0];
    //  $scope.$watch('tab',function(nv,ov) {
    //     if ($scope.tab==1 && tab_arr[1]==0) {
    //        tab_arr[1]=1;
    //        TotalVsInorganicvsOrganic();
    //        OneVsTwoVsThreeRepeatedUser();
    //     };
    //     if ($scope.tab==2 && tab_arr[2]==0) {
    //         tab_arr[2]=2;
    //         RevenueBySourceChart();
    //     };
    //     if ($scope.tab==3 && tab_arr[3]==0) {
    //         tab_arr[3]=3;
    //         RevenueByCityChart();
    //     };
    // });



    WatchDate();








}]);