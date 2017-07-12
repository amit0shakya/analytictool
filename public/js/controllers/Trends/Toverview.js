/*  Controller for Trends Overview Page 
    Function Names matches the section headings of the dashboard which they effect 
*/

var trends = angular.module('Controllers')
trends.controller('ToverviewCtrl',['$scope','$rootScope','$q','JettyService','UtilitiesService','JSONService',function($scope, $rootScope, $q, JettyService, UtilitiesService, JSONService) {
    
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

    var AvgSessionLength = function() {
        JettyService.cummulative('S',app,$scope.endGap,$scope.noDays,2,"string",timeZone).then(function(data) {
                $scope.avg_session_length = UtilitiesService.convertToMinutes((parseFloat((data.x).split('__')[1])/1000).toFixed(0));
        });
    };

    var NewAndReturningUsers = function() {
        var promises = [];
        var promise1 = JettyService.cummulative('NU',app,$scope.endGap,$scope.noDays,2,"long",timeZone);
        var promise2 = JettyService.cummulative('AU',app,$scope.endGap,$scope.noDays,2,"hll",timeZone);
        promise1.then(function(data1) {
            $scope.new_users_raw = data1.x;
        });
        promise2.then(function(data2) {
            $scope.active_users_raw = data2.x;
        });
        promises.push(promise1);
        promises.push(promise2);
        $q.all(promises).then(function() {
            $scope.active_users = UtilitiesService.numberFormat($scope.active_users_raw);
            $scope.returning_users = UtilitiesService.numberFormat($scope.active_users_raw-$scope.new_users_raw);
            if ($scope.returning_users<0) {$scope.returning_users=0};
            $scope.new_users = UtilitiesService.numberFormat($scope.new_users_raw);
        });
    };

    // var AverageMonthlyUsers = function() {
    //     JettyService.overall_new('AUMonthlyAvg','91c556949f').then(function(data) {
    //         $scope.avg_monthly_users = data.x
    //     });
    // };

    var NewUsersTrend = function() {
        JettyService.granwise('NU',app,$scope.endGap,$scope.noDays,2,2,"long",timeZone).then(function(data) {
            UtilitiesService.draw_chart(line(data,trends_overview_newusers_trend_line_style),'Line.swf','newusers','100%','353');
        });
    };
    
    var ActiveUsersTrend = function() {
        JettyService.granwise('AU',app,$scope.endGap,$scope.noDays,2,2,"hll",timeZone).then(function(data) {
            UtilitiesService.draw_chart(line(data,trends_overview_activeusers_trend_multiline_style),'Line.swf','activeusers','100%','353');
        });
    };

    var SessionLengthTrend = function() {
        JettyService.granwise('S',app,$scope.endGap,$scope.noDays,2,2,"string",timeZone).then(function(data) {
            for (i=0; i<data.length; i++) {
                data[i].y = (parseFloat((data[i].y).split('__')[1])/60000).toFixed(2)
            }
            UtilitiesService.draw_chart(line_session_length(data,trends_overview_session_time_line_style),'Line.swf','avgSessionLengthTrend','100%','353')
        });
    };

    var Cohort = function() {
        JettyService.granwise('Cohhort',app,$scope.endGap,$scope.noDays,2,3,"long",timeZone).then(function(data) {
            // $scope.table1loaded=true;
            $scope.itemsPerPage = 10
            $scope.currentPage_tab1 = 1;
            $scope.maxSize_tab1 = 5;
            for(i=0; i<data.length; i++) {
                var codeWise = []
                for(j=0; j<=10; j++) 
                    codeWise = codeWise.concat({"x":j,"y":0})
                data[i].a = JSON.parse(data[i].a);
                var map = {};
                for(j=0; j<data[i].a.length; j++) 
                    map[data[i].a[j].x]=data[i].a[j].y
                for(j=0; j<codeWise.length; j++) {
                    if(map[codeWise[j].x])
                        codeWise[j].y=map[codeWise[j].x]
                }
                for(j=1; j<codeWise.length; j++)
                    codeWise[j].y = ((codeWise[j].y*100)/codeWise[0].y).toFixed(2)
                data[i].a = codeWise;
            }

            $scope.CohortCSV = jQuery.extend(true,[], data);
            for (var i = 0; i < $scope.CohortCSV.length; i++) {
                for (var j = 0; j < $scope.CohortCSV[i].a.length; j++) {
                    $scope.CohortCSV[i].a[j]=$scope.CohortCSV[i].a[j].y;
                };
            };
                    $scope.totalItems_tab1 = data.length;
                    $scope.$watch('currentPage_tab1 + itemsPerPage', function() {
                        var begin = (($scope.currentPage_tab1 - 1) * $scope.itemsPerPage),
                        end = begin + $scope.itemsPerPage;
                        $scope.filteredcohortlist =  data.slice(begin, end);
                        

                    });
           // $scope.cohort = data;
        });
    };
    
    var run = function() {
        AvgSessionLength();
        NewAndReturningUsers();
        //AverageMonthlyUsers();
        NewUsersTrend();
        ActiveUsersTrend();
        SessionLengthTrend();
        Cohort();
    };

    //Start();
    WatchDate();
}])
