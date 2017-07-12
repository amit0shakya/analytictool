/*  Controller for Acquisition Overview Page 
    Function Names matches the section headings of the dashboard which they effect 
*/

var acquisition = angular.module('Controllers',[]);
acquisition.controller('AoverviewCtrl', ['$scope','$rootScope','$q','JettyService','UtilitiesService','JSONService',function($scope, $rootScope, $q, JettyService, UtilitiesService, JSONService) {

    /* global variables which we use inside functions */
    var today =  new Date();
    var currentdate = new Date(Date.UTC(today.getUTCFullYear(),today.getUTCMonth(),today.getUTCDate()));
    var app = $rootScope.app.app_secret;
    var total_installs_raw;
    var total_paid_installs_raw;
    var total_paid_uninstalls_raw;
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
	    $scope.date = {startDate: new Date(currentdate.getTime() - 7*1000*60*60*24), endDate: new Date(currentdate.getTime() - 1*1000*60*60*24)};		
//       $scope.date = {startDate: new Date(Date.UTC(2015,2,1)), endDate: new Date(Date.UTC(2015,2,8))};
        $scope.endGap = Math.floor((currentdate.getTime() - $scope.date.endDate.getTime())/(1000*60*60*24));
        $scope.noDays = Math.floor(($scope.date.endDate.getTime() - $scope.date.startDate.getTime())/(1000*60*60*24) + 1);
    };
    
    var PaidInstallsAndOrganicInstalls = function() {
        var deferred = $q.defer();
        var p_installs;
        var promises = [];
        var promise1 = JettyService.cummulative('IPaid',app,$scope.endGap,$scope.noDays,2,"long",timeZone);
        var promise2 = JettyService.cummulative('NU',app,$scope.endGap,$scope.noDays,2,"long",timeZone);
        try
        {
            promise1.then(function(data){
                p_installs = data.x || 0;
                total_paid_installs_raw = data.x;
                $scope.paid_installs = UtilitiesService.numberFormat(p_installs);
            });
            promise2.then(function(data){
                total_installs_raw = data.x;
                $scope.total_installs = data.x;    
            });
            promises.push(promise1);
            promises.push(promise2);
            $q.all(promises).then(function(){
                $scope.organic_installs = UtilitiesService.numberFormat($scope.total_installs-p_installs);
                deferred.resolve();
            });
        }
        catch(err)
        {
            deferred.resolve();
        }
        return deferred.promise;
    };

    var Uninstalls = function(){
        JettyService.cummulative('U',app,$scope.endGap,$scope.noDays,2,"long",timeZone).then(function(data) {
            $scope.uninstalls = UtilitiesService.numberFormat(data.x);
        });
    };
    
    /* Dependent on PaidInstallsAndOrganicInstalls function
    */
    var PaidVsOrganic = function(){
        var deferred = $q.defer();
        var promises = [];
        var promise1 = JettyService.granwise('IPaid',app,$scope.endGap,$scope.noDays,2,2,"long",timeZone);
        var promise2 = JettyService.granwise('NU',app,$scope.endGap,$scope.noDays,2,2,"long",timeZone);
        var data1,data2;
        try
        {
            promise1.then(function(data){
                data1 = JSONService.fill(data,$scope.endGap,$scope.noDays);
            });
            promise2.then(function(data){
                data2 = JSONService.fill(data,$scope.endGap,$scope.noDays);
            });
            promises.push(promise1);
            promises.push(promise2);
            $q.all(promises).then(function(){
               for(i=0;i<data2.length;i++) 
                {
                    data2[i].y = data2[i].y-data1[i].y;
                    if(data2[i].y<0)    // it is for safety only. negative value makes no sense
                    {
                        data2[i].y=0;
                    }
                }
                mod_data = JSONService.merge(data1,data2,'paid','organic',$scope.endGap,$scope.noDays);
                UtilitiesService.draw_chart(multiLine(mod_data,2,acquisition_overview_paidVsOrganic_multiline_style),"MSLine.swf","PaidVsOrganic","100%","353");
                deferred.resolve();
            });
        }
        catch(err)
        {
            deferred.resolve();
        }
        return deferred.promise;
    };
    
    var InstallsVsUninstalls = function(){
        var promises = [];
        var promise1 = JettyService.granwise('NU',app,$scope.endGap,$scope.noDays,2,2,"long",timeZone);
        var promise2 = JettyService.granwise('U',app,$scope.endGap,$scope.noDays,2,2,"long",timeZone);
        var data1,data2;
        promise1.then(function(data){
            data1 = data;
        });
        promise2.then(function(data){
            data2 = data;
        });
        promises.push(promise1);
        promises.push(promise2);
        $q.all(promises).then(function(){
            console.log(data1)
             console.log(data1)
            mod_data = JSONService.merge(data1,data2,'installs','uninstalls',$scope.endGap,$scope.noDays);
            UtilitiesService.draw_chart(multiLine(mod_data,2,acquisition_overview_installVsUninstall_multiline_style),"MSLine.swf","InstallsVsUninstalls","100%","353");
        });
    };
    
    var TopSourceAndPaidInstalls = function(){
        var deferred = $q.defer();
        JettyService.cummulative('ITop20Sources',app,$scope.endGap,$scope.noDays,3,"long",timeZone).then(function(data) {
            try
            {
                mod_data = (UtilitiesService.descending(data,2)).slice(0,3);
                $scope.paid_source = mod_data[0].x;
                $scope.paid_count = UtilitiesService.numberFormat(mod_data[0].y);
                var count = 0;
                for(i=0;i<mod_data.length;i++)
                {
                    count += mod_data[i].y;
                }
                mod_data = mod_data.concat({'x':"Others", 'y':(total_paid_installs_raw-count)});
                $scope.paid_installs_raw = total_paid_installs_raw;
                $scope.paid_sources = mod_data;
                //UtilitiesService.draw_chart(piechart_op(mod_data,pie_chart_style),"doughnut2d.swf","paidSources","100%","200");
                deferred.resolve();
            }
            catch(err)
            {
                deferred.resolve();
            } 
        });
        return deferred.promise;
    };
    
    var TopKeyWordAndOrganicInstalls = function(){
        var deferred = $q.defer();
        JettyService.cummulative('ITop20Terms',app,$scope.endGap,$scope.noDays,3,"long",timeZone).then(function(data) {
            try
            {
                mod_data = (UtilitiesService.descending(data,2)).slice(0,5);
                $scope.top_term = mod_data[0].x;
                $scope.term_count = UtilitiesService.numberFormat(mod_data[0].y);
                var count = 0;
                for(i=0;i<mod_data.length;i++)
                {
                    count += mod_data[i].y;
                }
               // mod_data = mod_data.concat({'x':"Others", 'y':(total_installs_raw-total_paid_installs_raw)-count});
                UtilitiesService.draw_chart(piechart_singlediv(mod_data,acquisition_overview_organic_installs_doughnut_style),"doughnut2d.swf","topKeyWords","100%","250")
                deferred.resolve();
            }
            catch(err)
            {
                deferred.resolve();
            }
            
        });
        return deferred.promise;
    };

    var TotalPaidUninstalls = function(){
        var deferred = $q.defer();
        JettyService.cummulative('UPaid',app,$scope.endGap,$scope.noDays,2,"long",timeZone).then(function(data){
            try
            {
                total_paid_uninstalls_raw = data.x;
                deferred.resolve();
            }
            catch(err)
            {
                deferred.resolve();
            }
            
        });
        return deferred.promise;
    };
    var TopUninstallAndPaidUninstalls = function(){
        var deferred = $q.defer();
        var count = 0;
        JettyService.cummulative('UTop20Sources',app,$scope.endGap,$scope.noDays,3,"string",timeZone).then(function(data) {
            try
            {
                mod_data = (UtilitiesService.descending(UtilitiesService.session_split_2(data,1),2)).slice(0,3);
                $scope.uninstall_source = mod_data[0].x;
                $scope.uninstall_count = UtilitiesService.numberFormat(mod_data[0].y);
                for(i=0;i<mod_data.length;i++)
                {
                    count += mod_data[i].y;
                }
                $scope.paid_uninstalls_raw = total_paid_uninstalls_raw;
                mod_data = mod_data.concat({'x':"Others", 'y':total_paid_uninstalls_raw-count});
                $scope.paid_sources_uninstalls = mod_data;
                //UtilitiesService.draw_chart(bargraph(mod_data,acquisition_source_uninstalls_bar_style),"column2d.swf","uninstallSources","100%","200");
                deferred.resolve();
            }
            catch(err)
            {
                deferred.resolve();
            }
            
        })
        return deferred.promise;
    };

    var block1 = function(){
        var deferred = $q.defer();
        var promises = [];

        promises.push(PaidVsOrganic());
        promises.push(TopSourceAndPaidInstalls());
        promises.push(TopKeyWordAndOrganicInstalls());
        
        $q.all(promises).then(function(){
            deferred.resolve();
        });  
        return deferred.promise;
    }
    var run = function() {
        PaidInstallsAndOrganicInstalls().finally(block1);
        Uninstalls();
        InstallsVsUninstalls();
        TotalPaidUninstalls().finally(TopUninstallAndPaidUninstalls);
    };

    //Start();
    WatchDate();
}]);
